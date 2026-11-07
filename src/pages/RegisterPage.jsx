import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match. Please verify.', 'error');
      return;
    }

    const success = register(formData.name, formData.email, formData.phone, formData.password);
    if (success) {
      navigate('/shop');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE3D6] shadow-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <span className="text-3xl">🍲</span>
            <span className="font-serif-indian text-2xl font-bold text-[#164E32]">
              Namma Veetu Suvai
            </span>
          </Link>
          <h2 className="text-lg font-bold text-stone-900 mt-1">Create an Account</h2>
          <p className="text-xs text-stone-500">
            Join our homemade food family for fresh orders, discounts & rewards
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">Your Full Name *</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Ananya Iyer"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
              />
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                placeholder="ananya@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Mobile Phone (WhatsApp) *</label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98401 23456"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
              />
              <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Password *</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Confirm Password *</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-3 rounded-full bg-[#EA580C] hover:bg-[#D9480F] text-white font-bold uppercase tracking-wider text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Create My Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-8 pt-4 border-t border-stone-100 text-center text-xs text-stone-600">
          <span>Already have an account? </span>
          <Link to="/login" className="font-bold text-[#164E32] hover:underline">
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
}
