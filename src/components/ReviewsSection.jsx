import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { reviews } from '../data/reviewsData';

export default function ReviewsSection() {
  return (
    <section className="py-14 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider px-3 py-1 bg-orange-100 rounded-full inline-block mb-2">
            Loved By Over 25,000+ Families
          </span>
          <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold text-[#164E32]">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Real feedback from customers savoring the pure joy of authentic homemade food.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-[#EAE3D6] food-card-shadow flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-amber-200/80 absolute top-4 right-4" />
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <h4 className="font-serif-indian text-base font-bold text-stone-900 mb-2">
                  "{rev.title}"
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  {rev.comment}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="font-bold text-xs text-stone-800">{rev.name}</h5>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
