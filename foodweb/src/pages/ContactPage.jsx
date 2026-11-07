import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      addToast('Please fill all required fields', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Thank you! Your message has been sent to our kitchen team.', 'success');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const whatsappLink = `https://wa.me/919840123456?text=${encodeURIComponent(
    'Hello Namma Veetu Suvai! I have a question about my homemade food order.'
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#164E32] via-[#1E5D3D] to-[#0F3824] text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> We Love Hearing From You
            </span>
            <h1 className="font-serif-indian text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Contact & Order Support
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
              Have questions regarding our recipes, bulk wedding catering, festival hampers, or order status? We are always here to help.
            </p>
          </div>
          <div className="absolute right-6 -bottom-6 text-8xl opacity-15 select-none pointer-events-none">
            📞
          </div>
        </div>

        {/* 2-Column: Contact Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Left: Contact Info & WhatsApp Button */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Details Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D6] shadow-2xs space-y-6">
              <h3 className="font-serif-indian text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
                Our Kitchen Details
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164E32] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Main Kitchen & Bakery</h4>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">
                      14/2 Traditional Kitchen Lane, Near Panagal Park, T. Nagar, Chennai, Tamil Nadu 600017
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Phone Support</h4>
                    <p className="text-stone-600 mt-0.5">
                      +91 98401 23456 / +91 98401 78910
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Email Address</h4>
                    <p className="text-stone-600 mt-0.5">
                      orders@nammaveetusuvai.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Kitchen Timings</h4>
                    <p className="text-stone-600 mt-0.5">
                      Mon – Sun: 7:00 AM – 9:30 PM (Fresh Morning & Evening Batches)
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Order CTA Button */}
              <div className="pt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-transform hover:scale-102 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Order Directly on WhatsApp
                </a>
              </div>
            </div>

            {/* Google Maps Stylized Card */}
            <div className="bg-white rounded-3xl p-5 border border-[#EAE3D6] shadow-2xs">
              <h4 className="font-serif-indian text-sm font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#EA580C]" /> Find Our Kitchen On Maps
              </h4>
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-stone-100 border border-stone-200 flex items-center justify-center text-center p-4">
                <div className="space-y-2">
                  <span className="text-3xl">📍</span>
                  <p className="text-xs font-bold text-[#164E32]">Namma Veetu Suvai Central Kitchen</p>
                  <p className="text-[11px] text-stone-500">T. Nagar, Chennai, Tamil Nadu</p>
                  <a
                    href="https://maps.google.com/?q=T.+Nagar+Chennai"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 px-3 py-1 bg-[#164E32] text-white text-[11px] font-semibold rounded-lg hover:bg-[#0F3824]"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3D6] shadow-2xs">
              <h3 className="font-serif-indian text-2xl font-bold text-stone-900 mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Fill in the form below and our kitchen team will get back to you within 2 hours.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Thank you! Your inquiry has been received. We will contact you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Krishnan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98401 23456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Your Message or Order Request *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your request, festival hamper order, bulk requirement, or feedback..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#EA580C] hover:bg-[#D9480F] text-white font-bold uppercase tracking-wider text-xs shadow-md hover:shadow-lg transition-transform hover:scale-102 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
