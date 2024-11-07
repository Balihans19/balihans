import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Carousel = ({ slides, title }) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const prev = () => setCurrent((curr) => (curr === 0 ? slides.length - 2 : curr - 1));

  // Memoize 'next' to avoid re-creating the function on every render
  const next = useCallback(() => {
    setCurrent((curr) => (curr === slides.length - 2 ? 0 : curr + 1));
  }, [slides.length]);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(next, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, next]);

  return (
    <div className="w-full bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto px-4 py-36 mb-10">
        <h1 className="text-3xl md:text-4xl text-center text-gray-900 mb-16">
          {title}
        </h1>
        <div className="relative">
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform ease-out duration-500"
              style={{ transform: `translateX(-${current * 50}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-1/2 flex-shrink-0 px-4 md:px-10">
                  <div className="relative aspect-w-4 aspect-h-3">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="object-cover rounded-lg w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center pt-24">
                      <h2 className="text-white text-sm md:text-lg lg:text-2xl w-[30vh] text-center mx-auto">
                        {slide.title}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <>
              <button
                onClick={prev}
                className="absolute top-1/2 left-2 md:-left-16 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"
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

export default Carousel;
