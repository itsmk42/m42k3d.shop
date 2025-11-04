import Image from 'next/image';
import { Manrope } from 'next/font/google';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
  priority?: boolean;
}

const manrope = Manrope({ subsets: ['latin'], weight: ['600','700'], display: 'swap' });

export default function Logo({ size = 'md', showText = true, className = '', variant = 'dark', priority = true }: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32, text: 'text-lg' },
    md: { width: 40, height: 40, text: 'text-xl' },
    lg: { width: 56, height: 56, text: 'text-2xl' },
  };

  const { width, height, text } = sizes[size];
  const textColor = variant === 'dark' ? 'text-white' : 'text-slate-900';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo-modern.svg"
        alt="sparklespheres.store logo"
        width={width}
        height={height}
        className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10"
        priority={priority}
      />
      {showText && (
        <span className={`${manrope.className} font-bold text-sm md:${text} tracking-tight ${textColor}`}>
          sparklespheres.store
        </span>
      )}
    </div>
  );
}
