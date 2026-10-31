"""Crop a hero banner to a 1200x630 link-preview image (Open Graph / X large card).

Usage:
  python scripts/make-share-card.py <slug> [--y 0.4]

Reads  supply/apps/<slug>/graphics/hero-banner.png
Writes supply/apps/<slug>/graphics/share-card.jpg, then run `npm run sync:assets`
and set `shareImage: apps/<slug>/share.jpg` in the app frontmatter.

--y is the vertical focus (0 = top, 1 = bottom) used when the hero is taller than
1200:630; it matches the hero's CSS object-position (40%) by default.
"""

import argparse
from pathlib import Path

from PIL import Image

W, H = 1200, 630
ROOT = Path(__file__).resolve().parent.parent


def cover_crop(img: Image.Image, focus_y: float) -> Image.Image:
    src_w, src_h = img.size
    target = W / H
    if src_w / src_h > target:
        crop_w = round(src_h * target)
        left = (src_w - crop_w) // 2
        box = (left, 0, left + crop_w, src_h)
    else:
        crop_h = round(src_w / target)
        top = round((src_h - crop_h) * focus_y)
        box = (0, top, src_w, top + crop_h)
    return img.crop(box).resize((W, H), Image.Resampling.LANCZOS)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("slug")
    parser.add_argument("--y", type=float, default=0.4)
    args = parser.parse_args()

    graphics = ROOT / "supply" / "apps" / args.slug / "graphics"
    src = graphics / "hero-banner.png"
    dest = graphics / "share-card.jpg"

    img = Image.open(src).convert("RGB")
    cover_crop(img, args.y).save(dest, "JPEG", quality=85, optimize=True, progressive=True)
    print(f"wrote {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
