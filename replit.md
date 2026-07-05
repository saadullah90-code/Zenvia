# Zenvia Website

A premium, fully-animated single-page marketing website for the "Zenvia" dental clinic — a bright, glossy medical aesthetic on a light-blue theme, with a glossy 3D-style molar tooth composited inside a royal-blue liquid splash in the hero, a persistent tooth that travels/rotates down the page on scroll, scroll-triggered reveals, and buttery Lenis smooth scrolling. All CTAs are a blue "sparkle" pill button.

## Run & Operate

- `pnpm --filter @workspace/dental-clinic run dev` — run the site (workflow `artifacts/dental-clinic: web`)
- `pnpm --filter @workspace/dental-clinic run typecheck` — typecheck the site (use this, NOT `build`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages (needs workflow-provided PORT/BASE_PATH)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9, Vite + React
- Animation: GSAP (+ ScrollTrigger), Framer Motion, Lenis smooth scroll
- Styling: Tailwind v4 (no config file; theme via `@theme inline` + `:root` tokens in `src/index.css`)
- Font: Manrope (heading 800, body 500) via Google Fonts link in `index.html`

## Where things live

- `artifacts/dental-clinic/` — the "Zenvia" single-page marketing site (react-vite, slug `@workspace/dental-clinic`, previewPath `/`, no backend).
  - `src/pages/Home.tsx` — page shell: hero, the persistent traveling+rotating-tooth scroll system (runs on BOTH desktop and mobile), Lenis + GSAP ticker, deterministic load-at-top, and section ordering.
  - `src/components/` — one file per section: Navbar, Preloader, Marquee, About, Problems, Braces, Treatments, Testimonials, FAQ, Contact, Footer, plus `SparkleButton.tsx` (reusable blue sparkle CTA).
  - `src/index.css` — light theme HSL tokens (light-blue background, `primary` blue ~#14a0e6, `accent` also blue `221 83% 53%` — NO orange), Manrope, marquee/glass/shadow utilities, and `.sparkle-btn` (+ `--sm`/`--lg`) blue-gradient button styles.
  - `public/` — `tooth-hero.png` (glossy white molar, transparent), `splash-blue.png` (royal-blue liquid splash, transparent), `braces.png`, plus stock JPGs (clinic-interior, patient-smiling, dentist-portrait, healthy-smile, teeth-cleaning).

## Architecture decisions

- No Three.js / WebGL. The hero centerpiece is a pre-rendered transparent glossy tooth PNG composited inside a transparent splash PNG, animated with GSAP + Framer Motion (simpler, lighter, no react-three version pitfalls).
- Hero tooth + splash are one perfectly-aligned unit: a fixed, viewport-centered container (shown on ALL devices) holds the splash behind and the tooth in front. On load the splash POPS up from behind (Framer spring) and the tooth DROPS in from the top (Framer, gated on `!loading`), settling with a slight rest tilt. On scroll the splash fades out (it belongs to the hero) while the tooth travels DOWN the viewport (monotonically increasing `y`) with horizontal sway and rotates (0→270deg), driven by a scrubbed GSAP timeline. Same animation on mobile via a `gsap.matchMedia` `{isDesktop,isMobile}` branch that tunes `kx`/base scale/travel opacity; the fixed layer is `pointer-events-none` and hero card/stats sit at `z-40` so copy stays readable/clickable. See `.agents/memory/persistent-scroll-tooth.md`.
- GSAP scroll transforms and Framer intro/tilt/idle motion live on separate nested nodes to avoid fighting over the CSS `transform` property (GSAP on `toothOuter`, Framer drop/tilt on inner `motion.div`s).
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
- No emojis anywhere in this site (explicit user preference).
- Keep the Footer "Developed by BranX" glow credit.
- Verify with `pnpm --filter @workspace/dental-clinic run typecheck`, not `build` (build needs workflow-provided PORT/BASE_PATH).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
