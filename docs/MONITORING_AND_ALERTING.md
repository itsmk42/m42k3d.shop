# Monitoring and Alerting Setup

## Application Performance Monitoring (APM)
- Option A: Sentry (`@sentry/nextjs`)
  - Install: `npm i @sentry/nextjs`
  - Run setup: `npx @sentry/wizard -i nextjs`
  - Configure DSN via env: `SENTRY_DSN`
- Option B: Datadog APM
  - Install: `npm i dd-trace`
  - Initialize in server entrypoint; configure `DD_API_KEY`, `DD_SITE`

## Error Tracking
- Enable Sentry for server and client errors; capture releases using `APP_VERSION`
- Forward logs to a centralized sink (e.g., CloudWatch, ELK)

## Resource Utilization Alerts
- Use Node exporter + Prometheus + Alertmanager (CPU, memory, disk)
- Alternatively, Datadog/Cloud provider metrics with thresholds and notifications

## Uptime Monitoring
- Public healthcheck: `GET /api/health` returns status, uptime, timestamp
- Configure external monitors (e.g., UptimeRobot, Pingdom) targeting `https://<domain>/api/health`

## Logging Verification
- Ensure reverse proxy (Nginx) access logs enabled
- Application logs via PM2: `pm2 logs m42k3d`, configure log rotation

## Alerting Channels
- Send alerts to Slack/Email/Webhooks for high-severity incidents
- Define on-call rotation and escalation policies

