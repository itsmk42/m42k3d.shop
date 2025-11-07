# Deployment Log

- Timestamp (UTC): 2025-11-07T09:45Z
- Environment: Production
- Version: soft-rollout-v1
- Deployer: Trae AI (automation)
- Approver: <Assign>

## Activities
- Prepared production build (`npm run build`) — success
- Added health endpoint `/api/health` — success
- Added `deploy/production.env.example` — success
- Added `scripts/deploy.sh` and `scripts/rollback.sh` — success
- Created deployment package `release/soft_home_rollout.tar.gz` — success
- Local production smoke tests (port 3010):
  - `/modern-home?theme=soft` — OK
  - `/` — redirect to modern home — OK
  - `/admin` — redirects to login — OK
  - `/api/health` — OK
  - `/api/products` — OK (200 with empty list without Supabase env)

## Notes
- Ensure Supabase environment variables are configured on production before enabling product data fetching without fallbacks.
- Follow `deploy/README.md` for manual or scripted deployment.

