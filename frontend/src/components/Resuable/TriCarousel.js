






import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TriCarousel = ({ slides, title }) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive design
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Calculate the number of slides visible based on screen size
  const visibleSlides = isMobile ? 2 : 3;

  // Navigation functions
  const prev = useCallback(() => {
    setCurrent((curr) => (curr === 0 ? slides.length - visibleSlides : curr - 1));
  }, [slides.length, visibleSlides]);

  const next = useCallback(() => {
    setCurrent((curr) => (curr === slides.length - visibleSlides ? 0 : curr + 1));
  }, [slides.length, visibleSlides]);

  // Auto-play for mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(next, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, next]);

  return (
    <div className="w-full">
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-0 2xl:px-4 my-36">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-24 text-white">
          {title}
        </h2>
        <div className="relative">
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform ease-out duration-1000"
              style={{ transform: `translateX(-${current * (100 / visibleSlides)}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={`${slide.id}-${index}`} className={`w-1/${visibleSlides} flex-shrink-0 px-4 md:px-10`}>
                  <div className="relative h-[500px] overflow-hidden group">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="object-cover  w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex flex-col justify-start"
                        style={{
                          height: '300px', // Fixed height for uniform alignment
                        }}
                      >
                        {/* Title */}
                        <h2 className="text-lg xl:text-2xl text-white mb-2 line-clamp-5">
                          {slide.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation buttons - hidden on mobile */}
          {!isMobile && (
            <>
              <button
                onClick={prev}
                className="absolute  md:-left-12 xl:-left-20 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-20"
                aria-label="Previous slide"
              >
                <ArrowLeft size={40} />
              </button>
              <button
                onClick={next}
                className="absolute md:-right-12 xl:-right-20 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-20"
                aria-label="Next slide"
              >
                <ArrowRight size={40} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TriCarousel;





