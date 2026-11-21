#!/bin/sh
# Every file a client's book hands out, built from client.json and the page:
# the three A4 documents as .dotx and .pdf, the press PDFs with the printer's
# spec, and the .ase palette. Output: _tools/book/clients/<code>/out/
#   sh _tools/book/kit/build.sh <code>
set -e
code=${1:?usage: build.sh <code>}
cd "$(dirname "$0")/../../.."
out=_tools/book/clients/$code/out
mkdir -p "$out"
export NODE_PATH="$(npm root -g)"
node _tools/book/kit/dotx.js "$code" "$out"
python3 -I _tools/annex/docx_fix.py "$out"/*_a4.docx
python3 -I _tools/book/kit/todotx.py "$out"/*_a4.docx
python3 -m http.server 8766 >/dev/null 2>&1 & srv=$!
trap 'kill $srv' EXIT
sleep 1
node _tools/book/kit/pdfs.js "$code" "$out"
python3 -I _tools/book/kit/press.py "$code" "$out"
python3 -I _tools/book/kit/ase.py "$code" "$out"
python3 -I _tools/book/kit/pdfcheck.py "$out"/*mm.pdf
echo "built: $out"
