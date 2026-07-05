# Dental Clinic Website

A premium, fully-animated single-page marketing website for a futuristic dental clinic — glossy medical-tech aesthetic with a 3D floating tooth hero, scroll-triggered animations, and buttery smooth scrolling.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/dental-clinic/` — the "Lumina" single-page marketing site (react-vite, slug `@workspace/dental-clinic`, previewPath `/`, no backend).
  - `src/pages/Home.tsx` — page shell: Lenis smooth scroll, the persistent traveling-tooth scroll system, deterministic top-load, and section ordering.
  - `src/components/` — one file per section (Navbar, Showcase3D, Services, SmileGallery, Team, Testimonials, AppointmentForm, FAQ, Footer, Preloader, CustomCursor).
  - `src/index.css` — dark theme tokens (`#0A0E1A`/`#05070D` bg, `primary` blue), glass/noise utilities.
  - `public/` — `tooth-1/2/3.png` (transparent traveling-tooth angles), `testi-1/2/3.png` portraits, `tech-1.png`.

## Architecture decisions

- No Three.js / WebGL. The hero centerpiece is a pre-rendered transparent glossy tooth PNG animated with GSAP + Framer Motion (simpler, lighter, no react-three version pitfalls).
- One persistent tooth (fixed, `pointer-events-none`, z-30) travels the whole page. Its motion is anchored to per-section scrub ScrollTriggers (not one global timeline), so the pinned Showcase (`end: '+=150%'`) can't desync it. See `.agents/memory/persistent-scroll-tooth.md`.
- GSAP scroll transforms and Framer mouse-tilt live on separate nested nodes to avoid fighting over the CSS `transform` property.
- Lenis smooth scroll driven by the GSAP ticker; manual `scrollRestoration` + refresh-reset guarantees the page loads at hero top.

## Product

A premium, fully-animated one-page site for the fictional "Lumina" dental clinic: cinematic hero, about/stats, services, a pinned 3D-style showcase, before/after smile gallery, team, testimonials (portrait marquee + ratings), appointment form, and FAQ. Purely presentational — no backend, forms are non-submitting UI.

## User preferences

- No emojis anywhere in the site.
- Keep the Footer "Developed by BranX" glow credit.
- Aim for $10k / Awwwards-caliber quality: heavy, polished, continuous scroll animation; treat the whole page as one continuous story, not stacked sections.
- No Three.js / WebGL for the hero — use the pre-rendered PNG approach.

## Gotchas

- Traveling-tooth PNGs must have a real alpha channel. Generate renders on FLAT WHITE (no gradient/bokeh/floor shadow) then remove the background; dark-gradient/bokeh backgrounds can't be keyed and leave a visible box. Verify with `identify -format '%[channels] %[pixel:p{2,2}]' file.png` (want `srgba` + `srgba(0,0,0,0)`). The image viewer renders transparent on white, so it can't confirm transparency — use `identify` or a screenshot over the dark page.
- No emojis anywhere in this site (explicit user preference).
- Keep the Footer "Developed by BranX" glow credit.
- Verify with `pnpm --filter @workspace/dental-clinic run typecheck`, not `build` (build needs workflow-provided PORT/BASE_PATH).

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
