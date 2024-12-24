import React from 'react';
import { MoveRight } from 'lucide-react';

/**
 * AboutUsMainPage Component
 * Renders a responsive about us page with a header section and vision/mission content
 * 
 *  props
 *  props.headerText - Main headline text displayed in the header
 *  props.description - Descriptive text shown below the header
 *  props.values - Array of value items with links
 *  props.backgroundImage - URL for the header background image
 *  props.missionTitle - Title for the mission section
 *  props.missionText - Content text for the mission section
 */

function AboutUsMainPage({
  headerText,
  description,
  values,
  backgroundImage,
  missionTitle,
  missionText
}) {
  return (
    // Main container with dark background
    <div className="flex flex-col min-h-screen bg-[#191c20]">
      {/* Hero Section with diagonal clip */}
      <div className="relative text-white min-h-[55vh] flex items-center">
        {/* Container for background image with diagonal clip effect */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 11%, 0 100%)' }}
        >
          {/* Semi-transparent overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>

          {/* Background image with cover positioning */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          ></div>
        </div>

        {/* Hero content container */}
        <div className="relative w-full">
          {/* Responsive padding using breakpoints */}
          <div className="mx-4 md:mx-8 lg:mx-20 xl:mx-24 2xl:mx-36 text-center">
            {/* Responsive header text scaling */}
            <h1 className="text-lg xs:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
              {headerText}
            </h1>
            {/* Description with left alignment */}
            <p className="text-sm xs:text-base md:text-lg lg:text-xl xl:text-2xl text-left">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission Grid Section */}
      <div className="w-full text-white">
        <div className="container mx-auto px-4 py-12 md:py-8">
          {/* Two-column grid on medium screens and up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 xl:gap-40">
            {/* Values/Vision Column - Interactive links */}
            <div className="w-full">
              {values.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between border-b-4 border-[#add9f2] py-4 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <span className="text-sm xs:text-lg sm:text-xl md:text-2xl">{item.title}</span>
                  {/* Animated arrow icon on hover */}
                  <MoveRight
                    color="#add9f2"
                    className="w-8 sm:w-10 h-8 sm:h-10 transform group-hover:translate-x-2 transition-transform duration-300"
                  />
                </a>
              ))}
            </div>

            {/* Mission Column */}
            <div className="w-full">
              {/* Responsive mission title */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 md:mb-10">
                {missionTitle}
              </h2>
              {/* Mission text with responsive sizing */}
              <p className="text-sm md:text-base lg:text-lg xl:text-2xl text-gray-200">
                {missionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsMainPage;



