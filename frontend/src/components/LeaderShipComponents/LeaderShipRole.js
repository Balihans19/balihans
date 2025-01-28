import { ArrowLeft, ArrowRight, Linkedin } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

/**
 * LeaderShipRole Component
 * A responsive component that displays leadership profiles with auto-sliding functionality on mobile
 * 
 *  props
 *  props.leadershipData - Object containing executive and non-executive leadership data
 *  props.leadershipData.executive - Array of executive leadership profiles
 *  props.leadershipData.nonExecutive - Array of non-executive leadership profiles
 * 
 * Each profile object should contain:
 *  image - Profile image URL
 *  name - Leader's name
 *  role - Leadership position
 *  linkedin - LinkedIn profile URL
 *  description - Main description
 *  [description2] - Optional additional description
 *  [description3] - Optional additional description
 *  [description4] - Optional additional description
 */

const LeaderShipRole = ({ leadershipData }) => {
  // State management
  const [activeType, setActiveType] = useState('executive');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  const currentData = leadershipData[activeType];
  const currentProfile = currentData[currentIndex];

  // Responsive layout handling
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-slide functionality for mobile/tablet
  const autoSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === currentData.length - 1 ? 0 : prev + 1));
  }, [currentData.length]);

  useEffect(() => {
    if (!isDesktop) {
      const slideInterval = setInterval(autoSlide, 8000);
      return () => clearInterval(slideInterval);
    }
  }, [isDesktop, autoSlide]);

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? currentData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === currentData.length - 1 ? 0 : prev + 1));
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-44 px-0 lg:px-24 pb-10">
      {/* Header with type selector buttons */}
      <div className="max-w-lg sm:max-w-xl md:max-w-4xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl mx-8 lg:mx-auto 2xl:mx-48 mt-10 lg:mt-0">
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

        {/* Main content section with responsive layout */}
        <div className="relative flex flex-col items-center">
          {/* Desktop navigation arrows */}
          {isDesktop && (
            <>
              <button
                onClick={handlePrevious}
                className="hidden lg:block absolute -left-24 xl:-left-28 2xl:-left-36 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <ArrowLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="hidden lg:block absolute -right-24 xl:-right-28 2xl:-right-36 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <ArrowRight size={24} />
              </button>
            </>
          )}

          {/* Desktop layout: Three-column grid */}
          <div className="hidden lg:grid grid-cols-[40%_5%_50%] xl:grid-cols-[30%_5%_60%] gap-8 lg:gap-6 xl:gap-12 w-full">
            {/* Profile image */}
            <div className="w-full h-[600px]">
              <img
                src={currentProfile.image}
                alt={`${currentProfile.name} Profile`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* LinkedIn section */}
            <div className="flex flex-col items-start">
              <a
                href={currentProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-gray-600 hover:bg-gray-700 transition-colors duration-300"
              >
                <Linkedin className="w-8 h-8 text-white" />
              </a>
            </div>

            {/* Profile information with scrollable content */}
            <div 
              className="flex flex-col justify-start space-y-6 sm:space-y-4 overflow-auto max-h-[600px] pr-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#a6a6a6] mb-1 sm:mb-2">
                  {currentProfile.name}
                </h3>
                <p className="text-lg sm:text-xl text-[#a6a6a6]">
                  {currentProfile.role}
                </p>
              </div>

              {/* Profile descriptions */}
              <div className="space-y-4 sm:space-y-4 xl:space-y-8 text-white">
                <p className="text-xs sm:text-sm xl:text-xl tracking-tighter ">
                  {currentProfile.description}
                </p>
                {currentProfile.description2 && (
                  <p className="text-xs sm:text-sm xl:text-xl tracking-tighter ">
                    {currentProfile.description2}
                  </p>
                )}
                {currentProfile.description3 && (
                  <p className="text-xs sm:text-sm xl:text-xl tracking-tighter ">
                    {currentProfile.description3}
                  </p>
                )}
                {currentProfile.description4 && (
                  <p className="text-xs sm:text-sm xl:text-xl tracking-tighter ">
                    {currentProfile.description4}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet layout */}
          <div className="lg:hidden w-full">
            <div className="w-full sm:w-80 md:w-96 h-80 sm:h-[400px]">
              <img
                src={currentProfile.image}
                alt={`${currentProfile.name} Profile`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Mobile LinkedIn section */}
            <div className="flex flex-col items-start mt-4">
              <a
                href={currentProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-gray-600 hover:bg-gray-700 transition-colors duration-300"
              >
                <Linkedin className="w-8 h-8 text-white" />
              </a>
            </div>

            {/* Mobile profile information */}
            <div className="mt-4 text-left">
              <h3 className="text-2xl font-bold text-[#a6a6a6] mb-1">
                {currentProfile.name}
              </h3>
              <p className="text-lg text-[#a6a6a6] mb-4">{currentProfile.role}</p>
            </div>

            {/* Mobile profile descriptions */}
            <div className="space-y-4 sm:space-y-4 text-white">
              <p className="text-xs sm:text-sm 2xl:text-base tracking-tighter text-justify">
                {currentProfile.description}
              </p>
              {currentProfile.description2 && (
                <p className="text-xs sm:text-sm 2xl:text-base tracking-tighter text-justify">
                  {currentProfile.description2}
                </p>
              )}
              {currentProfile.description3 && (
                <p className="text-xs sm:text-sm 2xl:text-base tracking-tighter text-justify">
                  {currentProfile.description3}
                </p>
              )}
              {currentProfile.description4 && (
                <p className="text-xs sm:text-sm 2xl:text-base tracking-tighter text-justify">
                  {currentProfile.description4}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderShipRole;



