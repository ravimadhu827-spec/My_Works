import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Package, 
  Flame, 
  ChevronRight, 
  Percent,
  Leaf,
  Clock,
  PackageCheck
} from 'lucide-react';
import { categories } from '../data/categoriesData';
import { getFeaturedProducts } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import TrustBadges from '../components/TrustBadges';
import ReviewsSection from '../components/ReviewsSection';
import FoodGallery from '../components/FoodGallery';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  // Countdown timer for promotional deal
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F2E9] via-[#FAF7F2] to-[#FAF7F2] py-12 md:py-20 border-b border-[#EAE3D6]">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EAE3D6] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
                <span className="text-xs font-bold text-[#164E32] uppercase tracking-wider">
                  Namma Veetu Suvai • Homemade Food Products
                </span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Food Industry Brand
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif-indian text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#164E32] leading-[1.15] tracking-tight">
                Authentic Homemade Goodness
              </h1>

              {/* Supporting Subtitle */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Traditional recipes, fresh ingredients and homemade food products crafted with care. Small batch preparation, stone-ground spice powders, sun-cured pickles, and freshly packaged savories.
              </p>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#164E32] hover:bg-[#0F3824] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5"
                >
                  <Package className="w-4 h-4 text-amber-300" />
                  Explore Products
                </Link>

                <Link
                  to="/pickles"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#EA580C] hover:bg-[#D9480F] text-white font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Shop Homemade <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Badges Row */}
              <div className="pt-6 border-t border-[#EAE3D6] grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { title: '100% Homemade', desc: 'Crafted In Small Batches' },
                  { title: 'Fresh Ingredients', desc: 'Zero Additives' },
                  { title: 'Traditional Recipes', desc: 'Ancestral Blends' },
                  { title: 'Hygienic Preparation', desc: 'Sanitized Facility' },
                  { title: 'Quality Packaging', desc: 'Moisture Barrier' }
                ].map((b, idx) => (
                  <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <span className="text-xs font-bold text-[#164E32] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#EA580C] shrink-0" /> {b.title}
                    </span>
                    <span className="text-[10px] text-stone-500 mt-0.5">{b.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Packaged Food Products Arrangement */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Product Showcase Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1000&q=80"
                    alt="Homemade Pickles, Packaged Snacks, and Stone Ground Spices"
                    className="w-full h-[400px] sm:h-[480px] object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  
                  {/* Hero Bottom Overlay Label */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EA580C] text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                      <PackageCheck className="w-3.5 h-3.5" /> Packaged Fresh From Our Kitchen
                    </div>
                    <h3 className="font-serif-indian text-2xl font-bold leading-snug">
                      Pickle Jars • Murukku • Spice Powders • Masalas • Sweets
                    </h3>
                    <p className="text-xs text-amber-200 mt-1">
                      Sealed in food-grade airtight containers. Zero chemical preservatives.
                    </p>
                  </div>
                </div>

                {/* Floating Badge 1 - Top Left */}
                <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-stone-200 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164E32] flex items-center justify-center text-xl">
                    🏺
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Airtight Glass Jars</p>
                    <p className="text-[10px] text-stone-500">Sun-Cured In Cold-Pressed Oil</p>
                  </div>
                </div>

                {/* Floating Badge 2 - Bottom Right */}
                <div className="absolute -bottom-5 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-stone-200 hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold text-xs">
                    4.9 ★
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-stone-900">Small Batch Production</p>
                    <p className="text-[10px] text-stone-500">Pure Taste & High Shelf Life</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 2. CATEGORY SECTION ==================== */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider px-3 py-1 bg-orange-100 rounded-full inline-block mb-2">
                Our Packaged Product Lines
              </span>
              <h2 className="font-serif-indian text-3xl sm:text-4xl font-bold text-[#164E32]">
                Explore Our Homemade World
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Every product category represents handcrafted packaged goods prepared fresh in small batches using generational family recipes.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164E32] hover:text-[#EA580C] transition-colors group shrink-0"
            >
              <span>View Full Catalog</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 10 Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>

        </div>
      </section>

      {/* ==================== 3. FEATURED PRODUCTS ==================== */}
      <section className="py-16 bg-white border-y border-[#EAE3D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#164E32] uppercase tracking-wider px-3 py-1 bg-emerald-100 rounded-full inline-flex items-center gap-1 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#EA580C]" /> Fresh Batch Packaged Products
              </span>
              <h2 className="font-serif-indian text-3xl sm:text-4xl font-bold text-stone-900">
                Most Loved Bestsellers
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Our flagship pickles, stone-ground spice powders, crispy karam snacks, and sweets.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] hover:text-[#D9480F] transition-colors group shrink-0"
            >
              <span>Explore All Products</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ==================== 4. PROMO BANNER WITH COUNTDOWN ==================== */}
      <section className="py-12 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#164E32] via-[#1E5D3D] to-[#0F3824] text-white p-8 sm:p-12 shadow-2xl">
            
            <div className="absolute right-0 top-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-xs font-bold uppercase tracking-wider">
                  <Percent className="w-3.5 h-3.5" /> Packaged Food Special Offer
                </span>

                <h3 className="font-serif-indian text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Enjoy Flat 15% OFF on Karam Snacks & Homemade Pickles!
                </h3>

                <p className="text-sm text-emerald-100 max-w-xl">
                  Use coupon code <span className="font-bold text-amber-300 underline underline-offset-4">SNACK15</span> at checkout. Handcrafted murukku, fresh banana chips, and authentic sun-cured pickles sealed in freshness-lock packaging.
                </p>

                {/* Countdown Timer */}
                <div className="pt-2 flex items-center gap-3">
                  <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                    Deal Expires In:
                  </span>
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                    <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                      <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="text-[9px] block text-stone-500 font-normal">HRS</span>
                    </div>
                    <span className="text-white text-lg">:</span>
                    <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                      <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="text-[9px] block text-stone-500 font-normal">MIN</span>
                    </div>
                    <span className="text-white text-lg">:</span>
                    <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
                      <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="text-[9px] block text-stone-500 font-normal">SEC</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center gap-4">
                <Link
                  to="/offers"
                  className="w-full text-center px-8 py-3.5 rounded-full bg-[#EA580C] hover:bg-[#D9480F] text-white font-bold text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
                >
                  View Product Offers
                </Link>
                <Link
                  to="/karam-snacks"
                  className="w-full text-center px-8 py-3.5 rounded-full bg-white hover:bg-stone-100 text-[#164E32] font-bold text-sm uppercase tracking-wider shadow transition-transform hover:scale-105"
                >
                  Shop Karam Snacks
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==================== 5. COMBO PACKS SPOTLIGHT ==================== */}
      <section className="py-14 bg-white border-b border-[#EAE3D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider px-3 py-1 bg-orange-100 rounded-full inline-block mb-2">
                Value Packaged Bundles
              </span>
              <h2 className="font-serif-indian text-3xl sm:text-4xl font-bold text-stone-900">
                Combo Packs & Family Bundles
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Carefully assembled pantry combo boxes with multiple packaged treats at bundled value prices.
              </p>
            </div>
            <Link
              to="/combos"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#164E32] hover:text-[#EA580C] transition-colors group shrink-0"
            >
              <span>Explore All Combos</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Heritage Pickle Combo (Trio Jars)',
                desc: 'Raw Mango (250g) + Garlic Pickle (250g) + Gongura Pickle (250g)',
                price: 460,
                origPrice: 580,
                img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80',
                slug: 'pickle-combo',
                badge: 'Airtight Glass Jars'
              },
              {
                title: 'Karam Snacks Combo (4 Packs)',
                desc: 'Spicy Murukku (250g) + Ribbon Pakoda (250g) + Mixture (250g) + Banana Chips (250g)',
                price: 499,
                origPrice: 640,
                img: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80',
                slug: 'karam-snacks-combo',
                badge: '1kg Super Saver'
              },
              {
                title: 'Essential Spice Powder Combo (4 Jars)',
                desc: 'Sambar Powder (250g) + Rasam Powder (250g) + Red Chilli (250g) + Turmeric (250g)',
                price: 420,
                origPrice: 535,
                img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
                slug: 'spice-powder-combo',
                badge: 'Stone Ground Purity'
              }
            ].map((combo, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-2xl border border-[#EAE3D6] overflow-hidden food-card-shadow food-card-hover flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={combo.img}
                    alt={combo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#164E32] text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {combo.badge}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-serif-indian text-lg font-bold text-stone-900">
                      {combo.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {combo.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-stone-200/80">
                    <div>
                      <span className="text-lg font-bold text-[#164E32]">₹{combo.price}</span>
                      <span className="text-xs text-stone-400 line-through ml-2">₹{combo.origPrice}</span>
                    </div>
                    <Link
                      to={`/product/${combo.slug}`}
                      className="px-4 py-2 rounded-xl bg-[#EA580C] hover:bg-[#D9480F] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      View Combo Pack
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 6. WHY CHOOSE US (TRUST SECTION) ==================== */}
      <TrustBadges />

      {/* ==================== 7. FOOD MANUFACTURING GALLERY ==================== */}
      <FoodGallery />

      {/* ==================== 8. CUSTOMER REVIEWS ==================== */}
      <ReviewsSection />

      {/* ==================== 9. HOMEMADE FOOD INDUSTRY CALLOUT ==================== */}
      <section className="py-16 bg-gradient-to-r from-[#164E32] to-[#0F3824] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full inline-block">
            Traditional Taste, Modern Quality
          </span>
          <h2 className="font-serif-indian text-3xl sm:text-4xl font-bold leading-snug">
            Authentic Homemade Food Products, Packed with Integrity
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-light">
            We are dedicated to manufacturing genuine, preservative-free packaged food products that honor our heritage. Every batch of pickles is naturally sun-cured, every spice blend is stone-milled without chemical preservatives, and every snack is fried in cold-pressed oil. Experience the pure homemade difference.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="px-6 py-3 rounded-full bg-white text-[#164E32] font-bold text-xs uppercase tracking-wider hover:bg-amber-100 transition-colors"
            >
              Our Story & Facility
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 rounded-full bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#D9480F] transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
