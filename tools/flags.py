"""Build img/flags.png, the flag sprite for the names list: python tools/flags.py <flag-icons>/flags/4x3

Source: flag-icons (MIT, github.com/lipis/flag-icons), the 4x3 SVGs. Chrome draws each flag at 40x30 (2x of the
20x15 it shows at) into one column with a 2 px gap, so a scaled sprite never bleeds into its neighbour, then the
sprite is reduced to a 256-colour PNG. The order is FLAGS below, which js/story.js repeats; keep the two in step.
Needs: pip install playwright pillow, and Google Chrome installed.
"""
import base64, io, os, sys
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FLAGS = [('Afghanistan', 'af'), ('Bangladesh', 'bd'), ('Benin', 'bj'), ('Chad', 'td'), ('Egypt', 'eg'),
         ('Eritrea', 'er'), ('Ethiopia', 'et'), ('India', 'in'), ('Iran', 'ir'), ('Iraq', 'iq'), ('Jordan', 'jo'),
         ('Kenya', 'ke'), ('Kuwait', 'kw'), ('Myanmar', 'mm'), ('Nepal', 'np'), ('Nigeria', 'ng'), ('Oman', 'om'),
         ('Pakistan', 'pk'), ('Philippines', 'ph'), ('Somalia', 'so'), ('Sri Lanka', 'lk'), ('Sudan', 'sd'),
         ('Syria', 'sy'), ('Uganda', 'ug'), ('Yemen', 'ye')]
W, H, GAP = 40, 30, 2


def main(src):
    imgs = ''.join(
        f'<img src="data:image/svg+xml;base64,{base64.b64encode(open(os.path.join(src, c + ".svg"), "rb").read()).decode()}" '
        f'width="{W}" height="{H}" style="display:block;margin-bottom:{GAP}px">' for _, c in FLAGS)
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome')
        pg = b.new_page(viewport={'width': W, 'height': (H + GAP) * len(FLAGS)}, device_scale_factor=1)
        pg.set_content(f'<body style="margin:0;background:transparent">{imgs}</body>')
        pg.wait_for_timeout(300)
        png = pg.screenshot(omit_background=True, full_page=True)
        b.close()
    im = Image.open(io.BytesIO(png)).convert('RGBA')
    out = os.path.join(ROOT, 'img', 'flags.png')
    im.quantize(256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(out, optimize=True)
    print(out, im.size, os.path.getsize(out) // 1024, 'KB')


if __name__ == '__main__':
    main(sys.argv[1])
