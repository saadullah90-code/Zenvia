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
