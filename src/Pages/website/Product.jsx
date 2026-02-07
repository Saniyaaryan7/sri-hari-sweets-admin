import Card from "../../components/website/Card/Card";

import cake1 from "../../assets/images/Product-img/product1.jpg";
import cake2 from "../../assets/images/Product-img/product2.jpg";
import cake3 from "../../assets/images/Product-img/product3.jpg";
import cake4 from "../../assets/images/Product-img/product4.jpg";



function Product() {
  const products = [
    {
      id: 1,
      name: "Chocolate Cake",
      price: 499,
      image:
       cake1,
    },
    {
      id: 2,
      name: "Strawberry Cake",
      price: 549,
      image:
       cake2,
    },
    {
      id: 3,
      name: "Vanilla Cake",
      price: 399,
      image:
       cake3,
    },
    {
      id: 4,
      name: "Black Forest Cake",
      price: 599,
      image:
        cake4,
    },
  ];

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl text-black font-bold text-center mb-10">
          Our Products
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {products.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Product;
