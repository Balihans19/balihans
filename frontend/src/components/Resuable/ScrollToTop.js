/**
 * ScrollToTop Component
 * -------------------
 * Purpose: Provides a floating button that appears when the user scrolls down the page
 * and allows them to smoothly scroll back to the top when clicked.
 */

import React, { useState, useEffect } from 'react';
import { MoveUp } from 'lucide-react'; // Import the up arrow icon from Lucide icons

const ScrollToTop = () => {
  // State to control button visibility
  // isVisible is true when user scrolls past 300px, false otherwise
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle the scroll-to-top action
  // Uses smooth scrolling behavior for a better user experience
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Provides smooth animation when scrolling
    });
  };

  // Function to check scroll position and update button visibility
  // Shows button when user scrolls past 300px threshold
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener when component mounts
  // Clean up listener when component unmounts to prevent memory leaks
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

