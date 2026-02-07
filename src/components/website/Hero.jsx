import { useState, useEffect } from "react";
// import slide1 from "../../assets/images/Hero-img/01_slide.jpg";
// import slide2 from "../../assets/images/Hero-img/slide1.jpg";
// import slide3 from "../../assets/images/Hero-img/slide4.jpg";

const slides = [
  {
    id: 1,
    image:"/assets/images/hero-img/slide1.webp",
    title: "Fresh Cakes Delivered",
    subtitle: "Eggless • Designer • Birthday Specials",
  },
  {
    id: 2,
    image: "/assets/images/hero-img/slide2.webp",
    title: "Midnight Cake Surprise",
    subtitle: "On-time delivery with perfect taste",
  },
  {
    id: 3,
    image:"/assets/images/hero-img/slide3.webp",
    title: "Baked With Love",
    subtitle: "Premium ingredients, unforgettable flavor",
  },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-screen overflow-hidden pt-16 h-[55vh] md:h-[90vh]">
      
      {/* SLIDER */}
      <div
        className="flex h-full transition-transform duration-[1500ms] ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-screen h-full relative flex-shrink-0"
          >
            {/* IMAGE */}
            <img
              src={slide.image}
              loading={slide.id === 1 ? "eager" : "lazy"}
              decoding="async"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

            {/* TEXT */}
            <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-24">
              <div className="max-w-xl text-white">
                <h1 className="text-3xl sm:text-xs md:text-5xl font-extrabold leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-4 text-sm sm:text-base opacity-90">
                  {slide.subtitle}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 translate-y-2 flex gap-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all
              ${
                currentIndex === index
                  ? "bg-white scale-125"
                  : "bg-white/50"
              }`}
          />
        ))}
      </div>

{/* SCROLL DOWN INDICATOR (only for desktop) */}
<div
  className="hidden md:flex absolute bottom-6 left-1/2
             -translate-x-1/2 translate-y-6
             flex-col items-center gap-1
             text-white opacity-80 z-20"
>
  <span className="text-sm tracking-wide">Scroll down</span>
  <span className="text-lg animate-bounce">⌄</span>
</div>


    </section>
  );
}

export default Hero;
