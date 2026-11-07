# Handover: Two extraordinary executions (2026-11-07)

## What changed and why
- **Related coverage as a swipeable row; publish date 10 November 2026 (Mir, 2026-11-07):** "Related coverage" left
  the end of the story and now sits after the Methodology Note, before the footer. The seven cards are one row that
  swipes (`.rel__list`: flex, scroll-snap to each card's left edge; phones run it to the screen edges and size cards
  to the screen minus 36px so the next one shows; 340px max), so the section is 207-244px tall instead of seven
  stacked cards. Small round arrows over the row's ends (`.rel__prev`/`.rel__next`, story.js) step one card and hide
  at either end; if a hidden arrow had focus, focus moves to the other. Without JS the arrows stay hidden and the row
  keeps its scrollbar. Publish date is now 2026-11-10 in `article:published_time`/`modified_time`, `og:updated_time`,
  JSON-LD `datePublished`/`dateModified`, sitemap `lastmod` and `news:publication_date`, llms.txt, README and
  CLAUDE.md. story.js `?v=20261110b`. Checked Chrome, WebKit and Firefox at 320/390/768/1440: order methodology →
  related → footer, every arrow step and both ends, no overflow, no console errors; JS off, the row scrolls. Lint 0
  errors. perf @390 4x, 5 runs each against the last commit: LCP 0.90 → 1.00 s on slow 4G, eager 240 → 250 KB. A
  bisect (without the font 0.94, the card 0.99, the related row 0.95) found no single cause, so it is the ~10 KB
  added today; loading the font after `load` didn't change it, so it stays a plain `@font-face`.
