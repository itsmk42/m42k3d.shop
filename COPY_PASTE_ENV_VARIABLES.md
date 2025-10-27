# Copy-Paste Environment Variables

## 🎬 Video Environment Variables - Ready to Copy

### Just the Video Variables

```env
# Hero banner background video (loops continuously)
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4

# Featured product video (sequential playback - add more URLs for multiple videos)
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

---

## 📋 All Environment Variables (Complete)

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

## 🎯 For Vercel Deployment

Add these to Vercel project settings > Environment Variables:

```
Variable 1:
Name: NEXT_PUBLIC_BANNER_VIDEO_URL
Value: /banners/lamp-banner.mp4
Environments: Production, Preview, Development

Variable 2:
Name: NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL
Value: /products/featured-product.mp4
Environments: Production, Preview, Development

Variable 3:
Name: NEXT_PUBLIC_SITE_URL
Value: https://m42k3d-shop-jqzt.vercel.app
Environments: Production, Preview, Development

Variable 4:
Name: NEXT_PUBLIC_SITE_NAME
Value: SparkleSphere.store
Environments: Production, Preview, Development
```

---

## 🔄 For Multiple Sequential Videos

If you want to add more videos, update `app/page.tsx`:

```typescript
// Current (single video)
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

---

## 📁 File Paths to Use

```
Banner Video:
/banners/lamp-banner.mp4

Featured Product Video:
/products/featured-product.mp4

Additional Videos (optional):
/products/video-1.mp4
/products/video-2.mp4
/products/video-3.mp4
```

---

## ✅ Verification

Your `.env.local` should contain:

```bash
# Check if variables are set
grep "NEXT_PUBLIC_BANNER_VIDEO_URL" .env.local
grep "NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL" .env.local
```

Expected output:
```
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

---

## 🚀 Quick Setup

1. **Copy the video variables above**
2. **Paste into `.env.local`**
3. **Place video files in `public/` folders**
4. **Restart dev server: `npm run dev`**
5. **Test at: `http://localhost:3000`**

---

**Status:** ✅ Ready to use

Last Updated: 2025-10-27

