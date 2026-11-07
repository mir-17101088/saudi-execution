"""Cut the man and the woman out of Anwar Sohel's feature illustration for the hero: python tools/hero_figures.py
(from the repo root)

Source: tools/src/feature-anwar-sohel.jpg (2128x1080, the OG image's source; tools/ is not deployed). Mir asked on
2026-11-07 for the two figures as a faint layer in the hero, so the page says "a man and a woman" as well as "execution".
Steps: the two silhouettes are the dark (or red-icon) pixels, closed and hole-filled (the lit windows in their chests are
enclosed); the white ring that orbits them is fitted as an ellipse on its arcs over the wall and erased where it crosses
them (each pixel copied from one row of icons up or down, the icons being a regular grid; smooth inpaint in the windows'
light); the edge is soft and its colour taken from inside, so no light fringe from the wall survives. For the dark hero
the black of the figures is lifted to a deep maroon (the shapes must read on #080506), the windows are toned down (they
sit behind the title) and the foot fades out (the source cuts the figures off flat).
Saved in img/: hero-figures-640/960/1280.webp (alpha) and hero-figures-640.png (fallback for browsers without WebP).
Needs: pip install pillow numpy scipy opencv-python.
"""
import os
import cv2
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'tools', 'src', 'feature-anwar-sohel.jpg')
OUT = os.path.join(ROOT, 'img')
WIDTHS = (640, 960, 1280)
MAROON = np.array([58, 16, 20], np.float32)   # what the figures' black becomes
FADE = (.58, 1.0)                              # share of the height where the foot starts and ends its fade


def disk(d):
    return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (d, d))


rgb8 = np.asarray(Image.open(SRC).convert('RGB'))
rgb = rgb8.astype(np.float32)
lum = cv2.cvtColor(rgb8, cv2.COLOR_RGB2GRAY).astype(np.float32)

# 1. the silhouettes: dark or red-icon pixels; close the gaps between icons and bars, fill the enclosed windows
core = (lum < 78) | ((rgb[..., 0] - np.maximum(rgb[..., 1], rgb[..., 2]) > 60) & (rgb[..., 0] > 110))
m = cv2.morphologyEx(core.astype(np.uint8), cv2.MORPH_CLOSE, disk(17))
m = cv2.morphologyEx(ndi.binary_fill_holes(m).astype(np.uint8), cv2.MORPH_OPEN, disk(9))
lab, n = ndi.label(m)
sizes = ndi.sum(m, lab, range(1, n + 1))
keep = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s > 20000])

# 2. the ring: thin bright arcs on the wall, away from the figures, fitted as one ellipse
tophat = cv2.morphologyEx(lum.astype(np.uint8), cv2.MORPH_TOPHAT, disk(11))
line = (tophat > 28) & (lum > 170) & ~cv2.dilate(keep.astype(np.uint8), np.ones((15, 15), np.uint8)).astype(bool)
lab2, _ = ndi.label(line, structure=np.ones((3, 3)))
pts = []
for i, sl in enumerate(ndi.find_objects(lab2), 1):
    if sl is not None and max(sl[0].stop - sl[0].start, sl[1].stop - sl[1].start) > 120:
        ys, xs = np.nonzero(lab2[sl] == i)
        pts.append(np.stack([xs + sl[1].start, ys + sl[0].start], 1))
ellipse = cv2.fitEllipse(np.concatenate(pts).astype(np.float32))
ring = np.zeros(keep.shape, np.uint8)
cv2.ellipse(ring, ellipse, 1, 13)
ring &= cv2.dilate(keep.astype(np.uint8), disk(21))

