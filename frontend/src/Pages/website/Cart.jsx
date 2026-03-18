import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateCartQty } = useAppContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet. Let's find some delicious cakes!</p>
        <button 
          onClick={() => navigate("/shop")}
          className="bg-rose-600 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-700 transition shadow-lg"
        >
          START SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-gray-900">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                <img 
                  src={item.image || item.img} 
                  alt={item.name} 
                  className="w-24 h-24 rounded-xl object-cover"
                />
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <p className="text-rose-600 font-bold mt-1">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
                  <button 
                    onClick={() => updateCartQty(user.id, item.id, item.quantity - 1)}
                    className="p-1 hover:bg-white rounded-lg transition text-gray-500"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQty(user.id, item.id, item.quantity + 1)}
                    className="p-1 hover:bg-white rounded-lg transition text-gray-500"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <p className="font-bold text-gray-900">₹{Number(item.price) * item.quantity}</p>
                </div>

                <button 
                  onClick={() => removeFromCart(user.id, item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl sticky top-32">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-rose-600">₹{subtotal}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate("/checkout")}
                className="w-full bg-rose-600 text-white py-4 rounded-2xl font-bold hover:bg-rose-700 transition flex items-center justify-center gap-2 shadow-lg shadow-rose-100"
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={20} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <p>We accept Cash on Delivery (COD) only</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
