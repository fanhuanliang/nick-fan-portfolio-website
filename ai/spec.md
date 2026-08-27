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
| Styling | Tailwind CSS v4 + `styles/globals.css` | CSS Modules removed in Phase 5; Semantic UI removed entirely; Tailwind is imported without Preflight |
| Fonts | `next/font/google` (Lato) | Self-hosted at build time since Phase 6; replaced the Phase 2 `@import url("https://fonts.googleapis.com/...")` |
| Language | TypeScript for app/components/data | App Router, components, data, and EmailJS config are now `.tsx`/`.ts`; `next.config.js` remains CommonJS config |
| Email | None | Contact form removed by user request during Phase 5 |
| Icons | lucide-react | |
| Linting | ESLint 8.57 + eslint-config-next 15 | Not yet on ESLint 9/flat-config, to avoid an unplanned migration |

### Site Structure
Single-page app (`app/page.tsx`) with 5 sections rendered top-to-bottom:
1. **Main** — animated canvas hero + fade-in name text + scroll arrow
2. **AboutMe** — bio paragraph + tech stack icon grid
3. **Experience** — 4 job cards (Comerica 2014 → Pacific Specialty 2020–present)
4. **Projects** — 4 project cards with popup modal (image, tech tags, GitHub/YouTube links)
5. **Contact** — intentionally blank anchor section + Footer

### Known Issues
1. ✅ **Fixed (Phase 1)** — `framer-motion` v4 `yoyo` transition was deprecated; replaced by `repeat: Infinity, repeatType: "reverse"` in v5+
2. ✅ **Fixed (Phase 5b)** — legacy `components/canvas/Canvas.js` referenced the global `c` by bare ID and had no React cleanup. Replaced with `components/HeroCanvas.tsx`, using `useRef<HTMLCanvasElement>`, `useEffect`, `cancelAnimationFrame`, and `ResizeObserver`. Regression verified that both the canvas CSS box and drawing buffer fill the hero at desktop and mobile sizes.
3. ✅ **Fixed (Phase 1)** — `emailjs-com` package was deprecated; replaced by `@emailjs/browser`
4. ✅ **Fixed (Phase 5g)** — unused/dead Heroku deploy URL data was removed from the centralized project data model.
5. ✅ **Fixed (Phase 1)** — `Home.module.css` scaffold file deleted
6. ✅ **Fixed (Phase 1)** — `pages/api/hello.js` scaffold deleted
7. ✅ **Fixed (Phase 1)** — `public/vercel.svg` scaffold deleted
8. Experience duration still reads "August 2020 - Present" — may need updating. Still open.
9. ✅ **Fixed (Phase 5)** — app routes, components, shared data, and EmailJS config are now TypeScript files. `next.config.js` remains JavaScript because it is build tooling config, not app/component code.
10. ✅ **Fixed (Phase 4)** — dark mode added: CSS custom properties + `.dark` class toggle (not Tailwind `dark:` classes, since no component uses Tailwind utility classes yet — see plan.md Phase 4 execution note), toggle button in Navbar, persisted to localStorage, respects `prefers-color-scheme` on first visit. Final regression (including the mobile image-modal overlay check) passed 2026-08-25.
11. ✅ **Fixed (Phase 6)** — Open Graph/Twitter card image, `robots.txt`, and `sitemap.xml` added (structured data/JSON-LD already existed from Phase 3). Rich Results validation still deferred to Phase 8 post-deploy, since it needs a public URL.
12. No accessibility audit (missing ARIA labels, focus management, skip nav). Still open; planned for Phase 7.
13. ✅ **Fixed (Phase 2)** — `next/image` used with fixed pixel dimensions and no CSS constraint in three places (`AboutMe.js` `height={1000} width={1000}`, `Project.js` `height={375} width={600}`, `TechStacks.js` `height={100} width={100}`); all not responsive after Next 13+ removed `next/image`'s old default `max-width:100%; height:auto` behavior. Fixed via responsive wrappers/CSS constraints (`AboutMe` uses `fill`, project images and tech logos are constrained in CSS).
14. ✅ **Fixed (Phase 5a)** — AWS logo now appears in the centralized tech stack list in `lib/data.ts`.

### Issues found during Phase 1/2 execution (not in the original audit)
15. ✅ **Fixed (Phase 2)** — `semantic-ui-css` had been silently supplying the site's actual body/heading font (`body{font-family:Lato,...}`, plus its own Google Fonts import) the whole time; `globals.css` never declared this itself. Removing Semantic UI in Phase 1 uncovered this. Fixed by adding an explicit Lato import + `font-family` rule to `globals.css`.
16. ✅ **Fixed (Phase 2)** — the Phase 1 Semantic UI → lucide-react icon swap initially replaced `angle double down` (a double-chevron icon) with the single-chevron `ChevronDown`; corrected to `ChevronsDown`.
17. **Known, accepted as-is** — `#name`'s `font-family: "Raleway-semibold"` (the "Nick Fan" hero text) doesn't match any real Google Font family name and has no local `@font-face`, so it has likely never actually rendered as Raleway, before or after any of this modernization work. Kept as the literal value by explicit choice rather than "fixed" with a working Raleway import.
18. ✅ **Fixed (Phase 5g)** — dead raw `className="project_card"` was removed during the Projects TSX/Tailwind rewrite.
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
| Email | None unless a contact form is reintroduced |
| Icons | lucide-react |
| Linting | ESLint 9 + TypeScript rules |

### Goals
- **Performance**: Lighthouse score ≥ 95 across all categories
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO**: Full Open Graph + Twitter cards + JSON-LD structured data
- **UX**: Dark/light mode toggle persisted in localStorage
- **DX**: Full app/component TypeScript coverage, Tailwind utility classes (no CSS modules), single source of truth for data
- **Correctness**: Fix all deprecated APIs, remove all dead code and scaffold files
- **Content**: Update experience/project data, fix broken URLs, add AWS to tech stack

### Sections (preserved, enhanced)
1. **Hero** — canvas background (fixed as proper React ref), framer-motion text stagger
2. **About** — responsive image, bio, tech stack with hover labels
3. **Experience** — timeline layout, updated dates
4. **Projects** — card grid with direct YouTube iframe modal
5. **Contact** — intentionally blank section unless a new contact surface is requested
