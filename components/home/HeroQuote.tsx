'use client';

import { useState, useEffect } from 'react';

const quotes = [
  "Light up your world with handcrafted brilliance",
  "Where design meets illumination",
  "Precision-printed, perfectly crafted",
  "Transform your space with 3D artistry",
  "Illuminate your imagination",
  "Crafted with passion, printed with precision",
  "Where creativity takes shape",
  "Shine brighter with SparkleSphere",
];

export default function HeroQuote() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setIsVisible(true);
      }, 300);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 md:h-20 flex items-center justify-center">
      <div
        className={`text-center transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-lg md:text-2xl font-light text-white/80 italic">
          "{quotes[currentQuote]}"
        </p>
      </div>
    </div>
  );
}

