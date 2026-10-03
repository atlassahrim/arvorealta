# Vendored runtime

`runtime.js` is React 19.2.0, react-dom/client, Motion 12.23.12 (`motion/react`)
and htm 3.1.1, bundled into one ES module with esbuild and committed.

It exists because `lab/strict/` is built on the stack the taste skill asks for
and this repo has no build step. Loading those four from a CDN would make a
published page depend on a third party staying up and serving the same bytes,
and in a no-build page it is also the only reliable way to get **one** React
instance rather than two, which is what breaks hooks.

Rebuild:

```sh
npm i react@19.2.0 react-dom@19.2.0 motion@12.23.12 htm@3.1.1 esbuild
cat > entry.js <<'JS'
import React from "react";
import { createRoot } from "react-dom/client";
import { motion, useReducedMotion } from "motion/react";
import htm from "htm";
export { React, createRoot, motion, useReducedMotion, htm };
JS
npx esbuild entry.js --bundle --format=esm --minify --target=es2022 \
  --define:process.env.NODE_ENV='"production"' \
  --outfile=assets/vendor/runtime.js
```

313 KB minified, about 100 KB over the wire. That is the price of the stack,
and it is most of the reason the house pages do not use it.
