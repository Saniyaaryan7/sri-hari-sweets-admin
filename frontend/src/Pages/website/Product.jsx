import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Card from "../../components/website/Card/Card";

function Product() {
  const { cakes } = useAppContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredProducts = cakes.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-black font-bold text-center mb-10">
          Our Products
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {filteredProducts.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Product;
