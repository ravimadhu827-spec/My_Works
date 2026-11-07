import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none md:bottom-6">
      {toasts.map((toast) => {
        let bgColor = 'bg-[#164E32] text-white border-emerald-700';
        let Icon = CheckCircle2;

        if (toast.type === 'error') {
          bgColor = 'bg-[#C1121F] text-white border-red-700';
          Icon = AlertCircle;
        } else if (toast.type === 'info') {
          bgColor = 'bg-[#EA580C] text-white border-orange-600';
          Icon = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-xl border ${bgColor} transition-all duration-300 animate-slide-up text-sm font-medium`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="w-5 h-5 shrink-0" />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
