import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={category.path}
      className="group relative bg-white rounded-2xl border border-[#EAE3D6] overflow-hidden food-card-shadow food-card-hover flex flex-col transition-all duration-300 block"
    >
      {/* Category Image with Zoom Effect */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-600"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Badge */}
        {category.badge && (
          <div className="absolute top-3 left-3 bg-[#164E32] text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {category.badge}
          </div>
        )}

        {/* Item count tag */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
          {category.itemCount}
        </div>

        {/* Overlay Title */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
            Homemade Product
          </span>
          <h3 className="font-serif-indian text-lg font-bold leading-tight group-hover:text-amber-200 transition-colors">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Card Info & Link Prompt */}
      <div className="p-3.5 flex items-center justify-between bg-white text-xs">
        <p className="text-stone-500 line-clamp-1 pr-2">{category.description}</p>
        <span className="shrink-0 flex items-center gap-1 font-bold text-[#EA580C] group-hover:translate-x-1 transition-transform">
          Explore <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
