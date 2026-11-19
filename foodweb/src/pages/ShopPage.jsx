import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  Star, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedRating, setSelectedRating] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (urlSearch) setSearchQuery(urlSearch);
    if (urlCategory) setSelectedCategory(urlCategory);
  }, [urlSearch, urlCategory]);

  const categoriesList = [
    { id: 'All', label: 'All Items' },
    { id: 'pickles', label: 'Pickles (ஊறுகாய்)' },
    { id: 'snacks', label: 'Snacks (பலகாரம்)' },
    { id: 'bakery', label: 'Bakery & Puffs' },
    { id: 'sweets', label: 'Sweets & Desserts' },
    { id: 'traditional-foods', label: 'Traditional Foods' },
    { id: 'combos', label: 'Combo Packs' },
    { id: 'festival-specials', label: 'Festival Specials' }
  ];

  const priceRanges = [
    { id: 'All', label: 'All Prices' },
    { id: 'under-150', label: 'Under ₹150' },
    { id: '150-300', label: '₹150 to ₹300' },
    { id: '300-600', label: '₹300 to ₹600' },
    { id: 'above-600', label: 'Above ₹600' }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Veg Only filter
    if (vegOnly) {
      result = result.filter((p) => p.isVeg);
    }

    // Price range filter
    if (selectedPriceRange === 'under-150') {
      result = result.filter((p) => p.price < 150);
    } else if (selectedPriceRange === '150-300') {
      result = result.filter((p) => p.price >= 150 && p.price <= 300);
    } else if (selectedPriceRange === '300-600') {
      result = result.filter((p) => p.price > 300 && p.price <= 600);
    } else if (selectedPriceRange === 'above-600') {
      result = result.filter((p) => p.price > 600);
    }

    // Rating filter
    if (selectedRating === '4.8') {
      result = result.filter((p) => p.rating >= 4.8);
    } else if (selectedRating === '4.5') {
      result = result.filter((p) => p.rating >= 4.5);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popularity') {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedPriceRange, selectedRating, vegOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriceRange('All');
    setSelectedRating('All');
    setVegOnly(false);
    setSortBy('popularity');
    setSearchParams({});
  };

  const FilterSidebarContent = (
    <div className="space-y-6">
      
      {/* Search Input */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Search Dishes
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Type dish name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#164E32]"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Category
        </label>
        <div className="space-y-1">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                selectedCategory === cat.id
                  ? 'bg-[#164E32] text-white font-bold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-70">
                {cat.id === 'All'
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pure Veg Toggle */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Diet Preference
        </label>
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-emerald-50/70 border border-emerald-200 text-xs font-semibold text-emerald-900">
          <input
            type="checkbox"
            checked={vegOnly}
            onChange={(e) => setVegOnly(e.target.checked)}
            className="rounded text-[#164E32] focus:ring-[#164E32]"
          />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span>100% Pure Vegetarian Only</span>
        </label>
      </div>

      {/* Price Filter */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Price Range
        </label>
        <div className="space-y-1">
          {priceRanges.map((pr) => (
            <button
              key={pr.id}
              onClick={() => setSelectedPriceRange(pr.id)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedPriceRange === pr.id
                  ? 'bg-[#EA580C] text-white font-bold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2">
          Customer Rating
        </label>
        <div className="flex gap-2">
          {['All', '4.5', '4.8'].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRating(r)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors ${
                selectedRating === r
                  ? 'bg-amber-500 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {r === 'All' ? 'All' : <><Star className="w-3 h-3 fill-current" /> {r}+</>}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filter Button */}
      <button
        onClick={handleResetFilters}
        className="w-full py-2.5 px-4 rounded-xl border border-stone-300 text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-stone-100 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
      </button>

    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header / Breadcrumb */}
        <div className="mb-6">
          <h1 className="font-serif-indian text-3xl font-bold text-[#164E32]">
            Store Catalog
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Browse our full spread of authentic homemade food, pickles, traditional sweets, snacks, and freshly baked delights.
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE3D6] shadow-2xs mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <span className="text-xs font-bold text-stone-600">
              Showing <span className="text-[#164E32] font-black">{filteredAndSortedProducts.length}</span> delicious items
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-lg px-2.5 py-1.5 font-semibold focus:outline-none focus:ring-1 focus:ring-[#164E32]"
            >
              <option value="popularity">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Content Layout: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[#EAE3D6] shadow-2xs sticky top-28">
              <h3 className="font-serif-indian text-base font-bold text-stone-900 pb-3 border-b border-stone-100 mb-4 flex items-center justify-between">
                <span>Filter Products</span>
                <SlidersHorizontal className="w-4 h-4 text-stone-400" />
              </h3>
              {FilterSidebarContent}
            </div>
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                  🔍
                </div>
                <h3 className="font-serif-indian text-lg font-bold text-stone-800">
                  No matching foods found
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your filters, searching for a different keyword, or resetting your choices.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-5 py-2.5 bg-[#164E32] text-white text-xs font-bold rounded-full shadow"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between ml-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                <h3 className="font-serif-indian text-lg font-bold text-stone-900">
                  Filter Products
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {FilterSidebarContent}
            </div>

            <div className="pt-4 border-t border-stone-200 mt-6">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#164E32] text-white rounded-xl font-bold text-xs uppercase"
              >
                Apply & View Items
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
