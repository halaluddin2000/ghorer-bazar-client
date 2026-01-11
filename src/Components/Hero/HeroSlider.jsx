import { useEffect, useState } from "react";
import api from "../../api/axios";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    api.get("/sliders").then((res) => {
      setSlides(res.data.data);
      // console.log(Array.isArray(res.data.data));
    });
  }, []);

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3000);
    // console.log(slides);
    return () => clearInterval(interval);
  }, [slides]);

  if (!slides.length) {
    return <div className="h-[450px] bg-gray-200" />;
  }

  return (
    <div className="relative w-full h-[450px] overflow-hidden">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide?.photo}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
          ${index === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </div>
  );
};

export default HeroSlider;
