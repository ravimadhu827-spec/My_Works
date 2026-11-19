import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductsByCategory } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { Sparkles, Flame, HeartHandshake } from 'lucide-react';

export default function SnacksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const allSnacks = getProductsByCategory('snacks');

  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'all');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams(tab === 'all' ? {} : { tab });
  };

  const karamSnacks = allSnacks.filter((p) => p.subcategory === 'Karam Snacks');
  const sweetSnacks = allSnacks.filter((p) => p.subcategory === 'Sweet Snacks');

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#D9480F] via-[#EA580C] to-[#C2410C] text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#D9480F] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Traditional Evening Savories & Sweets
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Homemade Snacks & Palagarangal
            </h1>
            <p className="text-sm sm:text-base text-orange-100 font-light leading-relaxed">
              Hand-twisted Kai Murukku, spicy mixture, crisp banana chips, and authentic festive sweet delicacies prepared in pure cow butter and cold-pressed groundnut oil.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-8xl opacity-20 select-none pointer-events-none">
            🥨
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[
            { id: 'all', label: 'All Snacks' },
            { id: 'karam', label: '🔥 Karam Snacks (Savory)' },
            { id: 'sweet', label: '🍯 Sweet Snacks (Inippu)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
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

        {/* Section 1: KARAM SNACKS */}
        {(activeTab === 'all' || activeTab === 'karam') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EAE3D6]">
              <div>
                <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Crunchy & Spiced
                </span>
                <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold text-stone-900">
                  Karam Snacks (கார பலகாரங்கள்)
                </h2>
              </div>
              <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                {karamSnacks.length} Varieties
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {karamSnacks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Section 2: SWEET SNACKS */}
        {(activeTab === 'all' || activeTab === 'sweet') && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#EAE3D6]">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Traditional Confections
                </span>
                <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold text-stone-900">
                  Sweet Snacks (இனிப்பு தின்பண்டங்கள்)
                </h2>
              </div>
              <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
                {sweetSnacks.length} Varieties
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sweetSnacks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
