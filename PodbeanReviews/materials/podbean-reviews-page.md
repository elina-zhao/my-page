---
name: podbean-reviews-page
description: Scope and constraints for the PodbeanReviews deliverable — a Podbean platform testimonials page
metadata: 
  node_type: memory
  type: project
  originSessionId: 78b42873-a58d-421a-a9fb-45dd068c39af
  modified: 2026-09-03T08:25:29.685Z
---

Building a **Podbean platform reviews/testimonials page** (not a per-podcast rating page). Scope was locked with the user on 2026-09-03 after they supplied the buzzsprout.com/reviews source: content architecture mirrors that page, but the visual form is Podbean's own style ("内容相似但是形式不同，要符合podbean的风格").

Deliverable: a single self-contained HTML file (`podbean-reviews.html`) at the outputs folder. Copy is in English. All quotes, names, ratings, and numbers are **sample placeholders** and must be replaced before publishing (noted in an HTML comment at the top of the file).

Page sections: sticky header mirroring podbean.com's real top nav (Podcasting / Resources / Discover mega-menus, Advertisers / Enterprise / Pricing links, Log in / "Sign up free") → hero ("Podcasters love Podbean." + trust chips) → 3 featured testimonial cards with overlapping monogram artwork → Trustpilot "4.7/5" rating band → two-column review wall with <mark> highlights → three X (Twitter) posts → dark stats/numbers band → final CTA → footer. Brand accent is Podbean green #428200 (see podbean-brand.md). Header behavior is CSS/JS-only (hover/focus mega-menus, hamburger panel) since the file must stay self-contained — no Bootstrap.

On 2026-09-03 the user asked to align the header's structure/content with the top nav of their prototype `~/Code/Initial/index.html` while keeping the page's light header ("结构和内容对齐，保留浅色页头"). Done: nav menu groups already matched; the change was swapping the search-toggle+popout bar for an inline search input (`.h-search`) between the nav and the CTA, matching the prototype's `.lp-search`. Light sticky background, dark links, green #428200 accent, real podbean.com hrefs and the mobile `<details>` menu were all retained.

**Why:** user first asked to look at buzzsprout.com/reviews as a reference; an initial per-podcast page was rejected as the wrong scope.
**How to apply:** keep this page Podbean-branded and Buzzsprout-structured; if asked to extend or rebuild, keep the same section set and single-file format unless the user says otherwise.
