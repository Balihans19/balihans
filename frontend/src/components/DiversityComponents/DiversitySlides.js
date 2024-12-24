
import React, { useState, useEffect, useCallback } from 'react'; 
import { ArrowLeft, ArrowRight } from 'lucide-react';  

/**
 * DiversitySlides - A responsive slider component for displaying DEI (Diversity, Equity, and Inclusion) goals
 * Features:
 * - Responsive design with mobile detection
 * - Auto-sliding on mobile devices
 * - Manual navigation on desktop
 * - Image hover effects
 * - Three slides visible at once on desktop
 * 
 * @component
 *  props.diversitySlides - Array of slide objects
 *  props.diversitySlides[].image - URL of the slide image
 *  props.diversitySlides[].title - Title of the DEI goal
 *  props.diversitySlides[].description - Description of the DEI goal
 */
const DiversitySlides = ({ diversitySlides = [] }) => {   
  // Track current slide index
  const [current, setCurrent] = useState(0);   
  // Track device viewport for responsive behavior
  const [isMobile, setIsMobile] = useState(false);    

  /**
   * Updates isMobile state based on window width
   * Mobile breakpoint set at 1024px
   */
  const handleResize = useCallback(() => {     
    setIsMobile(window.innerWidth < 1024);   
  }, []);    

  // Initialize and handle window resize events
  useEffect(() => {     
    handleResize();     
    window.addEventListener('resize', handleResize);     
    // Cleanup resize listener on component unmount
    return () => window.removeEventListener('resize', handleResize);   
  }, [handleResize]);    

  /**
   * Navigate to previous slide with wraparound
   * Shows 3 slides at once, so navigation moves by single slide
   */
  const prev = useCallback(() => {     
    setCurrent((curr) => (curr === 0 ? diversitySlides.length - 3 : curr - 1));   
  }, [diversitySlides.length]);    

  /**
   * Navigate to next slide with wraparound
   * Shows 3 slides at once, so navigation moves by single slide
   */
  const next = useCallback(() => {     
    setCurrent((curr) => (curr === diversitySlides.length - 3 ? 0 : curr + 1));   
  }, [diversitySlides.length]);    

  // Auto-sliding behavior for mobile devices
  useEffect(() => {     
    if (isMobile) {       
      // Auto-slide every 3 seconds on mobile
      const interval = setInterval(next, 3000);       
      return () => clearInterval(interval);     
    }   
  }, [isMobile, next]);    

  return (     
    <div className="w-full">       
      {/* Main container with responsive padding */}
      <div className="max-w-4xl xl:max-w-7xl mx-auto px-4 py-20 md:py-36">         
        {/* Section Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">           
          Our DEI Goals         
        </h1>         
        
        {/* Slider container */}
        <div className="relative">           
          {/* Overflow container for slide transition */}
          <div className="overflow-hidden relative">             
            {/* Sliding track with smooth transitions */}
            <div               
              className="flex transition-transform ease-out duration-1000"               
              style={{ transform: `translateX(-${current * 33.33}%)` }}             
            >               
              {/* Individual slides */}
              {diversitySlides.map((slide, index) => (                 
                <div key={index} className="w-1/3 flex-shrink-0 px-4 md:px-10">                   
                  {/* Slide card with hover effect */}
                  <div className="relative h-[500px] overflow-hidden group">                     
                    {/* Background image with zoom effect on hover */}
                    <img                       
                      src={slide.image}                       
                      alt={slide.title}                       
                      className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"                     
                    />                     
                    {/* Dark overlay with content */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">                       
                      {/* Content container with fixed height */}
                      <div                         
                        className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 bg-black/80 flex flex-col justify-start"                         
                        style={{ height: '300px' }}                       
                      >                         
                        {/* Slide title with line clamp */}                         
                        <h2 className="text-lg lg:text-3xl font-bold text-white mb-2 line-clamp-2">                           
                          {slide.title}                         
                        </h2>                         
                        {/* Slide description */}                         
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

          {/* Navigation buttons - Only shown on desktop */}
          {!isMobile && (             
            <>               
              {/* Previous slide button */}
              <button                 
                onClick={prev}                 
                className="absolute top-1/2 left-2 md:-left-16 xl:-left-20 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full shadow z-10"               
              >                 
                <ArrowLeft size={40} color="black" />               
              </button>               
              {/* Next slide button */}
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
