"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Palette, Package, Key, Image as ImageIcon, Wrench, ChevronRight } from "lucide-react";

type Category = {
  key: string;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
};

const categories: Category[] = [
  {
    key: "miniatures",
    title: "Miniatures",
    description: "Figures & collectibles",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-700",
    icon: <Package className="w-10 h-10 sm:w-12 sm:h-12 text-white/95" />,
  },
  {
    key: "decor-art",
    title: "Decor & Art",
    description: "Home & office style",
    gradientFrom: "from-violet-500",
    gradientTo: "to-violet-700",
    icon: <Palette className="w-10 h-10 sm:w-12 sm:h-12 text-white/95" />,
  },
  {
    key: "keychains",
    title: "Keychains",
    description: "Personalised gifts",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-emerald-700",
    icon: <Key className="w-10 h-10 sm:w-12 sm:h-12 text-white/95" />,
  },
  {
    key: "photo-box",
    title: "Photo Box",
    description: "Memory storage",
    gradientFrom: "from-amber-500",
    gradientTo: "to-amber-700",
    icon: <ImageIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white/95" />,
  },
  {
    key: "functional",
    title: "Functional",
    description: "Tools & parts",
    gradientFrom: "from-cyan-500",
    gradientTo: "to-cyan-700",
    icon: <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-white/95" />,
  },
];

export default function CategoriesSection() {
  const params = useSearchParams();
  const active = (params?.get("category") || "").toLowerCase();

  return (
    <section className="py-16 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white tracking-tight">Shop by Category</h2>
          <p className="text-gray-400">Browse favourites and best-sellers</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => {
            const selected = active === cat.key;
            return (
              <Link
                key={cat.key}
                href={`/products?category=${encodeURIComponent(cat.key)}`}
                aria-current={selected ? "true" : undefined}
                className="group relative block focus:outline-none"
              >
                <div
                  className={[
                    "relative h-32 sm:h-44 rounded-xl overflow-hidden",
                    "bg-gradient-to-br",
                    cat.gradientFrom,
                    cat.gradientTo,
                    "border border-white/10",
                    selected ? "ring-2 ring-red-400" : "",
                    "shadow-lg hover:shadow-xl",
                    "transition-all duration-300 will-change-transform",
                    "hover:-translate-y-0.5",
                  ].join(" ")}
                >
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                  {/* Shine effect */}
                  <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />

                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-3 h-full w-full px-3">
                    <div className="flex-shrink-0">
                      {cat.icon}
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        {cat.title}
                      </h3>
                      <p className="text-white/90 text-xs sm:text-sm leading-tight">
                        {cat.description}
                      </p>
                    </div>
                    <div className="ml-auto pr-3 text-white/80 group-hover:text-white">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Focus ring for keyboard navigation */}
                <span className="sr-only">Go to {cat.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

