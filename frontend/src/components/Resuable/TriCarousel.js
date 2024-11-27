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

  // Navigation functions
  const prev = useCallback(() => {
    setCurrent((curr) => (curr === 0 ? slides.length - 3 : curr - 1));
  }, [slides.length]);

  const next = useCallback(() => {
    setCurrent((curr) => (curr === slides.length - 3 ? 0 : curr + 1));
  }, [slides.length]);

  // Auto-play for mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(next, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, next]);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 my-36">
        <h2 className="text-3xl md:text-4xl text-center mb-24 text-white">
          {title}
        </h2>

        <div className="relative">
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform ease-out duration-1000"
              style={{ transform: `translateX(-${current * 33.33}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={`${slide.id}-${index}`} className="w-1/3 flex-shrink-0 px-4 md:px-10">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100">
                      <div className="absolute bottom-20 left-0 right-0 p-4 lg:p-6">
                        <div className="text-lg lg:text-2xl text-white mb-2">
                          {slide.title}
                        </div>
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
                className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-20"
                aria-label="Previous slide"
              >
                <ArrowLeft size={40} />
              </button>
              <button
                onClick={next}
                className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-20"
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