- **Intro, drop cap, Nazrul and Sweety card, highlighters (Mir, 2026-11-07):** intro P1 drops "in 2022" and a new
  paragraph follows it, Mir's wording verbatim: "They arrived in Saudi Arabia about four months apart — Nazrul in November
  2022 and Sweety in March 2023." P1 opens on a drop cap from Mir's newspaper reference (`.dropcap::first-letter`, so
  "Nazrul" stays one word): a Bebas Neue N in `--red`, its cap from line 1's cap height to line 4's baseline, on a bar in
  the text colour (the reference's black bar is its text colour). Firefox sizes a floated first letter to the glyph's
  ink, so `@supports (-moz-appearance:none)` adds the .1em gap the others get from line-height; Chrome, WebKit and
  Firefox measured the same. Bebas `@font-face` is back (6.7 KB, swap). New card `aside.duo` before "Confusion over
  charges", from Mir's data sheet: name, home, left Bangladesh, detained; the shared job spans both columns. One card,
  not two: one grid, so the dates line up across, and the illustration's man and woman stand back to back behind his
  and her column (the hero's `img/hero-figures-*.webp`; srcset 640/960 only so phones reuse the hero's file), .45,
  masked out above the lit windows (grey smudges behind the dates). Dates in Bebas, labels sentence case, square frame
  like the categories panel. Back-to-top hides over it (`.duo` in story.js, `?v=20261107c`). Every scrolly number is
  now a highlighter in its dots' colour like the 15 (`mark.k`; white on #d1323b and #2f6fd0, #1a1a1a on #7f9cbb).
  wordCount 2746 → 2805. Checked 320/390/768/1440 in Chrome, WebKit, Firefox: no overflow, no console errors, card
  text present without JS. Lint 0 errors. perf @390 4x, 3 runs vs the last commit: eager 240 → 248 KB (the font),
  LCP 0.96 → 0.93 s, CLS 0; gates fail only `doc_css_kb`/`dom`, as before.
- **Hero, cards, Facebook figure, lint (Mir, 2026-11-07):** removed the hero splatter that sat over the woman's face
  (`left:85%;top:26%`, 300px); sword opacity .3 → .22. Scene 1's "15 individuals" and "13 cases" are amber highlighters
  in the dots' colour (`mark.k-s`, dark text, one line), like al-fahisha's green. Nazrul's Facebook airport screenshot
  and caption are gone from "Confusion over charges" (images, sitemap entry and `figure.fb` CSS removed). Lint now passes
  (0 errors): the phone logo bar is `.masthead-bar` (was `.mbar`, same CSS); the hero's height is a plain
  `min-height: 112vh; min-height: 112svh` pair (Chrome 87 drops the second) instead of an svh custom property inside
  `@supports`, and `--hero-h: 112vh` now only places the canvas splatters below the hero (pinned in px by story.js).
  `tools/share_images.py` steps JPEG quality down until each card fits 250 KB: share-1x1.jpg q82, 233 KB (others
  unchanged). The one remaining warning, no `source/story.md`, doesn't apply to this hand-built page.
- **Hero: the man and the woman (Mir, 2026-11-07):** the two figures from Anwar Sohel's feature illustration (the OG
  image) are a faint layer in the hero, under the sword, splatters and drips; all the hero's art and motion are unchanged.
  `tools/hero_figures.py` cuts them from `tools/src/feature-anwar-sohel.jpg`: silhouettes = dark or red-icon pixels,
  closed and hole-filled; the white ring erased where it crosses them (ellipse fitted to its arcs on the wall; each pixel
  copied from one icon row up or down, smooth inpaint in the windows' light); soft edges, the wall between hair strands
  transparent; black lifted to maroon so the shapes read on #080506, windows toned down (they sit behind the title), the
  foot faded. `img/hero-figures-640/960/1280.webp` (27/49/73 KB) + `-640.png` fallback. Drawn into `canvas.hero__fig`
  by story.js, fading in to .42: as an `<img>` or any CSS background (element, pseudo-element, full-cover) it became
  desktop LCP (1.2 s to 1.9 s at 1.6 Mbps, 4x CPU); the canvas keeps the headline as LCP (paired medians, 3 runs:
  desktop 1272 vs 1268 ms, phone 1188 vs 1280 ms). Portrait: full width (their faces are at the outer edges), top
  max(64px, 10.5%); landscape: right 3vw, top 13%, min(54vw, 102vh) wide. No JS: a `<noscript>` img. Save-Data: the 640
  file. Checked 320x568 to 2560x1300, tablets, rotation, reduced motion, no JS, 3x DPR: no console errors; lint only
  the two old errors. story.js `?v=20261107b`.
- **Scene 1 colours, copy, categories, related coverage (Mir, 2026-11-07):** scene 1 drug-related dots are now white
  and murder red (scene 2 keeps ta’zir red, qisas blue). `C.D`/`C.M` in story.js; the scene-2 tabs now read their own
  `--c-t/--c-q/--c-h`. The white legend key has a dark 1px edge (`.leg i.w`); the card’s “53.78 pc” can’t be white text
  on the white card, so it is white on the chart’s ground (`mark.k-d`). Copy (Mir’s wording): “Media reports reviewed by
  The Daily Star show lighter sentences for similar crimes in Saudi Arabia, whether the offender was a Saudi or foreign
  national.” (wordCount 2746). The categories panel is open from the start (`<details open>`, still closable), summary
  “More about these three categories of punishment: hudud, qisas and ta’zir.” The Amnesty illustration at the end is
  gone (files, sitemap image entry and `figure.wide` CSS removed); in its place, after the story’s last line, “Related
  coverage”: seven Daily Star stories on the case from Mir’s “news articles” folder, in Mir’s order, each card one link
  in a new tab (`.rel`; thumbnail, title, “Read article”). One column on phones, two from 960px with the odd seventh
  card full width (as in Mir’s reference, minus its stub line and source kicker, house rules). Thumbnails 320x320
  WebP + JPEG, lazy, from `tools/related_thumbs.py`; stories 1, 6 and 7 share one photo (`rel-nazrul`). Back-to-top
  hides over the cards. story.js `?v=20261107a`. Checked 320/360/768/1024/1440 in Chrome: no overflow, no console
  errors, scene 1 steps, tabs on Hudud. Lint: only the two errors already on the last commit.
- **Sections, chart, dek & scene 1 card 6 (Mir, 2026-11-01):** replaced "Confusions over allegations" with "Confusion
  over charges" and new copy (keeping Nazrul's Facebook figure in place); replaced "Saudi’s ‘war on drugs’" and "Killing
  foreign nationals" with "Was the trial fair?" and "Who gets executed in Saudi Arabia?" from `changes.docx` (all
  hyperlinks preserved; Amnesty International illustration kept at the end of "Who gets executed in Saudi Arabia?").
  Built the foreign vs. Saudi executions chart ("Foreign nationals make up over half of Saudi executions", from
  `chart_draft_for_reference.html`) natively in `#exc`/`#exp` (`js/story.js`, light card `#faf8f4`, interactive tooltip
  `#tip` and `.sr` table). Updated dek (`.dek` + JSON-LD `alternativeHeadline`) to "Saudi Arabia executed Nazrul and
  Sweety for a sexual offence which involved no force, no victim and no additional crime; its official execution record
  appears to have no precedent since at least 2005." Updated scene 1 card 6 to "Out of those, 13 cases involved rape
  (11) or sexual assault (2). In 7 of them, the accused also faced charges of murder, kidnapping or robbery." Removed
  unused `.stat` CSS and `Bebas Neue` `@font-face`.
