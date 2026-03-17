import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { Package, MapPin, Calendar, Clock, ChevronRight } from "lucide-react";

export default function OrderTracking() {
  const { userOrders, fetchUserOrders, cancelOrder } = useAppContext();
  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchUserOrders(user.id);
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Shipped": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Delivered": return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (userOrders.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-6">
          <Package size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500">When you place an order, it will show up here.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-gray-900">Track Your Orders</h1>

        <div className="space-y-6">
          {[...userOrders].sort((a,b) => b.id - a.id).map((order) => (
            <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start justify-between">
                
                {/* Order Meta */}
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-black text-gray-300 uppercase tracking-tighter">Order ID</span>
                    <span className="font-mono text-gray-900 font-bold">#{order.id}</span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(order.status)} animate-pulse`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-gray-500">
                      <Calendar size={18} />
                      <span className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-500">
                      <Clock size={18} />
                      <span className="text-sm font-medium">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-gray-500">
                    <MapPin size={18} className="mt-0.5 shrink-0" />
                    <p className="text-sm font-medium text-gray-600 leading-snug">{order.address}</p>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="flex-1 w-full md:w-auto">
                  <p className="text-[10px] font-black text-gray-300 uppercase mb-4">Items Summary</p>
                  <div className="space-y-2">
                    {order.items.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm font-medium text-gray-700">
                        <span>{item.name} <span className="text-gray-400 ml-1">x{item.quantity}</span></span>
                        <span>₹{Number(item.price) * item.quantity}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-rose-600 font-bold">+ {order.items.length - 2} more items</p>
                    )}
                  </div>
                </div>

                {/* Total & Action */}
                <div className="text-right flex flex-col items-end gap-2 w-full md:w-auto border-t md:border-t-0 border-gray-50 pt-6 md:pt-0">
                  <p className="text-[10px] font-black text-gray-300 uppercase">Total Amount</p>
                  <p className="text-3xl font-black text-gray-900">₹{order.total}</p>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 uppercase text-center">CASH ON DELIVERY</p>
                    
                    {order.status === "Pending" && (
                      <button
                        onClick={() => {
                          console.log("Cancel button clicked for order:", order.id);
                          cancelOrder(order.id);
                        }}
                        className="text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full border border-red-100 uppercase transition flex items-center justify-center gap-1"
                      >
                        Cancel Order
                        <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
