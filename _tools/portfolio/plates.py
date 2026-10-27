#!/usr/bin/env python3
"""Re-cut the portfolio plates for /branding/.

Every plate on that page is a render of a page published on this domain, so a
source page that changes leaves the plate making a claim a reader can check
and find wrong. Re-run this rather than editing an image.

    python3 -m http.server 8777          # from the repo root
    python3 _tools/portfolio/plates.py   # writes assets/work/*

Needs playwright and Pillow. In the cloud container both live on python3.13,
and the browser is at /opt/pw-browsers/chromium-1194/chrome-linux/chrome.

Three decisions worth keeping:

  * The deck plate is the `.slide` element, not the viewport. The deck page's
    body carries a 40px gradient above the slide, which inside a hairline
    frame reads as a grey band rather than as the page it is.
  * The annex plate is sheets 1 and 2 pasted side by side on the page's own
    greige. A4 is portrait; at full measure a portrait plate stands taller
    than the screen it is being shown on. Two of them side by side is 1.41:1
    landscape and still shows both sheets whole.
  * The proposal keeps one sheet portrait and takes a column, because a second
    wide pair in the same sequence reads as the same plate twice.
"""
import asyncio, subprocess, sys
from pathlib import Path
from playwright.async_api import async_playwright
from PIL import Image

BASE = "http://127.0.0.1:8777"
EXE = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "work"
TMP = Path("/tmp/arvorealta-plates")
GREIGE = (217, 215, 212)          # --paper, so the pad is the page's own ground

# name: (widths to publish,)
SIZES = {"deck": (1280, 760), "annex": (1280, 760), "proposta": (760, 520)}


async def render():
    TMP.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        br = await p.chromium.launch(executable_path=EXE, args=["--no-sandbox"])

        pg = await br.new_page(viewport={"width": 1920, "height": 1080})
        await pg.goto(f"{BASE}/deck/reference-pipeline/", wait_until="load")
        await pg.wait_for_timeout(3500)
        await (await pg.query_selector(".slide")).screenshot(path=TMP / "deck.png")
        await pg.close()

        pg = await br.new_page(viewport={"width": 1400, "height": 1200},
                               device_scale_factor=2)
        await pg.goto(f"{BASE}/annex/sample/", wait_until="load")
        await pg.wait_for_timeout(3500)
        for i, el in enumerate(await pg.query_selector_all(".sheet")):
            await el.screenshot(path=TMP / f"annex-{i}.png")
        await pg.close()

        pg = await br.new_page(viewport={"width": 1400, "height": 1200},
                               device_scale_factor=2)
        await pg.goto(f"{BASE}/annex/proposta-motorhome/", wait_until="load")
        await pg.wait_for_timeout(3500)
        els = await pg.query_selector_all(".sheet")
        await els[0].screenshot(path=TMP / "proposta.png")
        await pg.close()

        await br.close()


def pair(a_path, b_path, out):
    a = Image.open(a_path).convert("RGB")
    b = Image.open(b_path).convert("RGB")
    h = min(a.height, b.height)
    a = a.resize((round(a.width * h / a.height), h), Image.LANCZOS)
    b = b.resize((round(b.width * h / b.height), h), Image.LANCZOS)
    pad, gut = round(h * 0.055), round(h * 0.045)
    c = Image.new("RGB", (a.width + b.width + gut + pad * 2, h + pad * 2), GREIGE)
    c.paste(a, (pad, pad))
    c.paste(b, (pad + a.width + gut, pad))
    c.save(out)


def single(src, out):
    im = Image.open(src).convert("RGB")
    pad = round(im.height * 0.05)
    c = Image.new("RGB", (im.width + pad * 2, im.height + pad * 2), GREIGE)
    c.paste(im, (pad, pad))
    c.save(out)


def publish(src, name):
    """webp at every width, one jpg fallback at the widest — the <img src>."""
    OUT.mkdir(parents=True, exist_ok=True)
    widths = SIZES[name]
    for i, w in enumerate(widths):
        subprocess.run(["convert", str(src), "-resize", f"{w}x", "-strip",
                        "-quality", "82", str(OUT / f"{name}-1-{w}.webp")], check=True)
        if i == 0:
            subprocess.run(["convert", str(src), "-resize", f"{w}x", "-strip",
                            "-quality", "84", str(OUT / f"{name}-1-{w}.jpg")], check=True)
    print(f"{name}: {', '.join(str(w) for w in widths)}")


def main():
    asyncio.run(render())
    pair(TMP / "annex-0.png", TMP / "annex-1.png", TMP / "plate-annex.png")
    single(TMP / "proposta.png", TMP / "plate-proposta.png")
    publish(TMP / "deck.png", "deck")
    publish(TMP / "plate-annex.png", "annex")
    publish(TMP / "plate-proposta.png", "proposta")
    print("\nThe version is in the filename. If a plate's content changed, the "
          "width did not — bump the -1- and repoint branding/index.html, or "
          "every browser holding the page serves the old picture.")


if __name__ == "__main__":
    sys.exit(main())
