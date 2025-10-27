# Video Playback Setup Guide

## Overview
This guide helps you set up video playback for:
1. **Hero Banner Video** - Background video in the hero section
2. **Featured Product Video** - Spotlight product showcase video

---

## ✅ Current Status

### Environment Variables Added
Your `.env.local` now includes:
```
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

### Code Configuration
- ✅ Hero banner video support implemented
- ✅ Featured product video support implemented
- ✅ Both videos set to autoplay, muted, loop, and playsInline
- ✅ Fallback to images if videos not found

---

## 📁 Required File Locations

### Banner Video
**Location:** `public/banners/lamp-banner.mp4`
**Specifications:**
- Format: MP4 (H.264 codec)
- Resolution: 2880 × 1200 px (or 1920 × 800 px minimum)
- File size: 5-10 MB recommended
- Duration: 5-15 seconds (will loop)
- Audio: None (muted)

### Featured Product Video
**Location:** `public/products/featured-product.mp4`
**Specifications:**
- Format: MP4 (H.264 codec)
- Resolution: 400 × 400 px (or 500 × 500 px for retina)
- File size: 2-5 MB recommended
- Duration: 5-10 seconds (will loop)
- Audio: None (muted)

---

## 🚀 Setup Steps

### Step 1: Prepare Your Videos
1. Convert your videos to MP4 format if needed
2. Ensure videos are muted (no audio track)
3. Optimize file size using tools like:
   - FFmpeg: `ffmpeg -i input.mp4 -c:v libx264 -crf 23 output.mp4`
   - HandBrake (GUI tool)
   - Online compressors

### Step 2: Place Video Files
1. **Banner video:** Save to `public/banners/lamp-banner.mp4`
2. **Featured product video:** Save to `public/products/featured-product.mp4`

### Step 3: Verify Environment Variables
Check `.env.local` contains:
```
NEXT_PUBLIC_BANNER_VIDEO_URL=/banners/lamp-banner.mp4
NEXT_PUBLIC_SPOTLIGHT_VIDEO_URL=/products/featured-product.mp4
```

### Step 4: Restart Development Server
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test Videos
1. Open http://localhost:3000
2. Check hero section - banner video should play
3. Check featured product - video should play in rounded container
4. Both should be muted and looping

---

## 🔍 Troubleshooting

### Videos Not Playing

**Problem:** Videos show as black/blank
**Solutions:**
1. Check file paths are correct
2. Verify videos are valid MP4 files
3. Check browser console for errors (F12 → Console)
4. Try different video codec (H.264 is most compatible)

**Problem:** Videos play but with sound
**Solutions:**
1. Ensure videos are muted before uploading
2. Use FFmpeg to remove audio: `ffmpeg -i input.mp4 -c:v copy -an output.mp4`

**Problem:** Videos don't autoplay
**Solutions:**
1. Restart dev server after adding videos
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try incognito/private window
4. Check browser autoplay policies (some browsers restrict autoplay)

**Problem:** Fallback images show instead of videos
**Solutions:**
1. Verify environment variables are set in `.env.local`
2. Restart dev server
3. Check file paths match exactly
4. Verify video files exist in correct locations

### Performance Issues

**Problem:** Page loads slowly
**Solutions:**
1. Reduce video file size (target: 5-10 MB for banner, 2-5 MB for product)
2. Use lower resolution if possible
3. Compress videos more aggressively

---

## 📝 Code Reference

### Hero Banner Video Code
Location: `app/page.tsx` (lines 59-69)
```tsx
{process.env.NEXT_PUBLIC_BANNER_VIDEO_URL ? (
  <video
    autoPlay
    muted
    loop
    playsInline
    poster="/banners/lamp-banner.png"
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src={process.env.NEXT_PUBLIC_BANNER_VIDEO_URL} type="video/mp4" />
  </video>
) : (
  // Fallback to image
)}
```

### Featured Product Video Code
Location: `app/page.tsx` (lines 121-131)
```tsx
{spotlightVideo ? (
  <video
    autoPlay
    muted
    loop
    playsInline
    poster={spotlightImage}
    className="mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl ring-8 ring-white/5 shadow-2xl object-cover"
  >
    <source src={spotlightVideo} type="video/mp4" />
  </video>
) : (
  // Fallback to image
)}
```

---

## ✨ Features

✅ **Autoplay** - Videos start automatically when page loads
✅ **Muted** - No sound (required for autoplay in most browsers)
✅ **Loop** - Videos repeat continuously
✅ **Mobile-friendly** - `playsInline` attribute for mobile devices
✅ **Fallback** - Shows images if videos not found
✅ **Poster** - Shows image while video loads
✅ **Responsive** - Videos scale to fit containers

---

## 🎬 Video Recommendations

### Best Practices
- Keep videos short (5-15 seconds)
- Use high-quality source, then compress
- Test on multiple browsers
- Test on mobile devices
- Monitor file sizes

### Tools for Video Conversion
- **FFmpeg** (command line): Free, powerful
- **HandBrake** (GUI): User-friendly
- **CloudConvert** (online): No installation needed
- **Shotcut** (GUI): Free video editor

---

## 📞 Support

If videos still don't play after following these steps:
1. Check browser console for errors (F12)
2. Verify file paths in `.env.local`
3. Ensure videos are valid MP4 files
4. Try with a different video file
5. Check browser autoplay policies

---

## 🚀 Deployment

When deploying to Vercel:
1. Upload video files to `public/banners/` and `public/products/`
2. Add environment variables to Vercel project settings
3. Redeploy the application
4. Videos will be served from Vercel's CDN

---

Last Updated: 2025-10-27

