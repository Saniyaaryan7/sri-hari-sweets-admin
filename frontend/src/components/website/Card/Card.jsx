import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useAppContext, getImageUrl } from "../../../context/AppContext";
import { useAuth } from "../../../context/AuthContext";

function Card({ item }) {
  const { addToCart } = useAppContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(user.id, item, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const adjustQty = (e, delta) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 flex flex-col h-full">
      
      {/* IMAGE LINK */}
      <Link to={`/product/${item.id}`} className="relative h-48 overflow-hidden block">
        <img
          src={getImageUrl(item.image || item.img)}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm text-[10px] font-bold text-rose-600 uppercase tracking-widest border border-rose-50">
          {item.cakeId || "#ITEM"}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/product/${item.id}`} className="block text-center flex-1">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-rose-600 transition">
            {item.name}
          </h3>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="text-xl font-black text-rose-600">₹{item.price}</span>
            {item.strike && (
              <span className="text-sm text-gray-400 line-through">₹{item.strike}</span>
            )}
          </div>
        </Link>

        {/* SHOPPING ACTIONS */}
        <div className="mt-5 space-y-3">
          {/* Qty Selector */}
          <div className="flex items-center justify-center gap-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            <button 
              onClick={(e) => adjustQty(e, -1)}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-rose-600 transition active:scale-90"
            >
              <Minus size={14} />
            </button>
            <span className="w-6 text-center font-bold text-gray-900">{quantity}</span>
            <button 
              onClick={(e) => adjustQty(e, 1)}
              className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-rose-600 transition active:scale-90"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 ${
              added ? "bg-green-600 text-white scale-[1.02]" : "bg-gray-900 text-white hover:bg-rose-600 hover:shadow-rose-200"
            }`}
          >
            {added ? (
              <span className="flex items-center gap-2 text-sm">✓ ADDED!</span>
            ) : (
              <>
                <ShoppingCart size={18} />
                <span className="text-sm lowercase tracking-tight">add to cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
