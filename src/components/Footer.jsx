import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RefreshCw,
  PackageCheck,
  MessageCircle
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F3824] text-[#EAE3D6] border-t border-[#164E32] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Highlight Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 text-amber-300 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">Nationwide Shipping</h5>
              <p className="text-[11px] text-emerald-200/70">Dispatched within 24h</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">100% Homemade Purity</h5>
              <p className="text-[11px] text-emerald-200/70">Zero chemicals or dyes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 text-amber-300 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">Small Batch Preparation</h5>
              <p className="text-[11px] text-emerald-200/70">Cooked in limited runs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/80 text-amber-300 flex items-center justify-center shrink-0">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-white">Quality Sealed Packaging</h5>
              <p className="text-[11px] text-emerald-200/70">Moisture-barrier protection</p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#164E32] to-[#2D6A4F] p-0.5 shadow-md flex items-center justify-center ring-2 ring-[#CA8A04]/40">
                <div className="w-full h-full rounded-[14px] bg-[#0F3824] flex items-center justify-center text-xl">
                  🍲
                </div>
              </div>
              <div>
                <span className="font-serif-indian text-2xl font-bold text-white tracking-tight">
                  Namma Veetu Suvai
                </span>
                <span className="block text-[11px] text-[#CA8A04] tracking-wider uppercase font-semibold">
                  Homemade • Traditional • Fresh
                </span>
              </div>
            </Link>

            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-sm">
              A premium homemade food manufacturing brand. We prepare and package authentic pickles, karam snacks, stone-ground spice powders, masalas, sweets, dry snacks, and festival gift packs using traditional generational recipes.
            </p>

            {/* Contact details */}
            <div className="space-y-2 text-xs text-emerald-200/90 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#CA8A04] shrink-0" />
                <span>14/2 Traditional Food Processing Unit, T. Nagar, Chennai, India 600017</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#CA8A04] shrink-0" />
                <span>+91 98401 23456 / +91 98401 78910</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#CA8A04] shrink-0" />
                <span>orders@nammaveetusuvai.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-indian text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-1 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <Link to="/shop" className="hover:text-amber-300 transition-colors">Shop All Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-amber-300 transition-colors">Offers & Discounts</Link>
              </li>
              <li>
                <Link to="/combos" className="hover:text-amber-300 transition-colors">Combo Packs</Link>
              </li>
              <li>
                <Link to="/festival-specials" className="hover:text-amber-300 transition-colors">Festival Gift Packs</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="font-serif-indian text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-1 inline-block">
              Products
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <Link to="/pickles" className="hover:text-amber-300 transition-colors">Pickles</Link>
              </li>
              <li>
                <Link to="/karam-snacks" className="hover:text-amber-300 transition-colors">Karam Snacks</Link>
              </li>
              <li>
                <Link to="/sweet-snacks" className="hover:text-amber-300 transition-colors">Sweet Snacks</Link>
              </li>
              <li>
                <Link to="/spice-powders" className="hover:text-amber-300 transition-colors">Spice Powders</Link>
              </li>
              <li>
                <Link to="/masalas" className="hover:text-amber-300 transition-colors">Traditional Masalas</Link>
              </li>
              <li>
                <Link to="/bakery" className="hover:text-amber-300 transition-colors">Bakery Products</Link>
              </li>
              <li>
                <Link to="/sweets" className="hover:text-amber-300 transition-colors">Sweets & Desserts</Link>
              </li>
              <li>
                <Link to="/dry-foods" className="hover:text-amber-300 transition-colors">Dry Food Products</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support & Socials */}
          <div>
            <h4 className="font-serif-indian text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-emerald-800 pb-1 inline-block">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80 mb-6">
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Frequently Asked Questions (FAQ)</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Shipping & Delivery Information</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Returns & Refund Guarantee</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-300 transition-colors">Hygienic Packaging Standards</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-300 transition-colors">Terms & Conditions</Link>
              </li>
            </ul>

            {/* Social Media */}
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#CA8A04] block mb-2">
              Follow Our Kitchen
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="Facebook"
              >
                FB
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-[#FF0000] text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="YouTube"
              >
                YT
              </a>
              <a
                href="https://wa.me/919840123456"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors text-xs font-bold"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-4 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p>© {new Date().getFullYear()} Namma Veetu Suvai Homemade Food Products. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> Traditional taste, modern quality.
          </p>
        </div>
      </div>
    </footer>
  );
}
