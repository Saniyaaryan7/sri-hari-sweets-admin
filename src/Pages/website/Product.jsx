import { useSearchParams } from "react-router-dom";

import Card from "../../components/website/Card/Card";



function Product() {

 


  const products = [
    {
      id: 1,
      name: "Chocolate Cake",
      price: 499,
      image:  "/assets/images/product-img/product1.webp",
      
    },
    {
      id: 2,
      name: "Strawberry Cake",
      price: 549,
      image: "/assets/images/product-img/product2.webp",
   
    },
    {
      id: 3,
      name: "Vanilla Cake",
      price: 399,
      image: "/assets/images/product-img/product3.webp",
    
    },
    {
      id: 4,
      name: "Black Forest Cake",
      price: 599,
      image: "/assets/images/product-img/product1.webp",
      
    },
  ];

const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

    const filteredProducts = products.filter((item) =>
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
