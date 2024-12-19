import React from 'react';

const PrivacyPolicyMainDiv = ({
  backgroundImage ,
  categories ,
  description 
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
            <div className="flex gap-4 text-left font-bold text-base sm:text-lg lg:text-xl">
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

        {/* Description */}
        <div className="flex justify-end items-start">
          <div className="text-left max-w-2xl w-full">
            <p className="text-base sm:text-xl lg:text-2xl mb-8">
              Last reviewed on: December 17, 2023
            </p>
            {description.map((paragraph, index) => (
              <p key={index} className="text-base sm:text-xl lg:text-2xl mb-8">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyMainDiv;



