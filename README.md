# Two extraordinary executions · The Daily Star

Live URL: **https://campaign.thedailystar.net/saudi-execution/** · Published 29 October 2026

A static site: plain HTML, one JavaScript file, images and fonts. No build step, no server code,
no database, no calls to outside services. Every path is relative, so the same files work inside the
`/saudi-execution/` folder on our server and at the root of a Vercel project.

## What is in the folder

| Path | Needed on the server | What it is |
|---|---|---|
| `index.html` | yes | The story: all text, styles, SEO tags, JSON-LD |
| `js/story.js` | yes | Charts, names list, pop-up, back-to-top |
| `img/`, `fonts/` | yes | Images (WebP + JPEG), share images, self-hosted fonts |
| `sitemap.xml` | yes | Sitemap with Google News and image entries |
| `robots.txt` | yes (see step 3) | Allows search engines and AI crawlers, points to the sitemap |
| `llms.txt` | yes | Plain-text summary for AI assistants |
| `.htaccess` | yes on Apache/LiteSpeed | MIME types, gzip, caching, hides the dev files |
| `vercel.json`, `.vercelignore` | no | Vercel settings only |
| `tools/`, `*.md`, `.git*` | no | Development files (harmless if uploaded; `.htaccess` hides them) |

## Deploy on the Daily Star server (campaign.thedailystar.net)

1. On GitHub, open the repository, click **Code → Download ZIP**, and unzip it
   (or `git clone https://github.com/mir-17101088/saudi-execution.git`).
2. Upload the contents into a folder named **`saudi-execution`** at the web root of
   `campaign.thedailystar.net`, so the page is served at `/saudi-execution/index.html`.
   Upload hidden files too (`.htaccess`).
3. **robots.txt:** crawlers only read the robots.txt at the domain root. In
   `https://campaign.thedailystar.net/robots.txt`, add this line (and make sure nothing there blocks
   `/saudi-execution/` or the AI crawlers listed in our `robots.txt`):
   ```
   Sitemap: https://campaign.thedailystar.net/saudi-execution/sitemap.xml
   ```
4. Keep the trailing slash: `/saudi-execution` must redirect to `/saudi-execution/`
   (Apache and nginx do this for folders by default; the page also corrects it itself).
5. If the site is behind Cloudflare, purge the cache for `/saudi-execution/*`.
6. If the folder answers *500 Internal Server Error*, the server does not allow `.htaccess` overrides:
   delete `.htaccess` (it only adds caching and compression; the site works without it).

**nginx** (if the server is nginx, not Apache), inside the `server` block:
```nginx
location /saudi-execution/ {
    index index.html;
    add_header X-Content-Type-Options nosniff;
    location ~* \.(html|xml|txt)$ { add_header Cache-Control "public, max-age=0, must-revalidate"; }
    location ~* \.(js|css|woff2|webp|jpg|jpeg|png|ico)$ { add_header Cache-Control "public, max-age=604800"; }
    location ~ ^/saudi-execution/(tools/|.*\.(md|py)$|vercel\.json) { return 404; }
}
# make sure these types exist in mime.types: image/webp webp; font/woff2 woff2;
gzip_types text/css application/javascript application/xml text/plain image/svg+xml;
```

## Deploy on Vercel

1. In Vercel, **Add New → Project → Import** this GitHub repository.
2. Framework preset: **Other**. Build command: *(leave empty)*. Output directory: *(leave empty, the repo root)*.
3. Deploy. `vercel.json` sets the security and cache headers.

`*.vercel.app` addresses are sent `X-Robots-Tag: noindex`, so previews never compete with the live
page in Google. The canonical URL in the page always points to campaign.thedailystar.net. If Vercel
ever becomes the live host on our domain, nothing needs changing.

## After it is live

- Google Search Console: submit `https://campaign.thedailystar.net/saudi-execution/sitemap.xml`,
  then **URL inspection → Request indexing** for the page.
- Check the share card: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  (click **Scrape again**) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
- Check the structured data: [Rich Results Test](https://search.google.com/test/rich-results).
- These should all open: `/saudi-execution/`, `/saudi-execution/sitemap.xml`,
  `/saudi-execution/llms.txt`, `/saudi-execution/img/share.jpg`.

## Updating

- Text and styles: `index.html`. Charts and interactions: `js/story.js`
  (bump `?v=` on its `<script>` tag in `index.html` after editing it).
- Share images: `python tools/share_images.py` (needs Python, Playwright and Chrome) re-shoots the hero.
- If new characters appear in the text, re-subset the fonts (see `CLAUDE.md`).

Credits: reporting Abdullah Hel Bubun, Tarek Hosen and Keero Adnan Ahmed; data collection & processing Mir Rownak;
planning & design Abdullah Hel Bubun; development Mir Rownak and Abdullah Hel Bubun.
