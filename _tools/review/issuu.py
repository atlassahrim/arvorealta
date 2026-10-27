"""Pull an Issuu flipbook down as page images and per-page text.

A Nordic distributor's catalogue is very often an Issuu flipbook with the
download disabled. That reads as a dead end and is not one: Issuu serves the
rendered page images and the publisher's own text layer to a plain GET, and
both are what a review needs.

**Fetch the whole book before scoring any of it.** DR-002's first finding was
built on ten pages the owner had screenshotted and it was wrong — the
container the review said did not exist was on another page of the same file.
102 pages is one command.

Two things it cannot give you:

- **The original PDF.** Issuu does not serve it when the publisher has
  downloads off, and no variant of the URL changes that. What you get is
  1059x1497 per page, about 128 dpi against A4. Good enough for a `.plate-doc`
  crop that takes half a page or more; too soft for a tight crop on one table
  cell, so cut generously.
- **A page number.** The flipbook index is not the printed folio. This prints
  the offset it detects so a finding can cite the number the reader sees.

Usage:

    python3 -I issuu.py <issuu-url> <out-dir>          # images + text
    python3 -I issuu.py <issuu-url> <out-dir> --text   # text only, fast

The out-dir is somebody else's document. Keep it empty and keep scripts
elsewhere, per the untrusted-download rule.
"""

import json
import gzip
import re
import sys
import urllib.request
from pathlib import Path

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36")

# Without a browser user-agent the CDN answers 403 on every path, which looks
# like a block on the document and is a block on the client.
def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA,
                                               "Accept-Encoding": "gzip"})
    with urllib.request.urlopen(req, timeout=60) as r:
        body = r.read()
    if body[:2] == b"\x1f\x8b":
        body = gzip.decompress(body)
    return body


def parse_url(url):
    m = re.search(r"issuu\.com/([^/]+)/docs/([^/?#]+)", url)
    if not m:
        sys.exit("not an issuu document url: " + url)
    return m.group(1), m.group(2)


# --- minimal protobuf reader, enough for the text layer -------------------
def _varint(b, i):
    r = s = 0
    while True:
        x = b[i]
        i += 1
        r |= (x & 0x7F) << s
        if not x & 0x80:
            return r, i
        s += 7


def _records(b):
    i = 0
    while i < len(b):
        try:
            key, i = _varint(b, i)
        except IndexError:
            return
        wt, fn = key & 7, key >> 3
        if wt == 2:
            n, i = _varint(b, i)
            yield fn, b[i:i + n]
            i += n
        elif wt == 0:
            v, i = _varint(b, i)
            yield fn, v
        elif wt == 5:
            yield fn, b[i:i + 4]
            i += 4
        elif wt == 1:
            yield fn, b[i:i + 8]
            i += 8
        else:
            return


def page_text(blob):
    words = []
    for fn, v in _records(blob):
        if fn == 4 and isinstance(v, bytes):
            for f2, v2 in _records(v):
                if f2 == 1 and isinstance(v2, bytes):
                    try:
                        words.append(v2.decode("utf-8"))
                    except UnicodeDecodeError:
                        pass
    return " ".join(words)


def folio_offset(texts):
    """Guess printed-folio minus flipbook-index.

    Every page in a catalogue of this kind opens or closes with its own folio.
    Take the first token of each page, keep the ones that are plausible page
    numbers, and use the offset the majority agree on.
    """
    votes = {}
    for idx, t in enumerate(texts, 1):
        for tok in (t.split() or [""])[:1] + (t.split() or [""])[-1:]:
            if tok.isdigit() and 0 < int(tok) <= len(texts):
                votes[int(tok) - idx] = votes.get(int(tok) - idx, 0) + 1
    if not votes:
        return None, 0
    off, n = max(votes.items(), key=lambda kv: kv[1])
    return off, n


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    text_only = "--text" in sys.argv
    if len(args) != 2:
        sys.exit(__doc__)
    url, out = args[0], Path(args[1])
    user, slug = parse_url(url)
    out.mkdir(parents=True, exist_ok=True)

    reader = json.loads(get(
        f"https://reader3.isu.pub/{user}/{slug}/reader3_4.json"))
    doc = reader["document"]
    pages = doc["pages"]
    print(f"{slug}: {len(pages)} pages, published {doc.get('originalPublishDate')}")
    print(f"revision {doc.get('revisionId')} / {doc.get('publicationId')}")

    texts = []
    ti = doc.get("textInfo")
    if ti:
        blob = get("https://" + ti["uri"])
        blobs = [v for fn, v in _records(blob)
                 if fn == 1 and isinstance(v, bytes)]
        texts = [page_text(b) for b in blobs]
        off, n = folio_offset(texts)
        with (out / "text.txt").open("w", encoding="utf-8") as f:
            if off is not None:
                f.write(f"# printed folio = index {off:+d}  "
                        f"({n} pages agree)\n")
            for i, t in enumerate(texts, 1):
                folio = f" (printed {i + off})" if off is not None else ""
                f.write(f"\n===== PAGE {i}{folio} =====\n{t}\n")
        print(f"text.txt written, folio offset {off} from {n} pages")
    else:
        print("no text layer on this document")

    if text_only:
        return

    imgs = out / "pages"
    imgs.mkdir(exist_ok=True)
    for i, p in enumerate(pages, 1):
        dest = imgs / f"page_{i}.jpg"
        if dest.exists():
            continue
        dest.write_bytes(get("https://" + p["imageUri"]))
    print(f"{len(pages)} page images in {imgs}")
    w, h = pages[0]["width"], pages[0]["height"]
    print(f"source page {w}x{h} pt; images 1059px wide ~ {1059 / (w / 72):.0f} dpi")


if __name__ == "__main__":
    main()
