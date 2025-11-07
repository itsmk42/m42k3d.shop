# Soft Theme Rollback Procedures

Purpose: Safely revert traffic to the original homepage and disable Soft theme redirect.

## Immediate Rollback (No code revert)
1. Set `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT=0` in production environment.
2. Redeploy environment to apply new variable.
3. Confirm root `/` no longer redirects for new sessions.
4. Optionally clear the sticky cookie for affected users:
   - Update middleware to set `soft_rollout_v1=off` for any incoming requests.
   - Alternatively instruct support to advise users to clear site cookies.

## Full Rollback (Code revert)
1. Revert changes in `middleware.ts` to remove Soft redirect logic and `/` matcher.
2. Redeploy application.
3. Validate that `/` renders original homepage (Forest theme) and `/modern-home` remains available for preview.

## Verification
- Check `/` and `/modern-home` both load correctly.
- Monitor error rates and performance for stability.
- Confirm stakeholders acknowledge rollback state.

