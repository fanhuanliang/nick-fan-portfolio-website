---
name: portfolio-modernization-spec
description: Current state analysis and target state specification for Nick Fan's portfolio website modernization
metadata:
  type: project
---

# Portfolio Website — Modernization Spec

## Current State

### Tech Stack
_Updated after Phase 1 (dependency/tooling upgrade) — see plan.md._

| Concern | Current | Notes |
|---|---|---|
| Framework | Next.js 15.5.23 | App Router (`app/`) — migrated in Phase 3 |
| UI Library | React 19.2.8 | |
| Animation | framer-motion 13.x | `yoyo` transition fixed → `repeat`/`repeatType` |
| Styling | CSS Modules + Tailwind CSS v4 (tooling only) | Semantic UI removed entirely; Tailwind imported without Preflight so no component uses its utility classes yet |
| Language | JavaScript + targeted TypeScript | TypeScript tooling is installed; `lib/data.ts` and `components/HeroCanvas.tsx` are now converted as part of Phase 5a/5b |
| Email | @emailjs/browser | |
| Icons | lucide-react | |
| Linting | ESLint 8.57 + eslint-config-next 15 | Not yet on ESLint 9/flat-config, to avoid an unplanned migration |

### Site Structure
Single-page app (`app/page.js`) with 5 sections rendered top-to-bottom:
1. **Main** — animated canvas hero + fade-in name text + scroll arrow
2. **AboutMe** — bio paragraph + tech stack icon grid
3. **Experience** — 4 job cards (Comerica 2014 → Pacific Specialty 2020–present)
4. **Projects** — 4 project cards with popup modal (image, tech tags, GitHub/YouTube links)
5. **Contact** — EmailJS form + notification modal + Footer

### Known Issues
1. ✅ **Fixed (Phase 1)** — `framer-motion` v4 `yoyo` transition was deprecated; replaced by `repeat: Infinity, repeatType: "reverse"` in v5+
2. ✅ **Fixed (Phase 5b)** — legacy `components/canvas/Canvas.js` referenced the global `c` by bare ID and had no React cleanup. Replaced with `components/HeroCanvas.tsx`, using `useRef<HTMLCanvasElement>`, `useEffect`, `cancelAnimationFrame`, and `ResizeObserver`. Regression verified that both the canvas CSS box and drawing buffer fill the hero at desktop and mobile sizes.
3. ✅ **Fixed (Phase 1)** — `emailjs-com` package was deprecated; replaced by `@emailjs/browser`
4. Heroku deploy URL for Payment System project is dead (Heroku ended free tier). Still open.
5. ✅ **Fixed (Phase 1)** — `Home.module.css` scaffold file deleted
6. ✅ **Fixed (Phase 1)** — `pages/api/hello.js` scaffold deleted
7. ✅ **Fixed (Phase 1)** — `public/vercel.svg` scaffold deleted
8. Experience duration still reads "August 2020 - Present" — may need updating. Still open.
9. No full TypeScript coverage across components. **Partially addressed (Phase 5a/5b)** — shared data now lives in `lib/data.ts`, and the hero canvas is `components/HeroCanvas.tsx`; remaining component conversion is still Phase 5.
10. ✅ **Fixed (Phase 4)** — dark mode added: CSS custom properties + `.dark` class toggle (not Tailwind `dark:` classes, since no component uses Tailwind utility classes yet — see plan.md Phase 4 execution note), toggle button in Navbar, persisted to localStorage, respects `prefers-color-scheme` on first visit. Final regression (including the mobile image-modal overlay check) passed 2026-08-25.
11. SEO is minimal (no Open Graph, no twitter cards, no structured data). Still open; planned for Phase 6.
12. No accessibility audit (missing ARIA labels, focus management, skip nav). Still open; planned for Phase 7.
13. ✅ **Fixed (Phase 2)** — `next/image` used with fixed pixel dimensions and no CSS constraint in three places (`AboutMe.js` `height={1000} width={1000}`, `Project.js` `height={375} width={600}`, `TechStacks.js` `height={100} width={100}`); all not responsive after Next 13+ removed `next/image`'s old default `max-width:100%; height:auto` behavior. Fixed via responsive wrappers/CSS constraints (`AboutMe` uses `fill`, project images and tech logos are constrained in CSS).
14. ✅ **Fixed (Phase 5a)** — AWS logo now appears in the centralized tech stack list in `lib/data.ts`.

### Issues found during Phase 1/2 execution (not in the original audit)
15. ✅ **Fixed (Phase 2)** — `semantic-ui-css` had been silently supplying the site's actual body/heading font (`body{font-family:Lato,...}`, plus its own Google Fonts import) the whole time; `globals.css` never declared this itself. Removing Semantic UI in Phase 1 uncovered this. Fixed by adding an explicit Lato import + `font-family` rule to `globals.css`.
16. ✅ **Fixed (Phase 2)** — the Phase 1 Semantic UI → lucide-react icon swap initially replaced `angle double down` (a double-chevron icon) with the single-chevron `ChevronDown`; corrected to `ChevronsDown`.
17. **Known, accepted as-is** — `#name`'s `font-family: "Raleway-semibold"` (the "Nick Fan" hero text) doesn't match any real Google Font family name and has no local `@font-face`, so it has likely never actually rendered as Raleway, before or after any of this modernization work. Kept as the literal value by explicit choice rather than "fixed" with a working Raleway import.
18. `Project.js` has `className="project_card"` as a raw string rather than `styleProject.project_card` — CSS Modules hash class names, so this has been a no-op since before any modernization work started. Pre-existing, unrelated to any upgrade; low priority.
19. ✅ **Fixed (Phase 2)** — Fixed-header scroll offsets still used the old 70px header value, leaving the black hero section visible above target sections. Updated hero/nav scroll offsets to the measured 38px header height.
20. ✅ **Fixed (Phase 2)** — Remaining sections were visually oversized after regression testing. Reduced Experience, Projects, Contact, Footer, and modal dimensions while preserving the existing CSS Modules structure.
21. ✅ **Fixed (Phase 2)** — Project modals were rendered inside animated project cards, so fixed modal positioning could be relative to the card transform instead of the viewport. Moved image/video modals outside the animated card and raised all modal z-index values above the fixed header.

## Target State

### Stack
| Concern | Target |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Animation | framer-motion 11+ |
| Styling | Tailwind CSS v4 |
| Language | TypeScript 5 |
| Email | @emailjs/browser |
| Icons | lucide-react |
| Linting | ESLint 9 + TypeScript rules |

### Goals
- **Performance**: Lighthouse score ≥ 95 across all categories
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Full Open Graph + Twitter cards + JSON-LD structured data
- **UX**: Dark/light mode toggle persisted in localStorage
- **DX**: Full TypeScript coverage, Tailwind utility classes (no CSS modules), single source of truth for data
- **Correctness**: Fix all deprecated APIs, remove all dead code and scaffold files
- **Content**: Update experience/project data, fix broken URLs, add AWS to tech stack

### Sections (preserved, enhanced)
1. **Hero** — canvas background (fixed as proper React ref), framer-motion text stagger
2. **About** — responsive image, bio, tech stack with hover labels
3. **Experience** — timeline layout, updated dates
4. **Projects** — card grid, fix Heroku URL or replace with GitHub Pages
5. **Contact** — EmailJS form with proper loading/success/error states
