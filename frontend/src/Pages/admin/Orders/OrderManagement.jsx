import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { 
  Package, 
  MapPin, 
  Clock, 
  Search, 
  CheckCircle2, 
  Truck, 
  AlertCircle, 
  XCircle,
  MoreVertical,
  ChevronDown
} from "lucide-react";

export default function OrderManagement() {
  const { allOrders, fetchAllOrders, updateOrderStatus } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const filteredOrders = allOrders
    .filter(order => {
      const matchesSearch = 
        String(order.id).includes(searchTerm) || 
        order.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => b.id - a.id);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <Clock className="text-amber-500" size={18} />;
      case "Shipped": return <Truck className="text-blue-500" size={18} />;
      case "Delivered": return <CheckCircle2 className="text-green-500" size={18} />;
      case "Cancelled": return <XCircle className="text-red-500" size={18} />;
      default: return <AlertCircle className="text-gray-500" size={18} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-50 text-amber-700 border-amber-200";
      case "Shipped": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Delivered": return "bg-green-50 text-green-700 border-green-200";
      case "Cancelled": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#F8F9FA] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-500 mt-1">Monitor and process incoming orders</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
            {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                  statusFilter === status 
                  ? "bg-rose-600 text-white shadow-md" 
                  : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 relative">
            <input
              type="text"
              placeholder="Search by Order ID or Address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white pl-12 pr-4 py-4 rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-rose-500 transition outline-none font-medium"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="bg-rose-600 text-white p-4 rounded-2xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Total Orders</p>
              <p className="text-2xl font-black">{allOrders.length}</p>
            </div>
            <Package size={32} className="opacity-20" />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
                
                {/* ID & Status */}
                <div className="flex-1 min-w-[150px] space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xl font-black text-gray-900">#{order.id}</span>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                    <Clock size={16} />
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>

                {/* Address */}
                <div className="flex-[2] min-w-[200px] flex items-start gap-3">
                  <MapPin className="text-gray-300 shrink-0" size={20} />
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">{order.address}</p>
                </div>

                {/* Items/Price Snapshot */}
                <div className="flex-1 min-w-[120px] text-center lg:text-right lg:border-l border-gray-100 lg:pl-8">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-1">Total</p>
                  <p className="text-3xl font-black text-gray-900">₹{order.total}</p>
                  <p className="text-[10px] font-bold text-amber-600 uppercase">Cash on Delivery</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center lg:justify-end gap-3 lg:border-l border-gray-100 lg:pl-8">
                  <div className="relative group">
                    <button className="bg-rose-600 text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-rose-700 shadow-lg shadow-rose-100 transition whitespace-nowrap">
                      Update Status
                      <ChevronDown size={16} />
                    </button>
                    {/* Dropdown with better visibility */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100] p-2">
                      {["Pending", "Shipped", "Delivered", "Cancelled"].map(status => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order.id, status)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition flex items-center gap-3 ${
                            order.status === status ? "bg-rose-50 text-rose-600" : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(status).split(' ')[0]}`}></div>
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Items Detail */}
              <div className="bg-gray-50/50 px-8 py-4 border-t border-gray-50 flex flex-wrap gap-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 text-xs font-bold text-gray-500">
                    <Package size={12} className="text-rose-400" />
                    {item.name} <span className="text-gray-900">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <Package size={64} className="mx-auto text-gray-100 mb-4" />
              <h3 className="text-xl font-bold text-gray-400">No orders found</h3>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
