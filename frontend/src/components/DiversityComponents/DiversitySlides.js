import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const DiversitySlides = ({ diversitySlides = [] }) => {
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

  const prev = useCallback(() => {
    setCurrent((curr) => (curr === 0 ? diversitySlides.length - 3 : curr - 1));
  }, [diversitySlides.length]);

  const next = useCallback(() => {
    setCurrent((curr) => (curr === diversitySlides.length - 3 ? 0 : curr + 1));
  }, [diversitySlides.length]);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(next, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, next]);

  return (
    <div className="w-full">
      <div className="max-w-4xl xl:max-w-7xl mx-auto px-4 py-20 md:py-36">
        <h1 className="text-3xl md:text-4xl text-center text-white mb-16">
          Our DEI Goals
        </h1>
        <div className="relative">
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform ease-out duration-1000"
              style={{ transform: `translateX(-${current * 33.33}%)` }}
            >
              {diversitySlides.map((slide, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-4 md:px-10">
                  <div className="relative h-[500px]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="object-cover rounded-lg w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-black/80 flex flex-col justify-start"
                        style={{
                          height: '300px', // Fixed height for uniform alignment
                        }}
                      >
                        {/* Title */}
                        <h2 className="text-lg lg:text-3xl text-white mb-2 line-clamp-2">
                          {slide.title}
                        </h2>
                        {/* Description */}
                        <p className="text-sm lg:text-lg text-white">
                          {slide.description}
                        </p>
                      </div>
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
                className="absolute top-1/2 left-2 md:-left-16 xl:-left-20 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full shadow z-10"
              >
                <ArrowLeft size={40} color="black" />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-2 md:-right-20 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full shadow z-10"
              >
                <ArrowRight size={40} color="black" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiversitySlides;

