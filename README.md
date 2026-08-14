# arvorealta.com

One-page site for Arvorealta — document standards for industrial manufacturers.

Single self-contained `index.html`. No build step, no dependencies, no framework.
All colour, type and spacing values are CSS custom properties at the top of the
`<style>` block.

## Deploy

Connect this repo to Cloudflare Pages or Netlify:

- Build command: *(none)*
- Build output directory: `/`

Every push to `main` redeploys.

## Before pointing the domain

`arvorealta.com` currently resolves to Wix. Check whether email
(`awe@arvorealta.com`) is hosted there before changing DNS — record the MX
entries and keep them unchanged. Only the A / CNAME records for web hosting
should change.

## To do

- Set the real typeface via `@font-face` (`--font` token)
- Confirm the €2,400 price and the competitor claims in section 04
- Optional: add a booking link alongside the email CTA
- Optional: `/writing` section for tender-documentation articles (nav slot ready)
