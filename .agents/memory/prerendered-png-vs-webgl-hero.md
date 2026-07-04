---
name: Prefer pre-rendered animated PNG over custom WebGL for hero centerpieces
description: On the react-vite + Framer/GSAP stack, a transparent glossy PNG animated with CSS/Framer/GSAP beats hand-rolled Three.js hero objects.
---

# Pre-rendered PNG hero centerpiece over WebGL

For "3D-looking" hero centerpieces (e.g. a glossy tooth), a pre-rendered
transparent PNG animated with Framer Motion (float, mouse parallax via
`useTransform` on `rotateX/rotateY`) + GSAP ScrollTrigger scrubs (translate,
scale, rotate) looks far more premium and is far more reliable than a custom
Three.js/@react-three object.

**Why:** A hand-rolled WebGL tooth on this stack rendered as a tiny broken cube
and added heavy deps for little payoff. The PNG approach gives full art
direction control, no WebGL/version-compat headaches, and buttery scroll motion.

**How to apply:** Generate a high-quality transparent PNG, then drive all motion
with CSS/Framer/GSAP. Do NOT reintroduce `three` / `@react-three/fiber` /
`@react-three/drei` here — they were deliberately removed.
