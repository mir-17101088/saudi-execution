# Handover: An ‘extraordinary’ execution (2026-10-28)

## What changed and why
- **Hero:** original hero kept (headline, byline, sword, top drip band). Added the real Daily Star logo top-left.
  Removed the stub line above the byline (house rule). The fixed splatter background became one long
  textured canvas (`.page__canvas`) that scrolls with the story; long paint runs creep down the hero as the
  reader scrolls (scroll-driven CSS where supported, static elsewhere) and end in a blood-red band, the
  section break before the story.
- **Scene 1 (887 executed, by offence):** legend is colour-only (counts and % removed as asked); the numbers in
  the cards wear the matching colour (53.78 pc red, 34 percent blue, 12 percent grey-blue, "indecency" green).
- **Scene 2 (punishment):** card numbers coloured the same way (64/85 percent taz'ir red, 23 qisas blue,
  8 hudud grey-blue). Legend still shows counts and % (not requested; ask Mir).
- **Both scenes:** redrawn on one canvas with cached sprites instead of 887 transitioning SVG paths.
  Phones/portrait: chart holds at the top, cards rise below it and slide under it (no card covers a dot).
  Wide landscape: cards in a left column, chart right. Legend never overlaps dots.
- **War-on-drugs chart:** "Total reported executions" legend removed. Years stand vertical when they no longer
  fit (fixes overlapping years on phones); value labels shrink with bar width. Screen-reader data table added.
- **Drug-offence tiles** (477/362/115 big-number boxes, house rule) became one proportional bar, same words.
- **Names list:** "Siti Akhtar" is now "Sweety Akhtar". Phones: names show above the country list, and a tapped
  country opens its names directly under its row; the row stays under the finger. Fixed: the list reset to
  page 1 whenever a phone's address bar showed/hid. Highlight rows use a tint, not a left stripe.
- **Footer:** dark, real logo + credits left, socials right, copyright line.
- **Back to top:** appears after the hero; hidden over charts, figures, list controls and the footer.
- **Build:** no runtime CDN. Fonts self-hosted and subset; images WebP + JPEG; CSS inlined; full meta, OG,
  Twitter, JSON-LD, share card.

## Verified
- Text diff against the original: only Siti→Sweety, the removed legend item, the footer copyright, skip link.
- No horizontal overflow at 320, 360, 390, 768, 1024, 1280, 1440, 1920 (was 418 px wide at 390).
- perf.py @390 4x CPU (median of 3), old → new: eager 790 → 360 KB; LCP 0.84 → 0.87 s; worst scroll frame
  867 → 67 ms; long tasks 35 (5.2 s) → 9 (0.5 s); boot 3.9 → 1.0 s.
- Scene transitions @4x CPU, phone: mean frame 40 → 24 ms, stalls of 170–300 ms gone.
- Reduced motion, JS off (cards read as prose, all 887 names present), dialog focus return.

## Open
- Canonical/OG URL assumes https://campaign.thedailystar.net/saudi-execution/ and publish date 2026-10-28.
- Scene 2 legend numbers: keep or strip like scene 1?
- Remaining lint flags are intentional (hero glow/drip gradients, shadows on floating layers).
- perf gates `doc_css_kb`/`dom` fail only from the 887-name list (static HTML for SEO).
- Run the Facebook sharing debugger after launch.

## Next
1. Mir reviews in the browser; apply any changes.
2. Confirm URL and date; deploy.
