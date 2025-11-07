# Sparkle Sphere Brand Guidelines

## Overview
- Brand: Sparkle Sphere
- Primary assets: `public/brand/sparkle-sphere-light.svg`, `public/brand/sparkle-sphere-dark.svg`
- App icon: `app/icon.svg` (Next.js App Router favicon)
- Component: `components/ui/Logo.tsx` provides consistent rendering and wordmark control.

## Assets & Formats
- Vector: SVG (preferred for UI)
- Raster: PNG, JPG (for email clients, social previews, legacy contexts)
- Variants:
  - Light: use on light surfaces; `sparkle-sphere-light.svg`
  - Dark: use on dark surfaces; `sparkle-sphere-dark.svg`

### Exporting PNG/JPG (recommended sizes)
- 256×256, 512×512, 1024×1024
- Transparent background for PNG; solid background for JPG
- Suggested tooling:
  - `npm i -D sharp` and use a small Node script
  - or `svgexport` CLI: `svgexport input.svg output.png 1024:1024`

## Usage Guidelines
- Use `Logo` component everywhere possible to ensure consistency.
- Pass `variant="light"` on light backgrounds; `variant="dark"` on dark backgrounds.
- Wordmark:
  - Default: visible (`withWordmark=true`)
  - Hide in compact UI or tight spaces (`withWordmark=false`)

## Sizing Guidelines
- Small: 32×32 (footer, badges)
- Medium: 40×40 (headers, nav)
- Large: 56×56 (hero, marketing)
- Responsive text sizes are managed by `Logo.tsx`.

## Minimum Size
- Icon-only minimum: 24×24
- With wordmark minimum: 32px icon with readable text at body size

## Clear Space
- Maintain at least 0.5× icon width padding on all sides.
- Do not crowd with other logos or UI controls.

## Placement Rules
- Align to top-left in headers with wordmark visible by default.
- In dark headers (e.g., `Header.tsx`), keep `variant="dark"`.
- In light headers (e.g., `HeaderModern.tsx`), use `variant="light"`.

## Color & Contrast
- Ensure WCAG AA contrast when placing wordmark text.
- Dark variant is optimized for slate/black backgrounds.
- Light variant is optimized for white/gray backgrounds.

## Favicons & App Icons
- Next.js App Router automatically uses `app/icon.svg`.
- Optional: include `app/favicon.ico` for legacy support and `apple-touch-icon.png` (180×180).

## CSS/Design Tokens
- No global color overrides are required for the logo.
- If needed, add CSS variables for future theming:
  - `--logo-light-url: '/brand/sparkle-sphere-light.svg'`
  - `--logo-dark-url: '/brand/sparkle-sphere-dark.svg'`

## QA Checklist
- Verify on web (desktop/tablet/mobile): header, footer, admin pages.
- Check on dark/light surfaces for contrast.
- Confirm touch targets ≥ 40×40 for interactive header logo.
- Confirm favicon renders in browser tabs and mobile home screens.
- Validate performance: SVG is <20KB and loads quickly.

## Rollout Plan
- Update assets and component (done).
- Replace logo usage via `Logo` component in headers/footers (done).
- Deploy to staging; verify visual checks, then to production.
- Schedule during low-traffic window; announce change to stakeholders.
- Prepare rollback: keep previous `logo.svg` in `public/` and revert component if needed.

## File Map
- `components/ui/Logo.tsx` — source of truth
- `components/layout/Header.tsx` — dark header usage
- `components/layout/HeaderModern.tsx` — light header usage
- `components/layout/Footer.tsx` — dark footer usage
- `app/icon.svg` — app icon
- `public/brand/` — logo assets

## Notes
- Environment variable `NEXT_PUBLIC_SITE_NAME` controls wordmark text and alt tag.
- Keep alt tags descriptive for accessibility.

