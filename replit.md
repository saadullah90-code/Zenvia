# Denta Care Website

A premium, fully-animated single-page marketing website for the "Denta Care" dental clinic — a bright, glossy medical aesthetic on a light-blue theme, with a glossy 3D-style molar tooth composited inside a royal-blue liquid splash in the hero, a persistent tooth that travels down the page on scroll, scroll-triggered reveals, and buttery Lenis smooth scrolling.

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

- `artifacts/dental-clinic/` — the "Denta Care" single-page marketing site (react-vite, slug `@workspace/dental-clinic`, previewPath `/`, no backend).
  - `src/pages/Home.tsx` — page shell: hero, the persistent desktop-only traveling-tooth scroll system, Lenis + GSAP ticker, deterministic load-at-top, and section ordering.
  - `src/components/` — one file per section: Navbar, Preloader, Marquee, About, Problems, Braces, Treatments, Testimonials, FAQ, Contact, Footer.
  - `src/index.css` — light theme HSL tokens (light-blue background, `primary` blue ~#14a0e6, `accent` orange ~#ff5a1e), Manrope, marquee/glass/shadow utilities.
  - `public/` — `tooth-hero.png` (glossy white molar, transparent), `splash-blue.png` (royal-blue liquid splash, transparent), `braces.png`, plus stock JPGs (clinic-interior, patient-smiling, dentist-portrait, healthy-smile, teeth-cleaning).

## Architecture decisions

- No Three.js / WebGL. The hero centerpiece is a pre-rendered transparent glossy tooth PNG composited inside a transparent splash PNG, animated with GSAP + Framer Motion (simpler, lighter, no react-three version pitfalls).
- Hero tooth + splash are one perfectly-aligned unit: a fixed, viewport-centered container (`hidden md:flex items-center justify-center`) holds the splash behind and the tooth in front. On scroll the splash fades out (it belongs to the hero) while the tooth travels DOWN the viewport (monotonically increasing `y`) with horizontal sway, driven by a scrubbed GSAP timeline over the whole page. Desktop-only via `gsap.matchMedia('(min-width: 768px)')`; mobile shows a static composited tooth+splash in the hero flow. See `.agents/memory/persistent-scroll-tooth.md`.
- GSAP scroll transforms and Framer mouse-tilt live on separate nested nodes to avoid fighting over the CSS `transform` property (GSAP on `toothOuter`, Framer `rotateX/rotateY` on an inner `motion.div`).
- Lenis smooth scroll driven by the GSAP ticker; manual `scrollRestoration` + `scrollTo(0,0)` guarantees the page loads at hero top.

## Product

A premium, fully-animated one-page site for the fictional "Denta Care" clinic. Hero: light-blue background, huge two-tone "EVERY SMILE MATTERS" headline, glossy molar in a blue splash, a left white info card (description + "We're Open 10:00 AM – 07:00 PM" + orange Book Appointment button), and right-side stats (150+ Expert Dentists, 20+ Dental Clinics across UK, 03+ Countries). Then a scrolling marquee, About/Our Vision, Problems-with-Solutions, Braces, Treatments/Services, Testimonials, FAQ, and Contact. Purely presentational — no backend, forms are non-submitting UI.

## User preferences

- No emojis anywhere in the site.
- Keep the Footer "Developed by BranX" glow credit.
- Aim for $10k / Awwwards-caliber quality: heavy, polished, continuous scroll animation; treat the whole page as one continuous story, not stacked sections.
- No Three.js / WebGL for the hero — use the pre-rendered PNG approach.
- Font must be Manrope (heading 800, body 500). Colors: primary blue ~#14a0e6, accent orange ~#ff5a1e.

## Gotchas

- Transparent PNGs (tooth, splash) must have a real alpha channel. Generate renders on FLAT WHITE (no gradient/bokeh/floor shadow) then remove the background; dark/bokeh backgrounds can't be keyed and leave a visible box. Verify with `identify -format '%[channels] %[pixel:p{2,2}]' file.png` (want `srgba` + `srgba(0,0,0,0)`). The image viewer renders transparent on white, so it can't confirm transparency — use `identify` or a screenshot over a colored page.
- The Preloader overlays the page for ~0.5s on load, so screenshots taken immediately after a restart catch it mid-animation. To verify the hero, temporarily set `useState(false)` for `loading` in `Home.tsx`, screenshot, then restore `useState(true)`.
- No emojis anywhere in this site (explicit user preference).
- Keep the Footer "Developed by BranX" glow credit.
- Verify with `pnpm --filter @workspace/dental-clinic run typecheck`, not `build` (build needs workflow-provided PORT/BASE_PATH).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
