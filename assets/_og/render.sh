#!/bin/sh
# Redraws the social cards from assets/_og/*.html into assets/og*.png.
# Run from the repo root. The PNGs are committed; this only regenerates them
# when the words or the theme change.
#
#   sh assets/_og/render.sh
#
# --virtual-time-budget lets the webfonts finish loading; without it the card
# is drawn in fallback serifs and every hand-broken line ending moves.
set -eu
CHROME=${CHROME:-"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"}
python3 -m http.server 8123 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
sleep 1
for pair in "index.html:og.png" "video.html:og-video.png"; do
  src=${pair%%:*}; out=${pair##*:}
  "$CHROME" --headless --disable-gpu --no-sandbox --hide-scrollbars \
    --virtual-time-budget=20000 --window-size=1200,630 \
    --screenshot="assets/$out" "http://localhost:8123/assets/_og/$src"
done
