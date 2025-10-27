# Video Setup - Complete Guide

## ✅ Your Video Structure is Ready!

All environment variables for video playback are configured and ready to use.

---

## 🎬 Environment Variables Summary

### Video Configuration (2 variables)

```env
# Hero section background video
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4

# Featured product video (sequential playback)
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

### Site Configuration (2 variables)

```env
NEXT_PUBLIC_SITE_URL=https://m42k3d-shop-jqzt.vercel.app
NEXT_PUBLIC_SITE_NAME=SparkleSphere.store
```

### Backend Configuration (5 variables)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ijviarfucnpjakjknzzs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

---

## 📁 Required File Structure

```
public/
├── banners/
│   ├── lamp-banner.mp4          ← Hero background video
│   └── lamp-banner.png          ← Fallback image
└── products/
    └── featured-product.mp4     ← Featured product video
```

---

## 🎯 How Videos Work

### Hero Banner Video
- **Location:** Hero section background
- **Behavior:** Loops continuously
- **Env Var:** `NEXT_PUBLIC_BANNER_VIDEO_URL`
- **File:** `public/banners/lamp-banner.mp4`
- **Code:** `app/page.tsx` (lines 67-77)

### Featured Product Video
- **Location:** Spotlight product showcase
- **Behavior:** Sequential playback (loops through array)
- **Env Var:** `NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL` (optional)
- **File:** `public/products/featured-product.mp4`
- **Code:** `app/page.tsx` (lines 51-56) + `components/home/FeaturedProductVideo.tsx`

---

## 🚀 Quick Start

### 1. Verify Environment Variables
```bash
# Check .env.local contains:
cat .env.local | grep NEXT_PUBLIC_BANNER_VIDEO_URL
cat .env.local | grep NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL
```

### 2. Place Video Files
```bash
# Banner video
cp your-banner.mp4 public/banners/lamp-banner.mp4

# Featured product video
cp your-product.mp4 public/products/featured-product.mp4
```

### 3. Restart Dev Server
```bash
npm run dev
```

### 4. Test Videos
- Open http://localhost:3000
- Hero section should show background video
- Featured product should show video in rounded container
- Both should be muted and looping

---

## 📊 Video Specifications

### Banner Video
| Property | Value |
|----------|-------|
| Format | MP4 (H.264) |
| Resolution | 2880 × 1200 px (or 1920 × 800 px min) |
| File Size | 5-10 MB recommended |
| Duration | 5-15 seconds |
| Audio | None (muted) |
| Loop | Yes |

### Featured Product Video
| Property | Value |
|----------|-------|
| Format | MP4 (H.264) |
| Resolution | 400 × 400 px (or 500 × 500 px retina) |
| File Size | 2-5 MB recommended |
| Duration | 5-10 seconds |
| Audio | None (muted) |
| Loop | Yes (sequential) |

---

## 🔄 Sequential Playback Setup

### Current (Single Video)
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
  '/products/video-1.mp4',
  '/products/video-2.mp4',
  '/products/video-3.mp4',
];
```

**How it works:**
1. Video 1 plays
2. When Video 1 ends → Video 2 starts
3. When Video 2 ends → Video 3 starts
4. When Video 3 ends → Loop back to Video 1

---

## 🌐 Deployment to Vercel

### Step 1: Add Environment Variables
1. Go to Vercel project settings
2. Click "Environment Variables"
3. Add these variables:

```
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
NEXT_PUBLIC_SITE_URL=https://your-vercel-url.vercel.app
NEXT_PUBLIC_SITE_NAME=SparkleSphere.store
```

### Step 2: Commit Video Files
```bash
git add public/banners/lamp-banner.mp4
git add public/products/featured-product.mp4
git commit -m "feat: add video files for hero and featured product"
git push origin main
```

### Step 3: Redeploy
- Vercel will auto-deploy
- Videos will be served from CDN
- Check production URL

---

## ✨ Features

✅ Hero banner video with fallback image
✅ Featured product sequential video playback
✅ Automatic video switching on end
✅ Muted autoplay (browser compatible)
✅ Responsive design
✅ Mobile-friendly (playsInline)
✅ Environment variable configuration
✅ Production-ready

---

## 📚 Related Documentation

- `VIDEO_ENV_VARIABLES_REFERENCE.md` - Detailed reference
- `VIDEO_ENV_QUICK_REFERENCE.md` - Quick lookup
- `ENV_VARIABLES_COMPLETE_TABLE.md` - Complete table
- `VIDEO_SETUP_GUIDE.md` - Original setup guide
- `VIDEO_PLAYBACK_TROUBLESHOOTING.md` - Troubleshooting

---

## 🎉 Status

**✅ All environment variables configured**
**✅ Video structure ready**
**✅ Sequential playback implemented**
**✅ Production-ready**

Your video playback system is fully set up and ready to use!

Last Updated: 2025-10-27

