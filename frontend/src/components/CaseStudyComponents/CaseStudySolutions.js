import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

/**
 * CaseStudySolutions Component
 * A responsive component that displays case study content with navigation and progress tracking
 * 
  solutionsData - Array of solution objects containing case study content
  title - Title of the case study section
 * 
 * Features:
 * - Responsive layout with different behaviors for mobile and desktop
 * - Automatic scroll progress tracking
 * - Smart section visibility detection
 * - Smooth scroll navigation
 * - Mobile-friendly navigation controls
 */

const CaseStudySolutions = ({ solutionsData = [], title }) => {
  // Refs and State Management
  const contentRef = useRef(null);                    // Reference to scrollable content container
  const [activeSection, setActiveSection] = useState(1); // Currently active/visible section
  const [scrollProgress, setScrollProgress] = useState(0); // Overall scroll progress (0-100)

  /**
   * Handles scroll events and updates active section and scroll progress
   * Uses intersection detection to determine the most visible section
   */
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const container = contentRef.current;
        
        // Calculate overall scroll progress
        const containerHeight = container.clientHeight;
        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const progress = (scrollTop / (scrollHeight - containerHeight)) * 100;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));

        // Section visibility detection
        const sections = solutionsData.map((solution) =>
          container.querySelector(`#section-${solution.id}`)
        );

        let maxVisibleSection = null;
        let maxVisiblePercentage = 0;

        sections.forEach((section, index) => {
          if (!section) return;

          const rect = section.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          // Calculate section visibility
          const visibleTop = Math.max(rect.top, containerRect.top);
          const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          // Enhanced visibility calculation considering center position
          const centerPosition = (rect.top + rect.bottom) / 2;
          const containerCenter = (containerRect.top + containerRect.bottom) / 2;
          const distanceFromCenter = Math.abs(centerPosition - containerCenter);
          const visiblePercentage = (visibleHeight / rect.height) * (1 + 1 / (1 + distanceFromCenter / 100));

          if (visiblePercentage > maxVisiblePercentage) {
            maxVisiblePercentage = visiblePercentage;
            maxVisibleSection = solutionsData[index].id;
          }
        });

        // Update active section if changed
        if (maxVisibleSection !== null && maxVisibleSection !== activeSection) {
          setActiveSection(maxVisibleSection);
        }
      }
    };

    // Set up scroll and resize observers
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      const resizeObserver = new ResizeObserver(() => {
        handleScroll();
      });
      resizeObserver.observe(contentElement);
      
      handleScroll();

      return () => {
        contentElement.removeEventListener('scroll', handleScroll);
        resizeObserver.disconnect();
      };
    }
  }, [activeSection, solutionsData]);

  /**
   * Handles navigation to specific sections
   * @param {number} sectionId - ID of the target section
   */
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (contentRef.current) {
      const targetSection = contentRef.current.querySelector(`#section-${sectionId}`);
      if (targetSection) {
        const containerRect = contentRef.current.getBoundingClientRect();
        const targetRect = targetSection.getBoundingClientRect();
        const scrollOffset = targetRect.top - containerRect.top + contentRef.current.scrollTop;
        
        contentRef.current.scrollTo({
          top: scrollOffset,
          behavior: 'smooth',
        });
      }
    }
  };

  /**
   * Handles content scrolling for mobile navigation
   * @param {'next' | 'prev'} direction - Scroll direction
   */
  const scrollContent = (direction) => {
    if (contentRef.current) {
      const scrollAmount = contentRef.current.clientHeight / 2;
      contentRef.current.scrollBy({
        top: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen text-white p-0 lg:p-3 xl:p-16">
      <div className="mx-10 lg:mx-20 my-24 relative">
        {/* Scroll Progress Bar */}
        <div className="absolute -top-8 left-0 w-full h-1 z-5 overflow-hidden">
          <div
            className="h-full bg-[#737373] transition-all duration-300 ease-in-out origin-left"
            style={{
              width: `${scrollProgress}%`,
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Title and Mobile Navigation */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
          <div className="flex gap-4 md:hidden">
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

        <div className="flex flex-col md:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="md:w-1/3">
            <div className="space-y-6 sticky top-0">
              {solutionsData.map((solution) => (
                <div
                  key={solution.id}
                  className="cursor-pointer group"
                  onClick={() => handleNavClick(solution.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-1 h-20">
                      <div
                        className={`absolute left-0 w-1 h-full transition-all duration-300 ${
                          activeSection === solution.id ? 'bg-white' : 'bg-transparent'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <div
                        className={`text-3xl transition-all duration-300 ${
                          activeSection === solution.id ? 'text-4xl' : 'text-xl'
                        } text-[#bdd4ff] mb-3 font-bold`}
                      >
                        {solution.number}
                      </div>
                      <div
                        className={`text-2xl transition-colors duration-300 ${
                          activeSection === solution.id
                            ? 'text-white'
                            : 'text-gray-400 group-hover:text-gray-300 font-bold'
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

          {/* Main Content Area */}
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
                  key={solution.id}
                  id={`section-${solution.id}`}
                  className={`flex flex-col gap-4 ${
                    index !== solutionsData.length - 1 ? 'mb-12' : ''
                  }`}
                >
                  {solution.contents.map((content, idx) => (
                    <div key={idx} className="mb-8">
                      {content.image && (
                        <img
                          src={content.image}
                          alt="Solution Visual"
                          className="rounded-lg shadow-lg w-15 h-15 mb-6"
                        />
                      )}
                      {content.description && (
                        <p className="text-xl text-white ">{content.description}</p>
                      )}
                      {content.primaryHeading && (
                        <h3 className="text-2xl font-bold mb-2">{content.primaryHeading}</h3>
                      )}
                      {content.primaryDescription && (
                        <p className="text-2xl text-white ">{content.primaryDescription}</p>
                      )}
                      {content.points && (
                        <ul className="list-disc list-inside text-lg text-white">
                          {content.points.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      )}
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

export default CaseStudySolutions;