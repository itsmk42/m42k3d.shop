# Video Environment Variables - Quick Reference

## ✅ All Environment Variables You Need

### Copy-Paste Ready for `.env.local`

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

# Video Configuration (FOR VIDEO PLAYBACK)
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

---

## 🎬 Video-Specific Variables Explained

### 1. NEXT_PUBLIC_BANNER_VIDEO_URL
- **What:** Hero section background video
- **Value:** `/banners/lamp-banner.mp4`
- **File Location:** `public/banners/lamp-banner.mp4`
- **Used In:** `app/page.tsx` (hero section)

### 2. NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL
- **What:** Featured product video (currently optional)
- **Value:** `/products/featured-product.mp4`
- **File Location:** `public/products/featured-product.mp4`
- **Used In:** Defined but not actively used (uses hardcoded array instead)

---

## 📁 Required File Locations

```
public/
├── banners/
│   └── lamp-banner.mp4          ← Hero background video
└── products/
    └── featured-product.mp4     ← Featured product video
```

---

## 🚀 For Sequential Video Playback

### Current Setup (Single Video)
```typescript
// app/page.tsx
const featuredProductVideos = [
  '/products/featured-product.mp4',
];
```

### For Multiple Videos
```typescript
// app/page.tsx
const featuredProductVideos = [
  '/products/featured-product-1.mp4',
  '/products/featured-product-2.mp4',
  '/products/featured-product-3.mp4',
];
```

---

## 📋 Checklist

- [x] `NEXT_PUBLIC_BANNER_VIDEO_URL` - Set to `/banners/lamp-banner.mp4`
- [x] `NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL` - Set to `/products/featured-product.mp4`
- [x] `NEXT_PUBLIC_SITE_URL` - Set to your site URL
- [x] `NEXT_PUBLIC_SITE_NAME` - Set to your site name
- [ ] Video files placed in `public/banners/` and `public/products/`
- [ ] Dev server restarted after adding env vars
- [ ] Videos tested locally at http://localhost:3000

---

## 🔗 Related Files

- **Homepage:** `app/page.tsx`
- **Video Component:** `components/home/FeaturedProductVideo.tsx`
- **Configuration:** `.env.local`
- **Documentation:** `VIDEO_ENV_VARIABLES_REFERENCE.md`

---

## ⚡ Quick Start

1. **Ensure `.env.local` has these two lines:**
   ```env
   NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4
   NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
   ```

2. **Place video files:**
   - `public/banners/lamp-banner.mp4`
   - `public/products/featured-product.mp4`

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

4. **Test at:** http://localhost:3000

---

**Status:** ✅ All environment variables configured and ready to use

Last Updated: 2025-10-27

