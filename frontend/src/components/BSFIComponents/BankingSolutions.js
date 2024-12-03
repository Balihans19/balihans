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
    <div className="min-h-screen text-white p-8 md:p-16">
      <div className="mx-20 my-24 relative">
        {/* Scroll Progress Line */}
        <div className="absolute -top-8 left-0 w-full h-1 z-5 overflow-hidden">
          <div 
            className="h-full bg-[#737373] transition-all duration-300 ease-in-out origin-left" 
            style={{ width: `${scrollProgress}%`, transformOrigin: 'left center' }}
          />
        </div>

        <h1 className="text-2xl md:text-4xl mb-12">{title}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left side - Navigation */}
          <div className="md:w-1/3">
            <div className="space-y-6">
            {solutionsData.map((solution) => (
  <div
    key={solution.id}
    className="cursor-pointer group"
    onClick={() => handleNavClick(solution.id)}
  >
    <div className="flex items-start gap-4">
      <div className="relative w-1 h-20">
        <div
          className={`absolute left-0 w-1 h-full transition-all duration-300 ${activeSection === solution.id ? 'bg-white' : 'bg-transparent'}`}
        />
      </div>
      <div className="flex-1">
      <div
  className={`text-3xl transition-all duration-300 
    ${activeSection === solution.id 
      ? 'text-4xl' 
      : 'text-xl'} 
    text-[#bdd4ff] mb-3`}
>
  {solution.number}
</div>

        <div
          className={`text-2xl transition-colors duration-300 ${
            activeSection === solution.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
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
          <div className="md:w-2/3">
            <div 
              ref={contentRef} 
              className="h-[500px] overflow-y-auto scrollbar-hide" 
              style={{
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
              }}
            >
              {solutionsData.map((solution, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-8 min-h-[400px] ${index < solutionsData.length - 1 ? 'mb-12' : ''}`}
                >
                  {solution.contents.map((content, idx) => (
                    <div key={idx} className="mb-2">
                      <h3 className="text-3xl">{content.heading}</h3>
                      <p className="text-xl text-gray-300">{content.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Navigation buttons for mobile */}
            <div className="flex justify-between mt-8 md:hidden">
              <button
                onClick={() => scrollContent('prev')}
                className="p-2 rounded-full text-white hover:bg-gray-800"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scrollContent('next')}
                className="p-2 rounded-full text-white hover:bg-gray-800"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingSolutions;


