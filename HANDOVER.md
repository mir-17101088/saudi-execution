# Handover: Two extraordinary executions (2026-10-28)

## What changed and why
- **Copy round (Mir, 2026-10-29):** new intro paragraphs 2–3 (red marks on "‘fahisha’ or gross sexual indecency"
  and "sanctity of the time and place"; the press-release dialog now opens from the word "statement"). Dek drops
  "ever". Scene 1 now has 7 cards: card 4 reads "gross sexual misconduct or al-fahisha" (green), two new cards (15
  al-fahisha or sexual-offence cases; 13 of them rape or sexual assault) hold card 4's chart, last card rewritten
  ("fahisha" green). Legend green row is "Al-fahisha (Bangladeshis)". Duaa Dhainy's two paragraphs now follow
  scene 1. "hadd/ hudud" → "hudud"; "hadd (singular of hudud) crime"; "according to this analysis." A
  "Methodology Note" disclosure (`details.meth`, no JS) sits between the names band and the footer.
  JSON-LD wordCount updated; story.js cache key `?v=20261029b`.
- **Sweety's icon (fixed):** on the last scene-1 card the dimmed figures drawn after her index painted over her
  large icon; the named figures (`L.C`) now paint last.
- **Share description (Mir, 2026-10-29):** meta/OG/Twitter/JSON-LD description and llms.txt now read "A Daily Star
  analysis of 665 Saudi government execution statements between January 2024 and 20 October 2026 reveals that the
  execution of Nazrul and Sweety was extremely unusual." (the old sentence no longer matched the copy).
- **Production (2026-10-28):** OG/share images are screenshots of the hero; published 2026-10-29; keywords,
  news_keywords, article tags, fuller JSON-LD; robots.txt (AI crawlers allowed), sitemap.xml (news + image),
  llms.txt, .htaccess, nginx/Vercel steps in README.md.
- **Copy (Mir, 2026-10-28):** scene 1 card 1 now reads "Each icon represents one of the 887 people" (was "887 people",
  then "Each dot"). "taz'ir" is spelled "ta'zir" everywhere (copy, names list, legend, meta). Essam Ahmed line now
  "He said so before the court but to no avail." Scene 2 card 1 also reads "Each icon represents one person…".
