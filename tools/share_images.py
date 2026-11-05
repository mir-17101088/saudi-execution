"""Make the share images and the #s1 background from Anwar Sohel's feature illustration: python tools/share_images.py
(from the repo root)

Source: tools/src/feature-anwar-sohel.jpg (2128x1080; tools/ is not deployed). Mir chose it as the OG image on
2026-11-05, replacing the Amnesty crops. Saved in img/:
  share.jpg        1200x630   og:image, twitter:image   whole height, centred
  share-16x9.jpg   1200x675   JSON-LD image             whole height, centred
  share-4x3.jpg    1200x900                             the two figures
  share-1x1.jpg    1200x1200                            the two figures, shoulders trimmed
  s1-bg.webp       1280x650   faint background of the offence scene (#s1), greyscale so its red figures
                              never read as chart dots, and blurred; the opacity is set in the CSS
Needs: pip install pillow.
"""
import os
from PIL import Image, ImageFilter, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'tools', 'src', 'feature-anwar-sohel.jpg')
# name: (output size, crop box in the 2128x1080 source); the two figures span about x 455-1700
CROPS = {
    'share.jpg': ((1200, 630), (36, 0, 2093, 1080)),
    'share-16x9.jpg': ((1200, 675), (104, 0, 2024, 1080)),
    'share-4x3.jpg': ((1200, 900), (344, 0, 1784, 1080)),
    'share-1x1.jpg': ((1200, 1200), (524, 0, 1604, 1080)),
}

im = Image.open(SRC).convert('RGB')
for name, (size, box) in CROPS.items():
    out = os.path.join(ROOT, 'img', name)
    im.crop(box).resize(size, Image.LANCZOS).save(out, quality=86, optimize=True, progressive=True)
    print(name, size, box, os.path.getsize(out) // 1024, 'KB')

# softened so the illustration's rows of tiny figures do not compete with the chart's own figures
bg = ImageOps.grayscale(im).resize((1280, 650), Image.LANCZOS).filter(ImageFilter.GaussianBlur(2.5))
out = os.path.join(ROOT, 'img', 's1-bg.webp')
bg.save(out, quality=55, method=6)
print('s1-bg.webp', bg.size, os.path.getsize(out) // 1024, 'KB')
