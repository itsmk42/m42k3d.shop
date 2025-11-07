#!/usr/bin/env bash
set -euo pipefail

# Example rollback: restart previous PM2 process or swap symlink to last release

APP_NAME=${APP_NAME:-m42k3d}

echo "[Rollback] Attempting rollback for $APP_NAME"
pm2 list || true
pm2 restart "$APP_NAME" || true
pm2 logs "$APP_NAME" --lines 50 || true
echo "[Rollback] Done"

