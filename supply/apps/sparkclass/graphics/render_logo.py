"""Build SparkClass logo from owner bolt reference + Class II squares."""
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

SIZE = 1024
OUTER = 560
GAP = 100
STROKE = 48
BLUE = (26, 86, 219, 255)
YELLOW = (245, 197, 24, 255)
MID = SIZE // 2

OUT_DIR = Path(__file__).resolve().parent
PNG_PATH = OUT_DIR / "logo-icon.png"
SVG_PATH = OUT_DIR / "logo-icon.svg"
REF_COPY = OUT_DIR / "bolt-reference.png"

REF = Path(
    r"C:\Users\GORILLA RIG\.cursor\projects\e-App-Projects-Page-and-Portal-Website"
    r"\assets\c__Users_GORILLA_RIG_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-6235c806-0e16-4100-9470-1de7893adaa5.png"
)


def _largest_component(mask: Image.Image) -> Image.Image:
    """Keep only the largest opaque connected component (4-connected)."""
    w, h = mask.size
    pix = mask.load()
    visited = [[False] * w for _ in range(h)]
    best = []

    for y in range(h):
        for x in range(w):
            if visited[y][x] or pix[x, y] < 128:
                continue
            comp = []
            q = deque([(x, y)])
            visited[y][x] = True
            while q:
                cx, cy = q.popleft()
                comp.append((cx, cy))
                for nx, ny in ((cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)):
                    if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx] and pix[nx, ny] >= 128:
                        visited[ny][nx] = True
                        q.append((nx, ny))
            if len(comp) > len(best):
                best = comp

    out = Image.new("L", (w, h), 0)
    op = out.load()
    for x, y in best:
        op[x, y] = 255
    return out


def bolt_mask_from_reference() -> Image.Image:
    ref = Image.open(REF).convert("RGB")
    # Cache a copy under supply for reproducibility
    ref.save(REF_COPY)

    w, h = ref.size
    mask = Image.new("L", (w, h), 0)
    px = ref.load()
    m = mask.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            # Bolt body is yellow / olive outline — not near-white, not dark UI
            brightness = (r + g + b) / 3
            if brightness < 230 and brightness > 40 and (r > 100 or g > 100):
                # Prefer yellowish / brownish outline pixels; drop grey cursor
                if g >= r * 0.55 and r > 80:
                    m[x, y] = 255

    mask = _largest_component(mask)
    bbox = mask.getbbox()
    if not bbox:
        raise RuntimeError("Could not find bolt in reference image")
    mask = mask.crop(bbox)

    # Smooth silhouette edges without reintroducing speckles
    mask = mask.filter(ImageFilter.MaxFilter(3))
    mask = mask.filter(ImageFilter.MinFilter(3))
    mask = mask.filter(ImageFilter.GaussianBlur(0.8))
    mask = mask.point(lambda v: 255 if v > 120 else 0)
    mask = _largest_component(mask)

    pad = 64
    target = SIZE - 2 * pad
    mw, mh = mask.size
    scale = min(target / mw, target / mh)
    nw, nh = max(1, int(mw * scale)), max(1, int(mh * scale))
    mask = mask.resize((nw, nh), Image.Resampling.LANCZOS)
    mask = mask.point(lambda v: 255 if v > 140 else 0)

    canvas = Image.new("L", (SIZE, SIZE), 0)
    canvas.paste(mask, ((SIZE - nw) // 2, (SIZE - nh) // 2))
    return canvas


def draw_square_ring(draw: ImageDraw.ImageDraw, left: int, top: int, size: int, stroke: int, color):
    draw.rectangle([left, top, left + size, top + size], outline=color, width=stroke)


def half_mask(top_half: bool) -> Image.Image:
    mask = Image.new("L", (SIZE, SIZE), 0)
    if top_half:
        ImageDraw.Draw(mask).rectangle([0, 0, SIZE, MID], fill=255)
    else:
        ImageDraw.Draw(mask).rectangle([0, MID, SIZE, SIZE], fill=255)
    return mask


def render_png() -> None:
    bolt_a = bolt_mask_from_reference()
    bolt_layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    yellow = Image.new("RGBA", (SIZE, SIZE), YELLOW)
    bolt_layer = Image.composite(yellow, bolt_layer, bolt_a)

    bolt_bottom = Image.composite(
        bolt_layer, Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0)), half_mask(False)
    )
    bolt_top = Image.composite(
        bolt_layer, Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0)), half_mask(True)
    )

    img = Image.alpha_composite(Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0)), bolt_bottom)

    draw = ImageDraw.Draw(img)
    outer_left = (SIZE - OUTER) // 2
    outer_top = (SIZE - OUTER) // 2
    draw_square_ring(draw, outer_left, outer_top, OUTER, STROKE, BLUE)

    inner_size = OUTER - 2 * GAP
    inner_left = (SIZE - inner_size) // 2
    inner_top = (SIZE - inner_size) // 2
    draw_square_ring(draw, inner_left, inner_top, inner_size, STROKE, BLUE)

    img = Image.alpha_composite(img, bolt_top)
    img.save(PNG_PATH, "PNG")
    print(f"wrote {PNG_PATH}")


def write_svg_placeholder() -> None:
    SVG_PATH.write_text(
        """<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <!-- Bolt traced from bolt-reference.png into logo-icon.png (flat yellow). -->
  <rect x="232" y="232" width="560" height="560" fill="none" stroke="#1A56DB" stroke-width="48"/>
  <rect x="332" y="332" width="360" height="360" fill="none" stroke="#1A56DB" stroke-width="48"/>
</svg>
""",
        encoding="utf-8",
    )
    print(f"wrote {SVG_PATH}")


if __name__ == "__main__":
    render_png()
    write_svg_placeholder()
