# Soft Theme Deployment Report

Version: `soft-theme-v1`
Date: <date>
Prepared by: <name>

## Summary
- Deployed Soft theme to homepage via staged rollout.
- Start percent: 10% | Final percent: <value>
- No DB changes; visual-only update.

## Execution Details
- Config set: `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT=<value>`
- Middleware enabled with sticky cookie `soft_rollout_v1`.
- Increments: <timestamps/percents>

## Validation
- Build: Passed (`npm run build`).
- Functional: Navigation, hero, cards, CTAs verified.
- Performance: LCP < 2.5s, CLS < 0.1, INP < 200ms (targets).
- Accessibility: Keyboard navigation, focus states, contrast confirmed.

## Monitoring
- Error rate: <value>% | Peak CPU: <value>% | Avg response: <value>ms
- Front-end JS errors: <count>
- Business metrics: <summary>

## Incidents / Notes
- Issues encountered: <details or N/A>
- Mitigations: <details>

## Rollback
- State: Not needed / executed at <time> | Reason: <reason>

## Next Steps
- Finalize brand approval and set percent to 100%.
- Plan minor visual refinements if requested.

