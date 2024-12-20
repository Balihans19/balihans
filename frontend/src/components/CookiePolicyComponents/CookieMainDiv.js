import React from 'react';

/**
 * CookieMainDiv Component
 * This component renders a reusable section for highlights.
 * All content and background images are configurable through props.
 */
const CookieMainDiv = ({
  backgroundImage,
  categories=[],
  content=[]
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
            {content.map((section, index) => (
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

export default CookieMainDiv;




// import React from 'react';


// const categories = [
//    "COOKIE POLICY","BALIHANS"
// ]
// /**
//  * CookieMainDiv Component
//  * This component renders a reusable section for case study highlights.
//  * All content and background images are configurable through props.
//  */
// const CookieMainDiv = () => {   
//     return (     
//       <div       
//         className="relative min-h-screen lg:min-h-[850px] text-white w-full bg-cover bg-center mt-16 lg:mt-0"       
//         style={{ backgroundImage: `url('https://res.cloudinary.com/dnijlfi48/image/upload/v1734594119/Untitled_design_35_iknh39.webp')` }}     
//       >       
//         {/* Overlay for gradient effect */}       
//         <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent"></div>        
        
//         <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
//       {/* Section Title and Categories */}
//       <div className="flex justify-end items-start">
//         <div className="max-w-2xl w-full">
//           <div className="flex gap-4 text-left font-bold text-base sm:text-lg lg:text-xl">
//             {categories.map((category, index) => (
//               <div key={index}>{category}</div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Horizontal Rule */}
//       <div className="flex justify-end items-start">
//         <hr className="w-full  my-6" />
//       </div>

//       {/* Description */}
//       <div className="flex justify-end items-start">
//         <div className="text-left max-w-2xl w-full">
//           <p className="text-base sm:text-xl lg:text-2xl mb-8">
//           What are Cookies?
//           </p>
//           <p className="text-base sm:text-xl lg:text-2xl mb-8">
//           Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, to track user behavior, and to improve the overall user experience.
//           </p>
//           <p className="text-base sm:text-xl lg:text-2xl mb-8">
//           Why do we need them?
//           </p>
//           <p className="text-base sm:text-xl lg:text-2xl mb-8">
//           Cookies are essential for the smooth functioning of websites and online services. They enhance user experience by personalizing content, improving website performance, and enabling secure logins. Cookies also play a crucial role in security by preventing fraudulent activities. Additionally, they help websites deliver targeted advertising and track user behavior to optimize marketing strategies. By understanding how cookies work and managing your cookie preferences, you can ensure a seamless and secure online experience.
//           </p>
//         </div>
//       </div>
//     </div>

// </div>


//     ); 
//   };  
  
//   export default CookieMainDiv;

