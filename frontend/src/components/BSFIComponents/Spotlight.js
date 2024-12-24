import React, { useState, useEffect, useCallback } from 'react'; 
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Importing arrow icons for navigation

// Spotlight component to display a carousel of spotlight items
const Spotlight = ({ spotlightItems, title = "Spotlight" }) => {
  // State hooks to manage the current slide index and whether the screen is mobile-sized
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resizing to check if the screen is mobile-sized
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 1024); // Mobile screen if width < 1024px
  }, []);

  // Effect to handle resizing on window resize
  useEffect(() => {
    handleResize(); // Initialize the screen size on mount
    window.addEventListener('resize', handleResize); // Add event listener for window resizing
    return () => window.removeEventListener('resize', handleResize); // Cleanup on unmount
  }, [handleResize]);

  // Function to move to the previous slide
  const prev = useCallback(() => {
    setCurrent((curr) => {
      const slidesPerView = isMobile ? 2 : 3; // Set how many items should be visible per view based on screen size
      return curr === 0 ? spotlightItems.length - slidesPerView : curr - 1; // Loop back to the last slide if at the beginning
    });
  }, [spotlightItems.length, isMobile]);

  // Function to move to the next slide
  const next = useCallback(() => {
    setCurrent((curr) => {
      const slidesPerView = isMobile ? 2 : 3; // Set how many items should be visible per view based on screen size
      return curr === spotlightItems.length - slidesPerView ? 0 : curr + 1; // Loop back to the first slide if at the end
    });
  }, [spotlightItems.length, isMobile]);

  // Auto-scroll for mobile devices every 3 seconds
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(next, 3000); // Auto-move to the next slide every 3 seconds
      return () => clearInterval(interval); // Cleanup interval when the component unmounts or is resized
    }
  }, [isMobile, next]);

  return (
    <div className="w-full bg-[#f8f9fa]"> {/* Container for the spotlight */}
      <div className="max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 py-36"> {/* Wrapper with max width */}
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-24">
          {title} {/* Spotlight title */}
        </h1>
        <div className="relative"> {/* Container for carousel */}
          <div className="overflow-hidden relative"> {/* Hidden overflow to create a slide effect */}
            <div
              className="flex transition-transform ease-out duration-1000"
              style={{ 
                transform: `translateX(-${current * (isMobile ? 50 : 33.33)}%)` // Translate carousel based on current slide
              }}
            >
              {/* Loop through each spotlight item and render its content */}
              {spotlightItems.map((item, index) => (
                <div key={index} className={`${isMobile ? 'w-1/2' : 'w-1/3'} flex-shrink-0 px-4 md:px-10`}>
                  {/* Spotlight item container */}
                  <div className="relative h-[650px] flex flex-col overflow-hidden group">
                    <div className="overflow-hidden h-[72%] mb-4">
                      {/* Spotlight item image */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 origin-center"
                      />
                    </div>
                    <div className="flex-grow flex flex-col">
                      {/* Spotlight item title */}
                      <h3 className="text-black text-sm sm:text-lg xl:text-2xl font-bold mb-2 line-clamp-4">
                        {item.title}
                      </h3>
                      {/* Spotlight item description */}
                      <p className="text-gray-500 text-md flex-grow line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>          
              ))}
            </div>
          </div>
          
          {/* Navigation buttons (only visible on desktop) */}
          {!isMobile && (
            <>
              {/* Previous button */}
              <button
                onClick={prev}
                className="absolute top-1/2 left-2 md:-left-16 xl:-left-16 2xl:-left-24 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"
              >
                <ArrowLeft size={40} color="white" />
              </button>
              {/* Next button */}
              <button
                onClick={next}
                className="absolute top-1/2 right-2 md:-right-16 xl:-right-16 2xl:-right-24 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"
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

export default Spotlight;



