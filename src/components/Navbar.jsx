import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown, 
  PhoneCall, 
  Clock, 
  ShieldCheck, 
  LogOut,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const { totalItemsCount, subtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    } else {
      setSearchModalOpen(true);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Pickles', path: '/pickles' },
    { name: 'Karam Snacks', path: '/karam-snacks' },
    { name: 'Sweet Snacks', path: '/sweet-snacks' },
    { name: 'Spice Powders', path: '/spice-powders' },
    { name: 'Masalas', path: '/masalas' },
    { name: 'Bakery', path: '/bakery' },
    { name: 'Sweets', path: '/sweets' },
    { name: 'Dry Foods', path: '/dry-foods' },
    { name: 'Combo Packs', path: '/combos' },
    { name: 'Festival Specials', path: '/festival-specials' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top Banner Announcement */}
      <div className="bg-[#164E32] text-amber-100 text-xs py-1.5 px-4 font-medium border-b border-[#0F3824]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Authentic Homemade Food Products
            </span>
            <span className="hidden md:inline text-amber-200/70">|</span>
            <span className="hidden md:inline">Small Batch Manufacturing • Packed Fresh From Our Kitchen</span>
          </div>
          <div className="flex items-center gap-4 text-amber-200/90 text-xs">
            <span className="hidden sm:flex items-center gap-1">
              <PackageCheck className="w-3.5 h-3.5 text-amber-400" /> Airtight Food-Grade Packaging
            </span>
            <a href="tel:+919840123456" className="flex items-center gap-1 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-amber-400" /> +91 98401 23456
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-[#FAF7F2]/95 backdrop-blur-md border-b ${
          scrolled ? 'shadow-md border-[#E3DCCE]' : 'border-[#EAE3D6]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3">
            
            {/* Left: Brand Identity */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#164E32] to-[#2D6A4F] p-0.5 shadow-md flex items-center justify-center text-white ring-2 ring-[#CA8A04]/40 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[14px] bg-[#164E32] flex items-center justify-center">
                  <span className="text-xl">🍲</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-indian text-2xl font-bold tracking-tight text-[#164E32] group-hover:text-[#EA580C] transition-colors">
                  Namma Veetu Suvai
                </span>
                <span className="text-[11px] font-medium tracking-wider uppercase text-[#735C3A] flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>
                  Homemade • Traditional • Fresh
                </span>
              </div>
            </Link>

            {/* Middle: Search Bar (Desktop) */}
            <div className="hidden lg:flex items-center flex-1 max-w-sm mx-4">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search pickles, murukku, sambar powder..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white text-xs rounded-full border border-[#D9D1C3] focus:outline-none focus:ring-2 focus:ring-[#164E32] transition-all placeholder:text-stone-400"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Mobile Search Icon */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="lg:hidden p-2 rounded-full text-stone-700 hover:text-[#164E32] hover:bg-stone-200/50 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-full text-stone-700 hover:text-[#EA580C] hover:bg-stone-200/50 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EA580C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-50 text-[#164E32] hover:bg-emerald-100 border border-emerald-200 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold text-xs hidden sm:inline">
                  ₹{subtotal}
                </span>
                {totalItemsCount > 0 && (
                  <span className="bg-[#164E32] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {totalItemsCount}
                  </span>
                )}
              </Link>

              {/* User Account */}
              <div className="relative">
                {isAuthenticated ? (
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-full text-stone-700 hover:bg-stone-200/60 transition-colors text-xs font-semibold"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#164E32] text-white flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full text-stone-700 hover:text-[#164E32] hover:bg-stone-200/60 transition-colors text-xs font-semibold"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                )}

                {userDropdownOpen && isAuthenticated && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 text-xs">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="font-bold text-stone-800">{user.name}</p>
                      <p className="text-stone-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/wishlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-stone-50 text-stone-700"
                    >
                      My Wishlist ({wishlistCount})
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-stone-50 text-stone-700"
                    >
                      My Cart ({totalItemsCount})
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Order Now Button */}
              <Link
                to="/shop"
                className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#EA580C] hover:bg-[#D9480F] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all hover:scale-[1.02]"
              >
                Order Now
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-stone-700 hover:text-[#164E32] hover:bg-stone-200/60 transition-colors"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Desktop Sub Navigation Bar */}
          <nav className="hidden xl:flex items-center justify-between py-2 border-t border-[#EAE3D6]/70 text-xs font-semibold text-stone-700 overflow-x-auto">
            <div className="flex items-center gap-5 whitespace-nowrap">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative transition-colors hover:text-[#EA580C] py-1 ${
                      isActive ? 'text-[#164E32] font-bold border-b-2 border-[#164E32]' : ''
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-full border border-emerald-200/60 shrink-0 ml-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Free Delivery on orders above ₹499</span>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF7F2] border-t border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-fade-in max-h-[85vh] overflow-y-auto">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Search packaged homemade food products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#164E32]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/70 border border-stone-200/80 text-xs font-semibold text-stone-800 hover:bg-emerald-50 hover:text-[#164E32] transition-colors"
                >
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <Link
                to="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#EA580C] text-white text-center font-bold text-xs uppercase tracking-wider rounded-xl shadow"
              >
                Shop Packaged Products
              </Link>
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 bg-white text-stone-800 text-center font-semibold text-xs border border-stone-300 rounded-xl"
                >
                  Login / Create Account
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-red-50 text-red-700 text-center font-semibold text-xs rounded-xl"
                >
                  Log Out ({user.name})
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
