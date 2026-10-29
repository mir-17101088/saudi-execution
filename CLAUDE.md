# Two extraordinary executions (The Daily Star)

Scroll-driven visual story on Saudi Arabia's execution of Nazrul Islam Abdul Basir and Sweety Akhtar, with
an analysis of 887 executions (Jan 2024 to 20 Oct 2026). Reporting: Abdullah Hel Bubun, Tarek Hosen.
Development: Mir Rownak. Live URL: https://campaign.thedailystar.net/saudi-execution/ (published 2026-10-31).

Not built on the house kit: it is a polish of a hand-built single page whose look the desk asked to keep.
Use the `daily-star-story` skill for house rules, QA scripts and the evaluator.

## Files
- `index.html`: all text, inline CSS (inlined on purpose: LCP 0.87 s vs 1.6 s external), SEO meta, JSON-LD,
  the 887-name list as static HTML (SEO, works without JS).
- `js/story.js`: canvas dot scenes `#s1` (offence) and `#s2` (punishment), war-on-drugs chart `#exp`,
  names filter/pager (phone: tapped country opens under its row), press-release dialog, back-to-top.
- `fonts/bebas-neue.woff2`: tile numbers only (subset A-Z, a-z, 0-9).
- `img/`: WebP + JPEG fallbacks, `share.jpg` 1200x630, `logo.png` (JSON-LD), `canvas.webp` texture tile.
- `fonts/`: Merriweather 400/700/400i subset to the page's characters (Google Fonts `text=` subset).
  Re-subset if new characters appear in the copy. Arabic in the dialog uses system fonts.
- `tools/share_images.py`: re-shoots the hero as `img/share.jpg` (OG) and the 16x9/4x3/1x1 JSON-LD crops.
- `tools/splatter.py`: draws the `#spl` blood-splatter symbols. `tools/flags.py`: builds `img/flags.png` (country list).
- `robots.txt`, `sitemap.xml` (news + image), `llms.txt`, `.htaccess`: SEO and server config; see README.md.

## Rules for this story
- Reporter text is verbatim. Do not change any word or number without Mir's permission.
- Card numbers are set in their category colour (`mark.k k-*`, text only), matching the dots in `C` in story.js.
- Both scene legends are colour-only; the cards carry the numbers.

## Checks
```bash
python -m http.server 5190                      # from the parent folder; open /saudi-execution/
python ~/.claude/skills/daily-star-story/scripts/lint.py .
python ~/.claude/skills/daily-star-story/scripts/perf.py http://127.0.0.1:5190/saudi-execution/ --runs 3
```
Known lint flags kept on purpose: hero glow and drip gradients (original hero art), shadows on the floating
legend, cards and dialog. perf gates `doc_css_kb` and `dom` fail only because of the 887-name list.
