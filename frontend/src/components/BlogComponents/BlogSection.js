import React from 'react';


const BlogSection = ({
  backgroundImageUrl,
  heading,
  description,
  contentSection = []
}) => {
  // Handle description as an array if it's a string
  const descriptionParagraphs = Array.isArray(description) ? description : [description];

  return (
    <div className="relative text-white">
      {/* Blog Section */}
      <div
        className="relative min-h-screen lg:min-h-[850px] w-full bg-fixed mt-16 lg:mt-0"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>

        <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
          {/* Header categories */}
          <div className="flex justify-end items-start">
             <div className="max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full">
               <div className="flex gap-12 text-left font-bold text-base sm:text-lg lg:text-xl">
                 <div>BLOG</div>
                 <div>BALIHANS</div>
               </div>
             </div>
          </div>

          {/* Divider */}
          <div className="flex justify-end items-start">
            <hr className="w-full mt-4 mb-12" />
          </div>

          {/* Main content */}
          <div className="flex justify-end items-start">
            <div className="text-left max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full">
              <h1 className="text-3xl lg:text-4xl max-w-lg sm:max-w-xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl font-bold mb-8">
                {heading}
              </h1>
              {/* Description as multiple paragraphs */}
              {descriptionParagraphs.map((paragraph, index) => (
                <p key={index} className="text-xl lg:text-2xl max-w-lg sm:max-w-xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mb-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="text-white min-h-screen my-24">
        <div className="max-w-full mx-8 lg:mx-20 xl:mx-36">
          {contentSection.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-16">
              {/* Removed multiple descriptions at section level */}
              
              {/* Numbered items */}
              {section.items && section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="mb-12">
                  {/* Title with number */}
                  <h2 className="text-xl xl:text-3xl font-bold mb-6">
                    {itemIndex + 1}. {item.title}
                  </h2>
                  
                  {/* Multiple descriptions within each item */}
                  {item.descriptions && item.descriptions.map((itemDesc, itemDescIndex) => (
                    <p key={itemDescIndex} className="text-lg mb-6">{itemDesc}</p>
                  ))}
                  
                  {/* Bullet points */}
                  {item.bulletPoints && (
                    <ul className="space-y-3 mb-6">
                      {item.bulletPoints.map((bulletPoint, bpIndex) => (
                        <li
                          key={bpIndex}
                          className="relative pl-6 text-lg"
                        >
                          <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white" />
                          {bulletPoint}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;


// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const BlogSection = ({
//   backgroundImageUrl,
//   heading,
//   description,
//   contentSections = []
// }) => {
//   return (
//     <div className="relative text-white">
//       {/* Blog Section */}
//       <div
//         className="relative min-h-screen lg:min-h-[850px] w-full bg-fixed mt-16 lg:mt-0"
//         style={{ backgroundImage: `url(${backgroundImageUrl})` }}
//       >
//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>

//         <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
//           {/* Header categories */}
//           <div className="flex justify-end items-start">
//              <div className="max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full">
//                <div className="flex gap-12 text-left font-bold text-base sm:text-lg lg:text-xl">
//                  <div>BLOG</div>
//                  <div>BALIHANS</div>
//                </div>
//              </div>
//        </div>


//           {/* Divider */}
//           <div className="flex justify-end items-start">
//             <hr className="w-full mt-4 mb-12" />
//           </div>

//           {/* Main content */}
//           <div className="flex justify-end items-start">
//             <div className="text-left max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full">
//               <h1 className="text-3xl lg:text-4xl max-w-lg sm:max-w-xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl font-bold mb-8">
//                 {heading}
//               </h1>
//               <p className="text-xl lg:text-2xl max-w-lg sm:max-w-xl lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mb-8 ">
//                 {description}
//               </p>
//               {/* Button */}
//               <Link
//                 to="/contact-us"
//                 className="mt-6 flex items-center text-sm xs:text-base md:text-lg xl:text-xl text-white group max-w-44"
//               >
//                 Let's Talk
//                 <div className="ml-4 xs:w-10 xs:h-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
//                   <ArrowRight
//                     size={32}
//                     className="text-black group-hover:transform group-hover:-rotate-45 transition-transform duration-500"
//                   />
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="text-white min-h-screen my-24">
//         <div className="max-w-full mx-8 lg:mx-20 xl:mx-36">
//           {contentSections.map((section, sectionIndex) => (
//             <div key={sectionIndex} className="mb-16">
//               {/* Multiple descriptions at section level */}
//               {section.descriptions && section.descriptions.map((desc, descIndex) => (
//                 <p key={descIndex} className="text-lg mb-6">{desc}</p>
//               ))}

//               {/* Numbered items */}
//               {section.items && section.items.map((item, itemIndex) => (
//                 <div key={itemIndex} className="mb-12">
//                   {/* Title with number */}
//                   <h2 className="text-xl xl:text-3xl font-bold mb-6">
//                     {itemIndex + 1}. {item.title}
//                   </h2>
                  
//                   {/* Multiple descriptions within each item */}
//                   {item.descriptions && item.descriptions.map((itemDesc, itemDescIndex) => (
//                     <p key={itemDescIndex} className="text-lg mb-6">{itemDesc}</p>
//                   ))}
                  
//                   {/* Bullet points from original code */}
//                   {item.bulletPoints && (
//                     <ul className="space-y-3 mb-6">
//                       {item.bulletPoints.map((bulletPoint, bpIndex) => (
//                         <li
//                           key={bpIndex}
//                           className="relative pl-6 text-lg"
//                         >
//                           <span className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-white" />
//                           {bulletPoint}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogSection;