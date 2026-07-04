---
name: Lenis + pinned ScrollTrigger loads page mid-document
description: Why a Lenis + GSAP smooth-scroll page can load scrolled to a lower section, and the robust fix.
---

# Lenis + pinned ScrollTrigger: page loads scrolled down

On the dental-clinic artifact (Lenis smooth scroll + GSAP ScrollTrigger with a
`pin: true` section), the page would load already scrolled to a lower section
(e.g. `#about`) instead of the top/hero.

**Why:** A one-off `window.scrollTo(0,0)` / `lenis.scrollTo(0)` on mount is not
enough. A pinned/scrubbed ScrollTrigger re-runs `refresh()` after fonts/images
reflow and can re-park scroll mid-document *after* your reset fires. It is a
race, not a single event.

**How to apply:**
- Set `history.scrollRestoration = 'manual'`.
- Reset scroll via BOTH `lenisRef.current.scrollTo(0, { immediate: true, force: true })` and `window.scrollTo(0,0)`.
- Make it deterministic: subscribe to `ScrollTrigger.addEventListener('refresh', ...)` and re-reset to top on every refresh **until the user actually scrolls** (track a `userScrolled` flag via a Lenis `scroll` listener). Clean up both listeners on unmount.
- On mobile/touch, disable the `pin`/`scrub` timeline entirely with `gsap.matchMedia()` (`min-width: 768px` for pinned, `max-width: 767px` for a simple reveal). Pinning on mobile causes jumpy scroll and URL-bar reflow.

**Also:** GSAP ticker cleanup must remove the *same* function reference you
added — `gsap.ticker.add(tick)` then `gsap.ticker.remove(tick)`, never
`gsap.ticker.remove(lenis.raf)` (that removes nothing and stacks RAF loops on HMR/remount).
