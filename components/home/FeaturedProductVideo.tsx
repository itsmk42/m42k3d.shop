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

