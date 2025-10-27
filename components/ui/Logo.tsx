import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ size = 'md', showText = true, className = '', variant = 'dark' }: LogoProps) {
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
        src="/logo.svg"
        alt="SparkleSphere.store Logo"
        width={width}
        height={height}
        className="flex-shrink-0"
        priority
      />
      {showText && (
        <span className={`font-bold ${text} ${textColor} bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent`}>
          SparkleSphere.store
        </span>
      )}
    </div>
  );
}

