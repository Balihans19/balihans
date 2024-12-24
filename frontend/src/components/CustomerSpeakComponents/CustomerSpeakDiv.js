import React, { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * CustomerSpeakDiv - A responsive testimonial slider component
 *  props.slides - Array of testimonial objects containing content, author, and designation
 *  props.title - Title displayed at the top of the component
 *  props.bgImage - URL for the background image
 *  props.cardPosition - Position of the card ('left' or 'right' on larger screens)
 * 
 */
const CustomerSpeakDiv = ({ slides, title, bgImage, cardPosition }) => {
  // Track current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Prevent rapid-fire navigation clicks
  const [isNavigating, setIsNavigating] = useState(false);

  /**
   * Handles slide navigation with debounce protection
   * @param {string} direction - Direction of navigation ('next' or 'prev')
   */
  const handleNavigation = useCallback((direction) => {
    // Prevent navigation if already in progress
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    // Calculate next slide index with wraparound
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }

    // Reset navigation lock after animation completes
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  }, [isNavigating, slides.length]);

  return (
    <div className="w-full text-white">
      {/* Title Section - Dark background header */}
      <div className="bg-[#191c20] h-32 flex justify-center items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h2>
      </div>

      {/* Main Content Section with Background Image */}
      <div
        className="w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content Container - Centers the slider vertically and horizontally */}
        <div className="relative w-full h-[800px] flex items-center justify-center">
          {/* Testimonial Card Container - Handles positioning based on cardPosition prop */}
          <div
            className={`relative max-w-44 xs:max-w-64 sm:max-w-md md:max-w-xl h-[70vh] xs:h-[60vh] md:h-[50vh] bg-white text-black rounded shadow-lg flex items-center ${
              cardPosition === 'left' ? 'mr-0 ml-0 lg:mr-auto lg:ml-56' : 'mr-0 ml-0 lg:mr-56 lg:ml-auto'
            }`}
          >
            {/* Previous Slide Button - Positioned outside card */}
            <button
              onClick={() => handleNavigation('prev')}
              disabled={isNavigating}
              className="absolute -left-8 xs:-left-12 md:-left-20 text-white text-3xl bg-white rounded-full w-4 h-4 xs:w-8 xs:h-8 md:w-12 md:h-12 flex justify-center items-center "
            >
              <ArrowLeft size={40} color="black" />
            </button>

            {/* Testimonial Content Container */}
            <div className="relative max-w-44 xs:max-w-64 sm:max-w-md md:max-w-xl h-[70vh] xs:h-[60vh] md:h-[50vh] bg-white text-black p-8 rounded shadow-lg flex flex-col items-start justify-start space-y-4">
              {/* Logo/Image - Fixed size across breakpoints */}
              <div className="w-16 h-16">
                <img
                  src="https://res.cloudinary.com/dnijlfi48/image/upload/v1734509418/Untitled_80_x_60_px_g1u9is.webp"
                  alt="Small Reusable"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Testimonial Text Content */}
              <div className="pl-4">
                {/* Testimonial Quote - Responsive font sizes */}
                <p className="italic text-xxs xs:text-xs sm:text-sm md:text-base lg:text-lg text-[#191c20] mb-4">
                  {slides[currentSlide].content}
                </p>
                {/* Author Name - Bold with larger font */}
                <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                  {slides[currentSlide].author}
                </p>
                {/* Author Designation - Gray color */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                  {slides[currentSlide].designation}
                </p>
              </div>
            </div>

            {/* Next Slide Button - Positioned outside card */}
            <button
              onClick={() => handleNavigation('next')}
              disabled={isNavigating}
              className="absolute -right-8 xs:-right-12 md:-right-20 text-white text-3xl bg-white rounded-full w-4 h-4 xs:w-8 xs:h-8 md:w-12 md:h-12 flex justify-center items-center "
            >
              <ArrowRight size={40} color="black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSpeakDiv;


