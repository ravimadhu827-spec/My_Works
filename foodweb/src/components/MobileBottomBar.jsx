import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Heart, Store, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function MobileBottomBar() {
  const { totalItemsCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EAE3D6] px-3 py-2 flex items-center justify-around shadow-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-[#164E32] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`
        }
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-[#164E32] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`
        }
      >
        <Store className="w-5 h-5" />
        <span>Shop</span>
      </NavLink>

      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          `relative flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-[#164E32] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`
        }
      >
        <div className="relative">
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#EA580C] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>
        <span>Wishlist</span>
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `relative flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-[#164E32] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`
        }
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#164E32] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {totalItemsCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors ${
            isActive ? 'text-[#164E32] font-bold' : 'text-stone-500 hover:text-stone-900'
          }`
        }
      >
        <User className="w-5 h-5" />
        <span>Account</span>
      </NavLink>
    </div>
  );
}
