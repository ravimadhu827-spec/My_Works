import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { 
  ShoppingBag, 
  Trash2, 
  Heart, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Truck, 
  ShieldCheck,
  X
} from 'lucide-react';

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryFee, 
    discountAmount, 
    total, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    clearCart 
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.product.id)) {
      toggleWishlist(item.product);
    }
    removeFromCart(item.cartItemId);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF7F2] px-4 text-center py-16">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#164E32] flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif-indian text-2xl sm:text-3xl font-bold text-stone-900">
          Your Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-sm">
          Looks like you haven’t added any homemade treats yet. Explore our fresh pickles, snacks, sweets, and dishes!
        </p>
        <Link
          to="/shop"
          className="mt-6 px-8 py-3.5 rounded-full bg-[#164E32] hover:bg-[#0F3824] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
        >
          Explore Homemade Menu
        </Link>
      </div>
    );
  }

  const freeDeliveryThreshold = 499;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Clear Cart */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE3D6]">
          <div>
            <h1 className="font-serif-indian text-3xl font-extrabold text-[#164E32]">
              Shopping Cart
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Review your fresh homemade selections before placing your order
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE3D6] shadow-2xs mb-8">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="flex items-center gap-1.5 text-stone-700">
              <Truck className="w-4 h-4 text-[#164E32]" />
              {remainingForFreeDelivery === 0 ? (
                <span className="text-emerald-700 font-bold">🎉 Congratulations! You have unlocked Free Delivery!</span>
              ) : (
                <span>Add <strong>₹{remainingForFreeDelivery}</strong> more to get <strong>Free Delivery!</strong></span>
              )}
            </span>
            <span className="text-stone-500">{Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100))}%</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#164E32] h-full transition-all duration-500"
              style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Layout: Items Table (2/3) + Order Summary (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE3D6] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product info */}
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {item.product.subcategory}
                    </span>
                    <Link to={`/product/${item.product.slug}`} className="block">
                      <h3 className="font-serif-indian font-bold text-sm sm:text-base text-stone-900 hover:text-[#164E32] transition-colors truncate mt-1">
                        {item.product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Pack: {item.selectedWeight}
                      </span>
                      <span className="text-stone-500">₹{item.unitPrice} each</span>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Subtotal */}
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  
                  {/* Quantity Counter */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1.5 text-stone-600 hover:text-stone-900"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-xs text-stone-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1.5 text-stone-600 hover:text-stone-900"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[70px]">
                    <span className="font-bold text-base text-[#164E32]">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>

                  {/* Action buttons (Move to Wishlist & Remove) */}
                  <div className="flex items-center gap-1 text-stone-400">
                    <button
                      onClick={() => handleMoveToWishlist(item)}
                      title="Move to Wishlist"
                      className="p-1.5 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      title="Remove Item"
                      className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            ))}

            {/* Bottom shopping CTA */}
            <div className="pt-2 flex justify-between items-center text-xs">
              <Link
                to="/shop"
                className="font-bold text-[#164E32] hover:text-[#EA580C] flex items-center gap-1"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-[#EAE3D6] shadow-2xs sticky top-28 space-y-6">
              
              <h2 className="font-serif-indian text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
                Order Summary
              </h2>

              {/* Coupon code input */}
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1.5">
                  Have a Coupon Code?
                </label>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. NAMMA10, SNACK15"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#164E32] uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#164E32] hover:bg-[#0F3824] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span><strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountPercent}% off)</span>
                    </div>
                    <button onClick={removeCoupon} className="text-stone-400 hover:text-stone-700">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Calculations Breakdown */}
              <div className="space-y-3 pt-3 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">Free Delivery</span>
                    ) : (
                      <span className="font-semibold text-stone-900">₹{deliveryFee}</span>
                    )}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900">
                  <span>Grand Total</span>
                  <span className="text-[#164E32] text-xl font-extrabold">₹{total}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 rounded-full bg-[#EA580C] hover:bg-[#D9480F] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Safe & Secure Checkout</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
