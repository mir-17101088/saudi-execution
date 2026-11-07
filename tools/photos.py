"""Story photographs: responsive WebP widths + one JPEG fallback. python tools/photos.py (from the repo root)

Source: tools/src/<name>.jpg (tools/ is not deployed). Out: img/<name>-<w>.webp for each width and img/<name>-960.jpg
for browsers without WebP. No metadata is copied (Pillow writes none unless asked). The page shows each photo edge to
edge on phones and 900px wide from 760px (figure.ph), so 640-1600 covers 1x to 2x.
Photos:
- sweety-parents: Sweety's parents at home holding her photograph. Photo: The Daily Star (Mir, 2026-11-07; the file
  Mir supplied, "sweety parents.jpg.jpeg", 3264x1836).
Needs: pip install pillow.
"""
import os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTOS = ('sweety-parents',)
WIDTHS = (640, 960, 1280, 1600)

for name in PHOTOS:
    src = Image.open(os.path.join(ROOT, 'tools', 'src', name + '.jpg'))
    im = ImageOps.exif_transpose(src).convert('RGB')
    for w in WIDTHS:
        r = im.resize((w, round(w * im.height / im.width)), Image.LANCZOS)
        path = os.path.join(ROOT, 'img', '%s-%d.webp' % (name, w))
        r.save(path, 'WEBP', quality=74, method=6)
        print(os.path.basename(path), r.size, os.path.getsize(path) // 1024, 'KB')
    r = im.resize((960, round(960 * im.height / im.width)), Image.LANCZOS)
    path = os.path.join(ROOT, 'img', '%s-960.jpg' % name)
    r.save(path, 'JPEG', quality=78, optimize=True, progressive=True)
    print(os.path.basename(path), r.size, os.path.getsize(path) // 1024, 'KB')
