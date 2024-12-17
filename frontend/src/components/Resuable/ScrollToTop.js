import React, { useState, useEffect } from 'react';
import { MoveUp} from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll effect
    });
  };

  // Toggle visibility based on scroll position
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add and clean up event listener for scrolling
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-28 md:right-24 lg:right-16">
      {isVisible && (
        <MoveUp
           size={40}
          onClick={scrollToTop}
          className="bg-[#626262] text-white rounded-full p-2 hover:bg-black transition duration-300"
        />
      )}
    </div>
  );
};

export default ScrollToTop;