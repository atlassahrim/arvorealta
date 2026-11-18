"""Put a public brand book on the site, at a hidden path.

    python3 -I _tools/book/make_public.py working.html public.html
    python3 -I _tools/book/publish.py public.html <img dir> brand/book

The working book (dark, every section) lives as a private claude.ai
artifact and never enters this repository. Only its public edition does,
made by make_public.py, which removes the working-only blocks rather than
hiding them. This script wraps that edition as a site page:

- a full head with `noindex, nofollow`: the page is reached only by a link
  the owner sends, and nothing on the site links to it
- the fonts from /assets/fonts/ instead of Google Fonts, so the page makes
  no third-party request, like every other page here
- every image the page names, copied beside it into img/

A client's book goes the same way, to its own folder, with the same head.
"""
import os, re, shutil, sys

src, imgdir, outdir = sys.argv[1], sys.argv[2], sys.argv[3]
s = open(src, encoding="utf-8").read()
title = re.search(r"<title>(.*?)</title>", s).group(1)

# drop the artifact-only lines and the Google Fonts request
s = re.sub(r'<title>.*?</title>\s*', "", s, count=1)
s = re.sub(r'<meta name="claude:[^>]*>\s*', "", s)
s, n = re.subn(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>\s*', "", s)
assert n == 1, "expected one Google Fonts link"
assert "googleapis" not in s and "gstatic" not in s

head, body = s.split("<body", 1)
GEIST_MONO_600 = """<style>
/* Geist Mono 600, which the book's labels use and the site's geist.css does
   not carry. Declared here only, so the live pages render as before. */
@font-face{font-family:"Geist Mono";font-style:normal;font-weight:600;font-display:swap;
  src:url(/assets/fonts/geist-mono-600-latin.woff2) format("woff2");
  unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:"Geist Mono";font-style:normal;font-weight:600;font-display:swap;
  src:url(/assets/fonts/geist-mono-600-latin-ext.woff2) format("woff2");
  unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
</style>
"""
page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
<meta name="theme-color" content="#102F27">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/fonts/ebgaramond.css">
<link rel="stylesheet" href="/assets/fonts/geist.css">
<link rel="stylesheet" href="/assets/fonts/montserrat.css">
{GEIST_MONO_600}{head.strip()}
</head>
<body{body}
</html>
"""

os.makedirs(os.path.join(outdir, "img"), exist_ok=True)
names = sorted(set(re.findall(r"img/([A-Za-z0-9._-]+)", page)))
for n in names:
    shutil.copyfile(os.path.join(imgdir, n), os.path.join(outdir, "img", n))
for old in os.listdir(os.path.join(outdir, "img")):   # a picture the page no longer names goes
    if old not in names:
        os.remove(os.path.join(outdir, "img", old))
open(os.path.join(outdir, "index.html"), "w", encoding="utf-8").write(page)
print(f"{outdir}/index.html, {len(page):,} bytes, {len(names)} images")
