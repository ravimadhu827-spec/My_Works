import React from 'react';
import { galleryItems } from '../data/reviewsData';
import { Camera, Sparkles } from 'lucide-react';

export default function FoodGallery() {
  return (
    <section className="py-14 bg-white border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#164E32] uppercase tracking-wider px-3 py-1 bg-emerald-100 rounded-full inline-flex items-center gap-1.5 mb-2">
            <Camera className="w-3.5 h-3.5" /> Inside Our Home Kitchen
          </span>
          <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold text-stone-900">
            The Craft Behind The Flavor
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Take a look into our daily artisanal culinary preparation. Pure wood-pressed oils, stone grinding, and heartfelt dedication.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 shadow-sm border border-stone-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs inline-block mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif-indian text-sm sm:text-base font-bold text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-200 line-clamp-1 mt-0.5 opacity-90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
