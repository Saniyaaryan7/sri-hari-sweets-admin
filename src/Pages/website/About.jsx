import Cake_bg from "../../assets/images/About-img/about-bg.jpg";
import storycake from "../../assets/images/Hero-img/slide1.jpg";
import ourMission from "../../assets/images/About-img/ourMission.jpg";

import Banner from "../../assets/images/Contact-img/contact-bg.jpg";


export default function About() {
  return (
    <div className="w-full overflow-hidden">

      {/* ===== TOP BANNER ===== */}
    <section className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
  <img
    src={Banner}
    alt="Bakery Banner"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-white/50" />

  {/* Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4
                  translate-y-10 sm:translate-y-14 md:translate-y-0">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-red-600">
      ABOUT US
    </h1>
    <p className="mt-3 text-sm md:text-base text-amber-700 font-serif font-medium max-w-md">
      Sri Hari Sweets is a celebration of taste, tradition, and quality.
    </p>
  </div>
</section>



      {/* ==================== OUR STORY ======================= */}
      <section className="relative py-20 ">
  {/* Background Image */}
  <img
    src={Cake_bg}
    alt="Cake Background"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gray-100"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
    
   <div className="bg-white backdrop-blur p-8 rounded-2xl shadow-lg">

      <h2 className="text-4xl text-amber-700 font-bold mb-4">Our Story</h2>
      <p className="text-black leading-relaxed">
        Sri Hari Sweets was born from a simple dream — to spread happiness
        through handcrafted sweets and cakes. What started as a small home
        kitchen has now become a place where tradition meets creativity.
      </p>

      <p className="text-black mt-4 leading-relaxed">
        Every dessert is made with love, care, and a promise of purity that
        makes every celebration sweeter.
      </p>
    </div>

 <div className="overflow-hidden rounded-2xl shadow">
    <img
      src={storycake}
      alt="Our Cakes"
      className="w-full h-full object-cover hover:scale-105 transition"
    />
    </div>
  </div>
</section>

      {/* ===== OUR MISSION ===== */}
     <section className="relative py-24 overflow-hidden">
  {/* Background Image */}
  <img
    src={ourMission}
    alt="Baking Process"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay  */}
  <div className="absolute inset-0 bg-gradient-to-r 
                  from-pink-600/85 via-pink-500/75 to-pink-600/85">
  </div>

  
  <div className="absolute inset-0 bg-black/20"></div>

  {/* Content */}
  <div className="relative max-w-4xl mx-auto text-center px-6">
    <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-6">
      Our Mission
    </h2>

    {/* divider */}
    <div className="w-16 h-[2px] bg-[#E6B873] mx-auto mb-6"></div>

    <p className="text-base md:text-lg leading-relaxed text-white/95">
      Our mission is to craft fresh, delicious, and visually delightful sweets
      using the finest ingredients. We focus on quality, hygiene, and
      consistency while keeping authentic flavors alive for every generation.
    </p>
  </div>
</section>

      {/* ======================== VALUES ========================= */}
    <section className="relative py-28 overflow-hidden">
  {/* Background Image */}
  <img
    src={Cake_bg}
    alt="Our Bakery"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b 
                  from-black/70 via-black/55 to-black/70"></div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 text-center text-white">

    {/* OUR BAKERY TEXT */}
    <div className="max-w-3xl mx-auto mb-20">
      <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-4">
        Our Bakery
      </h2>

      {/* divider */}
      <div className="w-16 h-[2px] bg-[#E6B873] mx-auto mb-6"></div>

      <p className="leading-relaxed text-gray-200 text-base md:text-lg">
        Inside our bakery, every cake is prepared with patience and precision.
        From mixing to baking and decorating, each step reflects our commitment
        to excellence and taste.
      </p>
    </div>

    {/* VALUES : CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      {[
        {
          title: "Tradition",
          text: "Preserving authentic recipes passed through generations."
        },
        {
          title: "Quality",
          text: "Only premium ingredients with uncompromised freshness."
        },
        {
          title: "Creativity",
          text: "Modern designs blended with classic flavors."
        },
        {
          title: "Passion",
          text: "Baked with love, care, and dedication every single day."
        }
      ].map((item, i) => (
        <div
          key={i}
          className="p-7 rounded-2xl bg-[#FAFAFA] text-gray-800
                     shadow-lg hover:-translate-y-1 hover:shadow-2xl
                     transition-all duration-300"
        >
          <h3 className="text-xl font-semibold mb-3 text-amber-700">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {item.text}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>



    </div>
  );
}