# erase it: one row of icons up or down (the pitch that best matches the image with itself), else a smooth inpaint
fixed = rgb8.copy()
red = rgb[..., 0] - np.maximum(rgb[..., 1], rgb[..., 2])
blk = red[180:420, 560:760]
pitch = min(range(58, 70), key=lambda d: np.abs(blk[d:] - blk[:-d]).mean())
clean = cv2.erode(keep.astype(np.uint8), disk(5)).astype(bool) & (ring == 0)
ys, xs = np.nonzero(ring)
done = np.zeros(len(ys), bool)
for d in (-pitch, pitch, -2 * pitch, 2 * pitch):
    yy = ys + d
    ok = ~done & (yy >= 0) & (yy < keep.shape[0])
    ok[ok] &= clean[yy[ok], xs[ok]]
    fixed[ys[ok], xs[ok]] = rgb8[yy[ok], xs[ok]]
    done |= ok
telea = cv2.inpaint(np.ascontiguousarray(rgb8[..., ::-1]), ring, 7, cv2.INPAINT_TELEA)[..., ::-1]
light = cv2.GaussianBlur(cv2.cvtColor(telea, cv2.COLOR_RGB2GRAY).astype(np.float32), (0, 0), 9) > 78
use = ~done | light[ys, xs]
fixed[ys[use], xs[use]] = telea[ys[use], xs[use]]

# 3. alpha: solid inside; in a band along the edge it falls off with brightness, so the wall between hair strands goes
#    transparent and the strands keep their taper (red icons there stay solid)
inner = cv2.erode(keep.astype(np.uint8), disk(15))
outer = cv2.dilate(keep.astype(np.uint8), disk(7))
ff = fixed.astype(np.float32)
flum = cv2.cvtColor(fixed, cv2.COLOR_RGB2GRAY).astype(np.float32)
redm = np.clip((ff[..., 0] - np.maximum(ff[..., 1], ff[..., 2]) - 30) / 40, 0, 1)
alpha = np.maximum(inner.astype(np.float32), np.maximum(np.clip((150 - flum) / 75, 0, 1), redm) * outer)
alpha = cv2.GaussianBlur(alpha, (0, 0), .8)
# what is left of the edge is the figures' black, not the wall it was blended with
band = (outer > 0) & (inner == 0) & (redm < .5)
fixed[band] = (28, 28, 28)

# 4. for the dark hero: black lifted to maroon, highlights (the lit windows) eased, the foot faded
c = fixed.astype(np.float32)
cl = cv2.cvtColor(fixed, cv2.COLOR_RGB2GRAY).astype(np.float32)[..., None]
k = np.clip((90 - cl) / 90, 0, 1)
c = c * (1 - k) + MAROON * k
c = np.where(c > 110, 110 + (c - 110) * .38, c)
ys, xs = np.nonzero(alpha > .02)
y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
t = np.clip((np.linspace(0, 1, y1 - y0) - FADE[0]) / (FADE[1] - FADE[0]), 0, 1)
fade = (1 - t * t * (3 - 2 * t))[:, None]
a = alpha[y0:y1, x0:x1] * fade
rgba = np.dstack([c[y0:y1, x0:x1], a * 255]).clip(0, 255).round().astype(np.uint8)
img = Image.fromarray(rgba, 'RGBA')
print('figures', img.size, 'aspect %.4f' % (img.size[0] / img.size[1]), 'ring', [round(v) for v in ellipse[0]],
      [round(v) for v in ellipse[1]], round(ellipse[2], 1), 'icon pitch', pitch)

for w in WIDTHS:
    im = img.resize((w, round(w * img.size[1] / img.size[0])), Image.LANCZOS)
    path = os.path.join(OUT, 'hero-figures-%d.webp' % w)
    im.save(path, 'WEBP', quality=68, alpha_quality=70, method=6)
    print(os.path.basename(path), im.size, os.path.getsize(path) // 1024, 'KB')
im = img.resize((640, round(640 * img.size[1] / img.size[0])), Image.LANCZOS)
path = os.path.join(OUT, 'hero-figures-640.png')
im.quantize(128, method=Image.Quantize.FASTOCTREE).save(path, optimize=True)
print(os.path.basename(path), os.path.getsize(path) // 1024, 'KB')
