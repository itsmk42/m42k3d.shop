# Soft Theme Deployment Checklist

This checklist ensures the Soft modern homepage theme is production-ready and deployed safely using a staged rollout.

## Version Verification
- [ ] Identify release version: `soft-theme-v1` (Modern Homepage Soft variant)
- [ ] Confirm code changes included:
  - [ ] `styles/modern-themes.css` (Soft theme tokens and components)
  - [ ] `app/modern-home/page.tsx` (modern homepage with theme switcher)
  - [ ] `middleware.ts` (staged rollout redirect to Soft theme)
  - [ ] New docs under `docs/` (deployment, rollback, comms)
- [ ] Confirm no unrelated changes in commit scope
- [ ] Confirm build passes locally (`npm run build`) with no warnings or errors
- [ ] Confirm TypeScript types compile cleanly (if configured)

## Database Compatibility
- [ ] No schema changes required (CSS/route-level change only)
- [ ] Verify Supabase keys and auth work with modern-home route
- [ ] Confirm product queries used on existing homepage unchanged (forest theme remains available)
- [ ] Validate RLS policies unaffected (no new API paths introduced)

## Configuration Settings
- [ ] Add or validate environment variable: `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT` (0–100)
- [ ] Set initial `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT=10` for pilot
- [ ] Ensure cookie-based stickiness `soft_rollout` is enabled for consistent user experience
- [ ] Confirm Vercel/host environment variables updated for production
- [ ] Validate `next.config.ts` does not block `modern-home` route

## Pre-Deployment Validation
- [ ] Smoke test `http://<env>/modern-home?theme=soft` for UI and interactions
- [ ] Check responsive layout across breakpoints (mobile, tablet, desktop)
- [ ] Verify performance: LCP, CLS, TBT (via Lighthouse or Web Vitals)
- [ ] Check accessibility: keyboard, focus order, contrast, reduced motion
- [ ] Confirm SEO basics: title, meta, semantic headings

## Rollout Plan (Staged)
- [ ] Start with 10% of `/` traffic redirected to Soft theme (`/modern-home?theme=soft`)
- [ ] Monitor error rates, response times, CPU/memory, and front-end JS errors
- [ ] Increase to 25% after 30–60 minutes with no issues
- [ ] Increase to 50% after 2–4 hours with no issues
- [ ] Increase to 100% or pause to align with brand decision

## Rollback Plan
- [ ] Set `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT=0` to disable redirect
- [ ] Remove `soft_rollout` cookie via middleware
- [ ] Revert middleware redirect code if needed
- [ ] Validate `/` routes render forest homepage again

## Communications
- [ ] Notify stakeholders of deployment schedule and scope
- [ ] Provide metrics dashboard links and contact channel during rollout
- [ ] Share rollback readiness and criteria for halting rollout

## Post-Deployment
- [ ] Verify final state and update `TASK_COMPLETION_REPORT.md`
- [ ] Document learnings and performance results
- [ ] Schedule next iteration for visual refinements if needed

