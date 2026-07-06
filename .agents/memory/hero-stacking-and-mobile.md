---
name: Zenvia hero stacking + mobile overlap
description: Why the hero tooth/card layering is split into three sibling layers, and the HMR-restart gotcha that masked the fix.
---

# Hero stacking: fixed tooth is the TOP visual layer (above content)

**Rule:** In the Zenvia hero, the traveling tooth+splash, the hero backdrop
(gradient + glow blob + giant "Smile Matters" serif), and the hero content
(info card + stats) are THREE SEPARATE SIBLING layers directly under the page
root (`mainRef`), ordered by explicit z-index:
`backdrop z=1  <  hero <section> z=20  <  fixed tooth z=30  <  navbar z=50`.
The fixed tooth container is also `pointer-events-none overflow-hidden` and
anchored to an upper-center lane (`items-start` + responsive top padding).

**Why (tooth on TOP, not behind the card):** The user's overriding requirement
is that the tooth stays CLEARLY VISIBLE the entire scroll. Content sections use
an OPAQUE `bg-background`, so a tooth placed *behind* them would be completely
hidden — reintroducing the exact "tooth not fully visible" complaint. Therefore
the tooth must be the top visual layer (only the `z-50` navbar sits above it).
Because the container is `pointer-events-none`, sitting on top never blocks
clicks on the content underneath; overlap is purely visual and matches the
pre-existing, user-endorsed "traveling tooth over content" design.

**Why sibling layers (not nesting):** The hero `<section>` forms its own
stacking context. Nesting decorative/background nodes that must sit BEHIND the
tooth inside that section would trap them — no z-index could push them below the
sibling fixed tooth. Keep backgrounds in the low `z=1` backdrop layer, keep
readable content in the `z=20` section, keep the tooth as a top-level sibling.

**DESKTOP-ONLY: the fixed tooth is not the whole story.** The three-sibling
stacking + "tooth on top" rule above applies to DESKTOP (`min-width:768px`)
ONLY. On MOBILE the fixed traveling tooth is removed entirely (`hidden md:flex`
on the container + GSAP gated via `mm.add('(min-width:768px)', ...)`), because a
fixed tooth that floats over every section covers the appointment card copy and
the contact form on small screens, and its x-transform caused a page right-shift
(see below). On mobile the tooth is instead an `md:hidden` IN-FLOW element at the
top of the hero (still with the splash-pop + tooth-drop + idle-tilt intro), so
the hero reads as a clean vertical stack: tooth+splash → appointment card →
stats, with nothing overlapping. Do NOT reintroduce a fixed traveling tooth on
mobile.
**Why:** user was explicit that the mobile hero must be a clean stack with no
floating-over-content and no horizontal shift; the older "same fixed animation
on mobile too" approach was the exact cause of the overlap and right-shift.

**Mobile right-shift (root cause of making it desktop-only):** A `position:
fixed` element escapes `body` overflow clipping, so the tooth's GSAP x-transform
created horizontal scroll that shifted the whole page RIGHT on mobile. Making the
fixed tooth desktop-only removes this on mobile; belt-and-suspenders guards
remain for all breakpoints: `overflow-hidden` on the (desktop) fixed tooth
container, a global guard `html, body, #root { max-width:100%; overflow-x:hidden
}`, `overflow-x-hidden` on the page root, and hardened `.input` fields
(`max-width:100%; min-width:0; box-sizing:border-box`) so the Contact form never
overflows.

**Related:** the mobile `.hero-info-card` is kept fully opaque (solid white,
`backdrop-filter: none`) under 767px for maximum legibility in the stacked hero.

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
