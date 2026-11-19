import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { products } from '../data/productsData';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (slug) => {
    onClose();
    setQuery('');
    navigate(`/product/${slug}`);
  };

  const popularSearches = [
    'Mango Pickle',
    'Spicy Murukku',
    'Sambar Powder',
    'Biryani Masala',
    'Mysore Pak',
    'Butter Cookies',
    'Banana Chips',
    'Garlic Pickle'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="relative border-b border-stone-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <Search className="w-6 h-6 text-[#164E32] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search packaged pickles, snacks, spice powders, masalas, sweets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base bg-transparent border-none focus:outline-none text-stone-800 placeholder:text-stone-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-stone-400 hover:text-stone-600 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors ml-2"
            >
              ESC
            </button>
          </div>
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 hover:text-[#164E32] border border-stone-200 text-xs font-medium text-stone-700 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                Found {filteredProducts.length} Packaged Products
              </p>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white hover:bg-emerald-50/60 border border-stone-200/60 cursor-pointer transition-all group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                        {product.subcategory}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-sm text-stone-800 truncate group-hover:text-[#164E32] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">{product.shortDescription}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-sm text-[#164E32]">₹{product.price}</span>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#EA580C] group-hover:translate-x-1 transition-all mt-1 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-stone-500">
              <p className="text-base font-semibold">No products found for "{query}"</p>
              <p className="text-xs text-stone-400 mt-1">Try searching for Pickles, Murukku, Sambar Powder, or Mysore Pak</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-stone-100/70 px-4 py-2.5 border-t border-stone-200 text-xs text-stone-500 flex justify-between items-center">
          <span>Explore our packaged food catalog</span>
          <button
            onClick={() => {
              onClose();
              navigate(`/shop?search=${encodeURIComponent(query)}`);
            }}
            className="text-[#164E32] font-semibold hover:underline flex items-center gap-1"
          >
            View all in Shop <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
