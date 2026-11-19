import React, { useState } from 'react';
import { getProductsByCategory } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { Sparkles, Crown, Heart } from 'lucide-react';

export default function SweetsPage() {
  const allSweets = getProductsByCategory('sweets');
  const [activeTab, setActiveTab] = useState('All');

  const traditional = allSweets.filter((p) => p.subcategory === 'Traditional Sweets');
  const modern = allSweets.filter((p) => p.subcategory === 'Modern Desserts');

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#8B4513] via-[#B8860B] to-[#78350F] text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[11px] font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" /> 100% Pure Desi Ghee Confections
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Sweets & Desserts (மிட்டாய் & இனிப்புகள்)
            </h1>
            <p className="text-sm sm:text-base text-amber-100 font-light leading-relaxed">
              Royal Melt-in-Mouth Ghee Mysore Pak, Tirunelveli Halwa, Kaju Katli, saffron laddus, and modern cheesecakes made with authentic unadulterated ingredients.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
            🍬
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[
            { id: 'All', label: 'All Delights' },
            { id: 'Traditional Sweets', label: '👑 Traditional Sweets' },
            { id: 'Modern Desserts', label: '🍰 Modern Desserts' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs ${
                activeTab === tab.id
                  ? 'bg-[#164E32] text-white scale-105 shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Traditional Sweets Section */}
        {(activeTab === 'All' || activeTab === 'Traditional Sweets') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EAE3D6]">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" /> Royal Desi Ghee
                </span>
                <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold text-stone-900">
                  Traditional Sweets (பாரம்பரிய இனிப்புகள்)
                </h2>
              </div>
              <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                {traditional.length} Varieties
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {traditional.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Modern Desserts Section */}
        {(activeTab === 'All' || activeTab === 'Modern Desserts') && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EAE3D6]">
              <div>
                <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Handcrafted Pastries
                </span>
                <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold text-stone-900">
                  Modern Desserts & Cheesecakes
                </h2>
              </div>
              <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                {modern.length} Varieties
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {modern.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
