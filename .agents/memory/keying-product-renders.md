---
name: Keying AI product renders to transparent PNG
description: Why some generated product shots can't be background-removed, and how to generate ones that can.
---

When a scroll-driven object must float over varied backgrounds, its PNG needs a real alpha channel. AI image generators love to add a studio backdrop — dark radial gradients, depth-of-field bokeh, a floor + cast shadow. Those CANNOT be cleanly keyed to transparent (soft glossy edges + gradient defeat the background remover), so the "removed" image still shows a visible box/smudge over the page.

**Fix:** regenerate the render on a PURE SOLID WHITE (#FFFFFF) seamless background — explicitly say no gradient, no floor, no cast shadow, no depth-of-field/bokeh, no vignette — then run the background-removal tool. Flat white keys reliably.

**Verify alpha without PIL** (PIL is not installed; ImageMagick `identify` is):
`identify -format '%[channels] %[pixel:p{2,2}]' file.png` → want `srgba` (4 ch) and corner pixel `srgba(0,0,0,0)`.
Note the `read`/image-viewer renders transparent PNGs on white, so it CANNOT distinguish transparent from a white background — trust the `identify` alpha check or a screenshot against a dark page background instead.
