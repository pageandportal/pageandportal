"""Render the Insert Continue icon and hero for the website.

Run from this folder:  python render-graphics.py
Needs Pillow and the fonts in the Insert Continue game repo (see FONT_DIR).
Palette and layout follow insert-continue/docs/website-page-brief.md.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONT_DIR = Path(r"E:\Projects - Apps\insert-continue\game\shared\fonts")
DISPLAY_FONT = FONT_DIR / "PressStart2P-Regular.ttf"
OUT_DIR = Path(__file__).resolve().parent

BRIGHT = (0x9C, 0xFF, 0x9C)
MAIN = (0x33, 0xFF, 0x66)
SCREEN = (0x04, 0x0A, 0x06)


def display_font(size: int) -> ImageFont.FreeTypeFont:
    # Press Start 2P sits on an 8px grid; keep sizes at multiples of 8 for crisp edges.
    assert size % 8 == 0
    return ImageFont.truetype(str(DISPLAY_FONT), size)


def text_width(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont) -> int:
    left, _, right, _ = draw.textbbox((0, 0), text, font=font)
    return right - left


def add_glow(base: Image.Image, layer: Image.Image, radius: int, strength: float) -> Image.Image:
    glow = layer.filter(ImageFilter.GaussianBlur(radius))
    alpha = glow.getchannel("A").point(lambda a: int(a * strength))
    glow.putalpha(alpha)
    out = Image.alpha_composite(base, glow)
    return Image.alpha_composite(out, layer)


def add_scanlines(img: Image.Image, period: int, opacity: float) -> Image.Image:
    lines = Image.new("RGBA", img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(lines)
    shade = int(255 * opacity)
    for y in range(0, img.height, period):
        draw.rectangle([0, y, img.width, y + period // 2 - 1], fill=(0, 0, 0, shade))
    return Image.alpha_composite(img, lines)


def add_vignette(img: Image.Image, strength: float) -> Image.Image:
    w, h = img.size
    sw, sh = w // 8, h // 8
    mask = Image.new("L", (sw, sh), 0)
    px = mask.load()
    cx, cy = sw / 2, sh / 2
    for y in range(sh):
        for x in range(sw):
            dx = (x - cx) / cx
            dy = (y - cy) / cy
            d = min(1.0, (dx * dx + dy * dy) ** 0.5 / 1.25)
            px[x, y] = int(255 * strength * d ** 2.2)
    mask = mask.resize((w, h), Image.BILINEAR)
    dark = Image.new("RGBA", (w, h), (0, 0, 0, 255))
    dark.putalpha(mask)
    return Image.alpha_composite(img, dark)


def render_icon() -> None:
    size = 512
    img = Image.new("RGBA", (size, size), SCREEN + (255,))
    draw = ImageDraw.Draw(img)

    inset, stroke = 40, 12
    draw.rectangle([inset, inset, size - inset - 1, size - inset - 1], outline=MAIN, width=stroke)

    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ldraw = ImageDraw.Draw(layer)
    ldraw.fontmode = "1"
    font = display_font(40)
    cell = 40
    line_gap = 24

    words = ["INSERT", "CONTINUE"]
    block_size = cell
    total_h = cell * 2 + line_gap * 2 + block_size
    top = (size - total_h) // 2

    widest = max(text_width(ldraw, w, font) for w in words)
    left = (size - widest) // 2
    for i, word in enumerate(words):
        w = text_width(ldraw, word, font)
        x = (size - w) // 2
        ldraw.text((x, top + i * (cell + line_gap)), word, font=font, fill=MAIN)

    block_y = top + 2 * (cell + line_gap)
    ldraw.rectangle([left, block_y, left + block_size - 1, block_y + block_size - 1], fill=BRIGHT)

    img = add_glow(img, layer, radius=6, strength=0.25)
    img.convert("RGB").save(OUT_DIR / "logo-icon.png", optimize=True)


def render_hero() -> None:
    w, h = 2200, 880
    img = Image.new("RGBA", (w, h), SCREEN + (255,))

    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ldraw = ImageDraw.Draw(layer)
    ldraw.fontmode = "1"

    word_font = display_font(72)
    wordmark = "INSERT CONTINUE"
    cell = 72
    word_w = text_width(ldraw, wordmark, word_font)
    gap = cell // 3
    total_w = word_w + gap + cell
    x = (w - total_w) // 2
    y = 300
    ldraw.text((x, y), wordmark, font=word_font, fill=MAIN)
    ldraw.rectangle([x + word_w + gap, y, x + word_w + gap + cell - 1, y + cell - 1], fill=BRIGHT)

    tag_font = display_font(32)
    tag = "ARCADE MINI GAMES"
    tag_w = text_width(ldraw, tag, tag_font)
    ldraw.text(((w - tag_w) // 2, y + cell + 64), tag, font=tag_font, fill=MAIN)

    img = add_glow(img, layer, radius=10, strength=0.22)
    img = add_scanlines(img, period=6, opacity=0.35)
    img = add_vignette(img, strength=0.55)
    img.convert("RGB").save(OUT_DIR / "hero-banner.png", optimize=True)


if __name__ == "__main__":
    render_icon()
    render_hero()
    print("Wrote logo-icon.png and hero-banner.png to", OUT_DIR)
