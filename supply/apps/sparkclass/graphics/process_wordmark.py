"""Convert SparkClass wordmark → PNG on white background (matches other app logo tiles)."""
from pathlib import Path

from PIL import Image

SRC = Path(
    r"C:\Users\GORILLA RIG\.cursor\projects\e-App-Projects-Page-and-Portal-Website"
    r"\assets\c__Users_GORILLA_RIG_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Gemini_Generated_Image_u2ph4au2ph4au2ph-f1f822d0-c4ac-49e6-a85e-eb000cb9c967.png"
)
OUT_DIR = Path(__file__).resolve().parent
WORDMARK = OUT_DIR / "logo-wordmark.png"
ICON = OUT_DIR / "logo-icon.png"
SOURCE_COPY = OUT_DIR / "logo-wordmark-source.png"
TRANSPARENT = OUT_DIR / "logo-wordmark-transparent.png"

# Padding around the mark on the white tile
PAD_X = 48
PAD_Y = 36


def white_to_transparent(im: Image.Image, threshold: int = 245) -> Image.Image:
    im = im.convert("RGBA")
    pixels = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)
                continue
            mn = min(r, g, b)
            if mn > 200:
                fade = (255 - mn) / (255 - 200)
                pixels[x, y] = (r, g, b, max(0, min(255, int(a * fade))))
    return im


def crop_content(im: Image.Image, pad: int = 4) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    return im.crop((l, t, r, b))


def on_white_tile(mark: Image.Image) -> Image.Image:
    """Composite mark onto an opaque white rectangle with comfortable padding."""
    w, h = mark.size
    canvas = Image.new("RGBA", (w + 2 * PAD_X, h + 2 * PAD_Y), (255, 255, 255, 255))
    canvas.paste(mark, (PAD_X, PAD_Y), mark)
    return canvas.convert("RGB").convert("RGBA")  # flatten to opaque white


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    src.save(SOURCE_COPY)

    transparent = crop_content(white_to_transparent(src), pad=8)
    transparent.save(TRANSPARENT, "PNG")

    tile = on_white_tile(transparent)
    tile.save(WORDMARK, "PNG")
    tile.save(ICON, "PNG")
    print(f"wrote {WORDMARK} and {ICON} size={tile.size}")
    print(f"also kept {TRANSPARENT} for optional use")


if __name__ == "__main__":
    main()
