import React from "react";

const CaseStudiesPagMainDiv = ({
  backgroundVideo,
  categories = [],
  title ,
  description 
}) => {
  return (
    <div className="relative min-h-[850px] text-white w-full mt-16 lg:mt-0">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover bg-fixed"
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'fixed', top: '0', left: '0', zIndex: '-1' }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Header categories */}
        <div className="flex justify-end">
          <div className="max-w-2xl w-full">
            <div className="flex gap-12 text-left font-bold text-base sm:text-lg lg:text-xl">
              {categories.map((category, index) => (
                <div key={index}>{category}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-end mt-6 mb-6">
          <hr className="w-full border-white/20" />
        </div>

        {/* Main content */}
        <div className="flex justify-end">
          <div className="text-left max-w-2xl w-full">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl font-bold mb-4">
              {title}
            </h1>
            <p className="text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPagMainDiv;






// import React from "react";

// const CaseStudiesPagMainDiv = ({
//   backgroundVideo = 'https://res.cloudinary.com/dnijlfi48/video/upload/v1733940918/Untitled_design_14___76pct_smaller_b6u0um.mp4',
//   categories = ["awdda", "Xyz"],
//   title = 'INSPIRING TRANSFORMATION',
//   description = 'Explore our collection of success stories and discover how weve helped businesses like yours achieve their goals. Our case studies showcase the real-world impact of our expertise and demonstrate the value we deliver to our clients. Whether youre looking for inspiration, insights, or proof of our capabilities, our case studies provide valuable information and demonstrate our commitment to delivering exceptional results.',
// }) => {
//   return (
//     <div className="relative min-h-[850px] text-white w-full mt-16 lg:mt-0">
//       {/* Video Background */}
//       <video
//         className="absolute inset-0 w-full h-full object-cover bg-fixed"
//         autoPlay
//         loop
//         muted
//         playsInline
//         style={{ position: 'fixed', top: '0', left: '0', zIndex: '-1' }}
//       >
//         <source src={backgroundVideo} type="video/mp4" />
//       </video>

//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-l from-black via-black/50 to-transparent"></div>

//       {/* Content Container */}
//       <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
//         {/* Header categories */}
//         <div className="flex justify-end">
//           <div className="max-w-2xl w-full">
//             <div className="flex gap-12 text-left font-bold text-base sm:text-lg lg:text-xl">
//               {categories.map((category, index) => (
//                 <div key={index}>{category}</div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="flex justify-end mt-6 mb-6">
//           <hr className="w-full border-white/20" />
//         </div>

//         {/* Main content */}
//         <div className="flex justify-end">
//           <div className="text-left max-w-2xl w-full">
//             <h1 className="text-base sm:text-xl lg:text-4xl font-bold mb-4">
//               {title}
//             </h1>
//             <p className="text-base sm:text-xl lg:text-2xl text-white/90">
//               {description}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaseStudiesPagMainDiv;
