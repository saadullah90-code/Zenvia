# Zenvia Website

A premium, fully-animated single-page marketing website for the "Zenvia" dental clinic — a bright, glossy medical aesthetic on a light-blue theme, with a glossy 3D-style molar tooth composited inside a royal-blue liquid splash in the hero, giant serif "Smile Matters" background typography centered behind the tooth, a persistent tooth that on DESKTOP travels down the page and rotates back to fully upright by the footer, while on MOBILE the giant heading sits FIRST with the splash+tooth below it, then the appointment card and stats stacked cleanly below (nothing overlaps), site-wide premium glassmorphism cards, scroll-triggered reveals, and buttery Lenis smooth scrolling. All CTAs are a blue "sparkle" pill button.

## Run & Operate

- `pnpm --filter @workspace/dental-clinic run dev` — run the site (workflow `artifacts/dental-clinic: web`)
- `pnpm --filter @workspace/dental-clinic run typecheck` — typecheck the site (use this, NOT `build`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages (needs workflow-provided PORT/BASE_PATH)
- Vercel deploy: root `vercel.json` builds the site (`pnpm --filter @workspace/dental-clinic run build`, output `artifacts/dental-clinic/dist/public`, SPA rewrite). `vite.config.ts` is env-tolerant (port defaults 5173, `BASE_PATH` defaults `/`) so `vite build` works without the workflow env. Keep `BASE_PATH=/` for Vercel (root hosting).

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9, Vite + React
- Animation: GSAP (+ ScrollTrigger), Framer Motion, Lenis smooth scroll
- Styling: Tailwind v4 (no config file; theme via `@theme inline` + `:root` tokens in `src/index.css`)
- Font: Manrope (heading 800, body 500) + Playfair Display (serif, hero background typography) via Google Fonts link in `index.html`

## Where things live

- `artifacts/dental-clinic/` — the "Zenvia" single-page marketing site (react-vite, slug `@workspace/dental-clinic`, previewPath `/`, no backend).
  - `src/pages/Home.tsx` — page shell: hero, the persistent traveling+rotating-tooth scroll system (DESKTOP only — the GSAP travel is gated via `gsap.matchMedia('(min-width:768px)')`; splash and tooth are two separate fixed layers so the splash sits BEHIND the cards at z-10 and the tooth stays on top at z-30; both fixed layers + the giant backdrop heading are `hidden md:flex`), plus an `md:hidden` in-flow MOBILE hero block (giant heading FIRST, then splash + tooth below it, then card + stats), Lenis + GSAP ticker, deterministic load-at-top, and section ordering.
  - `src/components/` — one file per section: Navbar, Preloader, Marquee, About, Problems, Braces, Treatments, Testimonials, FAQ, Contact, Footer, plus `SparkleButton.tsx` (reusable blue sparkle CTA).
  - `src/index.css` — light theme HSL tokens (light-blue background, `primary` blue ~#14a0e6, `accent` also blue `221 83% 53%` — NO orange), Manrope, `--font-serif`/`.font-serif-display`, premium `.glass-card` (multi-layer bg with folded-in sheen, blur+saturate) + `.glass-hover` (glow only — lift is Framer's), `.hero-info-card` mobile-opaque override, marquee/shadow utilities, and `.sparkle-btn` (+ `--sm`/`--lg`) blue-gradient button styles.
  - `public/` — `tooth-hero.png` (glossy white molar, transparent), `splash-blue.png` (royal-blue liquid splash, transparent), `braces.png`, plus stock JPGs (clinic-interior, patient-smiling, dentist-portrait, healthy-smile, teeth-cleaning).

## Architecture decisions

- No Three.js / WebGL. The hero centerpiece is a pre-rendered transparent glossy tooth PNG composited inside a transparent splash PNG, animated with GSAP + Framer Motion (simpler, lighter, no react-three version pitfalls).
- Hero splash and tooth on DESKTOP are TWO separate fixed layers that share the SAME centered box (`w-[72vw] max-w-[300px] sm:360 md:420 lg:480 aspect-square`, `flex items-center justify-center`) so the tooth stays pixel-centered inside the splash. The SPLASH is a `fixed z-10` layer BEHIND the cards (above the `z-1` backdrop, below the `z-20` hero content); the TOOTH is a `fixed z-30 pointer-events-none overflow-hidden` layer ON TOP of the content (below only the `z-50` navbar). On load the splash POPS up from behind (Framer spring) and the tooth DROPS in from the top (Framer, gated on `!loading`); on scroll the splash fades out while the tooth travels DOWN the viewport (monotonically increasing `y`) with horizontal sway and rotates (0→360deg), driven by a single scrubbed GSAP timeline gated to `min-width:768px` via `gsap.matchMedia`. Both fixed layers + the giant backdrop heading are `hidden md:flex`. On MOBILE (`<768px`) there is NO fixed/traveling tooth: an `md:hidden` in-flow block at the TOP of the hero renders the giant "SMILE MATTERS" heading FIRST (visible, fade-in, stronger primary gradient), then the splash + tooth below it (splash-pop + tooth-drop + idle-tilt intro), then the appointment card, then stats — a clean vertical stack with nothing overlapping. See `.agents/memory/persistent-scroll-tooth.md` and `.agents/memory/hero-stacking-and-mobile.md`.
- GSAP scroll transforms and Framer intro/tilt/idle motion live on separate nested nodes to avoid fighting over the CSS `transform` property (GSAP on `toothOuter`, Framer drop/tilt on inner `motion.div`s). Same rule for cards: the hover LIFT is Framer `whileHover={{ y: -6 }}` while `.glass-hover` animates only the shadow/glow — one transform author per node. The splash pop (Framer wrapper) is split from its scroll-fade (GSAP on the inner `img`) so opacity/transform never conflict; the splash fades out/in smoothly on scroll.
- DESKTOP hero z-layering is FOUR sibling layers under the page root (NOT nested), ordered `backdrop z=1 < fixed splash z=10 < hero <section> z=20 < fixed tooth z=30 < navbar z=50`: a `zIndex:1` backdrop (gradient + glow blob + giant centered "Smile Matters" serif), the `z=10` fixed splash (BEHIND the cards), the transparent `zIndex:20` hero `<section>` (info card + stats), and the `zIndex:30` fixed tooth ON TOP. The tooth must be the top visual layer (not behind the card/content) because every content section is opaque — a tooth placed behind them would be fully hidden, breaking the "tooth stays visible throughout scroll" requirement; `pointer-events-none` keeps clicks working underneath. The splash was split into its own `z=10` layer specifically so it can sit BEHIND the cards (user request) while the tooth stays on top. Backgrounds that must sit BEHIND the tooth go in the `z=1` backdrop (a node nested in the `z=20` section forms its own stacking context and can't be pushed below the sibling fixed tooth). On MOBILE these fixed layers + the giant backdrop heading are hidden (`hidden md:flex`); the hero is instead an in-flow vertical stack inside the `z=20` section, so there is no over-content overlap to reason about. See `.agents/memory/hero-stacking-and-mobile.md`.
- Mobile right-shift guard: a `position:fixed` tooth with a GSAP x-transform escapes body overflow clipping and can create horizontal scroll that shifts the page right on mobile — which is the main reason the fixed traveling tooth is DESKTOP-only (on mobile the tooth is in-flow, so it can't shift the page). Belt-and-suspenders guards remain for all breakpoints: a global `html, body, #root { max-width:100%; overflow-x:hidden }` in `index.css`, `overflow-x-hidden` on the page root, `overflow-hidden` on the (desktop) fixed layers, and hardened `.input` fields (`max-width:100%; min-width:0; box-sizing:border-box`) so the Contact form never overflows on small screens.
- `.glass-card` is a premium liquid-glass treatment (multi-layer specular corner highlight + top-right cool reflection + top glare band over a frosted base, blur+saturate, layered inset+drop shadows); every card site-wide uses it, so the effect propagates from one CSS rule.
- The scroll tooth ends its journey rotated to 360deg (fully upright, x:0) at the footer, so it visually returns to its original starting orientation.
- Section hero PNGs (e.g. the Braces `braces.png`) are shown FRAMELESS — the transparent PNG floats directly (glow + drop-shadow, continuous Framer float/rotate idle + `whileInView` entrance), NOT boxed inside a `.glass-card`, matching the hero tooth's animated feel. Keep the entrance transform on the parent `motion.div` and the idle float on the `motion.img` (one transform author per node).
- Glassmorphism reads poorly on pure white, so card-hosting sections use the light-blue `bg-background` (not `bg-white`); the glass sheen is folded into the `background` shorthand (no `::before`) so it never overrides `position:absolute` on children.
- Lenis smooth scroll driven by the GSAP ticker; manual `scrollRestoration` + `scrollTo(0,0)` guarantees the page loads at hero top.

## Product

A premium, fully-animated one-page site for the fictional "Zenvia" clinic. Hero: light-blue background, huge two-tone "EVERY SMILE MATTERS" headline, glossy molar in a blue splash, a left white info card (description + "We're Open 10:00 AM – 07:00 PM" + blue sparkle Book Appointment button), and right-side stats (150+ Expert Dentists, 20+ Dental Clinics across UK, 03+ Countries). Then a scrolling marquee, About/Our Vision, Problems-with-Solutions, Braces, Treatments/Services, Testimonials, FAQ, and Contact. Purely presentational — no backend, forms are non-submitting UI. The Preloader is a "tooth being formed" animation (bottom-up clipPath fill + self-drawing outline + "Zenvia" wordmark).

## User preferences

- No emojis anywhere in the site.
- Keep the Footer "Developed by BranX" glow credit.
- Aim for $10k / Awwwards-caliber quality: heavy, polished, continuous scroll animation; treat the whole page as one continuous story, not stacked sections.
- No Three.js / WebGL for the hero — use the pre-rendered PNG approach.
- Font must be Manrope (heading 800, body 500). Colors: primary blue ~#14a0e6 — NO orange anywhere; all CTAs use the blue sparkle button (`SparkleButton` / `.sparkle-btn`).
- Brand name is "Zenvia" (two-tone "Zen"/"via" wordmark).
- Hero intro animations (splash pop, tooth drop, rest tilt) run on mobile too, not just desktop. BUT the fixed scroll-travel tooth is DESKTOP-only: on mobile the user wants a clean STACKED hero — the "SMILE MATTERS" heading + splash + tooth centered as one group in the middle-top, then the appointment card, then stats, with nothing floating over/covering content and no horizontal shift. The splash sits BEHIND the cards on DESKTOP only (never on mobile). (The user reversed an interim "same animation on all devices" attempt because the fixed tooth covered the mobile appointment card.)

## Gotchas

- Transparent PNGs (tooth, splash) must have a real alpha channel. Generate renders on FLAT WHITE (no gradient/bokeh/floor shadow) then remove the background; dark/bokeh backgrounds can't be keyed and leave a visible box. Verify with `identify -format '%[channels] %[pixel:p{2,2}]' file.png` (want `srgba` + `srgba(0,0,0,0)`). The image viewer renders transparent on white, so it can't confirm transparency — use `identify` or a screenshot over a colored page.
- The Preloader overlays the page for ~0.5s on load, so screenshots taken immediately after a restart catch it mid-animation. To verify the hero, temporarily set `useState(false)` for `loading` in `Home.tsx`, screenshot, then restore `useState(true)`.
- Vite HMR does NOT reliably apply STRUCTURAL JSX changes in `Home.tsx` (moving/reparenting nodes, layer/stacking changes) — the running app stays stale and screenshots look unchanged. Always RESTART the workflow (`artifacts/dental-clinic: web`) before screenshotting to verify a structural edit.
- `.sparkle-btn` sets `display:inline-flex`, which overrides Tailwind's `hidden` (`display:none`) due to CSS source order. To hide a SparkleButton responsively, toggle visibility on a WRAPPER (e.g. `<div className="hidden lg:block">`), NOT via `hidden lg:inline-flex` on the button itself.
- No emojis anywhere in this site (explicit user preference).
- Keep the Footer "Developed by BranX" glow credit.
- Verify with `pnpm --filter @workspace/dental-clinic run typecheck`, not `build` (build needs workflow-provided PORT/BASE_PATH).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
