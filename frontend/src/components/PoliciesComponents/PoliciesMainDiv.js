import React from 'react';

/**
 * PoliciesMainDiv Component
 * This component renders a reusable section for various types of content.
 * It can be used for Cookie, Disclaimer, Privacy Policy, and Security Policy.
 * All content and background images are configurable through props.
 */
const PoliciesMainDiv = ({
  backgroundImage,
  categories = [],
  content = [],
  description = null,  // Optional for some sections like Privacy Policy
  sectionType = 'default' // Type of section (e.g., 'default', 'privacy', 'security')
}) => {
  return (
    <div
      className="relative min-h-screen lg:min-h-[850px] text-white w-full bg-cover bg-center mt-16 lg:mt-0"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Overlay for gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>

      <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Section Title and Categories */}
        <div className="flex justify-end items-start">
          <div className="max-w-2xl w-full">
            <div className="flex gap-12 text-left font-bold text-base sm:text-lg lg:text-xl">
              {categories.map((category, index) => (
                <div key={index}>{category}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Rule */}
        <div className="flex justify-end items-start">
          <hr className="w-full my-6" />
        </div>

        {/* Description or Content */}
        <div className="flex justify-end items-start">
          <div className="text-left max-w-2xl w-full">
            {/* Optional Description for Privacy Policy */}
            {sectionType === 'privacy' && description && (
              <>
                <p className="text-base sm:text-xl lg:text-2xl mb-8">
                  Last reviewed on: December 17, 2023
                </p>
                {description.map((paragraph, index) => (
                  <p key={index} className="text-base sm:text-xl lg:text-2xl mb-8">
                    {paragraph}
                  </p>
                ))}
              </>
            )}

            {/* Regular Content for other sections */}
            {sectionType !== 'privacy' && content.map((section, index) => (
              <div key={index} className="mb-8">
                <p className="text-base sm:text-xl lg:text-2xl mb-4">{section.title}</p>
                <p className="text-base sm:text-xl lg:text-2xl">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesMainDiv;
