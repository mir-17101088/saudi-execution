"""Make the share images from Amnesty International's illustration: python tools/share_images.py  (from the repo root)

The hero (blood drips, sword) risked being flagged by social platforms, so the share cards use the story's Amnesty
illustration instead (Mir, 2026-10-31). Crops from img/amnesty-illustration-1468.jpg (1468x710), saved in img/:
  share.jpg        1200x630   og:image, twitter:image   whole height, right-aligned
  share-16x9.jpg   1200x675   JSON-LD image             whole height, right-aligned
  share-4x3.jpg    1200x900                             the two men, shirt on the floor left out
  share-1x1.jpg    1200x1200                            the two men, shirt on the floor left out
Needs: pip install pillow.
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'img', 'amnesty-illustration-1468.jpg')
# name: (output size, crop box in the 1468x710 source); x >= 670 keeps out the shirt on the floor (to x 665) and its stain
CROPS = {
    'share.jpg': ((1200, 630), (116, 0, 1468, 710)),
    'share-16x9.jpg': ((1200, 675), (206, 0, 1468, 710)),
    'share-4x3.jpg': ((1200, 900), (670, 102, 1468, 700)),
    'share-1x1.jpg': ((1200, 1200), (680, 0, 1390, 710)),
}

im = Image.open(SRC).convert('RGB')
for name, (size, box) in CROPS.items():
    out = os.path.join(ROOT, 'img', name)
    im.crop(box).resize(size, Image.LANCZOS).save(out, quality=86, optimize=True, progressive=True)
    print(name, size, box, os.path.getsize(out) // 1024, 'KB')
