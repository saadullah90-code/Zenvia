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
To align a foreground PNG perfectly inside a backdrop PNG (tooth inside a liquid splash), put BOTH in the same fixed viewport-centered box (`fixed inset-0 flex items-center justify-center` → sized relative box). The backdrop is `absolute inset-0`; the moving object sits in an inner absolutely-centered node that GSAP transforms. On scroll, fade the backdrop out (it belongs to the hero) via its own scrub trigger while the object travels. This guarantees pixel-alignment without guesswork. Keep it desktop-only (`hidden md:flex`) and render a static composited copy in the hero flow for mobile.
