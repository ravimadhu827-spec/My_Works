import React from 'react';
import { getProductsByCategory } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { Sparkles, Gift, Crown, Flame } from 'lucide-react';

export default function FestivalSpecialsPage() {
  const festivalProducts = getProductsByCategory('festival-specials');

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#991B1B] via-[#B91C1C] to-[#7F1D1D] text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Traditional Indian Festive Celebrations
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Festival Specials & Gift Hampers
            </h1>
            <p className="text-sm sm:text-base text-red-100 font-light leading-relaxed">
              Grand Diwali Sweets & Savories Hampers, Pongal Harvest Feast Boxes, Christmas Rum-Infused Plum Cake Crates, and Tamil New Year Aruvai Hampers.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
            🪔
          </div>
        </div>

        {/* Festival Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { name: 'Diwali Specials', desc: 'Ghee Sweets & Terracotta Diyas', icon: '🪔' },
            { name: 'Pongal Specials', desc: 'Sugarcane Jaggery Sakkarai Pongal', icon: '🌾' },
            { name: 'Christmas Bakery', desc: '60-Day Soaked Plum Cake & Cookies', icon: '🎄' },
            { name: 'Tamil New Year', desc: 'Aruvai 6-Taste Traditional Feast', icon: '🥭' }
          ].map((f, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex items-center gap-3.5">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <h4 className="font-bold text-xs text-stone-900">{f.name}</h4>
                <p className="text-[11px] text-stone-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {festivalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
