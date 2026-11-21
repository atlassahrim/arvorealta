# Midjourney as it stood on 21 November 2026

**This file goes stale.** Midjourney changes its model and its parameters
every few months. If today is more than three months after the date above,
search for the current default version and parameter list before relying on
anything here, then update this file and its date.

**Sources.** The official pages (`docs.midjourney.com`) refuse automated
reading, so everything here comes from third-party guides that quote them.
Where those guides disagree, it is marked *unconfirmed*.

## Version

- **V8.2 is the default**, since 24 July 2026. V8.1 and V7 can still be
  chosen in Settings.
- **V7 keeps** `::` multi-prompt weights, `--oref` (Omni Reference) and
  `--q`. V8.x has none of them.
- **On V8.1 and V8.2, the Edit model** (up to four images) replaced Omni
  Reference and Character Reference for keeping a person, object or place
  the same across images.

## The website (midjourney.com)

- **Imagine bar references.** Drop an image in, then choose a slot:
  - **Style reference.** Takes the look, not the content. Typed form
    `--sref`, strength `--sw`.
  - **Image prompt.** Takes composition and content. Strength `--iw`.
  - **Edit.** On V8.2, the same subject in a new scene.
- **Draft mode** is a toggle in the Imagine bar. On V8.1 and V8.2 it makes a
  grid of 24 images at 512 px, which is cheap. Use it to explore; switch it
  off for images to keep.
- **The Settings sliders map onto parameters:** Stylization is `--s`,
  Variety is `--c`, Weirdness is `--w`. A value typed into the prompt
  overrides the slider and travels with the prompt, so type it. That is what
  makes a result repeatable.
- **Personalize** (`--p`) applies the user's profile. A Global V7 profile
  works on V8.1 and V8.2; a V8 profile does not work on V7. **Moodboards**
  work on V8.x. Both pull every image toward the user's taste, so switch them
  off for a neutral result.
- **`--hd`** renders at 2048 px on V8.x and costs more. Pan, Zoom Out and
  Vary Region drop an HD image back to standard resolution, so upscale last.

## Parameters

| Parameter | Range, default | Note |
|---|---|---|
| `--ar` | whole numbers, 1:1 | up to 14:1; up to 4:1 with `--hd` |
| `--s` | 0–1000, 100 | how much of Midjourney's own aesthetic |
| `--c` | 0–100, 0 | how different the images in a grid are |
| `--exp` | 0–100, 0 | 10–25 is useful; above about 25 it overrides `--s` |
| `--raw` | flag | less house style; `--style raw` on V7 |
| `--sref` | URL or code | `--sref random` returns a code worth noting |
| `--sw` | 0–1000, 100 | style reference strength |
| `--iw` | 0–2 or 0–3, 1 | image prompt strength; sources differ on range |
| `--seed` | 0–4294967295 | close, not identical, on V8 |
| `--p` | profile or code | personalisation |
| `--hd` | flag | V8.x native 2K |
| `--no` | terms | **unconfirmed on V8** |
| `--w` | 0–3000, 0 | **unconfirmed on V8** |
| `--tile` | flag | **unconfirmed on V8** |
| `--q` | 1, 2, 4 | V7 only, as far as the sources agree |

## Text

V8 sets short text far better than V6 did: one to four words, in quotation
marks. Past that it still breaks.

## Where this came from

- [Blake Crosley, Midjourney 8.2 Guide](https://blakecrosley.com/guides/midjourney), updated 27 October 2026
- [Evolink, V8.1 prompt guide (API)](https://evolink.ai/docs/en/api-manual/image-series/midjourney/midjourney-v8-1-prompt-guide.md)
- [Miraflow, V8.2 Edit model guide](https://miraflow.ai/blog/midjourney-v8-2-edit-model-guide-prompts-2026)
- [Christy Tucker, Consistent characters on the web interface](https://christytuckerlearning.com/generating-consistent-characters-in-the-midjourney-web-interface/)
- [UX Planet, UI design with Midjourney](https://uxplanet.org/ui-design-with-midjourney-df78eaa2d292)
- [MindStudio, V8 strengths and weaknesses](https://www.mindstudio.ai/blog/what-is-midjourney-v8-alpha-strengths-weaknesses)
