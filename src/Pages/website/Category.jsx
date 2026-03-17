import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useParams } from "react-router-dom";
import { Cake } from "lucide-react";




// categories list
const categories = [
  "All",
  "Eggless Cake",
  "Midnight Cakes",
  "Dry Cakes",
  "Heart Cake",
];

// dummy products
const products = [
  {
    id: 1,
    name: "Butter Scotch 1 Pound",
    code: "#sd897",
    price: 768,
    oldPrice: 876,
    category: "Eggless Cake",
    image: "/assets/images/product-img/product1.webp",
  },
  {
    id: 2,
    name: "Kitkat and Gems Cake",
    code: "IQ0001",
    price: 599,
    oldPrice: 699,
    category: "Heart Cake",
    image: "/assets/images/product-img/product2.webp",
  },
  {
    id: 3,
    name: "Chocolate Truffle Cake",
    code: "IQ0002",
    price: 649,
    oldPrice: 749,
    category: "Midnight Cakes",
    image: "/assets/images/product-img/product3.webp",
  },
  {
    id: 4,
    name: "Chocolate Truffle Cake",
    code: "IQ0004",
    price: 648,
    oldPrice: 749,
    category: "Midnight Cakes",
    image: "/assets/images/product-img/product4.webp",
  },
];

function Category() {
  const { category } = useParams(); //  FIXED

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // URL → category sync
  useEffect(() => {
    if (category) {
      const matched = categories.find(
        (cat) =>
          cat.toLowerCase().replace(/\s/g, "") ===
          category.toLowerCase()
      );
      setActiveCategory(matched || "All");
    } else {
      setActiveCategory("All");
    }
  }, [category]);

  // filter products
  const filteredProducts = products.filter((item) => {
    const matchCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* ================= TOP BANNER ================= */}
      <div className="relative h-[45vh] sm:h-[40vh] md:h-[45vh] w-full overflow-hidden">
        <img
          src="/assets/images/product-img/product1.webp"
           loading="eager"
           decoding="async"
          alt="Category Banner"
          className="w-full h-full object-cover object-[50%_60%] md:object-center"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pt-16 sm:pt-20 md:pt-0">
          <h1 className="text-3xl md:text-5xl font-serif font-bold">
            {activeCategory === "All" ? "Our Cakes" : activeCategory}
          </h1>
          <p className="mt-2 text-sm md:text-base opacity-90 tracking-wide">
            Freshly baked with love & perfection
          </p>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <section className="py-16 bg-[#fffdf9] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

            {/* Categories */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-6 py-2.5 rounded-full text-sm font-medium
                    transition-all duration-300
                    ${
                      activeCategory === cat
                        ? "bg-rose-600 text-white shadow-md scale-105"
                        : "bg-[#f5f5f4] text-gray-700 hover:bg-rose-100 hover:text-rose-600"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72 mx-auto md:mx-0">
              <input
                type="text"
                placeholder="Search Cakes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-gray-200
                focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden max-w-sm mx-auto"
              >
                <img
                  src={item.image}
                  alt={item.name}
                   loading="lazy"
                  decoding="async"
                  className="w-full h-44 object-cover"
                />

                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-pink-500 mt-1">
                    Item Code : {item.code}
                  </p>

                  <div className="mt-3">
                    <span className="text-lg font-bold text-gray-800">
                      ₹ {item.price}
                    </span>
                    <span className="ml-2 text-sm line-through text-gray-400">
                      ₹ {item.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
  <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
    <Cake size={64} className="text-rose-400 mb-4" />
    <h2 className="text-xl font-semibold text-gray-700">
      No cakes found
    </h2>
  </div>
)}

        </div>
      </section>
    </>
  );
}

export default Category;
