---
name: podbean-brand
description: "Podbean's official brand primary color and the derived accent palette used on the reviews page"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 78b42873-a58d-421a-a9fb-45dd068c39af
  modified: 2026-09-03T08:15:02.644Z
---

Podbean's brand primary color is **#428200** (green). The user stated this directly on 2026-09-03 when reviewing the Podbean Reviews page.

Palette derived for the single-file HTML page:
- `--brand:#428200` (primary — buttons, links, active nav, stars, focus ring)
- `--brand-deep:#356a00` (hover / gradient deep stop)
- `--brand-bright:#8bc53e` (accent on the dark numbers band, lighter gradient stops)
- `--brand-pale:#eaf3dc` (light green wash; ::selection uses #cfe3ad)
- Neutral scaffold stays warm/clean: ink `#1b1815`, ink-soft `#57504a`, cream band `#f8f5f1`, hairline `#ebe6df`, white cards.

**Why:** user corrected the page, which had been using a coral-red accent (#f0452c), to the actual Podbean brand green.
**How to apply:** any future Podbean-branded UI in this project should use #428200 as the accent, not coral/red. Avatar/logo gradients use green-family stops (e.g. #79b51e→#428200, #8bc53e→#4d940f, #5aa114→#2f5c00).
