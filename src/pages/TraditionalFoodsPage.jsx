import React, { useState } from 'react';
import { getProductsByCategory } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { Sparkles, UtensilsCrossed, ShieldCheck, Clock } from 'lucide-react';

export default function TraditionalFoodsPage() {
  const allTraditional = getProductsByCategory('traditional-foods');
  const [filterSubcat, setFilterSubcat] = useState('All');

  const subcategories = ['All', 'Breakfast & Meals', 'Traditional Curries', 'Variety Rice'];

  const filtered = filterSubcat === 'All'
    ? allTraditional
    : allTraditional.filter((p) => p.subcategory === filterSubcat);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#164E32] via-[#1E5D3D] to-[#0F3824] text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Steaming Hot Daily Delivery
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Traditional South Indian Foods
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
              Malli Poo Idlis, Crispy Ghee Roast Dosa, Temple Kovil Puliyodharai, Drumstick Sambar, and comfort Thayir Sadam cooked with pure home-style integrity and traditional recipes.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
            🥘
          </div>
        </div>

        {/* Quick Trust Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { title: 'Home Style Taste', sub: 'Stone ground flours' },
            { title: 'Traditional Recipe', sub: 'Generational recipes' },
            { title: 'Fresh Daily Batches', sub: 'Made to your order' },
            { title: 'Thermal Hot Packing', sub: 'Arrives warm & aromatic' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-3 rounded-xl border border-stone-200 text-center">
              <span className="text-xs font-bold text-[#164E32] block">{item.title}</span>
              <span className="text-[10px] text-stone-500">{item.sub}</span>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 justify-start sm:justify-center">
          {subcategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterSubcat(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-xs ${
                filterSubcat === cat
                  ? 'bg-[#164E32] text-white scale-105 shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
