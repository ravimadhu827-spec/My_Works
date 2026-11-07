import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Sparkles, Check, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedWeight, setSelectedWeight] = useState(
    product.weights && product.weights.length > 0 ? product.weights[0].label : product.weight
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Compute price based on weight
  const currentPrice = (() => {
    if (product.weights && product.weights.length > 0) {
      const match = product.weights.find((w) => w.label === selectedWeight);
      if (match) return match.price;
    }
    return product.price;
  })();

  const currentOriginalPrice = Math.round(currentPrice * 1.25);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedWeight, quantity);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1200);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-[#EAE3D6] overflow-hidden food-card-shadow food-card-hover flex flex-col h-full transition-all duration-300">
      
      {/* Product Image & Overlay Badges */}
      <Link to={`/product/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-40 group-hover:opacity-30 transition-opacity" />

        {/* Homemade / Fresh Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#164E32] text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 shadow'
              : 'bg-white/80 hover:bg-white text-stone-600 hover:text-rose-600 shadow-sm backdrop-blur-xs'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Category Tag */}
        <div className="absolute bottom-2.5 left-3 bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-xs">
          {product.subcategory}
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Star Rating & Badge */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1 text-amber-600 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400 text-[11px] font-normal">({product.reviewsCount})</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              {product.isVeg ? (
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-emerald-600 rounded-[3px] p-[1.5px]" title="Vegetarian">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                </span>
              ) : (
                <span className="inline-flex items-center justify-center w-3.5 h-3.5 border border-rose-700 rounded-[3px] p-[1.5px]" title="Non-Vegetarian">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-700"></span>
                </span>
              )}
              {product.spiceLevel && (
                <span className="text-[10px] text-stone-500 font-medium">{product.spiceLevel}</span>
              )}
            </div>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-serif-indian text-base font-bold text-stone-900 group-hover:text-[#164E32] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short description */}
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Weights, Quantity Selector & Add to Cart */}
        <div className="pt-2 border-t border-stone-100 flex flex-col gap-2.5">
          
          {/* Weight options */}
          {product.weights && product.weights.length > 1 ? (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              <span className="text-[11px] text-stone-500 font-medium shrink-0">Weight:</span>
              <div className="flex items-center gap-1">
                {product.weights.map((w) => (
                  <button
                    key={w.label}
                    onClick={() => setSelectedWeight(w.label)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                      selectedWeight === w.label
                        ? 'bg-[#164E32] text-white font-semibold'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-[11px] text-stone-500 font-medium">
              Pack Size: <span className="text-stone-800 font-bold">{selectedWeight || product.weight}</span>
            </div>
          )}

          {/* Price & Quantity & Add to Cart */}
          <div className="flex items-center justify-between mt-0.5 gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-lg text-[#164E32]">₹{currentPrice * quantity}</span>
                <span className="text-xs text-stone-400 line-through">₹{currentOriginalPrice * quantity}</span>
              </div>
              <span className="text-[10px] text-stone-500 block">
                {selectedWeight || product.weight}
              </span>
            </div>

            {/* Quantity Selector + Add Button */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(Math.max(1, quantity - 1));
                  }}
                  className="px-1.5 py-1 text-stone-600 hover:text-stone-900"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center font-bold text-stone-800 text-[11px]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(quantity + 1);
                  }}
                  className="px-1.5 py-1 text-stone-600 hover:text-stone-900"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isAddedAnim
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#EA580C] hover:bg-[#D9480F] text-white shadow-xs hover:shadow'
                }`}
              >
                {isAddedAnim ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" /> Add
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
