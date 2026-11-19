import React, { useState } from 'react';
import { getProductsByCategory } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { Sparkles, Cake, Cookie, Coffee, ShieldCheck } from 'lucide-react';

export default function BakeryPage() {
  const allBakery = getProductsByCategory('bakery');
  const [selectedSubcat, setSelectedSubcat] = useState('All');

  const subcategories = ['All', 'Puffs', 'Bread & Buns', 'Cakes', 'Cookies', 'Desserts'];

  const filtered = selectedSubcat === 'All'
    ? allBakery
    : allBakery.filter((p) => p.subcategory === selectedSubcat);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#5B2E1E] via-[#7B3F00] to-[#9C4E0C] text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> 100% Butter • Baked Fresh Daily
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Fresh Artisan Bakery & Puffs
            </h1>
            <p className="text-sm sm:text-base text-amber-100 font-light leading-relaxed">
              Flaky hot puffs, cloud-soft Hokkaido milk breads, decadent truffle cakes, and slow-baked butter cookies made with pure European butter and zero artificial essences.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
            🥐
          </div>
        </div>

        {/* Subcategory Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 justify-start sm:justify-center">
          {subcategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedSubcat(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs ${
                selectedSubcat === cat
                  ? 'bg-[#164E32] text-white scale-105 shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section View or Filtered View */}
        {selectedSubcat === 'All' ? (
          <div className="space-y-14">
            {['Puffs', 'Bread & Buns', 'Cakes', 'Cookies', 'Desserts'].map((sectionTitle) => {
              const items = allBakery.filter((p) => p.subcategory === sectionTitle);
              if (items.length === 0) return null;
              return (
                <div key={sectionTitle}>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EAE3D6]">
                    <h2 className="font-serif-indian text-2xl font-bold text-stone-900 flex items-center gap-2">
                      <Cake className="w-5 h-5 text-[#EA580C]" /> {sectionTitle}
                    </h2>
                    <span className="text-xs text-stone-500 font-medium">
                      {items.length} Varieties
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
