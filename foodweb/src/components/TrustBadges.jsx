import React from 'react';
import { 
  HeartHandshake, 
  Leaf, 
  Sparkles, 
  ShieldCheck, 
  PackageCheck, 
  Clock, 
  Award,
  Flame
} from 'lucide-react';
import { trustPoints } from '../data/reviewsData';

const iconMap = {
  HeartHandshake: HeartHandshake,
  Leaf: Leaf,
  Sparkles: Sparkles,
  Flame: Flame,
  ShieldCheck: ShieldCheck,
  PackageCheck: PackageCheck,
  Clock: Clock,
  Award: Award
};

export default function TrustBadges({ variant = 'grid' }) {
  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { title: '100% Homemade', desc: 'Crafted In Small Batches', icon: HeartHandshake },
          { title: 'Fresh Ingredients', desc: 'Farm-Fresh Spices & Pure Ghee', icon: Leaf },
          { title: 'Traditional Recipes', desc: 'Generational Formulations', icon: Sparkles },
          { title: 'Quality Packaging', desc: 'Airtight Moisture-Proof Jars', icon: PackageCheck }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#EAE3D6] shadow-2xs"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#164E32] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">{item.title}</h4>
                <p className="text-[10px] text-stone-500">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <section className="py-14 bg-gradient-to-b from-[#FAF7F2] to-[#F3EFE6] border-y border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider px-3 py-1 bg-orange-100 rounded-full inline-block mb-2">
            Quality Homemade Standards
          </span>
          <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold text-[#164E32]">
            Why Choose Namma Veetu Suvai?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Traditional taste, modern quality. We manufacture authentic homemade packaged food products with uncompromising standards of hygiene, pure ingredients, and ancestral craftsmanship.
          </p>
        </div>

        {/* Feature Cards Grid (First 4) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustPoints.slice(0, 4).map((pt, idx) => {
            const Icon = iconMap[pt.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#EAE3D6] food-card-shadow hover:-translate-y-1 transition-transform"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-amber-50 text-[#164E32] flex items-center justify-center mb-4 ring-1 ring-[#164E32]/20">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif-indian font-bold text-base text-stone-900 mb-1.5">
                  {pt.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Cards Grid (Remaining 4) */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustPoints.slice(4).map((pt, idx) => {
            const Icon = iconMap[pt.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-white/90 rounded-2xl p-5 border border-[#EAE3D6] flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-indian font-bold text-sm text-stone-900">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    {pt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
