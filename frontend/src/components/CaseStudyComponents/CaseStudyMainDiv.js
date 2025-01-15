import React from 'react';
import { ArrowRight } from 'lucide-react'; // Importing ArrowRight icon for the button
import { Link } from 'react-router-dom'; 

/**
 * CaseStudyMainDiv Component
 * This component renders a reusable section for case study highlights.
 * All content and background images are configurable through props.
 */
const CaseStudyMainDiv = ({ backgroundImageUrl, categories, heading, description, contentWidth }) => {
  return (
    <div
      className="relative min-h-screen lg:min-h-[850px] text-white w-full bg-cover bg-center bg-fixed mt-16 lg:mt-0"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }} // Set the background image dynamically from props
    >
      {/* Overlay for gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div> {/* Creates a gradient overlay */}

      {/* Content Section */}
      <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Section Title and Categories */}
        <div
          className={`flex justify-start items-center space-x-8 mb-4 font-bold text-xs xs:text-sm sm:text-lg lg:text-xl ${
            contentWidth || 'max-w-4xl'
          }`}
        >
          {/* Dynamically rendering categories from props */}
          {categories.map((category, index) => (
            <div key={index} className="text-left">
              {category}
            </div> // Render each category
          ))}
        </div>

        {/* Horizontal Rule */}
        <hr className="mb-12" /> {/* A horizontal line between categories and heading */}

        {/* Heading and Description */}
        <h1 className="text-3xl lg:text-4xl max-w-lg sm:max-w-xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mb-8">
          {heading} {/* Display the main heading */}
        </h1>
        <p className="text-xl lg:text-2xl max-w-lg sm:max-w-xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mb-8 ">
          {description} {/* Display the description text */}
        </p>

        {/* Button */}
       <Link 
          to="/contact-us"
          className="mt-6 flex items-center text-sm xs:text-base md:text-lg xl:text-xl text-white group max-w-40"
          >
            Let's Talk
            <div className="ml-4 xs:w-10 xs:h-10 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200">
              <ArrowRight 
                size={32} 
                className="text-black group-hover:transform group-hover:-rotate-45 transition-transform duration-500" 
              />
            </div>
          </Link>
      </div>
    </div>
  );
};

export default CaseStudyMainDiv;


