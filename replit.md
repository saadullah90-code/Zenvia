# Zenvia Website

A premium, fully-animated single-page marketing website for the "Zenvia" dental clinic — a bright, glossy medical aesthetic on a light-blue theme, with a glossy 3D-style molar tooth composited inside a royal-blue liquid splash in the hero, giant serif "Smile Matters" background typography behind the tooth, a persistent tooth that travels down the page and rotates back to fully upright by the footer, site-wide premium glassmorphism cards, scroll-triggered reveals, and buttery Lenis smooth scrolling. All CTAs are a blue "sparkle" pill button.

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
  - `src/pages/Home.tsx` — page shell: hero, the persistent traveling+rotating-tooth scroll system (runs on BOTH desktop and mobile), Lenis + GSAP ticker, deterministic load-at-top, and section ordering.
  - `src/components/` — one file per section: Navbar, Preloader, Marquee, About, Problems, Braces, Treatments, Testimonials, FAQ, Contact, Footer, plus `SparkleButton.tsx` (reusable blue sparkle CTA).
  - `src/index.css` — light theme HSL tokens (light-blue background, `primary` blue ~#14a0e6, `accent` also blue `221 83% 53%` — NO orange), Manrope, `--font-serif`/`.font-serif-display`, premium `.glass-card` (multi-layer bg with folded-in sheen, blur+saturate) + `.glass-hover` (glow only — lift is Framer's), `.hero-info-card` mobile-opaque override, marquee/shadow utilities, and `.sparkle-btn` (+ `--sm`/`--lg`) blue-gradient button styles.
  - `public/` — `tooth-hero.png` (glossy white molar, transparent), `splash-blue.png` (royal-blue liquid splash, transparent), `braces.png`, plus stock JPGs (clinic-interior, patient-smiling, dentist-portrait, healthy-smile, teeth-cleaning).

## Architecture decisions

- No Three.js / WebGL. The hero centerpiece is a pre-rendered transparent glossy tooth PNG composited inside a transparent splash PNG, animated with GSAP + Framer Motion (simpler, lighter, no react-three version pitfalls).
- Hero tooth + splash are one perfectly-aligned unit: a fixed, viewport-centered container (shown on ALL devices) holds the splash behind and the tooth in front. On load the splash POPS up from behind (Framer spring) and the tooth DROPS in from the top (Framer, gated on `!loading`), settling with a slight rest tilt. On scroll the splash fades out (it belongs to the hero) while the tooth travels DOWN the viewport (monotonically increasing `y`) with horizontal sway and rotates (0→270deg), driven by a scrubbed GSAP timeline. Same animation on mobile via a `gsap.matchMedia` `{isDesktop,isMobile}` branch that tunes `kx`/base scale/travel opacity; the fixed tooth layer is `pointer-events-none` and sits at `zIndex:10`, below the `zIndex:20` hero section (card/stats), so copy stays readable/clickable (see the z-layering note below). See `.agents/memory/persistent-scroll-tooth.md`.
- GSAP scroll transforms and Framer intro/tilt/idle motion live on separate nested nodes to avoid fighting over the CSS `transform` property (GSAP on `toothOuter`, Framer drop/tilt on inner `motion.div`s). Same rule for cards: the hover LIFT is Framer `whileHover={{ y: -6 }}` while `.glass-hover` animates only the shadow/glow — one transform author per node. The splash pop (Framer wrapper) is split from its scroll-fade (GSAP on the inner `img`) so opacity/transform never conflict; the splash fades out/in smoothly on scroll.
- Hero z-layering is THREE sibling layers under the page root (NOT nested): a `zIndex:1` backdrop (gradient + glow blob + giant "Smile Matters" serif) BELOW the `zIndex:10` fixed tooth, and the transparent `zIndex:20` hero `<section>` (info card + stats) ABOVE it (navbar stays `z-50`). Reason: the hero `<section>` is its own stacking context, so a card nested inside it can NEVER be raised above the sibling fixed tooth by any z-index — on short/narrow mobile the tooth painted over the card. See `.agents/memory/hero-stacking-and-mobile.md`.
- The scroll tooth ends its journey rotated to 360deg (fully upright, x:0) at the footer, so it visually returns to its original starting orientation.
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
- Hero animations (splash pop, tooth drop, rest tilt, scroll rotate/travel) must run on mobile too, not just desktop.

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
