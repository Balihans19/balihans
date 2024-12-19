import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const CaseStudySolutions = ({ solutionsData = [], title }) => {
  const contentRef = useRef(null);
  const [activeSection, setActiveSection] = useState(1);
  const [scrollProgress] = useState(5);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const sections = solutionsData.map((solution) =>
          contentRef.current.querySelector(`#section-${solution.id}`)
        );
  
        const scrollTop = contentRef.current.scrollTop;
        let currentSectionId = activeSection;
  
        // Handle edge case: if scrolled to the very top, set to the first section
        if (scrollTop === 0) {
          currentSectionId = solutionsData[0].id;
        } else {
          // Determine the section based on scroll position
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollTop + contentRef.current.clientHeight / 2) {
              currentSectionId = solutionsData[i].id;
              break;
            }
          }
        }
  
        if (currentSectionId !== activeSection) {
          setActiveSection(currentSectionId);
        }
      }
    };
  
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeSection, solutionsData]);
  

  // Handle navigation click
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    if (contentRef.current) {
      const targetSection = solutionsData.find((solution) => solution.id === sectionId);
      const sectionIndex = solutionsData.indexOf(targetSection);

      // Calculate total scroll position
      const scrollPosition = solutionsData
        .slice(0, sectionIndex)
        .reduce((total, section) => {
          const sectionElement = contentRef.current.querySelector(`#section-${section.id}`);
          return total + (sectionElement ? sectionElement.clientHeight : 0);
        }, 0);

      // Scroll to the specific section
      contentRef.current.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

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
    <div className="min-h-screen text-white p-0 lg:p-3 xl:p-16">
      <div className=" mx-10 lg:mx-20 my-24 relative">
        {/* Scroll Progress Line */}
        <div className="absolute -top-8 left-0 w-full h-1 z-5 overflow-hidden">
          <div
            className="h-full bg-[#737373] transition-all duration-300 ease-in-out origin-left"
            style={{
              width: `${scrollProgress}%`,
              transformOrigin: 'left center',
            }}
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-bold mb-12">{title}</h1>
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

          {/* Right side - Content */}
          <div className="md:w-2/3">
            <div
              ref={contentRef}
              className="h-[500px] overflow-y-auto  scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {solutionsData.map((solution) => (
                <div
                  key={solution.id}
                  id={`section-${solution.id}`}
                  className="flex flex-col gap-4"
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
                        <p className="text-lg text-white">{content.description}</p>
                      )}
                      {content.primaryHeading && (
                        <h3 className="text-2xl font-bold mb-2">{content.primaryHeading}</h3>
                      )}
                      {content.primaryDescription && (
                        <p className="text-lg text-white">{content.primaryDescription}</p>
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
  );
};

export default CaseStudySolutions;




// import React, { useState, useRef } from 'react';
// import { ChevronRight, ChevronLeft } from 'lucide-react';

// const CaseStudySolutions = ({ solutionsData = [], title }) => {
//   const contentRef = useRef(null);
//   const [activeSection, setActiveSection] = useState(1);
//   const [scrollProgress] = useState(5);

//   // Handle navigation click
//   const handleNavClick = (sectionId) => {
//     setActiveSection(sectionId);
//     if (contentRef.current) {
//       const targetSection = solutionsData.find(solution => solution.id === sectionId);
//       const sectionIndex = solutionsData.indexOf(targetSection);
      
//       // Calculate total scroll position
//       const scrollPosition = solutionsData
//         .slice(0, sectionIndex)
//         .reduce((total, section) => {
//           const sectionElement = contentRef.current.querySelector(`#section-${section.id}`);
//           return total + (sectionElement ? sectionElement.clientHeight : 0);
//         }, 0);

//       // Scroll to the specific section
//       contentRef.current.scrollTo({
//         top: scrollPosition,
//         behavior: 'smooth',
//       });
//     }
//   };


// //   // Modified scrollContent function for slower and smoother scroll
//   const scrollContent = (direction) => {
//     if (contentRef.current) {
//       // Scroll slower by reducing the scroll amount
//       const scrollAmount = contentRef.current.clientHeight / 5; // Adjust the denominator for slower scroll

//       // Smooth scrolling with a very slow duration
//       contentRef.current.scrollBy({
//         top: direction === 'next' ? scrollAmount : -scrollAmount,
//         behavior: 'smooth',
//       });
//     }
//   };

  

//   return (
//     <div className="min-h-screen text-white p-8 md:p-16">
//       <div className="mx-20 my-24 relative">
//         {/* Scroll Progress Line */}
//         <div className="absolute -top-8 left-0 w-full h-1 z-5 overflow-hidden">
//           <div
//             className="h-full bg-[#737373] transition-all duration-300 ease-in-out origin-left"
//             style={{ width: `${scrollProgress}%`, transformOrigin: 'left center' }}
//           />
//         </div>

//         <h1 className="text-2xl md:text-4xl font-bold mb-12">{title}</h1>
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Left side - Navigation */}
//           <div className="md:w-1/3">
//             <div className="space-y-6">
//               {solutionsData.map((solution) => (
//                 <div
//                   key={solution.id}
//                   className="cursor-pointer group"
//                   onClick={() => handleNavClick(solution.id)}
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="relative w-1 h-20">
//                       <div
//                         className={`absolute left-0 w-1 h-full transition-all duration-300 ${activeSection === solution.id ? 'bg-white' : 'bg-transparent'}`}
//                       />
//                     </div>
//                     <div className="flex-1">
//                       <div
//                         className={`text-3xl transition-all duration-300 
//                           ${activeSection === solution.id 
//                             ? 'text-4xl' 
//                             : 'text-xl'} 
//                           text-[#bdd4ff] mb-3 font-bold`}
//                       >
//                         {solution.number}
//                       </div>

//                       <div
//                         className={`text-2xl transition-colors duration-300 ${
//                           activeSection === solution.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-300 font-bold'
//                         }`}
//                       >
//                         {solution.title}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right side - Content */}
//           <div className="md:w-2/3">
//             <div
//               ref={contentRef}
//               className="h-[500px] overflow-y-auto  scrollbar-hide"
//               style={{
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none',
//               }}
//             >
//               {solutionsData.map((solution) => (
//                 <div 
//                   key={solution.id} 
//                   id={`section-${solution.id}`} 
//                   className="flex flex-col gap-4"
//                 >
//                   {solution.contents.map((content, idx) => (
//                     <div key={idx} className="mb-8">
//                       {content.image && (
//                         <img
//                           src={content.image}
//                           alt="Solution Visual"
//                           className="rounded-lg shadow-lg w-15 h-15 mb-6"
//                         />
//                       )}
//                       {content.description && (
//                         <p className="text-lg text-white">{content.description}</p>
//                       )}
//                       {content.primaryHeading && (
//                         <h3 className="text-2xl font-bold mb-2">{content.primaryHeading}</h3>
//                       )}
//                       {content.primaryDescription && (
//                         <p className="text-lg text-white">{content.primaryDescription}</p>
//                       )}
                      
//                       {content.points && (
//                         <ul className="list-disc list-inside text-lg text-white">
//                           {content.points.map((point, index) => (
//                             <li key={index}>{point}</li>
//                           ))}
//                         </ul>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation buttons for mobile */}
//           <div className="flex justify-between mt-8 md:hidden">
//             <button
//               onClick={() => scrollContent('prev')}
//               className="p-2 rounded-full text-white hover:bg-gray-800"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               onClick={() => scrollContent('next')}
//               className="p-2 rounded-full text-white hover:bg-gray-800"
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaseStudySolutions;
