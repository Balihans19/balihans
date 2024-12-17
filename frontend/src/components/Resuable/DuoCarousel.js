import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DuoCarousel = ({ slides, title }) => {
  const [current, setCurrent] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const navigate = useNavigate();

  const handleResize = React.useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const prev = React.useCallback(() => {
    setCurrent((curr) => {
      const slidesPerView = isMobile ? 1 : 2;
      return curr === 0 ? slides.length - slidesPerView : curr - 1;
    });
  }, [slides.length, isMobile]);

  const next = React.useCallback(() => {
    setCurrent((curr) => {
      const slidesPerView = isMobile ? 1 : 2;
      return curr === slides.length - slidesPerView ? 0 : curr + 1;
    });
  }, [slides.length, isMobile]);

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  React.useEffect(() => {
    if (isMobile) {
      const interval = setInterval(next, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, next]);

  const handleSlideClick = (slide) => {
    if (slide.link) {
      navigate(slide.link);
    }
  };

  return (
    <div className="w-full bg-[#f8f9fa]">
      <div className="max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4 py-28">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-24">
          {title}
        </h1>
        <div className="relative">
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform ease-out duration-1000" 
              style={{ 
                transform: `translateX(-${current * (isMobile ? 100 : 50)}%)` 
              }}
            >
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`${isMobile ? 'w-full' : 'w-1/2'} flex-shrink-0 px-4 md:px-10 flex flex-col items-center cursor-pointer`}
                  onClick={() => handleSlideClick(slide)}
                >
                  <div className="relative aspect-w-4 aspect-h-3 overflow-hidden group w-full">
                    <img 
                      src={slide.image} 
                      alt={slide.alt} 
                      className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110" 
                    />
                  </div>
                  <div className="flex flex-col bg-[#2c2c2c] items-center justify-start p-4 w-full h-auto min-h-[150px]">
                    <h2 className="text-white text-sm md:text-lg lg:text-2xl mb-2 text-center">
                      {slide.title}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <>
              <button 
                onClick={prev} 
                className="absolute top-1/2 left-2 md:-left-16 xl:-left-16 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"
              >
                <ArrowLeft size={40} color="white" />
              </button>
              <button 
                onClick={next} 
                className="absolute top-1/2 right-2 md:-right-16 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"
              >
                <ArrowRight size={40} color="white" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DuoCarousel;
