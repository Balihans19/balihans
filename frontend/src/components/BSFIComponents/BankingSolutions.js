
import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const BankingSolutions = ({ solutionsData, title }) => {
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(5);

  // Handle navigation click
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (contentRef.current) {
      const sectionHeight = contentRef.current.clientHeight;
      contentRef.current.scrollTo({
        top: (sectionId - 1) * sectionHeight,
        behavior: 'smooth',
      });
    }
  };

  // Handle scroll synchronization
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollTop = contentRef.current.scrollTop;
      const sectionHeight = contentRef.current.clientHeight;
      const totalScrollHeight = contentRef.current.scrollHeight - sectionHeight;

      // Calculate scroll progress percentage
      const progress = (scrollTop / totalScrollHeight) * 100;
      setScrollProgress(progress);

      // Calculate the most visible section
      let mostVisibleSection = 1;
      let maxVisibility = 0;

      solutionsData.forEach((solution, index) => {
        const sectionTop = index * sectionHeight;
        const sectionBottom = (index + 1) * sectionHeight;

        // Calculate how much of the section is visible
        const visibleTop = Math.max(scrollTop, sectionTop);
        const visibleBottom = Math.min(scrollTop + sectionHeight, sectionBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // Update most visible section
        if (visibleHeight > maxVisibility) {
          maxVisibility = visibleHeight;
          mostVisibleSection = solution.id;
        }
      });

      // Update active section if changed
      if (mostVisibleSection !== activeSection) {
        setActiveSection(mostVisibleSection);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, [solutionsData, activeSection]);

  // Modified scrollContent function for slower and smoother scroll
  const scrollContent = (direction) => {
    if (contentRef.current) {
      // Scroll slower by reducing the scroll amount
      const scrollAmount = contentRef.current.clientHeight / 5; // Adjust the denominator for slower scroll

      // Smooth scrolling with a very slow duration
      contentRef.current.scrollBy({
        top: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-10 xl:p-16 my-10 lg:my-0 ">
      <div className="container  px-0 lg:px-12 xl:px-20  relative">
        {/* Scroll Progress Line */}
        <div className="absolute -top-4 sm:-top-6 left-0 lg:left-11 xl:left-20 w-full h-1 z-5 overflow-hidden">
          <div 
            className="h-full bg-[#737373] transition-all duration-300 ease-in-out origin-left" 
            style={{ width: `${scrollProgress}%`, transformOrigin: 'left center' }}
          />
        </div>

        <div className="flex items-center justify-between mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
            {title}
          </h1>
          {/* Navigation buttons for mobile and tablet */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => scrollContent('prev')}
              className="p-2 rounded-full text-white hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft size={28}/>
            </button>
            <button
              onClick={() => scrollContent('next')}
              className="p-2 rounded-full text-white hover:bg-gray-800 transition-colors"
            >
              <ChevronRight size={28}  />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Left side - Navigation */}
          <div className="w-full lg:w-1/3">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {solutionsData.map((solution) => (
                <div
                  key={solution.id}
                  className="cursor-pointer group"
                  onClick={() => handleNavClick(solution.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-1 h-16 sm:h-18 md:h-20">
                      <div
                        className={`absolute left-0 w-1 h-full transition-all duration-300 ${activeSection === solution.id ? 'bg-white' : 'bg-transparent'}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`transition-all duration-300 
                          ${activeSection === solution.id 
                            ? 'text-3xl sm:text-4xl' 
                            : 'text-lg sm:text-xl'} 
                          text-[#bdd4ff] mb-2 font-bold`}
                      >
                        {solution.number}
                      </div>
                      <div
                        className={`text-xl sm:text-2xl transition-colors duration-300 ${
                          activeSection === solution.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300 font-bold'
                        }`}
                      >
                        {solution.title}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full lg:w-2/3">
            <div 
              ref={contentRef} 
              className="h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-y-auto scrollbar-hide" 
              style={{
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
              }}
            >
              {solutionsData.map((solution, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-6 sm:gap-8 min-h-[300px] sm:min-h-[400px] ${index < solutionsData.length - 1 ? 'mb-8 sm:mb-10 md:mb-12' : ''}`}
                >
                  {solution.contents.map((content, idx) => (
                    <div key={idx} className="mb-2">
                      <h3 className="text-xl sm:text-2xl md:text-3xl">{content.heading}</h3>
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


