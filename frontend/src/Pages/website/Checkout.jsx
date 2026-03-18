import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { MapPin, Truck, CheckCircle, ArrowLeft } from "lucide-react";

export default function Checkout() {
  const { cart, placeOrder } = useAppContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address) return alert("Please enter delivery address");
    
    setLoading(true);
    const result = await placeOrder(user.id, {
      items: cart,
      address,
      total: subtotal,
      paymentMethod: "COD"
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/orders"), 3000);
    } else {
      alert("Failed to place order. Please try again.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-8 animate-pulse">
          <CheckCircle size={64} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md">
          Thank you for your order! Your delicious treats will be prepared and delivered shortly.
        </p>
        <p className="text-sm text-amber-600 font-bold bg-amber-50 px-6 py-3 rounded-full">
          Redirecting to your orders...
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <button onClick={() => navigate("/shop")} className="mt-4 text-rose-600 font-bold underline">Go to Shop</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-gray-500 hover:text-rose-600 transition mb-8 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </button>

        <h1 className="text-4xl font-bold mb-10 text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Delivery Form */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="text-rose-600" />
                <h2 className="text-xl font-bold">Delivery Address</h2>
              </div>
              <form onSubmit={handlePlaceOrder}>
                <textarea
                  required
                  rows="4"
                  placeholder="Enter your full address (incl. landmark, city, pincode)..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition resize-none"
                />
                
                <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                  <Truck className="text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-900 text-sm">Free Delivery</h4>
                    <p className="text-blue-700 text-xs">Your order qualifies for free standard delivery.</p>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full mt-8 bg-rose-600 text-white py-4 rounded-2xl font-bold hover:bg-rose-700 transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {loading ? "PROCESSING..." : "CONFIRM ORDER (COD)"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Snapshot */}
          <div>
            <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-2xl sticky top-32">
              <h2 className="text-xl font-bold mb-6">Order Snapshot</h2>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6 scrollbar-thin scrollbar-thumb-gray-700">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">
                      {item.name} <span className="text-gray-500 font-bold ml-1">x{item.quantity}</span>
                    </span>
                    <span className="font-mono">₹{Number(item.price) * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-800 pt-6 space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2">
                  <span>Total</span>
                  <span className="text-rose-500">₹{subtotal}</span>
                </div>
              </div>

              <div className="mt-8 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Payment Method</p>
                <p className="text-sm font-bold text-gray-200">Cash on Delivery (COD)</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
