
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Linkedin } from 'lucide-react';

const LeaderShipRole = ({ leadershipData }) => {
  const [activeType, setActiveType] = useState('executive');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const currentData = leadershipData[activeType];
  const currentProfile = currentData[currentIndex];

  // Handle window resize to toggle desktop/mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic sliding function
  const autoSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === currentData.length - 1 ? 0 : prev + 1));
  }, [currentData.length]);

  // Set up automatic sliding for mobile/tablet
  useEffect(() => {
    if (!isDesktop) {
      const slideInterval = setInterval(autoSlide, 8000);
      return () => clearInterval(slideInterval);
    }
  }, [isDesktop, autoSlide]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? currentData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === currentData.length - 1 ? 0 : prev + 1));
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 px-0 lg:px-24">
      {/* Header Section */}
      <div className="max-w-lg sm:max-w-xl md:max-w-4xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-8 lg:mx-auto mt-10 lg:mt-0">
        <div className="flex flex-col md:flex-row justify-start lg:justify-between gap-4 md:gap-8">
          <button
            onClick={() => handleTypeChange('executive')}
            className={`text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold transition-colors duration-300 
              ${activeType === 'executive' ? 'text-white' : 'text-gray-500'}`}
          >
            Executive Leadership
          </button>
          <button
            onClick={() => handleTypeChange('nonExecutive')}
            className={`text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold transition-colors duration-300 
              ${activeType === 'nonExecutive' ? 'text-white' : 'text-gray-500'}`}
          >
            Non-Executive Leadership
          </button>
        </div>
        <div className="h-px bg-gray-700 mt-6 sm:mt-8 mb-8 sm:mb-12"></div>
        
        {/* Content Section */}
        <div className="relative flex flex-col items-center">
          {/* Navigation Buttons - Only visible on desktop */}
          {isDesktop && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute -left-24 xl:-left-20 2xl:-left-28 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <ArrowLeft size={24} />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute -right-24 xl:-right-20 2xl:-right-28 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <ArrowRight size={24} />
              </button>
            </>
          )}
          
          {/* Profile Content with Three Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[40%_5%_50%] xl:grid-cols-[30%_5%_60%] gap-8 lg:gap-6 xl:gap-12">
            {/* Profile Image Column */}
            <div className="w-full sm:w-80 md:w-96 lg:w-full h-80 sm:h-[400px] lg:h-[600px]">
              <img
                src={currentProfile.image}
                alt={`${currentProfile.name} Profile`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* LinkedIn Logo Column */}
            <div className="flex flex-col items-start">
              <div className="p-3 border border-gray-600 ">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
            </div>
            
            {/* Profile Info Column */}
            <div className="flex flex-col justify-start space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#a6a6a6] mb-1 sm:mb-2">
                  {currentProfile.name}
                </h3>
                <p className="text-lg sm:text-xl text-[#a6a6a6]">
                  {currentProfile.role}
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6 text-white">
                <p className="text-xs sm:text-sm 2xl:text-base leading-relaxed">
                  {currentProfile.description}
                </p>
                {currentProfile.description2 && (
                  <p className="text-xs sm:text-sm 2xl:text-base leading-relaxed">
                    {currentProfile.description2}
                  </p>
                )}
                {currentProfile.description3 && (
                  <p className="text-xs sm:text-sm 2xl:text-base leading-relaxed">
                    {currentProfile.description3}
                  </p>
                )}
                {currentProfile.description4 && (
                  <p className="text-xs sm:text-sm 2xl:text-base leading-relaxed">
                    {currentProfile.description4}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderShipRole;




// import React, { useState } from 'react';
// import {ArrowLeft, ArrowRight, Linkedin } from 'lucide-react';

// const LeaderShipRole = ({ leadershipData }) => {
//   const [activeType, setActiveType] = useState('executive');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const currentData = leadershipData[activeType];
//   const currentProfile = currentData[currentIndex];

//   const handlePrevious = () => {
//     setCurrentIndex((prev) => (prev === 0 ? currentData.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === currentData.length - 1 ? 0 : prev + 1));
//   };

//   const handleTypeChange = (type) => {
//     setActiveType(type);
//     setCurrentIndex(0);
//   };

//   return (
//     <div className="min-h-screen py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24">
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
//           <button
//             onClick={() => handleTypeChange('executive')}
//             className={`text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold transition-colors duration-300
//               ${activeType === 'executive' ? 'text-white' : 'text-gray-500'}`}
//           >
//             Executive Leadership
//           </button>
//           <button
//             onClick={() => handleTypeChange('nonExecutive')}
//             className={`text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold transition-colors duration-300
//               ${activeType === 'nonExecutive' ? 'text-white' : 'text-gray-500'}`}
//           >
//             Non-Executive Leadership
//           </button>
//         </div>
//         <div className="h-px bg-gray-700 mt-6 sm:mt-8 mb-8 sm:mb-12"></div>

//         {/* Content Section */}
//         <div className="relative flex flex-col items-center">
//           {/* Navigation Buttons */}
//           <button
//             onClick={handlePrevious}
//             className="absolute -left-20 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 transition-colors duration-300"
//           >
//             <ArrowLeft size={24}  />
//           </button>

//           <button
//             onClick={handleNext}
//             className="absolute -right-20 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 transition-colors duration-300"
//           >
//             <ArrowRight size={24} />
//           </button>

//           {/* Profile Content */}
//           <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 md:gap-12">
//             {/* Profile Image */}
//             <div className="w-[100%] xs:w-[400px] lg:w-full h-80 sm:h-[400px] md:h-[500px] ">
//               <img
//                 src={currentProfile.image}
//                 alt={`${currentProfile.name} Profile`}
//                 className="w-full h-full object-cover rounded-lg shadow-lg "
//               />
//             </div>

//             {/* Profile Info */}
//             <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
//               <div className="flex items-center gap-4">
//                 <div className="p-2 border border-gray-600 rounded-full">
//                   <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                 </div>
//                 <div>
//                   <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
//                     {currentProfile.name}
//                   </h3>
//                   <p className="text-lg sm:text-xl text-gray-400">
//                     {currentProfile.role}
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-4 sm:space-y-6">
//                 <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
//                   {currentProfile.description}
//                 </p>
//                 {currentProfile.description2 && (
//                   <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
//                     {currentProfile.description2}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaderShipRole;


