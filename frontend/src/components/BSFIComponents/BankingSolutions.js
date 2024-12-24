import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react'; // Icons for navigation buttons

// BankingSolutions component to render a scrollable solution list with smooth scrolling and navigation
const BankingSolutions = ({ solutionsData, title }) => {
  const contentRef = useRef(null); // Ref to access the content section for smooth scrolling
  const [activeSection, setActiveSection] = useState(1); // Active section to highlight the current section
  const [scrollProgress, setScrollProgress] = useState(5); // Progress of scrolling for the progress bar

  // Handle navigation click to scroll to the specified section
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId); // Set the active section
    if (contentRef.current) {
      const sectionHeight = contentRef.current.clientHeight; // Get the height of the content section
      contentRef.current.scrollTo({
        top: (sectionId - 1) * sectionHeight, // Scroll to the correct section based on ID
        behavior: 'smooth', // Smooth scrolling behavior
      });
    }
  };

  // Synchronize scroll position with active section and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollTop = contentRef.current.scrollTop; // Current scroll position
      const sectionHeight = contentRef.current.clientHeight; // Height of each section
      const totalScrollHeight = contentRef.current.scrollHeight - sectionHeight; // Total scrollable height

      // Calculate scroll progress percentage
      const progress = (scrollTop / totalScrollHeight) * 100;
      setScrollProgress(progress); // Set the scroll progress

      let mostVisibleSection = 1; // Default most visible section
      let maxVisibility = 0; // Maximum visibility for the most visible section

      // Loop through each solution and determine which is most visible based on scroll position
      solutionsData.forEach((solution, index) => {
        const sectionTop = index * sectionHeight;
        const sectionBottom = (index + 1) * sectionHeight;

        // Calculate the visible portion of the section
        const visibleTop = Math.max(scrollTop, sectionTop);
        const visibleBottom = Math.min(scrollTop + sectionHeight, sectionBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // Update the most visible section if needed
        if (visibleHeight > maxVisibility) {
          maxVisibility = visibleHeight;
          mostVisibleSection = solution.id;
        }
      });

      // Update active section if the most visible section has changed
      if (mostVisibleSection !== activeSection) {
        setActiveSection(mostVisibleSection);
      }
    };

    // Set up scroll event listener to handle scroll synchronization
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll); // Clean up on unmount
    }
  }, [solutionsData, activeSection]); // Re-run effect when solutionsData or activeSection changes

  // Function to handle smooth scrolling with slower speed for 'next' or 'prev' direction
  const scrollContent = (direction) => {
    if (contentRef.current) {
      // Scroll slower by reducing the scroll amount (dividing by 5)
      const scrollAmount = contentRef.current.clientHeight / 5; // Adjust denominator for slower scroll

      // Smooth scrolling to the next or previous section
      contentRef.current.scrollBy({
        top: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-16 my-10 lg:my-0 ">
      <div className="container px-0 lg:px-12 xl:px-20 relative">
        {/* Scroll Progress Line: Visual indicator of the scroll progress */}
        <div className="absolute -top-4 sm:-top-6 left-0 lg:left-11 xl:left-20 w-full h-1 z-5 overflow-hidden">
          <div 
            className="h-full bg-[#737373] transition-all duration-300 ease-in-out origin-left" 
            style={{ width: `${scrollProgress}%`, transformOrigin: 'left center' }}
          />
        </div>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {title} {/* Display the title prop passed to the component */}
          </h1>
          {/* Mobile and tablet navigation buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => scrollContent('prev')} // Scroll to the previous section
              className="p-2 rounded-full text-white hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft size={28}/>
            </button>
            <button
              onClick={() => scrollContent('next')} // Scroll to the next section
              className="p-2 rounded-full text-white hover:bg-gray-800 transition-colors"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Left Side - Navigation */}
          <div className="w-full lg:w-1/3">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {solutionsData.map((solution) => (
                <div
                  key={solution.id}
                  className="cursor-pointer group"
                  onClick={() => handleNavClick(solution.id)} // Navigate to the solution section
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-1 h-16 sm:h-18 md:h-20">
                      {/* Active section indicator */}
                      <div
                        className={`absolute left-0 w-1 h-full transition-all duration-300 ${activeSection === solution.id ? 'bg-white' : 'bg-transparent'}`}
                      />
                    </div>
                    <div className="flex-1">
                      {/* Section Number */}
                      <div
                        className={`transition-all duration-300 
                          ${activeSection === solution.id 
                            ? 'text-3xl sm:text-4xl' 
                            : 'text-lg sm:text-xl'} 
                          text-[#bdd4ff] mb-2 font-bold`}
                      >
                        {solution.number}
                      </div>
                      {/* Section Title */}
                      <div
                        className={`text-xl sm:text-2xl transition-colors duration-300 ${activeSection === solution.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300 font-bold'}`}
                      >
                        {solution.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-2/3">
            <div 
              ref={contentRef} 
              className="h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-y-auto scrollbar-hide" 
              style={{
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
              }}
            >
              {/* Solution Content Rendering */}
              {solutionsData.map((solution, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-6 sm:gap-8 min-h-[300px] sm:min-h-[400px] ${index < solutionsData.length - 1 ? 'mb-8 sm:mb-10 md:mb-12' : ''}`}
                >
                  {solution.contents.map((content, idx) => (
                    <div key={idx} className="mb-2">
                      {/* Solution Content Heading */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl">{content.heading}</h3>
                      {/* Solution Content Description */}
                      <p className="text-base sm:text-lg md:text-xl text-gray-300">{content.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingSolutions;