- **Three categories (Mir, 2026-10-28):** after the "Unlike hudud" paragraph, a tap-to-open line ("Islamic criminal law
  divides offences into three categories…") opens Hudud, Qisas and Ta'zir as side-by-side tabs, Hudud shown each
  time it opens (story.js; arrow keys move between tabs). The three texts share one grid cell so switching never
  moves the page. Without JS the three read in order under their names. Each wears its scene-2 dot colour. Closing quote added to the Qisas quotation.
- **"Indecency" highlight:** in scene 1 cards 4 and 5 the word is a green highlighter (`mark.g`, dot green, dark text).
- **Phones: gap after dot charts closed:** `.scrolly` gets a negative bottom margin of the empty card strip, so the next
  text sits 2.5rem under the chart as it lets go (wide layout and no-JS unchanged).
- **Headline (Mir, 2026-10-28):** "Two extraordinary executions" (was "An ‘extraordinary’ execution") in the hero,
  title, OG/Twitter, JSON-LD, sitemap, llms.txt; the new dek sits under it (`.dek`, also JSON-LD alternativeHeadline).
  Share images re-shot from the new hero. Meta/OG description unchanged.
- **Categories panel jumped on tap (fixed):** the browser's scroll anchoring held a background splatter still; the
  splatters sit at a share of the page height, so the page scrolled ~76 px whenever the panel opened. `.page__canvas`
  now has `overflow-anchor:none`, and story.js pins the splatters in px once the page settles. Button text: "Read more
  about these three categories of punishment: hudud, qisas and ta’zir." The open panel ends with a source note:
  "Taken from Amnesty International’s 2025 Report on Saudi Arabia’s Execution Crisis." (Mir; no link in the copy).
- **Splatters redrawn (Mir, 2026-10-28):** the old symbol (a circle ringed by round dots) read as a cat's paw. Now three
  variants (`#spl`, `#spl2`, `#spl3`, spread across the 31 uses) drawn by `tools/splatter.py`: irregular pool, thorn
  spikes (some ending in a droplet), stretched satellite drops with tails outward, mist. +5.7 KB gzipped. Share
  images re-shot.
- **Flags (Mir, 2026-10-28):** each country in "Where the foreign nationals came from" has its flag: one 4 KB sprite
  (`img/flags.png`) built by `tools/flags.py` from flag-icons 7.6.0 (MIT) 4x3 SVGs; order = `FLAGS` in story.js.
  Syria is the 2025 flag; Afghanistan is the UN-recognised tricolour (not the Taliban's white flag).
- **iOS 16 hero (fixed):** the long paint runs grew with scroll only via scroll-driven CSS (`animation-timeline`),
  which Safari lacks before 26 (and Firefox), so there they sat still at full length. story.js now moves them the
  same way on scroll where that CSS is missing (checked: offsets match Chrome's CSS to the pixel, in WebKit too).
- **Names list, picking a country (Mir, 2026-10-28):** wide screens scroll up to the top of the names column when
  it is above the screen (Uganda's one name used to sit ~430 px out of view).
- **Phones, country tap jumped (fixed):** the one names panel moved from above the country list to under the tapped
  row, so ~830 px vanished above it and the page had to scroll to make up for it (plus a small auto-scroll for low
  rows); on real phones that showed as a jump. Now each tapped country opens its own panel under its row (clones
  of its names, 10 a page; several can be open), and nothing above the row changes: 0 px of movement in Chrome and
  WebKit. The list at the top follows only All/Saudi/Foreign. Paging a panel brings its country row back on screen.
- **Hero:** original hero kept (headline, byline, sword, top drip band); title block sits a little below
  the middle of the hero (Mir). Added the real Daily Star logo top-left.
  Removed the stub line above the byline (house rule). The fixed splatter background became one long
  textured canvas (`.page__canvas`) that scrolls with the story; long paint runs creep down the hero as the
  reader scrolls (scroll-driven CSS where supported, static elsewhere) and end in a blood-red band, the
  section break before the story.
- **Scene 1 (887 executed, by offence):** legend is colour-only (counts and % removed as asked); the numbers in
  the cards are set in the matching colour, as text, no chip (53.78 pc red, 34 percent blue, 12 percent slate,
  "indecency" green), each deepened to 4.8:1 or better on the white card.
- **Scene 2 (punishment):** legend colour-only too (Mir, 2026-10-28); card numbers coloured (64/85 percent taz'ir red, 23 qisas blue,
  8 hudud grey-blue).
- **Both scenes:** redrawn on one canvas with cached sprites instead of 887 transitioning SVG paths.
  Phones/portrait: chart holds at the top; one card at a time rises into the strip below it, then scrolls on
  over it and fully leaves before the next card (and its chart change) appears; each change starts as its card
  appears and has over a screen of scroll to finish (Mir). Checked at 320, 360, 390, 768 wide.
  Wide landscape: cards in a left column, chart right. Legend never overlaps dots.
- **War-on-drugs chart:** "Total reported executions" legend removed. Years stand vertical when they no longer
  fit (fixes overlapping years on phones); value labels shrink with bar width. Screen-reader data table added.
- **Drug-offence tiles** kept (Mir's call) with three distinct hues: total grey, foreigners red, Saudis blue.
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
- Evaluator (2026-10-28) items not applied, by design: shorter hero, no caps on byline/labels, yellow highlight,
  one meaning per hue across charts (original palette).
- Root robots.txt on campaign.thedailystar.net needs the Sitemap line (README step 3); ours only works at a site root.
- Remaining lint flags are intentional (hero glow/drip gradients, shadows on floating layers).
- perf gates `doc_css_kb`/`dom` fail only from the 887-name list (static HTML for SEO).
- Run the Facebook sharing debugger after launch.

## Next
1. Mir reviews in the browser; apply any changes.
2. Confirm URL and date; deploy.