- **Methodology: incest cases (Mir, 2026-10-31):** fact-check of "no precedent since at least 2005" found two SPA
  statements for zina with a mahram, no force/other crime/named victim: 1177064 (2013-12-10 Jazan, hadd) and
  1321206 (2015-01-27 Mahayil, ta'zir), both read in Arabic. Added as a paragraph + list after the fahisha examples;
  story copy unchanged (Mir). Mir kept "No other statement found described an execution for fahisha without force,
  a victim or another crime" (incest is itself a crime). Two more edits (Mir approved): the fahisha-examples lead-in
  now excepts the incest cases and names sorcery (SPA 6d81b1da29, 2012 Najran); the search paragraph lists the wider
  Arabic/English terms actually searched. Re-run: every 2021–2026 Arabic SPA item read (959 execution statements),
  2005–2020 by SPA's exact-phrase search (~80 AR/EN terms, 562 hits); no other case found. wordCount 2678.
- **Share images (Mir, 2026-10-31):** now crops of Amnesty International's illustration (the hero's blood could get the link
  flagged); `tools/share_images.py` uses Pillow only. The wide cards (share, 16x9) show the whole height, so the shirt
  on the floor with its faint red stain is in them; the 4x3 and 1x1 crop it out. og/twitter alt text matches the figure's alt.
- **Dek (Mir, 2026-10-31):** now "Saudi Arabia executed Nazrul and Sweety—two Bangladeshi migrant workers—for a sexual offence which involved no
  force, no victim and no additional crime. Its official execution record appears to have no precedent for this since
  at least 2005." (hero + JSON-LD alternativeHeadline). Shorter than the old dek, so the hero fit still holds.
- **Scene 1 key (Mir, 2026-10-31):** "Al-fahisha (Bangladeshis)" left the key on cards 2–4 (Nazrul and Sweety take
  the "other" colour there); on the 15 card they turn green beside the 13 amber; the last card's key shows both rows,
  amber dimmed. Methodology: "which is why this analysis says" (was "the story says").
- **Copy, type size, tap fix (Mir, 2026-10-31):** the intro's "However, a Daily Star analysis…" line is now three
  paragraphs ("However, the executions were highly unusual." / the 665-statement analysis / "Nazrul and Sweety are
  the only people…"); the 2012 case now reads "inside Medina’s Masjid al-Nabawī, considered to be the second-holiest
  site in Islam" (Mir's "Inside" lower-cased mid-sentence); two paragraphs from Seif Magango (OHCHR), name linked to
  his LinkedIn, after Abdul Bashar's quote. Body text (`.txt`) 19px → 18px; hero and scene cards unchanged (rem/vw).
  wordCount 2542. Meta/OG description still says "extremely unusual" (not asked to change). Fixed (pre-existing): on
  phones the empty strip under the last scene card (`.steps`, z-index 1, pulled up by the negative bottom margin)
  sat over the first ~40% of a screen of the next text and swallowed taps, e.g. "see Methodology Note" at 412 wide;
  `.steps,.step` now `pointer-events:none` (cards keep it) and `.txt` is `position:relative` so it paints above the
  section. Checked Chrome 6x CPU @320/360, 1x @412, reduced motion, 1440 desktop, WebKit @390: no overflow, both
  scenes step through, dialog/categories/methodology open, no console errors. perf.py 6x @360: worst frame 67 ms,
  0 long tasks, LCP 0.76 s; gates fail only doc_css_kb/dom (names list, as before).
- **Hero fits every screen (Mir, 2026-10-29):** with the four-line dek the byline fell below the fold on short
  screens (1280x600, 1366x625, phones held sideways, 320x480). Title is now capped at 12.5vh, the dek at
  2.7px + 2.8vh (floor .9rem), the gaps by vh; the top padding floor is 76px (was 104); under ~560px tall the bottom
  padding grows (max(4vh, 90px - 12vh)), as the hero's extra 12vh is below the fold. Each has an svh twin. Checked
  27 sizes from 320x460 to 2560x1300: byline on screen in all, no overlap with the logo; phones in portrait and
  tall desktops are unchanged. Share images re-shot (the 630px card now has a smaller title).
- **Copy (Mir, 2026-10-29):** scene 1 last card "no victims" → "no victim"; scene 2 card 2 gets a full stop; the
  SPA archive paragraph ends at "comparable offence." (the "an act of fahisha…" clause is cut). wordCount 2415.
- **Dek and credit (Mir, 2026-10-29):** dek (hero + JSON-LD alternativeHeadline) now "The execution of two
  Bangladeshis in Saudi Arabia raises legal and human rights concerns; no other official Saudi execution statement
  since 2005 appears to cite an act of “indecency” that involved no force, no victim and no other crime". It claims
  only what the statements say (not "no one else was executed"), hedged, in the story's own three conditions; an
  interim "a search … found no one … victimless" version was dropped (Mir: no "search"; "victimless" and "solely"
  were our labels). The old dek ("no Saudi or foreign nationals faced execution for … ‘indecency’ in the last 3
  years") was wrong on its face: Nazrul and Sweety are foreign nationals, and 13 others were executed for rape or
  sexual assault. Footer credits "Data Collection & Processing: Mir Rownak" and "Development: Mir Rownak, Abdullah
  Hel Bubun" (llms.txt matches). Share images re-shot; `tools/share_images.py` now sets the hero to one screen tall
  for the shot, since the four-line dek pushed the byline off the 1200x630 card.
- **SPA archive line (Mir, 2026-10-29):** one paragraph right after scene 1, before Duaa Dhainy: the three-year
  analysis vs a separate keyword search of SPA statements back to 2005, which found no other execution for fahisha
  with no force, victim or other crime. It replaced two longer paragraphs (after the 2015 Kaabah case) that also
  covered the "sanctity" wording; Mir cut those. Methodology's last paragraph leads with why a keyword search fits
  (fixed template, standard legal terms; every statement read, 2005 to 2026, followed one), then the one limit,
  tied to the dek's "appears to" (Mir: the earlier "may have been missed … not that no such case exists" read as
  undercutting the work). wordCount 2430. Reworded from Mir's draft: "since at least 2005" (the ministry's archive
  is only known to reach 2005), "combinations of Arabic keywords" in the story, "Boolean search ... combining
  Arabic keywords and exact phrases" in the note. "see Methodology Note" links to `#methodology`: story.js opens the
  `<details>` and jumps there instantly (Chrome 87 won't open it on a hash; the page's smooth scroll took >1 s over
  ~20,000 px), pushes a history entry so Back returns to the paragraph, and opens it on a shared `#methodology` URL.
  story.js `?v=20261029e`. The Methodology Note gained the search terms (Arabic in `lang="ar"` spans), eight linked comparison statements and the limits. Every
  linked SPA statement was read in the original Arabic. Left out of the source audit as wrong or unverified: the
  2014 "man and woman" case (SPA 1272080 was two men), "ينتهك الأعراض" as unique, the joint man-woman point, and
  its keyword filter (it lists قتل, which every death-sentence statement contains). `.meth__in` links now use the
  story's link style; list styles added. wordCount 1944 → 2415. No new glyphs (font subsets unchanged).
