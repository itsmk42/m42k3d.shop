# Production Deployment Package

## Contents
- `.next/` compiled application code
- `package.json`, `package-lock.json`
- `next.config.ts`, `public/`, `styles/`, `tsconfig.json`
- `deploy/production.env.example`
- `scripts/deploy.sh`, `scripts/rollback.sh`
- Optional database scripts referenced in root (`*.sql`) if applicable

## Server Requirements
- Node.js 18+ (recommended Node 20 LTS)
- PM2 or systemd for process management
- Nginx/Apache reverse proxy terminating TLS
- CPU: 2 vCPU+; RAM: 2–4 GB+; Disk: 10 GB+
- Open ports: 80/443 (HTTP/HTTPS) and app internal port (e.g., 3000)

## Deployment Steps (Manual)
1. Upload tarball to server path (e.g., `/var/www/m42k3d.shop`).
2. Extract and run `npm ci --omit=dev`.
3. Configure environment: copy `deploy/production.env.example` → `.env.production` and set real values.
4. Start with `pm2 start npm --name m42k3d -- start` and `pm2 save`.
5. Validate `/api/health`, homepage, admin redirect.

## Rollback
- Use `scripts/rollback.sh` or `pm2 restart m42k3d`.
- For full rollback, restore previous release directory or Docker image tag.

