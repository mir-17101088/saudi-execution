"""Make the related-coverage thumbnails at the end of the story: python tools/related_thumbs.py (from the repo root)

Source: tools/src/related/1.jpg..5.jpg (857x482), the lead images of The Daily Star's earlier stories on the case, from
Mir's "news articles" folder (2026-11-07; tools/ is not deployed). Stories 6 and 7 lead with the same photo as story 1
(Nazrul at the Kaaba), so all three cards share rel-nazrul and the reader's browser fetches it once. Each is cropped
square around its subject and saved in img/ as rel-<name>.webp and .jpg, 320x320 (2x the largest thumbnail box; the
CSS covers the box from the centre).
Needs: pip install pillow.
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'tools', 'src', 'related')
OUT = os.path.join(ROOT, 'img')
SIZE = 320
# source number: (output name, centre of the square crop as a share of the width)
CROPS = {
    1: ('rel-nazrul', .47),              # Nazrul at the Kaaba (stories 1, 6 and 7)
    2: ('rel-communication-gaps', .49),  # text graphic, its bullet list
    3: ('rel-jeddah-mission', .40),      # Ministry of Foreign Affairs sign
    4: ('rel-humaiun-kobir', .63),       # Humaiun Kobir at the lectern
    5: ('rel-mourn-or-wait', .38),       # Sweety's parents
}

for n, (name, cx) in CROPS.items():
    im = Image.open(os.path.join(SRC, '%d.jpg' % n)).convert('RGB')
    w, h = im.size
    left = min(max(0, round(cx * w - h / 2)), w - h)
    sq = im.crop((left, 0, left + h, h)).resize((SIZE, SIZE), Image.LANCZOS)
    sq.save(os.path.join(OUT, name + '.webp'), 'WEBP', quality=74, method=6)
    sq.save(os.path.join(OUT, name + '.jpg'), 'JPEG', quality=80, progressive=True, optimize=True)
    print(name, 'crop x', left, '-', left + h)