- **Copy round (Mir, 2026-10-29):** new intro paragraphs 2–3 (red marks on "‘fahisha’ or gross sexual indecency"
  and "sanctity of the time and place"; the press-release dialog now opens from the word "statement"). Dek drops
  "ever". Scene 1 now has 7 cards: card 4 reads "gross sexual misconduct or al-fahisha" (plain text, Mir; its two dots stay green), two new cards (15
  al-fahisha or sexual-offence cases; 13 of them rape or sexual assault), last card rewritten ("fahisha" green).
  The 15 card lights only those 15 figures in amber (`C.S` #f4b740; card text `k-s` #946400, 5.1:1), the 13 card
  dims Nazrul and Sweety. The 15 are the names-list rows whose offences say rape, sexual assault or "indecency"
  (D and the names list share one order). They form one run where the murder block meets the other block (2 murder,
  11 other, then Sweety and Nazrul; `slot()` in story.js), and the grid only takes a column count that keeps that run
  on one row (`run` in `grid()`; checked 320 to 1920 wide).
- **Credits (Mir, 2026-10-29):** byline "Reporting: Abdullah Hel Bubun, Tarek Hosen & Keero Adnan Ahmed", smaller
  (.72rem); Keero moved from JSON-LD contributor to author, added to meta author and article:author. Footer
  "Additional reporting" replaced by "Data Collection: Mir Rownak"; llms.txt and README credits match. Share images
  re-shot. Scene 2 card 2 lost its trailing comma.
- **Sweety is drawn as a woman:** `WOMAN` path (narrow shoulders, flared dress) for index `SWEETY` in both scenes. Legend green row is "Al-fahisha (Bangladeshis)". Duaa Dhainy's two paragraphs now follow
  scene 1. "hadd/ hudud" → "hudud"; "hadd (singular of hudud) crime"; "according to this analysis." A
  "Methodology Note" disclosure (`details.meth`, no JS) sits between the names band and the footer.
  JSON-LD wordCount updated; story.js cache key `?v=20261029b`.
- **Sweety's icon (fixed):** on the last scene-1 card the dimmed figures drawn after her index painted over her
  large icon; the named figures (`L.C`) now paint last.
- **Share description (Mir, 2026-10-29):** meta/OG/Twitter/JSON-LD description and llms.txt now read "A Daily Star
  analysis of 665 Saudi government execution statements between January 2024 and 20 October 2026 reveals that the
  execution of Nazrul and Sweety was extremely unusual." (the old sentence no longer matched the copy).
- **Production (2026-10-28):** OG/share images are screenshots of the hero; published 2026-10-31; keywords,
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
