
import React, { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";

const CustomerSpeakDiv = ({ slides, title, bgImage, cardPosition }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = useCallback((direction) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }

    // Reset the navigation lock after 1 second
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  }, [isNavigating, slides.length]);

  return (
    <div className="w-full text-white">
      {/* Title Section */}
      <div className="bg-[#191c20] h-32 flex justify-center items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h2>
      </div>

      {/* Background Image Container */}
      <div
        className="w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Overlay for reducing brightness */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Full Container */}
        <div className="relative w-full h-[800px] flex items-center justify-center">
          {/* Slide Content */}
          <div
            className={`relative max-w-44 xs:max-w-64 sm:max-w-md md:max-w-xl h-[70vh] xs:h-[60vh] md:h-[50vh] bg-white text-black rounded shadow-lg flex items-center ${
              cardPosition === 'left' ? 'mr-0 ml-0 lg:mr-auto lg:ml-56' : 'mr-0 ml-0 lg:mr-56 lg:ml-auto'
            }`}
          >
            {/* Previous Button */}
            <button
              onClick={() => handleNavigation('prev')}
              disabled={isNavigating}
              className="absolute -left-8 xs:-left-12 md:-left-20 text-white text-3xl bg-white rounded-full w-4 h-4 xs:w-8 xs:h-8 md:w-12 md:h-12 flex justify-center items-center "
            >
              <ArrowLeft size={40} color="black" />
            </button>

            {/* Slide Text */}
            <div className="relative max-w-44 xs:max-w-64 sm:max-w-md md:max-w-xl h-[70vh] xs:h-[60vh] md:h-[50vh] bg-white text-black p-8 rounded shadow-lg flex flex-col items-start justify-start space-y-4">
              {/* Small Reusable Image */}
              <div className="w-16 h-16">
                <img
                  src="https://res.cloudinary.com/dnijlfi48/image/upload/v1734509418/Untitled_80_x_60_px_g1u9is.webp"
                  alt="Small Reusable"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Slide Content */}
              <div className="pl-4">
                <p className="italic text-xxs xs:text-xs sm:text-sm md:text-base lg:text-lg text-[#191c20] mb-4">
                  {slides[currentSlide].content}
                </p>
                <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
                  {slides[currentSlide].author}
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
                  {slides[currentSlide].designation}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => handleNavigation('next')}
              disabled={isNavigating}
              className="absolute -right-8 xs:-right-12 md:-right-20 text-white text-3xl bg-white rounded-full w-4 h-4 xs:w-8 xs:h-8 md:w-12 md:h-12 flex justify-center items-center "
            >
              <ArrowRight size={40} color="black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSpeakDiv;

// import React, { useState } from 'react';
// import { ArrowLeft, ArrowRight } from "lucide-react";

// const CustomerSpeakDiv = ({ slides, title, bgImage, cardPosition}) => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="w-full text-white ">
//   {/* Title Section */}
//   <div className="bg-[#191c20] h-32 flex justify-center items-center">
//     <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">{title}</h2>
//   </div>

//   {/* Background Image Container */}
//   <div
//     className="w-full bg-cover bg-center relative"
//     style={{ backgroundImage: `url(${bgImage})` }}
//   >
//       {/* Overlay for reducing brightness */}
//   <div className="absolute inset-0 bg-black opacity-60"></div>
//     {/* Full Container */}
//     <div className="relative w-full h-[800px] flex items-center justify-center">

//       {/* Slide Content */}
//       <div
//         className={`relative max-w-44 xs:max-w-64 sm:max-w-md md:max-w-xl h-[70vh] xs:h-[60vh] md:h-[50vh] bg-white text-black  rounded shadow-lg flex items-center ${
//           cardPosition === 'left' ? 'mr-0 ml-0 lg:mr-auto lg:ml-56' : 'mr-0 ml-0 lg:mr-56 lg:ml-auto'
//         }`}
//       >
//         {/* Previous Button */}
//         <button
//           onClick={prevSlide}
//           className="absolute -left-8 xs:-left-12 md:-left-20 text-white text-3xl bg-white rounded-full w-4 h-4 xs:w-8 xs:h-8 md:w-12  md:h-12 flex justify-center items-center"
//         >
//          <ArrowLeft size={40} color="black" />
//         </button>

//         {/* Slide Text */}
//         <div className="relative max-w-44 xs:max-w-64 sm:max-w-md md:max-w-xl h-[70vh] xs:h-[60vh] md:h-[50vh] bg-white text-black p-8 rounded shadow-lg flex flex-col items-start justify-start space-y-4">
//   {/* Small Reusable Image */}
//   <div className="w-16 h-16">
//     <img
//       src="https://res.cloudinary.com/dnijlfi48/image/upload/v1734509418/Untitled_80_x_60_px_g1u9is.webp"
//       alt="Small Reusable"
//       className="w-full h-full object-contain"
//     />
//   </div>

//   {/* Slide Content */}
//   <div className="pl-4">
//     <p className="italic text-xxs xs:text-xs sm:text-sm md:text-base lg:text-lg text-[#191c20] mb-4">
//       {slides[currentSlide].content}
//     </p>
//     <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
//       {slides[currentSlide].author}
//     </p>
//     <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500">
//       {slides[currentSlide].designation}
//     </p>
//   </div>
// </div>

//         {/* Next Button */}
//         <button
//           onClick={nextSlide}
//           className="absolute -right-8 xs:-right-12 md:-right-20 text-white text-3xl bg-white rounded-full w-4 h-4 xs:w-8 xs:h-8 md:w-12  md:h-12  flex justify-center items-center"
//         >
//          <ArrowRight size={40} color="black" />
//         </button>
//       </div>
//     </div>
//   </div>
// </div>

//   );
// };

// export default CustomerSpeakDiv;
