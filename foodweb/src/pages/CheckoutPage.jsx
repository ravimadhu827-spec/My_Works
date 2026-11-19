import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Building2, 
  Lock, 
  Truck, 
  Clock, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, discountAmount, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    name: user?.name || 'Ananya Iyer',
    phone: user?.phone || '+91 98401 23456',
    email: user?.email || 'ananya.iyer@example.com',
    house: user?.address?.house || 'Flat 4B, Kaveri Apartments',
    street: user?.address?.street || '12th Cross, Gandhi Road',
    area: user?.address?.area || 'T. Nagar',
    city: user?.address?.city || 'Chennai',
    state: user?.address?.state || 'Tamil Nadu',
    pincode: user?.address?.pincode || '600017',
    deliverySlot: 'morning',
    paymentMethod: 'upi',
    instructions: 'Please ring the doorbell and leave near the door if not answered.'
  });

  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.house || !formData.pincode) {
      addToast('Please complete all delivery address fields', 'error');
      return;
    }

    setIsSubmitting(true);

    // Generate unique order ID
    const orderId = `NVS-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer: formData,
      items: [...items],
      subtotal,
      deliveryFee,
      discountAmount,
      total,
      estimatedDelivery: 'Tomorrow, by 11:30 AM (Morning Fresh Dispatch)'
    };

    // Store in localStorage for Order Confirmation
    localStorage.setItem(`nvs_order_${orderId}`, JSON.stringify(orderData));

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation/${orderId}`);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FAF7F2] px-4 text-center">
        <h2 className="font-serif-indian text-2xl font-bold text-stone-900">Your cart is empty</h2>
        <p className="text-xs text-stone-500 mt-1">Add products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="mt-4 px-6 py-2.5 bg-[#164E32] text-white text-xs font-bold rounded-full">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-8 pb-4 border-b border-[#EAE3D6]">
          <h1 className="font-serif-indian text-3xl font-extrabold text-[#164E32]">
            Secure Checkout
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Complete your delivery details and choose your preferred payment method
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form: Customer Info, Address, Delivery Slot, Payment */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Section 1: Customer Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-2xs">
              <h2 className="font-serif-indian text-lg font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#164E32] text-white text-xs flex items-center justify-center font-bold">1</span>
                Customer Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Address */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-2xs">
              <h2 className="font-serif-indian text-lg font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#164E32] text-white text-xs flex items-center justify-center font-bold">2</span>
                Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="font-bold text-stone-700 block mb-1">House / Flat / Apartment No. *</label>
                  <input
                    type="text"
                    name="house"
                    required
                    placeholder="e.g. Flat 302, Sai Residency"
                    value={formData.house}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Street / Landmark *</label>
                  <input
                    type="text"
                    name="street"
                    required
                    placeholder="e.g. 5th Main Road, Near Temple"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Area / Locality *</label>
                  <input
                    type="text"
                    name="area"
                    required
                    placeholder="e.g. T. Nagar"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Slot Selector */}
              <div className="mt-6 pt-4 border-t border-stone-100">
                <label className="font-bold text-stone-700 block mb-2 text-xs">
                  Preferred Delivery Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { id: 'morning', label: 'Morning Fresh Slot', time: '7:30 AM - 10:30 AM' },
                    { id: 'afternoon', label: 'Lunch Express Slot', time: '12:00 PM - 2:30 PM' },
                    { id: 'evening', label: 'Evening Teatime Slot', time: '4:30 PM - 7:30 PM' }
                  ].map((slot) => (
                    <label
                      key={slot.id}
                      className={`p-3 rounded-xl border cursor-pointer flex flex-col transition-all ${
                        formData.deliverySlot === slot.id
                          ? 'border-[#164E32] bg-emerald-50/70 text-emerald-950 ring-1 ring-[#164E32]'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">{slot.label}</span>
                        <input
                          type="radio"
                          name="deliverySlot"
                          value={slot.id}
                          checked={formData.deliverySlot === slot.id}
                          onChange={handleInputChange}
                          className="text-[#164E32]"
                        />
                      </div>
                      <span className="text-[11px] text-stone-500">{slot.time}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Payment Options */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-2xs">
              <h2 className="font-serif-indian text-lg font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#164E32] text-white text-xs flex items-center justify-center font-bold">3</span>
                Payment Method
              </h2>

              <div className="space-y-3">
                
                {/* UPI Option */}
                <label
                  className={`p-4 rounded-2xl border cursor-pointer block transition-all ${
                    formData.paymentMethod === 'upi'
                      ? 'border-[#164E32] bg-emerald-50/50 ring-1 ring-[#164E32]'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-stone-900 block">Instant UPI (GPay, PhonePe, Paytm, BHIM)</span>
                        <span className="text-[11px] text-stone-500">Fastest and contactless payment</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="text-[#164E32]"
                    />
                  </div>

                  {formData.paymentMethod === 'upi' && (
                    <div className="mt-3 pt-3 border-t border-emerald-100/80 flex flex-col sm:flex-row gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Enter your UPI ID (e.g. mobile@upi)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="flex-1 p-2 bg-white border border-stone-300 rounded-xl text-xs"
                      />
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg">
                        Auto-Verified
                      </span>
                    </div>
                  )}
                </label>

                {/* Cash on Delivery (COD) */}
                <label
                  className={`p-4 rounded-2xl border cursor-pointer block transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#164E32] bg-emerald-50/50 ring-1 ring-[#164E32]'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#164E32] flex items-center justify-center">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-stone-900 block">Cash on Delivery (COD)</span>
                        <span className="text-[11px] text-stone-500">Pay cash or UPI upon doorstep delivery</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-[#164E32]"
                    />
                  </div>
                </label>

                {/* Card Payment */}
                <label
                  className={`p-4 rounded-2xl border cursor-pointer block transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#164E32] bg-emerald-50/50 ring-1 ring-[#164E32]'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-stone-900 block">Credit / Debit Card</span>
                        <span className="text-[11px] text-stone-500">Visa, Mastercard, RuPay, Maestro</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="text-[#164E32]"
                    />
                  </div>
                </label>

                {/* Net Banking */}
                <label
                  className={`p-4 rounded-2xl border cursor-pointer block transition-all ${
                    formData.paymentMethod === 'netbanking'
                      ? 'border-[#164E32] bg-emerald-50/50 ring-1 ring-[#164E32]'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-stone-900 block">Net Banking</span>
                        <span className="text-[11px] text-stone-500">All major Indian banks supported</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleInputChange}
                      className="text-[#164E32]"
                    />
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Summary: Ordered Items & Total */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-[#EAE3D6] shadow-2xs sticky top-28 space-y-6">
              
              <h3 className="font-serif-indian text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
                Order Review ({items.length} items)
              </h3>

              {/* Items mini list */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-xs">
                {items.map((it) => (
                  <div key={it.cartItemId} className="flex items-center justify-between gap-3 pb-2 border-b border-stone-50">
                    <img src={it.product.image} alt={it.product.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-stone-800 truncate">{it.product.name}</h4>
                      <p className="text-[11px] text-stone-400">{it.selectedWeight} × {it.quantity}</p>
                    </div>
                    <span className="font-bold text-stone-900">₹{it.unitPrice * it.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900">
                  <span>Total Payable</span>
                  <span className="text-[#164E32] text-xl font-extrabold">₹{total}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#EA580C] hover:bg-[#D9480F] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Placing Order...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" /> Place Order (₹{total})
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-stone-400 space-y-1">
                <p>By placing order you agree to our Terms and Fresh Food Guarantee.</p>
                <p className="text-emerald-800 font-medium">✓ Prepared fresh with authentic family recipes</p>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
