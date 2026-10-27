#!/bin/sh
# The sandbox compiles its own stylesheet, to its own folder, under its own
# content hash.
#
# It must never share a build with the live pages. `_build-css.sh` runs
# `rm -f assets/tw-*.css` before it writes, so a lab stylesheet kept beside
# the live one would be deleted by the next build of the offer page, and the
# sandbox would silently lose every rule it is testing. `lab/tw-*.css` does
# not match that pattern, and nothing in the live build writes here.
#
#   sh lab/_build.sh
set -eu
cd "$(dirname "$0")/.."
ROOT=$PWD
B=_build
PAGES="lab/brand/index.html"
if [ ! -d "$B/node_modules" ]; then
  mkdir -p "$B"
  (cd "$B" && npm init -y >/dev/null 2>&1 && npm i --silent --no-audit --no-fund tailwindcss@4 @tailwindcss/cli@4)
fi
sed 's#@source "\./#@source "'"$ROOT"'/#' lab/_tw.src.css > "$B/lab-in.css"
(cd "$B" && ./node_modules/.bin/tailwindcss -i lab-in.css -o lab-out.css -m >/dev/null 2>&1)
HASH=$(sha256sum "$B/lab-out.css" | cut -c1-8)
NEW="lab/tw-$HASH.css"
if [ ! -f "$NEW" ]; then
  rm -f lab/tw-*.css
  cp "$B/lab-out.css" "$NEW"
fi
for p in $PAGES; do
  sed -i "s#/lab/tw-[a-z0-9]*\.css#/$NEW#" "$p"
done
echo "lab stylesheet: $NEW"
for p in $PAGES; do
  printf '  %-24s %s\n' "$p" "$(grep -o '/lab/tw-[a-z0-9]*\.css' "$p" | head -1)"
done
