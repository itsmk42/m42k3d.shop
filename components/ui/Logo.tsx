import Image from 'next/image';
import { Manrope } from 'next/font/google';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
  priority?: boolean;
  withWordmark?: boolean;
}

const manrope = Manrope({ subsets: ['latin'], weight: ['600','700'], display: 'swap' });

export default function Logo({ size = 'md', showText = true, className = '', variant = 'dark', priority = true, withWordmark = true }: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32, text: 'text-lg' },
    md: { width: 40, height: 40, text: 'text-xl' },
    lg: { width: 56, height: 56, text: 'text-2xl' },
  };

  const { width, height, text } = sizes[size];
  const textColor = variant === 'dark' ? 'text-white' : 'text-slate-900';
  const src = variant === 'dark' ? '/brand/sparkle-sphere-dark.svg' : '/brand/sparkle-sphere-light.svg';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'sparklesphere.store';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src={src}
        alt={`${siteName} logo`}
        width={width}
        height={height}
        className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10"
        priority={priority}
      />
      {showText && withWordmark && (
        <span className={`${manrope.className} font-bold text-sm md:${text} tracking-tight ${textColor}`}>
          {siteName}
        </span>
      )}
    </div>
  );
}
