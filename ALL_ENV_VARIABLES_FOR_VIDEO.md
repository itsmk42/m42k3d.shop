# All Environment Variables for Video Structure

## 📋 Complete List - Copy & Paste Ready

### Your Current `.env.local` (All Variables)

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ijviarfucnpjakjknzzs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqdmlhcmZ1Y25wamFramtuenpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTcwNTEsImV4cCI6MjA3NDc5MzA1MX0.4BOvglXpEsdxzrjivYnh0p6EuPZWex7F1Oj_cEn_k3g
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqdmlhcmZ1Y25wamFramtuenpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTIxNzA1MSwiZXhwIjoyMDc0NzkzMDUxfQ.Clp7KpQzMEb_rwermQrBk_vFt2l-KhF7C5dJhky6VZQ

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://m42k3d-shop-jqzt.vercel.app
NEXT_PUBLIC_SITE_NAME=SparkleSphere.store

# Video Configuration
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

---

## 🎬 Video-Specific Variables Only

```env
# Hero banner background video (loops continuously)
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4

# Featured product video (sequential playback - add more URLs for multiple videos)
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

---

## 📊 Variable Breakdown

### 1. NEXT_PUBLIC_BANNER_VIDEO_URL
```
Name:     NEXT_PUBLIC_BANNER_VIDEO_URL
Value:    /banners/lamp-banner.mp4
Type:     Public (visible in browser)
Purpose:  Hero section background video
File:     public/banners/lamp-banner.mp4
Used In:  app/page.tsx (lines 67-77)
Fallback: /banners/lamp-banner.png
```

### 2. NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL
```
Name:     NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL
Value:    /products/featured-product.mp4
Type:     Public (visible in browser)
Purpose:  Featured product video (optional)
File:     public/products/featured-product.mp4
Used In:  Defined but optional
Note:     Uses hardcoded array in app/page.tsx instead
```

### 3. NEXT_PUBLIC_SITE_URL
```
Name:     NEXT_PUBLIC_SITE_URL
Value:    https://m42k3d-shop-jqzt.vercel.app
Type:     Public
Purpose:  Site URL for redirects and callbacks
Used In:  Auth callbacks, email redirects
```

### 4. NEXT_PUBLIC_SITE_NAME
```
Name:     NEXT_PUBLIC_SITE_NAME
Value:    SparkleSphere.store
Type:     Public
Purpose:  Site name for branding
Used In:  Header, metadata, emails
```

---

## 🔐 All 10 Environment Variables

| # | Variable | Type | Status |
|---|----------|------|--------|
| 1 | NEXT_PUBLIC_BANNER_VIDEO_URL | Public | ✅ Configured |
| 2 | NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL | Public | ✅ Configured |
| 3 | NEXT_PUBLIC_SITE_URL | Public | ✅ Configured |
| 4 | NEXT_PUBLIC_SITE_NAME | Public | ✅ Configured |
| 5 | NEXT_PUBLIC_SUPABASE_URL | Public | ✅ Configured |
| 6 | NEXT_PUBLIC_SUPABASE_ANON_KEY | Public | ✅ Configured |
| 7 | SUPABASE_SERVICE_ROLE_KEY | Secret | ✅ Configured |
| 8 | NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Public | ⚠️ Placeholder |
| 9 | STRIPE_SECRET_KEY | Secret | ⚠️ Placeholder |
| 10 | STRIPE_WEBHOOK_SECRET | Secret | ⚠️ Placeholder |

---

## 📁 File Locations

```
public/
├── banners/
│   ├── lamp-banner.mp4          ← NEXT_PUBLIC_BANNER_VIDEO_URL
│   └── lamp-banner.png          ← Fallback image
└── products/
    └── featured-product.mp4     ← NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL
```

---

## 🎯 For Sequential Video Playback

### Add Multiple Videos

**In `app/page.tsx` (lines 51-56):**

```typescript
// Single video (current)
const featuredProductVideos = [
  '/products/featured-product.mp4',
];

// Multiple videos (sequential playback)
const featuredProductVideos = [
  '/products/video-1.mp4',
  '/products/video-2.mp4',
  '/products/video-3.mp4',
];
```

**Or use environment variables:**

```env
NEXT_PUBLIC_FEATURED_VIDEO_1=/products/video-1.mp4
NEXT_PUBLIC_FEATURED_VIDEO_2=/products/video-2.mp4
NEXT_PUBLIC_FEATURED_VIDEO_3=/products/video-3.mp4
```

---

## ✅ Checklist

- [x] NEXT_PUBLIC_BANNER_VIDEO_URL configured
- [x] NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL configured
- [x] NEXT_PUBLIC_SITE_URL configured
- [x] NEXT_PUBLIC_SITE_NAME configured
- [x] All Supabase variables configured
- [x] Stripe variables added (placeholders)
- [ ] Video files placed in public/banners/
- [ ] Video files placed in public/products/
- [ ] Dev server restarted
- [ ] Videos tested locally

---

## 🚀 Next Steps

1. **Place video files:**
   ```bash
   cp your-banner.mp4 public/banners/lamp-banner.mp4
   cp your-product.mp4 public/products/featured-product.mp4
   ```

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **Test at:** http://localhost:3000

4. **For production:** Add same variables to Vercel project settings

---

## 📚 Documentation Files

- `VIDEO_ENV_VARIABLES_REFERENCE.md` - Detailed reference
- `VIDEO_ENV_QUICK_REFERENCE.md` - Quick lookup
- `ENV_VARIABLES_COMPLETE_TABLE.md` - Complete table
- `VIDEO_SETUP_COMPLETE.md` - Full setup guide
- `ALL_ENV_VARIABLES_FOR_VIDEO.md` - This file

---

**Status:** ✅ All environment variables configured and ready

Last Updated: 2025-10-27

