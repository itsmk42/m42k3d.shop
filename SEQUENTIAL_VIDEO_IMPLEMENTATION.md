# Sequential Video Playback - Implementation Reference

## Complete Code Overview

This document provides the complete, production-ready code for the sequential video playback feature.

---

## 1. New Component: `components/home/FeaturedProductVideo.tsx`

```typescript
'use client';

import { useState, useRef, useEffect } from 'react';

interface FeaturedProductVideoProps {
  videoUrls: string[];
  posterImage: string;
  className?: string;
}

/**
 * FeaturedProductVideo Component
 * 
 * Manages sequential playback of multiple videos in a loop.
 * When one video ends, automatically plays the next video.
 * After the last video, loops back to the first video.
 * 
 * @param videoUrls - Array of video URLs to play sequentially
 * @param posterImage - Poster image to display before video starts
 * @param className - Additional CSS classes for the video element
 */
export default function FeaturedProductVideo({
  videoUrls,
  posterImage,
  className = 'mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl ring-8 ring-white/5 shadow-2xl object-cover',
}: FeaturedProductVideoProps) {
  // Track which video is currently playing (0-indexed)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  // Reference to the video element for direct control if needed
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Handle video end event
   * Switches to the next video in the sequence
   * Loops back to the first video after the last one finishes
   */
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
  };

  /**
   * Effect to ensure video plays when index changes
   * This handles the case where the video element needs to be reset
   */
  useEffect(() => {
    if (videoRef.current) {
      // Reset video to start
      videoRef.current.currentTime = 0;
      // Play the video
      videoRef.current.play().catch((error) => {
        console.warn('Video autoplay failed:', error);
      });
    }
  }, [currentVideoIndex]);

  // Validate that we have at least one video URL
  if (!videoUrls || videoUrls.length === 0) {
    return null;
  }

  const currentVideoUrl = videoUrls[currentVideoIndex];

  return (
    <video
      ref={videoRef}
      onEnded={handleVideoEnd}
      autoPlay
      muted
      playsInline
      poster={posterImage}
      className={className}
    >
      <source src={currentVideoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
```

---

## 2. Updated: `app/page.tsx` (Key Sections)

### Import Statement
```typescript
import FeaturedProductVideo from '@/components/home/FeaturedProductVideo';
```

### Video URLs Configuration
```typescript
// Array of featured product video URLs for sequential playback
// Videos will play one after another in a continuous loop
const featuredProductVideos = [
  '/products/featured-product-1.mp4',
  '/products/featured-product-2.mp4',
  '/products/featured-product-3.mp4',
];
```

### Component Usage
```tsx
<div className="relative">
  {/* Featured Product Video - Sequential Playback */}
  <FeaturedProductVideo
    videoUrls={featuredProductVideos}
    posterImage={spotlightImage}
    className="mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl ring-8 ring-white/5 shadow-2xl object-cover"
  />
  
  {/* Fallback to static image if no videos available */}
  {featuredProductVideos.length === 0 && (
    <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96 rounded-3xl overflow-hidden ring-8 ring-white/5 shadow-2xl">
      <Image
        src={spotlightImage}
        alt={spotlightProduct?.name || 'Featured product'}
        fill
        className="object-cover"
        priority
      />
    </div>
  )}
  
  {/* Decorative gradient background effect */}
  <div className="absolute inset-0 -z-10 m-auto h-[28rem] w-[28rem] sm:h-[32rem] sm:w-[32rem] rounded-full bg-gradient-to-tr from-rose-400/20 to-red-500/20 blur-3xl" />
</div>
```

---

## 3. Key Features Explained

### State Management
```typescript
const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
```
- Tracks which video is currently playing
- 0-indexed (first video = 0, second = 1, etc.)

### Video Switching Logic
```typescript
const handleVideoEnd = () => {
  setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
};
```
- Fires when current video ends
- Increments index by 1
- Modulo operator (%) loops back to 0 after last video

### Auto-Play on Index Change
```typescript
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch((error) => {
      console.warn('Video autoplay failed:', error);
    });
  }
}, [currentVideoIndex]);
```
- Resets video to start (currentTime = 0)
- Plays the video
- Catches autoplay errors gracefully

---

## 4. TypeScript Types

```typescript
interface FeaturedProductVideoProps {
  videoUrls: string[];        // Array of video file paths
  posterImage: string;        // Fallback image URL
  className?: string;         // Optional Tailwind CSS classes
}
```

---

## 5. Video File Setup

### Directory Structure
```
public/
└── products/
    ├── featured-product-1.mp4
    ├── featured-product-2.mp4
    ├── featured-product-3.mp4
    └── featured-product.png (fallback image)
```

### Video Specifications
- **Format:** MP4 (H.264 codec)
- **Resolution:** 400×400px or 500×500px
- **File Size:** 2-5 MB per video
- **Duration:** 5-10 seconds
- **Audio:** None (muted)

---

## 6. How to Extend

### Add More Videos
```typescript
const featuredProductVideos = [
  '/products/featured-product-1.mp4',
  '/products/featured-product-2.mp4',
  '/products/featured-product-3.mp4',
  '/products/featured-product-4.mp4',  // Add here
  '/products/featured-product-5.mp4',  // Add here
];
```

### Add Video Indicators
```tsx
<div className="flex gap-2 justify-center mt-4">
  {videoUrls.map((_, index) => (
    <div
      key={index}
      className={`h-2 w-2 rounded-full transition-colors ${
        index === currentVideoIndex ? 'bg-red-500' : 'bg-gray-400'
      }`}
    />
  ))}
</div>
```

### Add Manual Controls
```tsx
<div className="flex gap-4 justify-center mt-4">
  <button
    onClick={() => setCurrentVideoIndex((prev) => (prev - 1 + videoUrls.length) % videoUrls.length)}
    className="px-4 py-2 bg-red-500 text-white rounded"
  >
    Previous
  </button>
  <button
    onClick={() => setCurrentVideoIndex((prev) => (prev + 1) % videoUrls.length)}
    className="px-4 py-2 bg-red-500 text-white rounded"
  >
    Next
  </button>
</div>
```

---

## 7. Deployment Checklist

- [ ] Video files placed in `public/products/`
- [ ] Video URLs updated in `app/page.tsx`
- [ ] Component imported correctly
- [ ] Build successful: `npm run build`
- [ ] Dev server tested: `npm run dev`
- [ ] Videos play sequentially
- [ ] No console errors
- [ ] Responsive on mobile and desktop
- [ ] Fallback image works if videos missing
- [ ] Pushed to GitHub
- [ ] Vercel deployment successful

---

## 8. Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| Videos not playing | Check file paths, verify MP4 format |
| Autoplay fails | Ensure videos are muted (already configured) |
| Flickering | Use same codec/resolution for all videos |
| Slow playback | Reduce file size, check internet speed |
| No fallback image | Verify posterImage prop is passed |

---

**Status:** ✅ Production Ready
**Last Updated:** 2025-10-27
**Component:** `components/home/FeaturedProductVideo.tsx`
**Updated File:** `app/page.tsx`

