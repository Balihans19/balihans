import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * CaseStudyMainDiv Component
 * This component renders a reusable section for case study highlights.
 * All content and background images are configurable through props.
 */
const CaseStudyMainDiv = ({ backgroundImageUrl, sectionTitle, categories, heading, description, contentWidth }) => {
  return (
    <div
      className="relative min-h-screen lg:min-h-[850px] text-white w-full bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      {/* Overlay for gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

      {/* Content Section */}
      <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Section Title and Categories */}
        <div
          className={`grid grid-cols-3 gap-x-4 mb-4 font-bold text-lg md:text-xl ${contentWidth || 'max-w-4xl'}`}
        >
          <div className="text-left">{sectionTitle}</div>
          {categories.map((category, index) => (
            <div key={index} className="text-center">{category}</div>
          ))}
        </div>

        {/* Horizontal Rule */}
        <hr className="mb-12" />

        {/* Heading and Description */}
        <h1 className="text-3xl md:text-4xl max-w-3xl mb-8">
          {heading}
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          {description}
        </p>

        {/* Button */}
        <button className="mt-6 flex items-center text-base md:text-lg xl:text-2xl text-white">
          Let's Talk
          <div className="ml-4 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 transition-colors">
            <ArrowRight size={36} className="text-black" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default CaseStudyMainDiv;


// import React from 'react';
// import { ArrowRight } from 'lucide-react';


// /**
//  * CaseStudyMainDiv Component
//  * This component renders a reusable section for case study highlights.
//  * All content and background images are configurable through the caseStudyData object.
//  */
// const CaseStudyMainDiv = ({backgroundImageUrl,sectionTitle,categories,heading,description}) => {
//   return (
//     <div
//       className="relative min-h-screen lg:min-h-[850px] text-white w-full bg-cover bg-center"
//       style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
//     >
//       {/* Overlay for gradient effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

//       {/* Content Section */}
//       <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
//         {/* Section Title and Categories */}
//         <div className="grid grid-cols-3 gap-x-4 mb-4 font-bold max-w-4xl text-lg md:text-xl">
//           <div className="text-left">{sectionTitle}</div>
//           {categories.map((category, index) => (
//             <div key={index} className="text-center">{category}</div>
//           ))}
//         </div>

//         {/* Horizontal Rule */}
//         <hr className="mb-12" />

//         {/* Heading and Description */}
//         <h1 className="text-3xl md:text-4xl max-w-3xl mb-8">
//           {heading}
//         </h1>
//         <p className="text-xl md:text-2xl max-w-2xl mb-8">
//           {description}
//         </p>

//         {/* Button */}
//         <button className="mt-6 flex items-center text-base md:text-lg xl:text-2xl text-white">
//           Let's Talk
//           <div className="ml-4 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 transition-colors">
//             <ArrowRight size={36} className="text-black" />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CaseStudyMainDiv;