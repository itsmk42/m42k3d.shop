# Soft Theme Staged Rollout Plan

Version: `soft-theme-v1`
Target: Redirect a percentage of homepage (`/`) traffic to `modern-home?theme=soft` using middleware and a sticky cookie.

## Strategy
- Start with `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT=10`.
- Use cookie `soft_rollout_v1=on|off` for stickiness (7-day TTL).
- Only homepage (`/`) is eligible; admin/account/login unaffected.

## Steps
1. Set environment variable in production: `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT=10`.
2. Deploy code with middleware staged rollout.
3. Verify redirect behavior on a clean browser (no `soft_rollout_v1` cookie).
4. Monitor for 30–60 minutes.
5. Increase to 25%, then 50%, then 100% if healthy.

## Monitoring
- Server metrics: CPU, memory, response time, saturation.
- Error rates: 4xx/5xx, Next.js server logs.
- Front-end: JS errors, Web Vitals (LCP, CLS, INP, TTFB).
- Business: Conversion rate, click-through, bounce rate.

## Halt Criteria
- Error rate > 1% sustained over 5 minutes.
- LCP > 3s or INP > 200ms sustained.
- Regressions reported by support or stakeholders.

## Communication
- Announce schedule and increments ahead of time.
- Share monitoring links and on-call rotation.
- Post status updates at each increment.

## Post-Rollout
- Confirm final percent set to 100% or freeze at lower percent pending brand sign-off.
- Update completion reports and archive metrics snapshots.

