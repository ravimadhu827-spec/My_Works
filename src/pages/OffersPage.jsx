import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { coupons, specialPromos } from '../data/offersData';
import { useToast } from '../context/ToastContext';
import { useCart } from '../context/CartContext';
import { Sparkles, Copy, Check, Clock, Tag, Percent, ArrowRight } from 'lucide-react';

export default function OffersPage() {
  const { addToast } = useToast();
  const { applyCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    addToast(`Coupon "${code}" copied & applied to your cart!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#164E32] via-[#1E5D3D] to-[#0F3824] text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[11px] font-bold uppercase tracking-wider">
              <Percent className="w-3.5 h-3.5" /> Best Deals & Seasonal Discounts
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Offers & Exclusive Coupons
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
              Save more on your favorite homemade delicacies! Click any coupon code below to copy and apply directly to your active cart.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
            🏷️
          </div>
        </div>

        {/* Live Deal of the Day Spotlight with Countdown */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <span className="px-3 py-1 rounded-full bg-black/30 text-amber-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-300" /> Flash Deal of the Day
              </span>
              <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold">
                Flat 25% OFF on Festival Special Hampers!
              </h2>
              <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
                Order royal Diwali or Pongal boxes today and enjoy grand family savings. Minimum cart value of ₹899 required.
              </p>

              {/* Countdown clock */}
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-amber-200 uppercase tracking-wider">Expires In:</span>
                <div className="flex items-center gap-2 font-mono font-bold text-sm text-stone-900">
                  <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                    {String(timeLeft.hours).padStart(2, '0')}h
                  </div>
                  <span className="text-white">:</span>
                  <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                    {String(timeLeft.minutes).padStart(2, '0')}m
                  </div>
                  <span className="text-white">:</span>
                  <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                    {String(timeLeft.seconds).padStart(2, '0')}s
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => handleCopyCode('FESTIVE25')}
                className="w-full py-3.5 px-6 rounded-full bg-white hover:bg-amber-100 text-[#EA580C] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                {copiedCode === 'FESTIVE25' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" /> Code Applied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy FESTIVE25
                  </>
                )}
              </button>
              <Link
                to="/festival-specials"
                className="text-xs font-semibold text-white hover:underline flex items-center gap-1"
              >
                Explore Festival Specials <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="mb-14">
          <h2 className="font-serif-indian text-2xl font-bold text-stone-900 mb-6">
            Available Discount Coupons
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coupons.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white rounded-2xl border-2 border-dashed border-[#CA8A04]/50 p-6 food-card-shadow flex flex-col justify-between relative overflow-hidden"
              >
                {/* Decorative background punch holes */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF7F2] border-r-2 border-[#CA8A04]/50" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FAF7F2] border-l-2 border-[#CA8A04]/50" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-[#EA580C] px-2.5 py-0.5 rounded-full">
                      {coupon.badge}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Save {coupon.discountPercent}%
                    </span>
                  </div>

                  <h3 className="font-serif-indian text-lg font-bold text-stone-900">
                    {coupon.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {coupon.description}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-2 font-medium">
                    * Valid on minimum order of ₹{coupon.minOrder}. Expires in {coupon.expiresInDays} days.
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="bg-stone-100 px-3 py-1.5 rounded-lg font-mono font-bold text-xs text-[#164E32] tracking-wider border border-stone-200">
                    {coupon.code}
                  </div>

                  <button
                    onClick={() => handleCopyCode(coupon.code)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#164E32] hover:bg-[#0F3824] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-amber-300" /> Applied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Apply Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
