# Homepage Tabs – Style Guide and Responsive Specs

## Visual Hierarchy
- Featured Items appears as the first tab, followed by Fast Shipping, Secure Payments, Quality Materials, and Custom Orders.
- Active tab uses `bg-slate-800`, `border-b-2 border-red-500`, and `text-red-400` for clear distinction.
- Inactive tabs use `text-gray-300` with hover states `hover:text-white hover:bg-slate-800/50`.

## Color Scheme
- Background: `bg-gradient-to-b from-slate-900 to-slate-800`
- Primary accent: `text-red-400` (active) and `text-red-500` (icons)
- Borders: `border-slate-700`
- Text: `text-white` for headings, `text-gray-300` for body copy

## Typography
- Tab labels: `font-medium`
- Panel headings: `text-lg font-semibold`
- Body copy: `text-sm` for concise descriptions

## Spacing
- Tabs container: `pb-3 mb-6`
- Buttons: `px-4 py-2`
- Panels: `p-6` with `rounded-2xl`
- Grid gaps: `gap-6` in service panels; `CompactFeaturedItems` grid `gap-3 md:gap-4`

## Transitions & Hover
- Tabs: `transition-colors` with subtle hover on inactive tabs
- Cards: `hover:bg-slate-800/50` and `hover:border-red-500/50` where applicable

## Accessibility (WCAG)
- Roles: `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Relationships: `aria-controls` and `aria-labelledby` with matching `id`s
- Focus: `focus-visible:ring-2 focus-visible:ring-red-500` on tabs
- Keyboard: ArrowLeft/ArrowRight, Home/End for navigation; Space/Enter activate via click handler

## Responsive Breakpoints
- Mobile (≤640px): Tabs wrap to new lines; featured grid uses 2 columns
- Tablet (≥640px): Featured grid uses 3 columns; panels stack
- Desktop (≥768px): Featured grid uses 4 columns; service panels use 2 columns
- Large (≥1024px): Featured grid can extend to 6 columns (via `CompactFeaturedItems`)

## Implementation Notes
- Use `HomeTabs` to unify Featured Items and Services while preserving existing functionality.
- `CompactFeaturedItems` is rendered only when the Featured tab is active to avoid unnecessary image loading.
- All content remains semantic and keyboard-accessible.

