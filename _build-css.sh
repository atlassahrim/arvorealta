#!/bin/sh
# Compile the offer page's Tailwind and name the output after its own content.
#
# The filename is the whole point. Pages serves max-age=600, so a stylesheet
# whose name has not changed is held for ten minutes, and longer on a phone
# with the tab open. That is survivable when only values changed. It is not
# survivable when CLASS NAMES changed, which is the usual case here: the new
# HTML asks for a rule the cached stylesheet has never heard of, the rule does
# not exist at all, and the page renders worse than before the fix. That is
# how a hero with a corrected min-height reached the owner with no min-height
# whatever.
#
# A content hash makes that impossible. New bytes, new URL, no stale pairing.
#
#   sh _build-css.sh
set -eu
cd "$(dirname "$0")"
ROOT=$PWD
B=_build                      # underscore, so it never publishes
if [ ! -d "$B/node_modules" ]; then
  mkdir -p "$B"
  (cd "$B" && npm init -y >/dev/null 2>&1 && npm i --silent --no-audit --no-fund tailwindcss@4 @tailwindcss/cli@4)
fi
sed 's#@source "./index.html";#@source "'"$ROOT"'/index.html";#' _tw.src.css > "$B/in.css"
(cd "$B" && ./node_modules/.bin/tailwindcss -i in.css -o out.css -m >/dev/null 2>&1)
HASH=$(sha256sum "$B/out.css" | cut -c1-8)
NEW="assets/tw-$HASH.css"
if [ ! -f "$NEW" ]; then
  rm -f assets/tw-*.css
  cp "$B/out.css" "$NEW"
fi
sed -i "s#/assets/tw-[a-z0-9]*\.css#/$NEW#" index.html
echo "stylesheet: $NEW"
grep -o '/assets/tw-[a-z0-9]*\.css' index.html | head -1
