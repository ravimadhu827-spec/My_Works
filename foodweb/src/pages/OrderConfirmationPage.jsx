import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Clock, 
  MapPin, 
  Phone, 
  ShoppingBag, 
  ArrowRight,
  MessageCircle,
  Sparkles
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`nvs_order_${orderId}`);
      if (saved) {
        setOrder(JSON.parse(saved));
      } else {
        // Fallback demo order
        setOrder({
          orderId,
          date: 'Just now',
          estimatedDelivery: 'Tomorrow, by 11:30 AM (Fresh Morning Dispatch)',
          customer: {
            name: 'Ananya Iyer',
            phone: '+91 98401 23456',
            house: 'Flat 4B, Kaveri Apartments',
            street: '12th Cross, Gandhi Road',
            area: 'T. Nagar',
            city: 'Chennai',
            pincode: '600017'
          },
          items: [
            {
              product: { name: 'Avakkai Raw Mango Pickle', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=400&q=80' },
              selectedWeight: '500g',
              unitPrice: 330,
              quantity: 1
            },
            {
              product: { name: 'Traditional Hand-Made Kai Murukku', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80' },
              selectedWeight: '250g',
              unitPrice: 140,
              quantity: 2
            }
          ],
          subtotal: 610,
          deliveryFee: 0,
          discountAmount: 61,
          total: 549
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  if (!order) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Namma Veetu Suvai! My Order ID is #${order.orderId}. Can you please share live dispatch updates?`
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3D6] shadow-sm text-center mb-8 relative overflow-hidden">
          
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/60 animate-bounce-slow">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-[#EA580C] uppercase tracking-wider px-3 py-1 bg-orange-100 rounded-full inline-block mb-2">
            Order Confirmed & Sent to Kitchen
          </span>

          <h1 className="font-serif-indian text-3xl sm:text-4xl font-extrabold text-[#164E32]">
            Order Placed Successfully! 🎉
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-md mx-auto">
            Thank you for supporting authentic homemade food! Our home cooks have received your order and are preparing it fresh with traditional love.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 bg-[#FAF7F2] px-5 py-2.5 rounded-2xl border border-stone-200 text-xs font-semibold">
            <span className="text-stone-500">Order Reference:</span>
            <span className="text-[#164E32] font-mono font-bold text-sm">#{order.orderId}</span>
          </div>

        </div>

        {/* Delivery & Address Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-2xs mb-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            
            {/* Estimated Delivery */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
              <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" /> Estimated Delivery
              </span>
              <p className="text-emerald-800 font-semibold">{order.estimatedDelivery}</p>
              <p className="text-emerald-700/80 text-[11px] mt-1">Dispatched fresh from our central home kitchen</p>
            </div>

            {/* Delivery Location */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="font-bold text-stone-800 block mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#EA580C]" /> Delivery Address
              </span>
              <p className="text-stone-700 font-medium">
                {order.customer.name} ({order.customer.phone})
              </p>
              <p className="text-stone-500 text-[11px] mt-0.5">
                {order.customer.house}, {order.customer.street}, {order.customer.area}, {order.customer.city} - {order.customer.pincode}
              </p>
            </div>

          </div>

          {/* Ordered Items Summary */}
          <div>
            <h3 className="font-serif-indian text-base font-bold text-stone-900 mb-3 pb-2 border-b border-stone-100 flex items-center justify-between">
              <span>Items in this Order ({order.items.length})</span>
              <span className="text-xs font-normal text-stone-500">Fresh Batch</span>
            </h3>

            <div className="space-y-3">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 text-xs py-1.5 border-b border-stone-50">
                  <div className="flex items-center gap-3">
                    <img src={it.product.image} alt={it.product.name} className="w-12 h-12 rounded-xl object-cover border border-stone-200" />
                    <div>
                      <h4 className="font-bold text-stone-800">{it.product.name}</h4>
                      <p className="text-[11px] text-stone-500">Pack: {it.selectedWeight} • Qty: {it.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900">₹{it.unitPrice * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-stone-100 flex justify-between items-center text-sm font-bold">
              <span className="text-stone-600">Total Paid Amount:</span>
              <span className="text-xl text-[#164E32] font-black">₹{order.total}</span>
            </div>
          </div>

          {/* Buttons: WhatsApp Live Updates & Return to Shop */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/919840123456?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider shadow flex items-center justify-center gap-2 transition-transform hover:scale-102"
            >
              <MessageCircle className="w-4 h-4" /> Get WhatsApp Order Updates
            </a>

            <Link
              to="/shop"
              className="flex-1 py-3.5 px-6 rounded-full bg-[#164E32] hover:bg-[#0F3824] text-white font-bold text-xs uppercase tracking-wider text-center shadow transition-transform hover:scale-102"
            >
              Continue Shopping
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
