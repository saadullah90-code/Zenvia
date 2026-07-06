---
name: Zenvia hero stacking + mobile overlap
description: Why the hero tooth/card layering is split into three sibling layers, and the HMR-restart gotcha that masked the fix.
---

# Hero stacking: fixed tooth vs. hero card

**Rule:** In the Zenvia hero, the traveling tooth+splash, the hero backdrop
(gradient + glow blob + giant "Smile Matters" serif), and the hero content
(info card + stats) must be THREE SEPARATE SIBLING layers directly under the
page root (`mainRef`), ordered by explicit z-index:
`backdrop z=1  <  fixed tooth z=10  <  hero <section> z=20  <  navbar z=50`.

**Why:** The hero `<section>` forms its own stacking context. When the info card
was nested inside that section, NO z-index on the card or its container could
raise it above the sibling `position: fixed` tooth — even an inline `zIndex:9999`
on the container failed while trapped in the section. On short/narrow viewports
(e.g. 320x720) the tooth+splash then painted OVER the card and made copy
unreadable. The card can only beat the tooth when it lives in a sibling layer of
the tooth with a higher z-index, not nested under a stacking-context parent.

**How to apply:** Any future hero edit must keep this sibling z-ladder. Put
anything that should sit BEHIND the tooth (backgrounds, decorative serif) in the
low backdrop layer; keep the tooth `fixed z=10` (it must stay above all later,
default/auto-z content sections as it travels down the page); keep readable
content in the transparent `z=20` section (only opaque descendants like the
mobile-opaque `.hero-info-card` and glass stat cards occlude the tooth, which is
intended). Do NOT re-nest the hero card under a new stacking context.

**Related:** the mobile `.hero-info-card` is made fully opaque (solid white,
`backdrop-filter: none`) under 767px so the tooth directly behind it never bleeds
through the copy.

# Vite HMR does not reliably apply structural JSX changes here

**Symptom:** After moving JSX nodes / changing layer structure in `Home.tsx`,
screenshots kept showing the OLD layout — several verification passes were wasted
chasing a "bug" that was already fixed in source.

**Why:** HMR patched styles but not the restructured tree; the running app was
stale.

**How to apply:** After any structural change to `Home.tsx` (moving/reparenting
nodes, changing the layer/stacking structure), RESTART the workflow
(`artifacts/dental-clinic: web`) before screenshotting to verify. Do not trust a
screenshot that looks identical to the pre-edit state — restart first.
