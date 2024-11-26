
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TriCarousel = ({ slides, title }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [maxTitleHeight, setMaxTitleHeight] = useState(0);
  const titleRefs = useRef([]);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setStartIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Measure the maximum height of all titles
  useEffect(() => {
    const heights = titleRefs.current.map((ref) => ref?.offsetHeight || 0);
    setMaxTitleHeight(Math.max(...heights));
  }, [slides]);

  // Get visible slides
  const getVisibleSlides = () => {
    const visibleSlides = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % slides.length;
      visibleSlides.push(slides[index]);
    }
    return visibleSlides;
  };

  // Navigation functions
  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  // SlideCard component with dynamic height adjustment and hover effects
  const SlideCard = ({ slide, index }) => (
    <div className="relative group cursor-pointer w-full transform transition-transform duration-500 hover:scale-105">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg transition-all duration-500 ease-in-out">
        <img
          src={slide.image}
          alt={slide.title}
          className="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100">
          <div className="absolute bottom-20 left-0 right-0 p-4 lg:p-6">
            <div
              ref={(el) => (titleRefs.current[index] = el)} // Reference for measuring height
              className="text-lg lg:text-2xl text-white mb-2"
              style={{ minHeight: `${maxTitleHeight}px` }} // Apply max height dynamically
            >
              {slide.title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-36">
      <h2 className="text-3xl md:text-4xl text-center mb-24 text-white">
        {title}
      </h2>

      <div className="relative">
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-20">
            {getVisibleSlides().map((slide, index) => (
              <div
                key={`${slide.id}-${index}`}
                className="transition-all duration-500 ease-in-out opacity-100 transform translate-x-0"
              >
                <SlideCard slide={slide} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons with hover effect */}
        <button
          onClick={prevSlide}
          className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-10 transform transition-transform duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ArrowLeft size={40} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-10 transform transition-transform duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ArrowRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default TriCarousel;



// import React, { useState, useEffect, useRef } from 'react';
// import { ArrowLeft, ArrowRight } from 'lucide-react';

// const TriCarousel = ({ slides, title }) => {
//   const [startIndex, setStartIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [maxTitleHeight, setMaxTitleHeight] = useState(0);
//   const titleRefs = useRef([]);

//   // Auto-play functionality
//   useEffect(() => {
//     let interval;
//     if (isAutoPlaying) {
//       interval = setInterval(() => {
//         setStartIndex((prev) => (prev + 1) % slides.length);
//       }, 5000);
//     }
//     return () => clearInterval(interval);
//   }, [isAutoPlaying, slides.length]);

//   // Measure the maximum height of all titles
//   useEffect(() => {
//     const heights = titleRefs.current.map((ref) => ref?.offsetHeight || 0);
//     setMaxTitleHeight(Math.max(...heights));
//   }, [slides]);

//   // Get visible slides
//   const getVisibleSlides = () => {
//     const visibleSlides = [];
//     for (let i = 0; i < 3; i++) {
//       const index = (startIndex + i) % slides.length;
//       visibleSlides.push(slides[index]);
//     }
//     return visibleSlides;
//   };

//   // Navigation functions
//   const nextSlide = () => {
//     setStartIndex((prev) => (prev + 1) % slides.length);
//     setIsAutoPlaying(false);
//   };

//   const prevSlide = () => {
//     setStartIndex((prev) => (prev - 1 + slides.length) % slides.length);
//     setIsAutoPlaying(false);
//   };

//   // SlideCard component with dynamic height adjustment
//   const SlideCard = ({ slide, index }) => (
//     <div className="relative group cursor-pointer w-full">
//       <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
//         <img
//           src={slide.image}
//           alt={slide.title}
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100">
//           <div className="absolute bottom-20 left-0 right-0 p-4 lg:p-6">
//             <div
//               ref={(el) => (titleRefs.current[index] = el)} // Reference for measuring height
//               className="text-lg lg:text-2xl text-white mb-2"
//               style={{ minHeight: `${maxTitleHeight}px` }} // Apply max height dynamically
//             >
//               {slide.title}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 my-36">
//       <h2 className="text-3xl md:text-4xl text-center mb-24 text-white">
//         {title}
//       </h2>

//       <div className="relative">
//         <div className="overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-20">
//             {getVisibleSlides().map((slide, index) => (
//               <div
//                 key={`${slide.id}-${index}`}
//                 className="transition-all duration-500 ease-in-out"
//                 style={{
//                   opacity: 1,
//                   transform: "translateX(0)",
//                 }}
//               >
//                 <SlideCard slide={slide} index={index} />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Navigation buttons */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-10"
//           aria-label="Previous slide"
//         >
//           <ArrowLeft size={40} />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-10"
//           aria-label="Next slide"
//         >
//           <ArrowRight size={40} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TriCarousel;


