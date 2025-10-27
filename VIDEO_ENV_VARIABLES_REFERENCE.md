# Video Environment Variables Reference

## Complete Environment Variables for Video Structure

### Current `.env.local` Configuration

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

## Video-Specific Environment Variables

### 1. **NEXT_PUBLIC_BANNER_VIDEO_URL**

**Purpose:** Hero section background video

**Current Value:** `/banners/lamp-banner.mp4`

**File Location:** `public/banners/lamp-banner.mp4`

**Specifications:**
- Format: MP4 (H.264 codec)
- Resolution: 2880 × 1200 px (or 1920 × 800 px minimum)
- File size: 5-10 MB recommended
- Duration: 5-15 seconds (loops continuously)
- Audio: None (muted)

**Usage in Code:** `app/page.tsx` (lines 67-77)

**Fallback:** If not set, displays `/banners/lamp-banner.png` image

---

### 2. **NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL**

**Purpose:** Featured product video (currently unused - see note below)

**Current Value:** `/products/featured-product.mp4`

**File Location:** `public/products/featured-product.mp4`

**Specifications:**
- Format: MP4 (H.264 codec)
- Resolution: 400 × 400 px (or 500 × 500 px for retina)
- File size: 2-5 MB recommended
- Duration: 5-10 seconds
- Audio: None (muted)

**Note:** This variable is defined but not currently used. The featured product uses a hardcoded array instead.

---

## Featured Product Sequential Playback

### Current Implementation

The featured product video uses a **hardcoded array** in `app/page.tsx`:

```typescript
const featuredProductVideos = [
  '/products/featured-product.mp4',
];
```

### To Add Multiple Videos

**Option 1: Update the array in `app/page.tsx`**

```typescript
const featuredProductVideos = [
  '/products/featured-product-1.mp4',
  '/products/featured-product-2.mp4',
  '/products/featured-product-3.mp4',
];
```

**Option 2: Use environment variables (recommended for production)**

Add to `.env.local`:

```env
NEXT_PUBLIC_FEATURED_VIDEOS_1=/products/featured-product-1.mp4
NEXT_PUBLIC_FEATURED_VIDEOS_2=/products/featured-product-2.mp4
NEXT_PUBLIC_FEATURED_VIDEOS_3=/products/featured-product-3.mp4
```

Then in `app/page.tsx`:

```typescript
const featuredProductVideos = [
  process.env.NEXT_PUBLIC_FEATURED_VIDEOS_1,
  process.env.NEXT_PUBLIC_FEATURED_VIDEOS_2,
  process.env.NEXT_PUBLIC_FEATURED_VIDEOS_3,
].filter(Boolean);
```

---

## File Structure

```
public/
├── banners/
│   ├── lamp-banner.mp4          (Hero background video)
│   └── lamp-banner.png          (Fallback image)
└── products/
    ├── featured-product.mp4     (Featured product video)
    ├── featured-product-1.mp4   (Optional: for sequential playback)
    ├── featured-product-2.mp4   (Optional: for sequential playback)
    └── featured-product-3.mp4   (Optional: for sequential playback)
```

---

## Deployment to Vercel

### Step 1: Add Environment Variables in Vercel Dashboard

1. Go to your Vercel project
2. Click **Settings > Environment Variables**
3. Add these variables:

```
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

### Step 2: Upload Video Files

1. Commit video files to your repository:
   ```bash
   git add public/banners/lamp-banner.mp4
   git add public/products/featured-product.mp4
   git commit -m "feat: add video files for hero and featured product"
   git push origin main
   ```

2. Vercel will automatically serve them from the CDN

---

## Testing Videos Locally

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000

# Check:
# 1. Hero section - banner video should play in background
# 2. Featured product - video should play in rounded container
# 3. Both should be muted and looping
# 4. Open F12 console for any errors
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Videos not playing | Check file paths in `.env.local` match actual files |
| Black screen | Verify video files exist in `public/` folder |
| Console errors | Check browser console (F12) for specific errors |
| Autoplay fails | Ensure videos are muted (required for autoplay) |
| File not found | Verify file names are case-sensitive |

---

## Summary

**Required Environment Variables for Video Structure:**

1. ✅ `NEXT_PUBLIC_BANNER_VIDEO_URL` - Hero background video
2. ✅ `NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL` - Featured product video (optional)
3. ✅ `NEXT_PUBLIC_SITE_URL` - Site URL (used for redirects)
4. ✅ `NEXT_PUBLIC_SITE_NAME` - Site name

**All variables are already configured in your `.env.local`**

Last Updated: 2025-10-27

