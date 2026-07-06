# Zenvia Website

A premium, fully-animated single-page marketing website for the "Zenvia" dental clinic — a bright, glossy medical aesthetic on a light-blue theme, with a glossy 3D-style molar tooth composited inside a royal-blue liquid splash in the hero, giant serif "Smile Matters" background typography behind the tooth, a persistent tooth that (on DESKTOP) travels down the page and rotates back to fully upright by the footer while on MOBILE it sits in-flow at the top of a cleanly stacked hero (tooth → appointment card → stats), site-wide premium glassmorphism cards, scroll-triggered reveals, and buttery Lenis smooth scrolling. All CTAs are a blue "sparkle" pill button.

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
  - `src/pages/Home.tsx` — page shell: hero, the persistent traveling+rotating-tooth scroll system (fixed traveling tooth runs on DESKTOP only via a `matchMedia('(min-width:768px)')` branch; MOBILE renders the tooth in-flow/stacked inside the hero — see `.md:hidden` block — so it never floats over and covers content), Lenis + GSAP ticker, deterministic load-at-top, and section ordering.
  - `src/components/` — one file per section: Navbar, Preloader, Marquee, About, Problems, Braces, Treatments, Testimonials, FAQ, Contact, Footer, plus `SparkleButton.tsx` (reusable blue sparkle CTA).
  - `src/index.css` — light theme HSL tokens (light-blue background, `primary` blue ~#14a0e6, `accent` also blue `221 83% 53%` — NO orange), Manrope, `--font-serif`/`.font-serif-display`, premium `.glass-card` (multi-layer bg with folded-in sheen, blur+saturate) + `.glass-hover` (glow only — lift is Framer's), `.hero-info-card` mobile-opaque override, marquee/shadow utilities, and `.sparkle-btn` (+ `--sm`/`--lg`) blue-gradient button styles.
  - `public/` — `tooth-hero.png` (glossy white molar, transparent), `splash-blue.png` (royal-blue liquid splash, transparent), `braces.png`, plus stock JPGs (clinic-interior, patient-smiling, dentist-portrait, healthy-smile, teeth-cleaning).

## Architecture decisions

- No Three.js / WebGL. The hero centerpiece is a pre-rendered transparent glossy tooth PNG composited inside a transparent splash PNG, animated with GSAP + Framer Motion (simpler, lighter, no react-three version pitfalls).
- Hero tooth + splash are one perfectly-aligned unit. DESKTOP (`min-width:768px`): a fixed, viewport-centered container (`pointer-events-none overflow-hidden`, `zIndex:30` — the TOP visual layer above the `zIndex:20` hero section, below only the `z-50` navbar) holds the splash behind and the tooth in front. On load the splash POPS up from behind (Framer spring) and the tooth DROPS in from the top (Framer, gated on `!loading`), settling with a slight rest tilt. On scroll the splash fades out (it belongs to the hero) while the tooth travels DOWN the viewport (monotonically increasing `y`) with horizontal sway and rotates (0→360deg), driven by a scrubbed GSAP timeline gated to desktop via `gsap.matchMedia('(min-width:768px)')`. MOBILE (`<768px`): NO fixed/traveling tooth — instead an `md:hidden` in-flow tooth+splash sits at the TOP of the hero (still with the splash-pop + tooth-drop + idle-tilt intro), followed by the appointment card then stats, all in normal document flow. This is deliberate: a fixed traveling tooth floats over and covers the appointment card/contact form on small screens and its x-transform caused a right-shift. See `.agents/memory/persistent-scroll-tooth.md` and `.agents/memory/hero-stacking-and-mobile.md`.
- GSAP scroll transforms and Framer intro/tilt/idle motion live on separate nested nodes to avoid fighting over the CSS `transform` property (GSAP on `toothOuter`, Framer drop/tilt on inner `motion.div`s). Same rule for cards: the hover LIFT is Framer `whileHover={{ y: -6 }}` while `.glass-hover` animates only the shadow/glow — one transform author per node. The splash pop (Framer wrapper) is split from its scroll-fade (GSAP on the inner `img`) so opacity/transform never conflict; the splash fades out/in smoothly on scroll.
- DESKTOP hero z-layering is THREE sibling layers under the page root (NOT nested), ordered `backdrop z=1 < hero <section> z=20 < fixed tooth z=30 < navbar z=50`: a `zIndex:1` backdrop (gradient + glow blob + giant "Smile Matters" serif), the transparent `zIndex:20` hero `<section>` (info card + stats), and the `zIndex:30` fixed tooth ON TOP. On desktop the tooth must be the top visual layer (not behind the card/content) because every content section is opaque — a tooth placed behind them would be fully hidden, breaking the "tooth stays visible throughout scroll" requirement; `pointer-events-none` keeps clicks working underneath. Backgrounds that must sit BEHIND the tooth go in the `z=1` backdrop (a node nested in the `z=20` section forms its own stacking context and can't be pushed below the sibling fixed tooth). On MOBILE the fixed tooth is hidden entirely; the in-flow tooth lives inside the `z=20` hero section, so there is no over-content overlap to reason about. See `.agents/memory/hero-stacking-and-mobile.md`.
- Mobile right-shift guard: a `position:fixed` tooth with a GSAP x-transform escapes body overflow clipping and can create horizontal scroll that shifts the page right on mobile — which is the main reason the fixed traveling tooth is now DESKTOP-only. Belt-and-suspenders guards remain: a global `html, body, #root { max-width:100%; overflow-x:hidden }` in `index.css`, `overflow-x-hidden` on the page root, `overflow-hidden` on the (desktop) fixed tooth container, and hardened `.input` fields (`max-width:100%; min-width:0; box-sizing:border-box`) so the Contact form never overflows on small screens.
- `.glass-card` is a premium liquid-glass treatment (multi-layer specular corner highlight + top-right cool reflection + top glare band over a frosted base, blur+saturate, layered inset+drop shadows); every card site-wide uses it, so the effect propagates from one CSS rule.
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
- Hero intro animations (splash pop, tooth drop, rest tilt) run on mobile too, not just desktop. BUT the fixed scroll-travel tooth is DESKTOP-only: on mobile the user wants a clean STACKED hero (tooth+splash centered at top, then the appointment card, then stats) with nothing floating over/covering content and no horizontal shift. Do not reintroduce a fixed traveling tooth on mobile.

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
