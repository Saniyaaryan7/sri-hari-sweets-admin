import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useParams } from "react-router-dom";
import { Cake } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import Card from "../../components/website/Card/Card";

function Category() {
  const { cakes, categories } = useAppContext();
  const { category: urlCategory } = useParams();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categoriesList = ["All", ...categories.map(c => c.name)];

  // URL → category sync
  useEffect(() => {
    if (urlCategory) {
      const matched = categoriesList.find(
        (cat) =>
          cat.toLowerCase().replace(/\s/g, "") ===
          urlCategory.toLowerCase()
      );
      setActiveCategory(matched || "All");
    } else {
      setActiveCategory("All");
    }
  }, [urlCategory, categories]);

  // filter products
  const filteredProducts = cakes.filter((item) => {
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
          src="/assets/images/hero-img/slide1.webp"
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
              {categoriesList.map((cat) => (
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
              <Card key={item.id} item={item} />
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
