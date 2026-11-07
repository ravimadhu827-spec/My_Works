import React from 'react';
import { getProductsByCategory } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { Sparkles, Gift, Tag, Percent } from 'lucide-react';

export default function CombosPage() {
  const combos = getProductsByCategory('combos');

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#9A3412] via-[#C2410C] to-[#EA580C] text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[11px] font-bold uppercase tracking-wider">
              <Gift className="w-3.5 h-3.5" /> Save Up To 30% Off
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Family Combo Packs
            </h1>
            <p className="text-sm sm:text-base text-orange-100 font-light leading-relaxed">
              Curated bundles of our most cherished dishes, teatime snacks, sun-cured pickles, and festival sweets at unbeatable value prices. Perfect for family celebrations and gifting.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
            🎁
          </div>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Value Bundle Discounts</h4>
              <p className="text-[11px] text-stone-500">Save up to ₹250 on every combo pack</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164E32] flex items-center justify-center font-bold">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Festive Gift Ready</h4>
              <p className="text-[11px] text-stone-500">Gold-embossed packaging & ribbon</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Custom Assortments</h4>
              <p className="text-[11px] text-stone-500">Packed with multiple signature varieties</p>
            </div>
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
