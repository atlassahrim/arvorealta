#!/usr/bin/env python3
"""Check a foreign-language sheet's vocabulary against the buyer's own files.

The standing caveat is that the Nordic text is not a native speaker's. Most of
that risk is answerable rather than endurable: a term taken out of the tender
cannot be the wrong term. This counts which ones were, so the residue left to
have checked is a handful of sentences rather than a document.

    python3 _tools/review/vocab.py annex/_x-review-nb/index.html corpus.txt

Build the corpus by catting `pdftotext -layout` of the competition document
and every bilag into one file. The first review scored 83 of 107.
"""
import re, sys, html

def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(2)
    doc = open(sys.argv[1], encoding="utf-8").read()
    doc = re.sub(r"<!--.*?-->", " ", doc, flags=re.S)
    doc = re.sub(r"<(script|style|head)[^>]*>.*?</\1>", " ", doc, flags=re.S | re.I)
    doc = html.unescape(re.sub(r"<[^>]+>", " ", doc))
    corpus = open(sys.argv[2], encoding="utf-8").read().lower()

    seen, found, missing = set(), [], []
    for w in re.findall(r"[a-zA-ZæøåÆØÅ][a-zA-ZæøåÆØÅ\-]{4,}", doc):
        lw = w.lower()
        if lw in seen:
            continue
        seen.add(lw)
        stem = lw.rstrip(".,")
        hit = stem in corpus or stem[:-1] in corpus or stem[:-2] in corpus
        (found if hit else missing).append(lw)

    print("distinct words of 5+ characters: %d" % len(seen))
    print("\nATTESTED IN THE BUYER'S FILES (%d)\n%s"
          % (len(found), ", ".join(sorted(found))))
    print("\nNOT ATTESTED (%d) — proper nouns, plain prose, or ours\n%s"
          % (len(missing), ", ".join(sorted(missing))))
    print("\nRead the unattested list. Proper nouns and ordinary words are "
          "fine;\ninvented compounds are the ones to replace with the buyer's "
          "own wording.")

if __name__ == "__main__":
    main()
