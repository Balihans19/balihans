import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const BankingSolutions = ({ solutionsData, title }) => {
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState(1);

  // Handle scroll synchronization
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollTop = contentRef.current.scrollTop;
      const sectionHeight = contentRef.current.clientHeight;

      // Calculate which section is most visible
      const currentSection = Math.floor(scrollTop / sectionHeight) + 1;
      if (currentSection !== activeSection && currentSection <= solutionsData.length) {
        setActiveSection(currentSection);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, [activeSection, solutionsData]);

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

  const scrollContent = (direction) => {
    if (contentRef.current) {
      const scrollAmount = contentRef.current.clientHeight;
      if (direction === 'next') {
        contentRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      } else {
        contentRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="mx-28 my-24">
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
                    <div className="relative w-1 h-16">
                      <div
                        className={`absolute left-0 w-1 h-full transition-all duration-300 ${
                          activeSection === solution.id
                            ? 'bg-white'
                            : 'bg-transparent'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-xl text-gray-400 mb-1">{solution.number}</div>
                      <div
                        className={`text-2xl transition-colors duration-300 ${
                          activeSection === solution.id
                            ? 'text-white'
                            : 'text-gray-400 group-hover:text-gray-300'
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
            <div ref={contentRef} className="h-[500px] overflow-y-auto hide-scrollbar">
              {solutionsData.map((solution, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-8 min-h-[400px] ${
                    index < solutionsData.length - 1 ? 'mb-16' : ''
                  }`}
                >
                  {solution.contents.map((content, idx) => (
                    <div key={idx} className="mb-8">
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
