---
name: Persistent scroll-driven hero object (traveling tooth)
description: How to make one fixed hero object travel the whole page on scroll without jank, and the two traps that cause it.
---

A single "hero object" (here a transparent tooth PNG) is `position: fixed`, `pointer-events-none`, high z-index, centered, and animated across the whole page by scroll to guide the eye hero→footer.

## Rule: anchor motion to sections, not to global timeline fractions
Do NOT drive it with one master timeline keyed to hardcoded progress fractions (0, 0.25, 0.5 …) over the whole container. A pinned section (e.g. a Showcase with `end: '+=150%'`) adds scroll length in the middle, so fixed fractions desync from the sections they were meant to match, and beats drift during the pin.
Instead give each section its own scrub ScrollTrigger `{ trigger: '#section', start: 'top bottom', end: 'top top', scrub: 1 }` that tweens the object to that section's target `{x,y,scale,rotate}`. Each `.to` starts from the previous end state, so motion stays continuous and is inherently robust to pin spacing. Handle the pinned section with its own two triggers (travel-in on `top bottom→top top`, then keep-alive rotate/scale on `top top→+=150%`).
**Why:** architect flagged the fraction-based version as brittle/janky against the pin; section-anchored waypoints fixed it.

## Trap: GSAP and Framer Motion fighting over `transform`
If GSAP animates `x/y/scale/rotate` on the SAME node Framer Motion drives via `style={{ rotateX, rotateY }}`, they both write the `transform` property and fight per frame. Split into two nested nodes: outer plain `<div>` = GSAP-only (ref it for scroll transforms), inner `<motion.div>` = Framer tilt, innermost `<motion.div>` = idle float loop.

## Cleanup
`gsap.matchMedia()` created inside a `gsap.context` is NOT reverted by `ctx.revert()` — keep the `mm` handle and call `mm.revert()` (before `ctx.revert()`) in the effect cleanup, or media listeners accumulate across mounts.

## Angle morphs
Crossfade between 2–3 angle PNGs with `ScrollTrigger.create({ trigger, start:'top center', onEnter/onLeaveBack })` toggling opacity — cleaner than baking opacity beats into the scrub timeline.

## When there is NO pinned section, a single global scrub timeline is fine
The section-anchored rule above exists to survive a pinned section. Once the pin is removed (e.g. hero has no pinned Showcase), one global timeline `{ trigger: main, start:'top top', end:'bottom bottom', scrub:1, invalidateOnRefresh:true }` with sequential `.to()` waypoints is simpler and robust. Use function-based values (`y: () => window.innerHeight * 0.3`) + `invalidateOnRefresh` so positions recompute on resize.

## "Travel DOWN" must be a monotonic y increase, not sway around center
A fixed, viewport-centered object with only tiny ±y offsets reads as side-to-side drift, NOT descent — architect will flag this as failing a "tooth comes down on scroll" requirement. Make `y` increase monotonically across the timeline (e.g. 0 → 0.12vh → 0.22 → 0.30 → 0.36) with horizontal sway as the SECONDARY motion.

## Compositing a hero object inside a backdrop (tooth-in-splash)
To align a foreground PNG perfectly inside a backdrop PNG (tooth inside a liquid splash), put BOTH in the same fixed viewport-centered box (`fixed inset-0 flex items-center justify-center` → sized relative box). The backdrop is `absolute inset-0`; the moving object sits in an inner absolutely-centered node that GSAP transforms. On scroll, fade the backdrop out (it belongs to the hero) via its own scrub trigger while the object travels. This guarantees pixel-alignment without guesswork.

## The fixed traveling tooth is DESKTOP-ONLY; mobile is a clean in-flow stack
Gate the fixed/traveling tooth + splash-fade to desktop with
`gsap.matchMedia('(min-width:768px)')`, and make the fixed splash layer, fixed
tooth layer, and giant backdrop heading `hidden md:flex`. On MOBILE render an
`md:hidden` IN-FLOW block at the TOP of the hero holding the giant "SMILE MATTERS"
heading FIRST (visible fade-in), then the splash + tooth below it, then (in normal
document flow) the appointment card, then the stats. The in-flow hero tooth is the STACKED
CENTERPIECE only — it does the intro (splash-pop + tooth-drop + idle-tilt) and scrolls
away naturally; it does NOT itself travel on scroll. An in-flow node just scrolls up
with the hero, so it can NEVER look like it "comes down" — that was the repeated user
complaint. To get visible DOWNWARD travel on mobile like desktop WITHOUT covering the
appointment card, use a SEPARATE mobile-only FIXED traveling-tooth layer (below the
navbar, pointer-events-none): keep it invisible over the hero (so it never covers the
card — the exact thing the user rejected), FADE it in as the hero scrolls out, then
scrub it downward + rotate across the page. The in-flow hero tooth is off-screen by
the time the fixed one fades in, so there is never a double tooth. Keep GSAP scroll
transforms, Framer intro drop, and Framer idle wobble on separate nodes (one transform
author per node).
**Why:** a `position:fixed` tooth that travels over every section floats ON TOP of
the appointment card on small screens (covering the copy) and its x-transform can
push the page right. An interim attempt ran the SAME fixed traveling animation on
ALL devices (nudging the group up + shrinking the heading); the user REJECTED it
because the tooth still overlapped the appointment card. Durable rule: fixed
traveling object = DESKTOP; MOBILE = in-flow stacked composition with the card
BELOW it. The user also wants the splash BEHIND the cards on DESKTOP ONLY (on
mobile the in-flow splash is simply part of the top group, never behind the card).
