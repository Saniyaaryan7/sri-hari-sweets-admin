import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

function Hero() {
  const { hero } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (hero.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === hero.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [hero]);

  if (hero.length === 0) return null;

  return (
    <section className="relative w-screen overflow-hidden pt-16 h-[55vh] md:h-[90vh]">
      
      {/* SLIDER */}
      <div
        className="flex h-full transition-transform duration-[1500ms] ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {hero.map((slide) => (
          <div
            key={slide.id}
            className="w-screen h-full relative flex-shrink-0"
          >
            {/* IMAGE */}
            <img
              src={slide.image}
              loading={slide.id === hero[0].id ? "eager" : "lazy"}
              decoding="async"
              alt={slide.title}
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
        {hero.map((_, index) => (
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
