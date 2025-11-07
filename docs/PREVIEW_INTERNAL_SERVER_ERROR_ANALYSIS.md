# Preview Internal Server Error: Analysis and Resolution

This document captures the investigation, root cause, and fixes applied for 500 Internal Server Error occurrences during preview mode on the modern homepage and API routes.

## Summary

- Affected endpoints initially returned `HTTP/1.1 500 Internal Server Error` in preview:
  - `/modern-home?theme=soft` and `/` (home)
  - `/mockups/home`
  - `/api/products`
- After restarting the dev server in the correct project directory, page routes returned `200` or `307` as expected.
- `/api/products` continued to return `500` due to Supabase connectivity errors and missing/invalid env configuration; we implemented a preview-only fallback to return an empty list with `200`.

## Timeline and Evidence

- Initial failures (timestamps in server logs): repeated `ENOENT: no such file or directory` errors referencing `.next/static/development` manifest files.
- Curl verification pre-fix:
  - `/modern-home?theme=soft` → `500 Internal Server Error`
  - `/` → `500 Internal Server Error`
  - `/admin` → `307 Temporary Redirect` to `/admin/login`
  - `/api/products` → `500 {"error":"TypeError: fetch failed"}`
- After restart:
  - `/modern-home?theme=soft` → `200 OK`
  - `/` → `307 Temporary Redirect` to `/modern-home?theme=soft` with `soft_rollout_v1` cookie
  - `/api/products` → still `500` (Supabase fetch failed)
- After API fix:
  - `/api/products` → `200 OK {"products":[],"total":0}`

## Root Causes

1. Dev server state and temporary manifest files became inconsistent, causing `ENOENT` errors and 500s on page routes.
2. Supabase admin client requests failed with `TypeError: fetch failed` due to missing or invalid environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - (Additionally required for auth flows) `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Fixes Applied

- Restarted the dev server in the correct working directory (`m42k3d.shop`) with `NEXT_PUBLIC_SOFT_ROLLOUT_PERCENT=10`.
- Implemented preview-only fallback in `app/api/products/route.ts`:
  - If Supabase env is missing, return `{ products: [], total: 0 }` with `200`.
  - If Supabase fetch fails (e.g., network or invalid key) in development, return empty list with `200` and log a warning.
- Verified middleware soft rollout and route behavior: `/` returns `307` to `/modern-home?theme=soft` with cookie stickiness.

## Recommended Permanent Actions

- Ensure valid environment configuration for preview and production:
  - `NEXT_PUBLIC_SUPABASE_URL` (e.g., `https://<project>.supabase.co`)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (server-only)
- Consider adding runtime env guards in middleware to skip Supabase session refresh when env vars are missing in preview.
- For CI/preview environments without DB access, keep preview-safe fallbacks for non-critical APIs.

## Verification Steps

- `npm ls --depth=0` returned successfully with no missing dependencies.
- `curl` checks confirm expected statuses:
  - `/modern-home?theme=soft` → `200`
  - `/` → `307` to modern home with cookie
  - `/admin` → `307` to login
  - `/api/products` → `200` with empty payload in preview

## Monitoring

- Watch dev server logs for `ENOENT` or Supabase connection errors.
- Once env variables are set, re-test `/api/products` to confirm real data retrieval and remove reliance on the fallback.

