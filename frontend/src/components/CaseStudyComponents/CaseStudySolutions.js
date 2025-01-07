



import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

/**
 * CaseStudySolutions Component
 * This component is responsible for displaying a collection of case study solutions.
 * The solutions are rendered with smooth scroll-based navigation, a vertical progress bar, and dynamic updates based on user interaction.
 */
const CaseStudySolutions = ({ solutionsData = [], title }) => {
  // Ref to track the content container for scroll position calculation
  const contentRef = useRef(null);

  // State to track the currently active solution section and the scroll progress
  const [activeSection, setActiveSection] = useState(1);
  const [scrollProgress] = useState(5); // Placeholder value for scroll progress bar (could be dynamic)

  // Effect hook to handle scroll detection and update the active section
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      if (contentRef.current) {
        const container = contentRef.current;
        const containerHeight = container.clientHeight;
        const scrollTop = container.scrollTop;
        const scrollBottom = scrollTop + containerHeight;

        // Get all section elements based on the solutions data
        const sections = solutionsData.map((solution) =>
          container.querySelector(`#section-${solution.id}`)
        );

        let currentSectionId = activeSection;

        // Handle the edge case when the user is at the top of the content
        if (scrollTop === 0) {
          currentSectionId = solutionsData[0].id;
        } 
        // Handle the edge case when the user is at the bottom of the content
        else if (scrollBottom >= container.scrollHeight - 10) {
          currentSectionId = solutionsData[solutionsData.length - 1].id;
        } 
        else {
          // Enhanced section detection logic
          for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (!section) continue;

            // Determine the top, bottom, and middle points of the section
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;
            const sectionMiddle = sectionTop + (section.clientHeight / 2);

            // Check if the section is fully visible or its middle point is in the viewport
            if (
              (sectionTop <= scrollTop && sectionBottom >= scrollBottom) || // Fully visible section
              (sectionMiddle >= scrollTop && sectionMiddle <= scrollBottom) || // Middle of section visible
              (i < sections.length - 1 && sectionBottom >= scrollTop && sections[i + 1].offsetTop > scrollBottom) // Last visible section
            ) {
              currentSectionId = solutionsData[i].id;
              break;
            }
          }
        }

        // Update active section if it has changed
        if (currentSectionId !== activeSection) {
          setActiveSection(currentSectionId);
        }
      }
    };

    // Attach scroll event listener
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check on mount to set the correct active section
    }

    // Cleanup function to remove the scroll event listener
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeSection, solutionsData]); // Re-run this effect when activeSection or solutionsData changes

  /**
   * Handles navigation click from the sidebar. Smoothly scrolls to the clicked solution section.
   */
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (contentRef.current) {
      const targetSection = solutionsData.find((solution) => solution.id === sectionId);
      const sectionIndex = solutionsData.indexOf(targetSection);

      // Calculate the cumulative scroll position of the target section
      const scrollPosition = solutionsData
        .slice(0, sectionIndex)
        .reduce((total, section) => {
          const sectionElement = contentRef.current.querySelector(`#section-${section.id}`);
          return total + (sectionElement ? sectionElement.clientHeight : 0);
        }, 0);

      // Smooth scroll to the calculated position
      contentRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  /**
   * Handles manual scroll navigation for mobile view.
   * Scrolls the content up or down in chunks (5% of the container height).
   */
  const scrollContent = (direction) => {
    if (contentRef.current) {
      const scrollAmount = contentRef.current.clientHeight / 5; // Scroll by 1/5th of the container height
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
              width: `${scrollProgress}%`, // Set progress width (currently static, could be dynamic)
              transformOrigin: 'left center',
            }}
          />
        </div>

        {/* Section Title */}
        <h1 className="text-2xl md:text-4xl font-bold mb-12">{title}</h1>

        {/* Main Layout with Sidebar and Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar (left column) with Navigation Links */}
          <div className="md:w-1/3">
            <div className="space-y-6">
              {solutionsData.map((solution) => (
                <div
                  key={solution.id}
                  className="cursor-pointer group"
                  onClick={() => handleNavClick(solution.id)} // Navigate to the clicked section
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-1 h-20">
                      {/* Indicator Line for Active Section */}
                      <div
                        className={`absolute left-0 w-1 h-full transition-all duration-300 ${
                          activeSection === solution.id ? 'bg-white' : 'bg-transparent'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      {/* Section Number */}
                      <div
                        className={`text-3xl transition-all duration-300 ${
                          activeSection === solution.id ? 'text-4xl' : 'text-xl'
                        } text-[#bdd4ff] mb-3 font-bold`}
                      >
                        {solution.number}
                      </div>

                      {/* Section Title */}
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

          {/* Content Area (right column) */}
          <div className="md:w-2/3">
            <div
              ref={contentRef} // Reference for scroll container
              className="h-[500px] overflow-y-auto scrollbar-hide" // Makes the content scrollable with hidden scrollbar
              style={{
                scrollbarWidth: 'none', // Hide scrollbar in Firefox
                msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
              }}
            >
              {/* Render Solution Sections */}
              {solutionsData.map((solution) => (
                <div
                  key={solution.id}
                  id={`section-${solution.id}`} // ID for scroll detection
                  className="flex flex-col gap-4"
                >
                  {/* Render Content for Each Solution */}
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
                        <p className="text-lg text-white">{content.description}</p>
                      )}
                      {content.primaryHeading && (
                        <h3 className="text-2xl font-bold mb-2">{content.primaryHeading}</h3>
                      )}
                      {content.primaryDescription && (
                        <p className="text-2xl  text-white">{content.primaryDescription}</p>
                      )}

                      {/* Render List Points */}
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

          {/* Mobile Navigation Buttons */}
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
  );
};

export default CaseStudySolutions;



