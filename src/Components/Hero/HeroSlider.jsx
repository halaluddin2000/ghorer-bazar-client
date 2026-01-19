import { useEffect, useState } from "react";
import api from "../../api/axios";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);

  // fetch slides
  useEffect(() => {
    api.get("/sliders").then((res) => {
      setSlides(res.data.data);
    });
  }, []);

  // auto slide interval
  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) {
    return (
      <div className="w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[450px] bg-gray-200 animate-pulse" />
    );
  }

  return (
    <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[450px] overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide?.photo}
          alt={slide?.title || `slide-${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
            ${index === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Optional: Mobile dots for slider navigation */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`block w-2 h-2 rounded-full transition-colors
              ${i === active ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
