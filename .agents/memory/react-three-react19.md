---
name: react-three with React 19
description: Version constraints for @react-three/fiber + drei when the workspace uses React 19
---

The react-vite scaffold runs React 19. `@react-three/fiber` v8 and `@react-three/drei` v9 target React 18 and crash at runtime with `Cannot read properties of undefined (reading 'ReactCurrentOwner')`.

**Rule:** on React 19, use `@react-three/fiber@^9` and `@react-three/drei@^10`.

**Also:** drei v10 changed `PresentationControls` props — it no longer accepts `config` or an object for `snap`. Use `snap` as a boolean; drop `config`.

**Why:** design subagents often add fiber v8/drei v9 (their defaults), which look fine to typecheck for imports but fail at runtime and on drei prop types.

**How to apply:** after any 3D build on this stack, verify fiber/drei majors are 9/10 and run `pnpm --filter @workspace/<slug> run typecheck` before restarting the workflow.
