---
name: Zenvia hero stacking + mobile overlap
description: Desktop hero = four fixed/sibling layers (splash behind cards, tooth on top); mobile = clean in-flow stack (heading+splash+tooth then card/stats). Plus the HMR-restart gotcha that masked the fix.
---

# Hero stacking: splash BEHIND cards, tooth ON TOP of content

**Rule:** The splash and the tooth are now TWO SEPARATE fixed layers (split so the
splash can sit BEHIND the cards while the tooth stays on top). Together with the
backdrop and the content there are FOUR sibling layers directly under the page
root (`mainRef`), ordered by explicit z-index:
`backdrop z=1  <  fixed splash z=10  <  hero <section> z=20  <  fixed tooth z=30  <  navbar z=50`.
The giant "Smile Matters" serif lives even lower in the `z=1` backdrop. The splash
is a `fixed inset-0 z-10 pointer-events-none overflow-hidden` layer (pops up on
load, fades on scroll); the tooth is a `fixed inset-0 z-30 pointer-events-none
overflow-hidden` layer on top. BOTH use the SAME centered box
(`w-[72vw] max-w-[300px] sm:360 md:420 lg:480 aspect-square`, `flex items-center
justify-center`) so the tooth stays pixel-centered inside the splash.
**Why split the splash to z=10 (behind cards):** the user explicitly asked to put
the splash behind the cards; separating it from the tooth's z=30 layer is the only
way (they were one unit before). The tooth stays z=30 on top so it remains visible
over the opaque content the whole scroll.

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

**DESKTOP-ONLY fixed tooth; MOBILE is an in-flow stack.** The four-layer fixed
stacking above applies to DESKTOP (`min-width:768px`) ONLY — the fixed splash
layer, the fixed tooth layer, and the giant backdrop heading are all
`hidden md:flex`, and the GSAP travel is gated via
`gsap.matchMedia('(min-width:768px)')`. On MOBILE the hero is a clean vertical
stack: an `md:hidden` in-flow block at the top holds the giant "SMILE MATTERS"
heading + splash + tooth centered as one group, then the appointment card, then
stats — nothing overlaps. See `persistent-scroll-tooth.md`.
**Why:** the fixed traveling tooth covered the mobile appointment card. An interim
"same animation on all devices" attempt (nudging the group up + shrinking the
heading) STILL overlapped the card, so the user reverted to desktop-only fixed /
mobile in-flow. The user also wants the splash BEHIND the cards on DESKTOP only.

**Mobile right-shift (why the fixed tooth is desktop-only):** A `position:fixed`
element escapes `body` overflow clipping, so a traveling tooth's GSAP x-transform
created horizontal scroll that shifted the whole page RIGHT on mobile. Keeping the
fixed tooth DESKTOP-only removes this on mobile (the mobile tooth is in-flow).
Belt-and-suspenders guards remain for all breakpoints: `overflow-hidden` on the
(desktop) fixed layers, a global `html, body, #root { max-width:100%;
overflow-x:hidden }`, `overflow-x-hidden` on the page root, and hardened `.input`
fields (`max-width:100%; min-width:0; box-sizing:border-box`) so the Contact form
never overflows.

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
