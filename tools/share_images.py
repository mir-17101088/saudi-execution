"""Make the share images from the real hero: python tools/share_images.py  (from the repo root)

Serves the repo on a local port, opens the page in Chrome at four sizes and saves the top screen
(the hero art: logo, drips and sword, with the headline, dek and byline hidden) as JPEGs in img/:
  share.jpg        1200x630   og:image, twitter:image
  share-16x9.jpg   1200x675   JSON-LD image (Google Discover / Top stories crops)
  share-4x3.jpg    1200x900
  share-1x1.jpg    1200x1200
Needs: pip install playwright pillow, and Google Chrome installed.
"""
import asyncio, functools, http.server, os, threading
from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIZES = {'share.jpg': (1200, 630), 'share-16x9.jpg': (1200, 675), 'share-4x3.jpg': (1200, 900), 'share-1x1.jpg': (1200, 1200)}


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    h = functools.partial(Quiet, directory=ROOT)
    s = http.server.ThreadingHTTPServer(('127.0.0.1', 0), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s


async def main():
    srv = serve()
    url = f'http://127.0.0.1:{srv.server_address[1]}/'
    async with async_playwright() as p:
        b = await p.chromium.launch(channel='chrome')
        for name, (w, h) in SIZES.items():
            pg = await b.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1)
            await pg.goto(url, wait_until='networkidle')
            # the hero is 112% of the screen with its text centred, so a short card would cut off the byline
            # art only: logo, drips and sword; the title, dek and byline are left out (Mir, 2026-10-31)
            await pg.add_style_tag(content='.hero{min-height:100vh!important}.hero__body{visibility:hidden!important}')
            await pg.evaluate('document.fonts.ready')
            await pg.wait_for_timeout(800)
            out = os.path.join(ROOT, 'img', name)
            await pg.screenshot(path=out, type='jpeg', quality=86)
            print(name, w, h, os.path.getsize(out) // 1024, 'KB')
            await pg.close()
        await b.close()
    srv.shutdown()


asyncio.run(main())
