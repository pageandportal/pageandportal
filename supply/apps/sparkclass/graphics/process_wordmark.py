"""Convert SparkClass wordmark (white bg) → transparent PNG + update supply logos."""
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


def white_to_transparent(im: Image.Image, threshold: int = 245) -> Image.Image:
    """Make near-white pixels transparent; soften anti-aliased edges."""
    im = im.convert("RGBA")
    pixels = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # Pure / near white → fully transparent
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)
                continue
            # Soften light grey fringe (anti-alias against white)
            mn = min(r, g, b)
            if mn > 200:
                # Fade alpha based on how close to white
                fade = (255 - mn) / (255 - 200)
                pixels[x, y] = (r, g, b, max(0, min(255, int(a * fade))))
    return im


def crop_content(im: Image.Image, pad: int = 8) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.width, r + pad)
    b = min(im.height, b + pad)
    return im.crop((l, t, r, b))


def sample_brand_colors(im: Image.Image) -> None:
    """Print approximate blue/yellow from opaque pixels for verification."""
    px = im.load()
    blues, yellows = [], []
    for y in range(0, im.height, 4):
        for x in range(0, im.width, 4):
            r, g, b, a = px[x, y]
            if a < 200:
                continue
            if b > r and b > g and b > 120:
                blues.append((r, g, b))
            elif r > 180 and g > 160 and b < 120:
                yellows.append((r, g, b))
    def avg(samples):
        if not samples:
            return None
        n = len(samples)
        return tuple(sum(c[i] for c in samples) // n for i in range(3))
    print("sampled blue RGB", avg(blues), "yellow RGB", avg(yellows))


def main() -> None:
    src = Image.open(SRC).convert("RGBA")
    src.save(SOURCE_COPY)

    out = white_to_transparent(src)
    out = crop_content(out, pad=12)
    sample_brand_colors(out)

    out.save(WORDMARK, "PNG")
    out.save(ICON, "PNG")  # same wordmark used as app mark
    print(f"wrote {WORDMARK}")
    print(f"wrote {ICON}")
    print(f"size {out.size}")


if __name__ == "__main__":
    main()
