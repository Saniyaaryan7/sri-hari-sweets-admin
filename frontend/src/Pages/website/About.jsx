import React from "react";
import { useAppContext } from "../../context/AppContext";

export default function About() {
  const { aboutContent } = useAppContext();

  if (!aboutContent) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { banner, story, mission, bakery, values } = aboutContent;

  return (
    <div className="w-full overflow-hidden">

      {/* ===== TOP BANNER ===== */}
      <section className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
        <img
          src={banner.image || "/assets/images/contact-img/contact-bg.webp"}
          loading="eager"
          decoding="async"
          alt="Bakery Banner"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/50" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4
                  translate-y-10 sm:translate-y-14 md:translate-y-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-red-600 uppercase">
            {banner.title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-amber-700 font-serif font-medium max-w-md">
            {banner.subtitle}
          </p>
        </div>
      </section>

      {/* ==================== OUR STORY ======================= */}
      <section className="relative py-20 ">
        {/* Background Image - redundant if bg-gray-100 is used, but keeping for style */}
        <div className="absolute inset-0 bg-gray-100"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          <div className="bg-white backdrop-blur p-8 rounded-2xl shadow-lg">
            <h2 className="text-4xl text-amber-700 font-bold mb-4">{story.title}</h2>
            <div className="text-black leading-relaxed whitespace-pre-wrap">
              {story.content}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl shadow aspect-[4/3]">
            <img
              src={story.image || "/assets/images/hero-img/slide1.webp"}
              loading="lazy"
              decoding="async"
              alt="Our Story"
              className="w-full h-full object-cover hover:scale-105 transition"
            />
          </div>
        </div>
      </section>

      {/* ===== OUR MISSION ===== */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <img
          src={mission.image || "/assets/images/about-img/ourMission.webp"}
          loading="lazy"
          decoding="async"
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
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-6 text-white">
            {mission.title}
          </h2>

          {/* divider */}
          <div className="w-16 h-[2px] bg-[#E6B873] mx-auto mb-6"></div>

          <p className="text-base md:text-lg leading-relaxed text-white/95 whitespace-pre-wrap">
            {mission.content}
          </p>
        </div>
      </section>

      {/* ======================== BAKERY & VALUES ========================= */}
      <section className="relative py-28 overflow-hidden">
        {/* Background Image */}
        <img
          src={bakery.image || "/assets/images/about-img/about-bg.webp"}
          alt="Our Bakery"
          loading="lazy"
          decoding="async"
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
              {bakery.title}
            </h2>

            {/* divider */}
            <div className="w-16 h-[2px] bg-[#E6B873] mx-auto mb-6"></div>

            <p className="leading-relaxed text-gray-200 text-base md:text-lg whitespace-pre-wrap">
              {bakery.content}
            </p>
          </div>

          {/* VALUES : CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {values.map((item, i) => (
              <div
                key={i}
                className="p-7 rounded-2xl bg-[#FAFAFA] text-gray-800
                     shadow-lg hover:-translate-y-1 hover:shadow-2xl
                     transition-all duration-300 transform"
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
