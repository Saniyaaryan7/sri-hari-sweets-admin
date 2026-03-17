import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { ShoppingCart, ArrowLeft, Star, Clock, ShieldCheck, Plus, Minus } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cakes, addToCart } = useAppContext();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = cakes.find(c => String(c.id) === String(id));
    if (found) setProduct(found);
  }, [id, cakes]);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(user.id, product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return (
    <div className="h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-rose-600 transition mb-8 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Cakes
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Section */}
          <div className="relative group">
            <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100">
              <img 
                src={product.image || product.img} 
                alt={product.name}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
            </div>
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm text-xs font-bold text-rose-600 uppercase tracking-widest border border-rose-50">
              {product.cakeId || "#ITEM"}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 text-amber-500 mb-4">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                <span className="text-sm text-gray-400 font-medium ml-2">(4.9 • 120+ Reviews)</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="mt-4 text-gray-500 leading-relaxed text-lg max-w-lg">
                Indulge in the heavenly taste of our handcrafted {product.name}. 
                Made with premium ingredients and baked to perfection, 
                it's the ideal choice for any celebration.
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-rose-600">₹{product.price}</span>
              {product.strike && (
                <span className="text-xl text-gray-400 line-through">₹{product.strike}</span>
              )}
              <span className="ml-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                In Stock
              </span>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Delivery</p>
                  <p className="text-sm font-semibold text-gray-700">Same Day</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Quality</p>
                  <p className="text-sm font-semibold text-gray-700">100% Fresh</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6">
                <span className="text-sm font-bold text-gray-900 uppercase">Quantity</span>
                <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-xl border border-gray-200">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-rose-600 transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-rose-600 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 relative overflow-hidden px-10 py-5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg active:scale-95 ${
                    added ? "bg-green-600 text-white" : "bg-rose-600 text-white hover:bg-rose-700"
                  }`}
                >
                  {added ? (
                    <>
                      <ShoppingCart size={22} className="animate-bounce" />
                      ADDED TO CART!
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={22} />
                      ADD TO CART
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center sm:text-left italic">
              * Payment method: Cash on Delivery (COD) only.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
