import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(emailOrPhone, password);
    if (success) {
      navigate(-1); // Return to previous page or home
    }
  };

  const handleQuickDemoFill = () => {
    setEmailOrPhone('ananya.iyer@example.com');
    setPassword('Homestyle@123');
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
          <h2 className="text-lg font-bold text-stone-900 mt-1">Welcome Back!</h2>
          <p className="text-xs text-stone-500">
            Sign in to access your orders, saved addresses, and wishlist
          </p>
        </div>

        {/* Quick Demo Credentials Assistant */}
        <div className="mb-6 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-[#164E32] block">Testing demo account?</span>
            <span className="text-[11px] text-emerald-800">Auto-fill test user credentials</span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="px-3 py-1.5 bg-[#164E32] text-white text-[11px] font-bold rounded-lg hover:bg-[#0F3824] transition-colors"
          >
            Auto Fill
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-stone-700 block mb-1">
              Email Address or Mobile Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="ananya@example.com or 9840123456"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="font-bold text-stone-700 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#164E32] focus:outline-none"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-stone-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[#164E32]"
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to registered email.'); }} className="text-[#EA580C] font-semibold hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-full bg-[#164E32] hover:bg-[#0F3824] text-white font-bold uppercase tracking-wider text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Sign In to Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Register */}
        <div className="mt-8 pt-4 border-t border-stone-100 text-center text-xs text-stone-600">
          <span>Don't have an account yet? </span>
          <Link to="/register" className="font-bold text-[#EA580C] hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
}
