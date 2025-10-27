# Complete Environment Variables Table

## All Environment Variables for Video Structure

| Variable Name | Value | Type | Purpose | File Location | Used In |
|---|---|---|---|---|---|
| **NEXT_PUBLIC_BANNER_VIDEO_URL** | `/banners/lamp-banner.mp4` | Public | Hero section background video | `public/banners/lamp-banner.mp4` | `app/page.tsx` (lines 67-77) |
| **NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL** | `/products/featured-product.mp4` | Public | Featured product video | `public/products/featured-product.mp4` | Defined but optional |
| **NEXT_PUBLIC_SITE_URL** | `https://m42k3d-shop-jqzt.vercel.app` | Public | Site URL for redirects | N/A | Auth callbacks, email redirects |
| **NEXT_PUBLIC_SITE_NAME** | `SparkleSphere.store` | Public | Site name for branding | N/A | Header, metadata |
| **NEXT_PUBLIC_SUPABASE_URL** | `https://ijviarfucnpjakjknzzs.supabase.co` | Public | Supabase project URL | N/A | Database connections |
| **NEXT_PUBLIC_SUPABASE_ANON_KEY** | `eyJhbGc...` | Public | Supabase anonymous key | N/A | Client-side auth |
| **SUPABASE_SERVICE_ROLE_KEY** | `eyJhbGc...` | Secret | Supabase service role key | N/A | Server-side operations |
| **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** | `your_stripe_publishable_key` | Public | Stripe public key | N/A | Payment processing |
| **STRIPE_SECRET_KEY** | `your_stripe_secret_key` | Secret | Stripe secret key | N/A | Server-side payments |
| **STRIPE_WEBHOOK_SECRET** | `your_stripe_webhook_secret` | Secret | Stripe webhook secret | N/A | Webhook verification |

---

## Video-Specific Variables (Highlighted)

### 🎬 For Hero Section Background Video

```env
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4
```

**Details:**
- **Type:** Public (visible in browser)
- **Format:** MP4 (H.264)
- **Resolution:** 2880 × 1200 px (or 1920 × 800 px minimum)
- **Size:** 5-10 MB recommended
- **Duration:** 5-15 seconds (loops)
- **Audio:** None (muted)
- **Fallback:** `/banners/lamp-banner.png`

---

### 🎥 For Featured Product Video

```env
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

**Details:**
- **Type:** Public (visible in browser)
- **Format:** MP4 (H.264)
- **Resolution:** 400 × 400 px (or 500 × 500 px for retina)
- **Size:** 2-5 MB recommended
- **Duration:** 5-10 seconds
- **Audio:** None (muted)
- **Note:** Currently optional - uses hardcoded array in `app/page.tsx`

---

## Sequential Playback Configuration

### Current Implementation

**File:** `app/page.tsx` (lines 51-56)

```typescript
const featuredProductVideos = [
  '/products/featured-product.mp4',
];
```

### To Add Multiple Videos

**Option A: Direct Array (Simple)**
```typescript
const featuredProductVideos = [
  '/products/video-1.mp4',
  '/products/video-2.mp4',
  '/products/video-3.mp4',
];
```

**Option B: Environment Variables (Recommended)**

Add to `.env.local`:
```env
NEXT_PUBLIC_FEATURED_VIDEO_1=/products/video-1.mp4
NEXT_PUBLIC_FEATURED_VIDEO_2=/products/video-2.mp4
NEXT_PUBLIC_FEATURED_VIDEO_3=/products/video-3.mp4
```

Then in `app/page.tsx`:
```typescript
const featuredProductVideos = [
  process.env.NEXT_PUBLIC_FEATURED_VIDEO_1,
  process.env.NEXT_PUBLIC_FEATURED_VIDEO_2,
  process.env.NEXT_PUBLIC_FEATURED_VIDEO_3,
].filter(Boolean);
```

---

## File Structure Required

```
public/
├── banners/
│   ├── lamp-banner.mp4          ✅ Required
│   └── lamp-banner.png          ✅ Fallback image
└── products/
    ├── featured-product.mp4     ✅ Required
    ├── featured-product-1.mp4   ⭕ Optional (for multiple videos)
    ├── featured-product-2.mp4   ⭕ Optional (for multiple videos)
    └── featured-product-3.mp4   ⭕ Optional (for multiple videos)
```

---

## Deployment Checklist

### Local Development
- [x] `.env.local` created with all variables
- [x] Video files placed in `public/` folders
- [x] Dev server restarted
- [x] Videos tested at http://localhost:3000

### Vercel Deployment
- [ ] Push code to GitHub
- [ ] Go to Vercel project settings
- [ ] Add environment variables:
  - `NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4`
  - `NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4`
  - `NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app`
  - `NEXT_PUBLIC_SITE_NAME=SparkleSphere.store`
- [ ] Commit video files to repository
- [ ] Trigger redeploy
- [ ] Verify videos play on production

---

## Summary

**Total Environment Variables:** 10

**Video-Specific:** 2
- `NEXT_PUBLIC_BANNER_VIDEO_URL`
- `NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL`

**Site Configuration:** 2
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`

**Supabase:** 3
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Stripe:** 3
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

---

**Status:** ✅ All variables configured in `.env.local`

Last Updated: 2025-10-27

