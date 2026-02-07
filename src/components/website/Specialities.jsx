import React, { useState } from "react";
import { Link } from "react-router-dom";

import cakeImage from "../../assets/images/Special-img/spec-cake.jpg";
import chocolateImage from "../../assets/images/Special-img/spec-choco.jpg";
import birthdayImage from "../../assets/images/Special-img/spec-birth.jpg";
import magic from "../../assets/images/special-img/magic.avif";

function Specialist() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      img: cakeImage,
      title: "Cakes",
      link: "/app/shop/category/cakes",
    },
    {
      img: chocolateImage,
      title: "Chocolates",
      link: "/app/shop/category/chocolate",
    },
    {
      img: birthdayImage,
      title: "Happy Birthday",
      link: "/app/shop/category/birthday",
    },
  ];

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    setActiveIndex(Math.round(scrollLeft / width));
  };

  return (
    <>
      {/* ================= OUR SPECIALITIES ================= */}
      <section
        className="
           relative w-screen
    pt-6 pb-10 md:pt-10 md:pb-16
    bg-gradient-to-br from-[#4b2e1e] via-[#8b5e3c] to-[#f3e5d0]
        "
      >

 {/* Overlay */}
  <div className="absolute inset-0 bg-black/20 md:bg-black/10"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center ">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 md:mb-16">
            Our Specialities
          </h2>

          {/* ================= DESKTOP GRID ================= */}
          <div className="hidden md:grid grid-cols-3 gap-10">
            {items.map((item, index) => (
              <Link to={item.link} key={index}>
                <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
                  <div className="w-40 h-40 rounded-full border-4 border-teal-400 flex items-center justify-center bg-white">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-28 h-28 object-cover rounded-full"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-black">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* ================= MOBILE SLIDER ================= */}
          <div className="md:hidden overflow-hidden relative isolate">
            <div
              onScroll={handleScroll}
              className="
                flex gap-6
                overflow-x-auto snap-x snap-mandatory
                scrollbar-hide overscroll-x-contain touch-pan-x
              "
            >
              {/* LEFT SPACER */}
              <div className="flex-shrink-0 w-[7.5%]" />

              {items.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="min-w-[85%] snap-center flex justify-center"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        w-40 h-40
                        rounded-full border-4 border-teal-400
                        flex items-center justify-center bg-white
                      "
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-28 h-28 object-cover rounded-full"
                      />
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-black">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}

              {/* RIGHT SPACER */}
              <div className="flex-shrink-0 w-[7.5%]" />
            </div>
          </div>

          {/* ================= DOT INDICATORS ================= */}
          <div className="md:hidden flex justify-center items-center gap-2 mt-2">
            {items.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-black w-4" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MAGIC PROCESS ================= */}
      <section className="relative w-screen">
        <img
          src={magic}
          alt="Cake Magic Process"
          className="w-full h-[30vh] md:h-[50vh] object-cover"
        />

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl md:text-5xl font-serif tracking-wide">
            Magic Process
          </h2>
          <p className="mt-2 text-sm md:text-base opacity-90">
            Crafted with love & perfection
          </p>
        </div>

        {/* Top Wave */}
        <div
          className="absolute top-0 left-0 w-full h-6 bg-white"
          style={{
            clipPath:
              "polygon(0 100%, 5% 70%, 10% 100%, 15% 70%, 20% 100%, 25% 70%, 30% 100%, 35% 70%, 40% 100%, 45% 70%, 50% 100%, 55% 70%, 60% 100%, 65% 70%, 70% 100%, 75% 70%, 80% 100%, 85% 70%, 90% 100%, 95% 70%, 100% 100%)",
          }}
        />

        {/* Bottom Wave */}
        <div
          className="absolute bottom-0 left-0 w-full h-6 bg-white"
          style={{
            clipPath:
              "polygon(0 0, 5% 30%, 10% 0, 15% 30%, 20% 0, 25% 30%, 30% 0, 35% 30%, 40% 0, 45% 30%, 50% 0, 55% 30%, 60% 0, 65% 30%, 70% 0, 75% 30%, 80% 0, 85% 30%, 90% 0, 95% 30%, 100% 0)",
          }}
        />
      </section>
    </>
  );
}

export default Specialist;
