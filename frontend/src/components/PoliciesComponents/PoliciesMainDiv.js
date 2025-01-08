import React from 'react';

/**
 * PoliciesMainDiv Component
 * A reusable section component for policy-related content with configurable background and content
 * 
 *  props
 * props.backgroundImage - URL for background image
 *  [props.categories=[]] - Category titles
 *  [props.content=[]] - Content sections
 *  [props.description=null] - Optional description paragraphs for privacy policy
 *  [props.sectionType='default'] - Section type identifier
 */

const PoliciesMainDiv = ({
  backgroundImage,
  categories = [],
  content = [],
  description = null,
  sectionType = 'default'
}) => {
  return (
    <div
      className="relative min-h-screen lg:min-h-[850px] text-white w-full bg-cover bg-fixed bg-center mt-16 lg:mt-0"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>

      <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Header categories */}
        <div className="flex justify-end items-start">
          <div className="max-w-2xl w-full">
            <div className="flex gap-12 text-left font-bold text-base sm:text-lg lg:text-xl">
              {categories.map((category, index) => (
                <div key={index}>{category}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-end items-start">
          <hr className="w-full my-6" />
        </div>

        {/* Main content */}
        <div className="flex justify-end items-start">
          <div className="text-left max-w-2xl w-full">
            {/* Privacy policy specific content */}
            {sectionType === 'privacy' && description && (
              <>
                <p className="text-base sm:text-xl lg:text-2xl mb-8">
                  Last reviewed on: December 17, 2023
                </p>
                {description.map((paragraph, index) => (
                  <p key={index} className="text-base sm:text-xl lg:text-2xl mb-8 text-justify">
                    {paragraph}
                  </p>
                ))}
              </>
            )}

            {/* Default content sections */}
            {sectionType !== 'privacy' && content.map((section, index) => (
              <div key={index} className="mb-8">
                <p className="text-base sm:text-xl lg:text-2xl mb-4">{section.title}</p>
                <p className="text-base sm:text-xl lg:text-2xl text-justify">{section.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesMainDiv;



