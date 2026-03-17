import React from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function MessageModal({ isOpen, type = "success", title, message, onClose }) {
  if (!isOpen) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform animate-in zoom-in-95 duration-200">
        
        {/* Header Color Strip */}
        <div className={`h-2 ${isSuccess ? "bg-emerald-500" : "bg-red-500"}`} />

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-full ${isSuccess ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
              {isSuccess ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>

          <button
            onClick={onClose}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all shadow-lg active:scale-95 ${
              isSuccess 
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" 
                : "bg-red-600 hover:bg-red-700 shadow-red-200"
            }`}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
