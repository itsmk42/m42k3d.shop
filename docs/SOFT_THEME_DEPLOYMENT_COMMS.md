# Soft Theme Deployment Communications

## Schedule (Low-Traffic Window)
- Proposed window: 22:00–00:00 local time (weekday), or 03:00–05:00 weekends.
- Staged increments: 10% → 25% → 50% → 100% (subject to metrics).

## Stakeholder Notification Template
Subject: Soft Theme Homepage – Staged Rollout Schedule and Details

Hello team,

We will deploy the Soft modern homepage theme tonight during a low-traffic window.

- Version: `soft-theme-v1`
- Start: <date/time>
- Rollout: 10% → 25% → 50% → 100%
- Scope: Homepage users only; admin/account flows unaffected
- Rollback: Immediate by setting `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT=0`
- Monitoring: Error rates, performance metrics, Web Vitals, conversion KPIs
- Contact: #on-call-channel, @on-call-engineer

We’ll post updates at each increment and notify if we halt or rollback.

Thanks,
<Your Name>

## Release Notes Template
- Change: Introduced Soft modern homepage theme via staged rollout.
- Impact: Visual refresh only; no backend or DB changes.
- Config: `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT` controls traffic percentage.
- Risks: Minor routing changes; cookie stickiness.
- Rollback: Set percent to 0; optional code revert.

