Homepage Redesign Mockups

Overview
- Purpose: Present pre-implementation mockups covering modern UI/UX, accessibility, performance, and content strategy.
- Deliverables: Desktop and mobile mockups, 3 color schemes, theme toggle, and interactive micro-interactions.

Color Schemes
- Quartz (Light): bg #fafafa, text #111827, primary #1d4ed8, accent #f59e0b, border #e5e7eb.
- Midnight (Dark): bg #0b1220, text #e5e7eb, primary #60a5fa, accent #22d3ee, border #243044.
- Forest (Neutral): bg #f7f7f2, text #0b0f14, primary #065f46, accent #34d399, border #e2e8f0.
-
Accessibility Notes
- Contrast: All primary interactions meet WCAG 2.1 AA (≥4.5:1). Navigation and body copy maintain ≥7:1 where feasible.
- Focus: Keyboard focus visible via outlines/shadows in navigation and CTA buttons.
- Motion: Honors prefers-reduced-motion; transitions disabled when requested.

Layout & Components
- Navigation: Brand badge, top links (hidden under 900px), scheme/theme/device controls.
- Hero: Headline, subcopy, CTA pair, supportive media (Image component) optimized for loading.
- Card Grid: 3 feature cards with hover lift and subtle border accent.
- Info Section: Scannable items for shipping, sustainability, support.
- Footer: Minimal, muted tone.

Performance Considerations
- Image: Uses next/image, `priority` only for hero, lazy for others (in final build).
- CSS: Design tokens and transitions implemented in pure CSS; minimal JS for toggles.
- Target: <2s on modern devices with optimized assets and server caching.

Preview
- Route: /mockups/home
- Controls: Device (mobile/tablet/desktop), Theme (light/dark), Color Scheme (Quartz/Midnight/Forest)

Implementation Plan (Post-Approval)
- Migrate approved scheme and components into /app/page.tsx.
- Replace hero and cards with production components; integrate dark/light toggle globally.
- Validate contrast and performance via Lighthouse and axe automation.

