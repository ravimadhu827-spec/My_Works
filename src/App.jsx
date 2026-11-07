import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Providers
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import ToastContainer from './components/ToastContainer';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import PicklesPage from './pages/PicklesPage';
import SnacksPage from './pages/SnacksPage';
import BakeryPage from './pages/BakeryPage';
import SweetsPage from './pages/SweetsPage';
import TraditionalFoodsPage from './pages/TraditionalFoodsPage';
import CombosPage from './pages/CombosPage';
import OffersPage from './pages/OffersPage';
import FestivalSpecialsPage from './pages/FestivalSpecialsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#1C241F]">
                <Navbar />
                
                <main className="flex-1 pb-16 xl:pb-0">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/pickles" element={<PicklesPage />} />
                    <Route path="/snacks" element={<SnacksPage />} />
                    <Route path="/bakery" element={<BakeryPage />} />
                    <Route path="/sweets" element={<SweetsPage />} />
                    <Route path="/traditional-foods" element={<TraditionalFoodsPage />} />
                    <Route path="/combos" element={<CombosPage />} />
                    <Route path="/offers" element={<OffersPage />} />
                    <Route path="/festival-specials" element={<FestivalSpecialsPage />} />
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    {/* Fallback route */}
                    <Route path="*" element={<HomePage />} />
                  </Routes>
                </main>

                <Footer />
                <MobileBottomBar />
                <ToastContainer />
              </div>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
