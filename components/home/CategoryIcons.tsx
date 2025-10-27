'use client';

/**
 * Category Icons for Hero Cards
 * Custom SVG illustrations for product categories
 * Designed to match dark gradient theme with red accents
 */

interface IconProps {
  className?: string;
}

/**
 * Miniature Decor Icon
 * Represents small decorative objects and collectibles
 */
export function MiniatureDecorIcon({ className = 'w-24 h-24' }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Decorative base/pedestal */}
      <rect x="35" y="70" width="30" height="15" rx="2" fill="url(#miniGradient)" />
      <rect x="32" y="68" width="36" height="3" rx="1" fill="rgba(255,255,255,0.3)" />

      {/* Small decorative object - stylized vase/urn */}
      <path
        d="M 40 65 Q 38 55 40 45 L 45 40 L 45 30 Q 45 25 50 25 Q 55 25 55 30 L 55 40 L 60 45 Q 62 55 60 65 Z"
        fill="url(#miniGradient)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
      />

      {/* Decorative pattern on vase */}
      <circle cx="50" cy="50" r="3" fill="rgba(255,255,255,0.5)" />
      <circle cx="50" cy="58" r="2" fill="rgba(255,255,255,0.4)" />

      {/* Accent sparkles */}
      <circle cx="65" cy="35" r="2" fill="rgba(255,200,100,0.8)" />
      <circle cx="30" cy="40" r="1.5" fill="rgba(255,200,100,0.6)" />

      {/* Shine effect */}
      <ellipse cx="48" cy="35" rx="2" ry="4" fill="rgba(255,255,255,0.6)" opacity="0.7" />

      <defs>
        <linearGradient id="miniGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#ff1744" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Art Icon
 * Represents artistic elements, creativity, and design
 */
export function ArtIcon({ className = 'w-24 h-24' }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Palette base */}
      <ellipse cx="50" cy="60" rx="28" ry="20" fill="url(#artGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

      {/* Palette thumb hole */}
      <circle cx="28" cy="65" r="6" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Paint colors on palette */}
      <circle cx="40" cy="45" r="4" fill="#ff6b6b" opacity="0.9" />
      <circle cx="50" cy="42" r="4" fill="#ffd700" opacity="0.9" />
      <circle cx="60" cy="45" r="4" fill="#4ecdc4" opacity="0.9" />
      <circle cx="45" cy="55" r="3.5" fill="#9b59b6" opacity="0.8" />
      <circle cx="55" cy="55" r="3.5" fill="#3498db" opacity="0.8" />

      {/* Paintbrush */}
      <g>
        {/* Brush handle */}
        <rect x="68" y="25" width="4" height="35" rx="2" fill="url(#brushGradient)" />
        {/* Brush bristles */}
        <ellipse cx="70" cy="23" rx="5" ry="3" fill="rgba(255,255,255,0.7)" />
        <path d="M 65 23 Q 70 20 75 23" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
      </g>

      {/* Artistic accent lines */}
      <path d="M 35 30 Q 40 25 45 30" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
      <path d="M 55 28 Q 60 24 65 28" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />

      <defs>
        <linearGradient id="artGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#ff1744" />
        </linearGradient>
        <linearGradient id="brushGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b4513" />
          <stop offset="100%" stopColor="#654321" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Functional Icon
 * Represents practical items, tools, and useful objects
 */
export function FunctionalIcon({ className = 'w-24 h-24' }: IconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wrench */}
      <g>
        {/* Wrench handle */}
        <rect x="20" y="35" width="8" height="45" rx="4" fill="url(#funcGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* Wrench head - fixed end */}
        <rect x="15" y="28" width="18" height="12" rx="3" fill="url(#funcGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* Wrench opening */}
        <rect x="22" y="32" width="6" height="6" fill="rgba(0,0,0,0.2)" rx="1" />
      </g>

      {/* Gear/Cog */}
      <g transform="translate(65, 50)">
        {/* Outer circle */}
        <circle cx="0" cy="0" r="16" fill="url(#funcGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* Center hole */}
        <circle cx="0" cy="0" r="6" fill="rgba(0,0,0,0.2)" />
        {/* Gear teeth */}
        <rect x="-2" y="-18" width="4" height="4" fill="rgba(255,255,255,0.4)" />
        <rect x="12.7" y="-9.3" width="4" height="4" fill="rgba(255,255,255,0.4)" transform="rotate(60 14.7 -7.3)" />
        <rect x="12.7" y="9.3" width="4" height="4" fill="rgba(255,255,255,0.4)" transform="rotate(120 14.7 11.3)" />
        <rect x="-2" y="18" width="4" height="4" fill="rgba(255,255,255,0.4)" />
        <rect x="-16.7" y="9.3" width="4" height="4" fill="rgba(255,255,255,0.4)" transform="rotate(-120 -14.7 11.3)" />
        <rect x="-16.7" y="-9.3" width="4" height="4" fill="rgba(255,255,255,0.4)" transform="rotate(-60 -14.7 -7.3)" />
      </g>

      {/* Connection line between tools */}
      <line x1="32" y1="55" x2="48" y2="55" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="3,3" />

      {/* Accent dots */}
      <circle cx="25" cy="25" r="2" fill="rgba(255,200,100,0.7)" />
      <circle cx="70" cy="30" r="1.5" fill="rgba(255,200,100,0.6)" />

      <defs>
        <linearGradient id="funcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#ff1744" />
        </linearGradient>
      </defs>
    </svg>
  );
}

