import React, { useState } from 'react';
import { getProductsByCategory } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { Sparkles, Filter } from 'lucide-react';

export default function PicklesPage() {
  const allPickles = getProductsByCategory('pickles');
  const [filterSpice, setFilterSpice] = useState('All');

  const filtered = allPickles.filter((p) => {
    if (filterSpice !== 'All' && !p.spiceLevel.includes(filterSpice)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#164E32] to-[#2D6A4F] text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> 100% Sun-Cured Heritage Pickles
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Homemade Pickles
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
              Traditional recipes, authentic spices and homemade taste. Sun-ripened in porcelain jars with cold-pressed sesame oil. Zero chemical preservatives and packed in airtight glass jars.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
            🏺
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE3D6] shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold text-stone-600">
            Showing <strong className="text-[#164E32]">{filtered.length}</strong> Packaged Pickle Varieties
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Spice Level:
            </span>
            {['All', 'Medium', 'Spicy'].map((sp) => (
              <button
                key={sp}
                onClick={() => setFilterSpice(sp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterSpice === sp
                    ? 'bg-[#EA580C] text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Pickles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
