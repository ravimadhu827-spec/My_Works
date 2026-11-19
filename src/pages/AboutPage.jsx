import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  Sparkles, 
  Award, 
  Leaf, 
  ShieldCheck, 
  Clock, 
  Flame,
  ArrowRight
} from 'lucide-react';
import FoodGallery from '../components/FoodGallery';
import TrustBadges from '../components/TrustBadges';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#164E32] via-[#1E5D3D] to-[#0F3824] text-white p-8 sm:p-14 mb-12 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Our Roots & Family Heritage
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              From Our Kitchen <br />
              <span className="text-amber-300 font-serif italic">To Your Dining Table</span>
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
              Started by home cooks who yearned for genuine, uncompromised traditional flavors. We recreate the authentic warmth of mother’s and grandmother’s cooking using ancestral recipes, stone grinders, and wood-pressed oils.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-9xl opacity-15 select-none pointer-events-none">
            🏡
          </div>
        </div>

        {/* 1. OUR STORY SECTION */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3D6] shadow-2xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider px-3 py-1 bg-orange-100 rounded-full inline-block">
                Chapter 1: The Beginning
              </span>
              <h2 className="font-serif-indian text-3xl sm:text-4xl font-bold text-[#164E32]">
                Our Story: Preserving The Vanishing Flavors of Home
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                <p>
                  "Namma Veetu Suvai" (நம்ம வீட்டு சுவை) was born out of a simple, heartfelt realization: in an era of ultra-processed commercial foods filled with artificial preservatives, stabilizers, and cheap palm oils, the true soulful taste of home-cooked South Indian food was quietly slipping away.
                </p>
                <p>
                  Our journey started in a small traditional kitchen in Thanjavur, where our grandmother seasoned Avakkai raw mangoes in white Bharani jars under the warm morning sun and hand-twisted crispy Kai Murukku for festive family gatherings. Neighbors and relatives began asking for batches, and what started as affectionate gifts quickly turned into a movement to bring authentic homemade food to busy modern households.
                </p>
                <p>
                  Today, our kitchen has grown, but our soul remains untouched. Every spice is still dry-roasted in iron skillets, our ginger-garlic paste is freshly prepared daily, our sweets are drenched in 100% pure desi cow ghee, and every product is made with love.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAF7F2]">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
                  alt="Traditional Stone Spices Grinding"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-md border border-stone-200">
                  <p className="text-xs font-bold text-[#164E32]">Traditional Granite Mortar Grinding</p>
                  <p className="text-[11px] text-stone-500">Zero electric high-speed friction that destroys spice oils</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. MISSION & VALUES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#164E32] flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-serif-indian text-xl font-bold text-stone-900">Our Mission</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              To make authentic, healthy, and generational Indian homemade food accessible to every home, empowering home cooks and preserving traditional culinary crafts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif-indian text-xl font-bold text-stone-900">Our Values</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Absolute purity, transparency, and reverence for authentic ingredients. We never cut corners or compromise our recipes with synthetic substitutes.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-indian text-xl font-bold text-stone-900">Quality Promise</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Cooked in sanitized kitchen environments with fresh daily batches, vacuum-sealed multi-barrier packaging, and strict hygiene protocols.
            </p>
          </div>

        </div>

        {/* 3. WHY HOMEMADE? SECTION */}
        <div className="bg-gradient-to-r from-[#FAF7F2] to-[#F3EFE6] rounded-3xl p-8 sm:p-12 border border-[#EAE3D6] mb-12">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider">
              The Real Difference
            </span>
            <h2 className="font-serif-indian text-3xl font-bold text-[#164E32] mt-1">
              Why Does Homemade Matter?
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Compare commercial supermarket food with Namma Veetu Suvai’s kitchen crafted food:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Commercial */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                ❌ Commercial Mass Production
              </span>
              <ul className="space-y-2 text-xs text-stone-600">
                <li className="flex items-center gap-2">✗ Cooked in cheap palm or refined mineral oils</li>
                <li className="flex items-center gap-2">✗ Filled with sodium benzoate and chemical preservatives</li>
                <li className="flex items-center gap-2">✗ Stored in warehouses for months before reaching you</li>
                <li className="flex items-center gap-2">✗ Artificial essence replacing natural cardamom and saffron</li>
              </ul>
            </div>

            {/* Homemade */}
            <div className="bg-emerald-50/80 rounded-2xl p-6 border border-emerald-300 shadow-2xs space-y-3">
              <span className="text-xs font-bold text-[#164E32] uppercase tracking-wider block">
                ✓ Namma Veetu Suvai Homemade
              </span>
              <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                <li className="flex items-center gap-2">✓ Cooked in 100% pure cold-pressed oils & pure cow ghee</li>
                <li className="flex items-center gap-2">✓ Zero chemical preservatives or artificial colors</li>
                <li className="flex items-center gap-2">✓ Freshly prepared in small morning batches to order</li>
                <li className="flex items-center gap-2">✓ Ancestral recipes passed down across three generations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. FOOD GALLERY & TRUST */}
        <FoodGallery />
        <TrustBadges />

        {/* CTA */}
        <div className="text-center py-12">
          <Link
            to="/shop"
            className="px-8 py-4 rounded-full bg-[#EA580C] hover:bg-[#D9480F] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-transform hover:scale-105 inline-flex items-center gap-2"
          >
            Taste Our Homemade Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
