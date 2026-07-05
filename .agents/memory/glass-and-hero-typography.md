---
name: Zenvia glass system & hero serif backdrop
description: How the site-wide glassmorphism and the hero background typography are built, and the transform-authority rule that keeps GSAP/Framer/CSS from fighting.
---

# Glassmorphism (`.glass-card` / `.glass-hover`)

- `.glass-card` sheen is folded INTO the `background` shorthand as a top gradient layer, NOT a `::before` overlay.
  **Why:** an earlier `.glass-card > * { position: relative }` rule (needed to lift content above a `::before`) silently overrode `position: absolute` on direct children (e.g. an absolutely-positioned quote icon). Folding the sheen into `background` removes the need for that child rule entirely.
- Glass reads poorly on pure white (white-ish frost on white + white border = invisible edge). Sections that host glass cards use the light-blue `bg-background`, not `bg-white`, so the frost has something to sit on.
- Hero info card only: a `@media (max-width: 767px)` `.hero-info-card` override makes it near-opaque on mobile, because the fixed tooth's splash sits directly behind it there and bleeds through translucent glass, hurting copy readability. Desktop keeps it translucent (card sits clear of the tooth).

# Transform authority (single-author rule)

- On Framer motion cards, the hover LIFT is `whileHover={{ y: -6 }}` (Framer). `.glass-hover` animates ONLY box-shadow/glow — its old `transform: translateY` was inert anyway because Framer's inline transform wins after `whileInView`.
  **Why:** having both CSS and Framer try to own `transform` is ambiguous and the CSS one never applied. One author per property = deterministic.
- Same principle as the tooth: GSAP owns scroll transforms on the outer node, Framer owns intro/tilt on inner nodes, and the splash's Framer pop (wrapper) is split from its GSAP scroll-fade (inner `img`).

# Hero background typography

- Giant serif "Smile Matters" (Playfair Display, loaded in `index.html`) is an absolutely-positioned `h1` at `z-0` behind the fixed tooth, using `text-transparent bg-clip-text` blue gradient. Card + stats sit at `z-40` above the tooth.
- Sized in `vw` and root/body are `overflow-x-hidden`, so the oversized letters bleed off-edge without causing horizontal scroll.
