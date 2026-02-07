
//{============= Note: All product data and information are managed in Product.jsx===========}

function Card({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">

      {/* IMAGE FIXED SIZE */}
      <div className="w-full h-44 sm:h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
           loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 text-center">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
          {item.name}
        </h3>

        <p className="mt-2 text-lg font-bold text-red-600">
          ₹ {item.price}
        </p>

        {/* <button
          className="mt-3 w-full py-2 rounded-full
                     bg-red-600 text-white text-sm font-medium
                     hover:bg-red-700 transition"
        >
          Add to Cart
        </button> */}
      </div>
    </div>
  );
}

export default Card;
