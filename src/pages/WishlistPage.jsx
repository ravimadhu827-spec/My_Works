import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, clearWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF7F2] px-4 text-center py-16">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold text-stone-900">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-sm">
          Save your favorite homemade dishes, pickles, and bakery sweets here to order anytime.
        </p>
        <Link
          to="/shop"
          className="mt-6 px-8 py-3.5 rounded-full bg-[#164E32] hover:bg-[#0F3824] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
        >
          Explore Delicious Foods
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE3D6]">
          <div>
            <h1 className="font-serif-indian text-3xl font-extrabold text-[#164E32]">
              My Wishlist ({wishlist.length})
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Your favorite traditional foods ready to order
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}
