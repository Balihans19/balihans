


import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * TriCarousel Component
 * 
 * This component renders a responsive carousel with a title and multiple slides. 
 * It adjusts the number of visible slides based on screen size and supports 
 * navigation buttons and auto-play functionality for mobile devices.
 * 
 * Props:
 * slides: An array of slide objects, each containing:
 *   id: A unique identifier for the slide (string or number).
 *   image: The URL of the slide's image (string).
 *   title: The title or description of the slide (string).
 * - title: The title displayed above the carousel (string).
 */
const TriCarousel = ({ slides, title }) => {
  const [current, setCurrent] = useState(0); // Current slide index
  const [isMobile, setIsMobile] = useState(false); // Tracks whether the viewport is mobile

  // Handle responsive design by updating the `isMobile` state
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize); // Add event listener for window resize
    return () => window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
  }, [handleResize]);

  // Determine the number of visible slides based on the viewport size
  const visibleSlides = isMobile ? 2 : 3;

  // Navigate to the previous set of slides
  const prev = useCallback(() => {
    setCurrent((curr) => (curr === 0 ? slides.length - visibleSlides : curr - 1));
  }, [slides.length, visibleSlides]);

  // Navigate to the next set of slides
  const next = useCallback(() => {
    setCurrent((curr) => (curr === slides.length - visibleSlides ? 0 : curr + 1));
  }, [slides.length, visibleSlides]);

  // Automatically navigate to the next slide every 3 seconds on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(next, 3000); // Auto-play interval
      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [isMobile, next]);

  return (
    <div className="w-full">
      {/* Carousel container */}
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-0 2xl:px-4 my-36">
        {/* Carousel Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-24 text-white">
          {title}
        </h2>
        <div className="relative">
          {/* Carousel Slide Wrapper */}
          <div className="overflow-hidden relative">
            {/* Slide Transition Container */}
            <div
              className="flex transition-transform ease-out duration-1000"
              style={{ transform: `translateX(-${current * (100 / visibleSlides)}%)` }}
            >
              {/* Render each slide */}
              {slides.map((slide, index) => (
                <div
                  key={`${slide.id}-${index}`}
                  className={`w-1/${visibleSlides} flex-shrink-0 px-4 md:px-10`}
                >
                  <div className="relative h-[500px] overflow-hidden group">
                    {/* Slide Image */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    {/* Slide Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      {/* Slide Title */}
                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 flex flex-col justify-start"
                        style={{
                          height: '300px', // Fixed height for consistent alignment
                        }}
                      >
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

          {/* Navigation Buttons - Hidden on Mobile */}
          {!isMobile && (
            <>
              {/* Previous Button */}
              <button
                onClick={prev}
                className="absolute md:-left-12 xl:-left-20 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-20"
                aria-label="Previous slide"
              >
                <ArrowLeft size={40} />
              </button>

              {/* Next Button */}
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



