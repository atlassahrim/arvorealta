#!/usr/bin/env python3
"""Pull the numbered requirements out of a tender's Bilag 2 spreadsheet.

A requirement specification arrives as .xlsx and the review is scored against
every numbered row in it. Reading them by eye is how a krav gets missed.

    python3 -I _tools/review/krav.py Bilag_2_Kravspesifikasjon.xlsx

Run it with `-I`: the file came from a stranger and sits in its own folder,
and `-I` stops Python importing anything from beside it.
"""
import zipfile, re, sys, html

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    z = zipfile.ZipFile(sys.argv[1])
    shared = []
    if "xl/sharedStrings.xml" in z.namelist():
        x = z.read("xl/sharedStrings.xml").decode("utf-8")
        for si in re.findall(r"<si>(.*?)</si>", x, re.S):
            shared.append(html.unescape("".join(
                re.findall(r"<t[^>]*>(.*?)</t>", si, re.S))))
    for name in z.namelist():
        if not name.startswith("xl/worksheets/sheet"):
            continue
        doc = z.read(name).decode("utf-8")
        print("=" * 8, name)
        for row in re.findall(r"<row[^>]*>(.*?)</row>", doc, re.S):
            cells = []
            for attr, body in re.findall(r"<c\b([^>]*)>(.*?)</c>", row, re.S):
                v = re.search(r"<v>(.*?)</v>", body, re.S)
                t = re.search(r"<is>.*?<t[^>]*>(.*?)</t>", body, re.S)
                val = ""
                if t:
                    val = html.unescape(t.group(1))
                elif v:
                    val = v.group(1)
                    if 't="s"' in attr:
                        val = shared[int(val)]
                cells.append(val)
            line = " | ".join(cells).strip()
            if line.strip(" |"):
                print(line)

if __name__ == "__main__":
    main()
