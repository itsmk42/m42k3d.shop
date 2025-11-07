#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   PROD_HOST=server.example.com \
#   PROD_USER=deployer \
#   PROD_PATH=/var/www/m42k3d.shop \
#   PROD_PORT=22 \
#   ./scripts/deploy.sh release/soft_home_rollout.tar.gz

PKG=${1:-}
if [[ -z "$PKG" ]]; then
  echo "Provide deployment package tar.gz as first argument" >&2
  exit 1
fi

: "${PROD_HOST:?Set PROD_HOST}" "${PROD_USER:?Set PROD_USER}" "${PROD_PATH:?Set PROD_PATH}" "${PROD_PORT:=22}"

echo "[Deploy] Uploading package $PKG to $PROD_USER@$PROD_HOST:$PROD_PATH";
scp -P "$PROD_PORT" "$PKG" "$PROD_USER@$PROD_HOST:$PROD_PATH/";

REMOTE_CMDS='set -e; \
  cd '"$PROD_PATH"'; \
  echo "[Deploy] Stopping existing service (if any)"; \
  pm2 stop m42k3d || true; \
  echo "[Deploy] Unpacking package"; \
  tar -xzf soft_home_rollout.tar.gz; \
  echo "[Deploy] Installing dependencies"; \
  npm ci --omit=dev; \
  echo "[Deploy] Starting app"; \
  APP_VERSION=soft-rollout-v1 NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT=${NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT:-10} \
  pm2 start npm --name m42k3d -- start; \
  pm2 save; \
  echo "[Deploy] Completed"'

ssh -p "$PROD_PORT" "$PROD_USER@$PROD_HOST" "$REMOTE_CMDS"

