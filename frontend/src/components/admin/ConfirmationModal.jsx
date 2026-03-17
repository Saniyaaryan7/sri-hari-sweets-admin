import React from 'react';
import { X, AlertTriangle, AlertCircle } from 'lucide-react';

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?", 
  type = "danger" 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header/Icon */}
        <div className={`p-6 flex items-center gap-4 ${type === 'danger' ? 'bg-red-50' : 'bg-blue-50'}`}>
          <div className={`p-3 rounded-2xl ${type === 'danger' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            {type === 'danger' ? <AlertTriangle size={24} /> : <AlertCircle size={24} />}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 leading-none">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/5 transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-600 leading-relaxed font-medium">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all active:scale-95 ${
              type === 'danger' 
                ? 'bg-red-600 hover:bg-red-700 shadow-red-200' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'
            }`}
          >
            {type === 'danger' ? 'Delete Now' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
