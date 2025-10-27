# Sequential Video Playback Feature Guide

## Overview

The featured product section on the homepage now supports **sequential video playback**. Multiple videos play one after another in a continuous loop, creating a dynamic showcase for your featured products.

**Key Features:**
- ✅ Automatic video switching when one ends
- ✅ Continuous loop (restarts from first video after last one)
- ✅ Easy to add more videos
- ✅ Smooth playback without flickering
- ✅ Fallback to static image if videos unavailable
- ✅ Fully responsive (mobile & desktop)
- ✅ TypeScript support with proper types

---

## 📁 File Structure

### New Component
```
components/home/FeaturedProductVideo.tsx
```
- Client component managing sequential video playback
- Handles video switching logic
- Maintains styling and responsiveness

### Updated Files
```
app/page.tsx
```
- Imports new FeaturedProductVideo component
- Defines video URLs array
- Passes props to component

---

## 🎬 Video Setup

### File Naming Convention

Place your videos in `public/products/` with this naming pattern:

```
public/products/
├── featured-product-1.mp4
├── featured-product-2.mp4
├── featured-product-3.mp4
└── featured-product-4.mp4  (optional, add as many as needed)
```

### Video Specifications

**Format:** MP4 (H.264 codec)
**Resolution:** 400×400px (or 500×500px for retina displays)
**File Size:** 2-5 MB per video recommended
**Duration:** 5-10 seconds per video
**Audio:** None (videos are muted)

### Video Conversion

Use FFmpeg to convert videos:

```bash
# Basic conversion
ffmpeg -i input.mov -c:v libx264 -preset medium -crf 23 -c:a aac output.mp4

# Optimized for web
ffmpeg -i input.mov -c:v libx264 -preset fast -crf 28 -s 500x500 output.mp4
```

---

## 🔧 How It Works

### Component Logic

```typescript
// 1. Track current video index
const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

// 2. When video ends, switch to next
const handleVideoEnd = () => {
  setCurrentVideoIndex((prev) => (prev + 1) % videoUrls.length);
};

// 3. Reset and play when index changes
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  }
}, [currentVideoIndex]);
```

### Playback Flow

```
Video 1 (5s) → onEnded fires → Switch to Video 2
Video 2 (5s) → onEnded fires → Switch to Video 3
Video 3 (5s) → onEnded fires → Switch to Video 1 (loop)
```

---

## 📝 Usage

### Adding Videos

Edit `app/page.tsx` and update the video array:

```typescript
const featuredProductVideos = [
  '/products/featured-product-1.mp4',
  '/products/featured-product-2.mp4',
  '/products/featured-product-3.mp4',
  '/products/featured-product-4.mp4',  // Add more videos here
];
```

### Component Props

```typescript
interface FeaturedProductVideoProps {
  videoUrls: string[];        // Array of video URLs
  posterImage: string;        // Fallback image URL
  className?: string;         // Optional CSS classes
}
```

### Example Usage

```tsx
<FeaturedProductVideo
  videoUrls={featuredProductVideos}
  posterImage={spotlightImage}
  className="mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl ring-8 ring-white/5 shadow-2xl object-cover"
/>
```

---

## 🎨 Styling

### Current Styling

- **Mobile:** 288px × 288px (h-72 w-72)
- **Desktop:** 384px × 384px (h-96 w-96)
- **Border Radius:** 24px (rounded-3xl)
- **Ring:** 8px white with 5% opacity
- **Shadow:** Extra large shadow effect
- **Decorative Background:** Gradient blur effect

### Customization

Modify the `className` prop to change styling:

```tsx
<FeaturedProductVideo
  videoUrls={featuredProductVideos}
  posterImage={spotlightImage}
  className="mx-auto h-80 w-80 sm:h-[28rem] sm:w-[28rem] rounded-2xl ring-4 shadow-lg"
/>
```

---

## 🚀 Deployment

### Local Testing

1. Place video files in `public/products/`
2. Run dev server: `npm run dev`
3. Visit http://localhost:3000
4. Videos should play sequentially in hero section

### Vercel Deployment

1. Upload video files to `public/products/` in your repository
2. Push to GitHub
3. Vercel auto-deploys
4. Videos served from Vercel's CDN

---

## 🔍 Troubleshooting

### Videos Not Playing

**Issue:** Videos don't play or show black screen

**Solutions:**
1. Check file paths in `app/page.tsx`
2. Verify video files exist in `public/products/`
3. Check browser console for errors (F12)
4. Ensure videos are valid MP4 files
5. Try with a different video file

### Autoplay Not Working

**Issue:** Videos don't autoplay

**Solutions:**
1. Videos must be muted (already configured)
2. Check browser autoplay policies
3. Try in incognito/private mode
4. Check browser console for warnings

### Flickering Between Videos

**Issue:** Screen flickers when switching videos

**Solutions:**
1. Ensure videos have similar dimensions
2. Use same codec for all videos
3. Check video file integrity
4. Try re-encoding videos

### Performance Issues

**Issue:** Slow playback or stuttering

**Solutions:**
1. Reduce video file size (compress more)
2. Lower video resolution
3. Reduce video duration
4. Check internet connection speed

---

## 📊 Performance Tips

1. **Optimize Video Size**
   - Target 2-3 MB per video
   - Use H.264 codec
   - 500×500px resolution

2. **Use CDN**
   - Vercel automatically serves from CDN
   - Videos cached globally

3. **Preload Next Video**
   - Component automatically handles this
   - No additional configuration needed

4. **Monitor Performance**
   - Check Network tab in DevTools
   - Monitor video load times
   - Check CPU usage during playback

---

## 🔄 Extending the Feature

### Add More Videos

Simply add more URLs to the array:

```typescript
const featuredProductVideos = [
  '/products/featured-product-1.mp4',
  '/products/featured-product-2.mp4',
  '/products/featured-product-3.mp4',
  '/products/featured-product-4.mp4',
  '/products/featured-product-5.mp4',
];
```

### Add Video Indicators

You could enhance the component to show which video is playing:

```tsx
<div className="flex gap-2 justify-center mt-4">
  {videoUrls.map((_, index) => (
    <div
      key={index}
      className={`h-2 w-2 rounded-full ${
        index === currentVideoIndex ? 'bg-red-500' : 'bg-gray-400'
      }`}
    />
  ))}
</div>
```

### Add Manual Controls

Add buttons to skip to next/previous video:

```tsx
<button onClick={() => setCurrentVideoIndex((prev) => (prev + 1) % videoUrls.length)}>
  Next Video
</button>
```

---

## 📞 Support

If you encounter issues:

1. Check browser console (F12) for errors
2. Verify video file paths
3. Ensure videos are valid MP4 files
4. Check file permissions
5. Try with a different video file

---

## 🎉 Summary

The sequential video playback feature is now live! Your featured product section will automatically cycle through multiple videos, creating a dynamic and engaging showcase.

**Next Steps:**
1. ✅ Add your video files to `public/products/`
2. ✅ Update video URLs in `app/page.tsx` if needed
3. ✅ Test locally with `npm run dev`
4. ✅ Deploy to Vercel
5. ✅ Monitor performance

---

**Last Updated:** 2025-10-27
**Component:** `components/home/FeaturedProductVideo.tsx`
**Status:** ✅ Production Ready

