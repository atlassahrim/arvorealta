#!/usr/bin/env python3
"""Turn a still ground frame into a seamless ambient loop.

    python3 _tools/portfolio/ground-loop.py <source.jpg> <out-slug> [seconds]

No model is involved and that is the point. The three `base` frames are
2400 x 1350 while every other frame in the set is 1920 x 1080, so there is
25% of margin around a 1080p output — enough for a camera move. Generating
motion instead would reinvent the water; this keeps the owner's own pixels
and only moves the camera across them.

The loop is seamless by construction rather than by crossfade. One eased
value drives the whole move:

    u(t) = (1 - cos(2*pi*t)) / 2        t in [0, 1]

u runs 0 to 1 and back to 0, and its derivative is zero at t = 0, 0.5 and 1.
So the camera is motionless at the start, at the turn and at the end: there
is no visible reversal and no cut at the loop point. A linear ping-pong
shows both.

Frames are cut in Pillow rather than with ffmpeg's zoompan, which quantises
the crop to whole pixels and visibly stutters at speeds this slow. PIL's
resize takes a float box and samples between pixels.
"""
import math, shutil, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image

OUT_W, OUT_H = 1920, 1080
FPS = 25
ZOOM = 0.07          # 7% push over the half cycle
DRIFT_X = 120        # source pixels travelled, total
DRIFT_Y = 46


def build(src: Path, slug: str, seconds: float = 12.0):
    im = Image.open(src).convert("RGB")
    sw, sh = im.size
    if sw < OUT_W or sh < OUT_H:
        sys.exit(f"source {sw}x{sh} is smaller than the {OUT_W}x{OUT_H} output")

    n = int(seconds * FPS)
    tmp = Path(tempfile.mkdtemp(prefix="groundloop-"))
    try:
        for i in range(n):
            t = i / n
            u = (1 - math.cos(2 * math.pi * t)) / 2
            s = 1.0 + ZOOM * u
            cw, ch = OUT_W / s, OUT_H / s
            cx = sw / 2 + (-DRIFT_X / 2 + DRIFT_X * u)
            cy = sh / 2 + (-DRIFT_Y / 2 + DRIFT_Y * u)
            # keep the window inside the source no matter what the dials say
            cx = min(max(cx, cw / 2), sw - cw / 2)
            cy = min(max(cy, ch / 2), sh - ch / 2)
            box = (cx - cw / 2, cy - ch / 2, cx + cw / 2, cy + ch / 2)
            im.resize((OUT_W, OUT_H), Image.LANCZOS, box=box).save(
                tmp / f"{i:05d}.jpg", quality=95)

        out = Path("assets/video") / f"{slug}-1-1080.mp4"
        out.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run([
            "ffmpeg", "-y", "-loglevel", "error",
            "-framerate", str(FPS), "-i", str(tmp / "%05d.jpg"),
            "-c:v", "libx264", "-preset", "slow", "-crf", "26",
            "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.0",
            "-movflags", "+faststart", "-an", str(out),
        ], check=True)
        # the poster is the loop's own first frame, so the swap is invisible
        poster = Path("assets/video") / f"{slug}-1-1080.jpg"
        Image.open(tmp / "00000.jpg").save(poster, quality=88)
        return out, poster
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    src = Path(sys.argv[1])
    slug = sys.argv[2]
    secs = float(sys.argv[3]) if len(sys.argv) > 3 else 12.0
    v, p = build(src, slug, secs)
    print(f"{v}  {v.stat().st_size // 1024} KB")
    print(f"{p}  {p.stat().st_size // 1024} KB")
