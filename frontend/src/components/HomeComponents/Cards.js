import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

// Link data defined in the same file
const links = [
  "/strategy-and-consulting",
  "/cloud-and-infrastructure",
  "/ai",
  "/cybersecurity",
  "/digital-enterprise",
];

// Reusable Card component
const Card = ({ title, description, imgSrc, link }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Link to={link} className="group">
      <div className="relative w-full h-[450px] overflow-hidden transition-transform duration-300 ease-in-out group">
        <div
          className={`absolute inset-0 flex flex-col justify-center items-start bg-black ${
            isMobile ? 'bg-opacity-50' : 'bg-opacity-50 group-hover:bg-opacity-60'
          } text-white transition-opacity duration-300 ease-in-out`}
        >
          <h2 className="text-3xl text-left mb-2 text-white z-10 absolute top-[100px] ml-5 w-4/5">
            {title}
          </h2>
          <p
            className={`text-xl font-normal text-left mx-5 text-white z-10 ${
              isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            } transition-opacity duration-300 ease-in-out absolute top-[190px]`}
          >
            {description}
          </p>
        </div>
        <img
          src={imgSrc}
          alt={title}
          className={`w-full h-full object-cover block ${
            isMobile ? '' : 'group-hover:blur-sm'
          } transition-all duration-300 ease-in-out`}
        />
      </div>
    </Link>
  );
};

// Reusable Cards component
const Cards = ({ primaryHeading, paragraph, cardsData }) => {
  return (
    <section className="text-white py-36">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 mb-12">
          <h2 className="text-4xl font-bold lg:w-1/4 xl:w-1/5 shrink-0">
            {primaryHeading}
          </h2>
          <p className="text-xl font-normal text-left lg:w-3/4 xl:w-4/5">
            {paragraph}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imgSrc={card.imgSrc}
              link={links[index]} // Assign link from the local `links` array
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;







// import React, { useEffect, useState } from 'react';

// // Reusable Card component
// const Card = ({ title, description, imgSrc }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };

//     // Initial check
//     checkScreenSize();

//     // Add event listener
//     window.addEventListener('resize', checkScreenSize);

//     // Cleanup
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   return (
//     <div className="relative w-full h-[450px] overflow-hidden transition-transform duration-300 ease-in-out group">
//       <div 
//         className={`absolute inset-0 flex flex-col justify-center items-start bg-black ${
//           isMobile ? 'bg-opacity-60' : 'bg-opacity-60 group-hover:bg-opacity-60'
//         } text-white transition-opacity duration-300 ease-in-out`}
//       >
//         <h2 className="text-3xl   text-left mb-2 text-white z-10 absolute top-[100px] ml-5 w-4/5">
//           {title}
//         </h2>
//         <p 
//           className={`text-xl font-normal text-left mx-5 text-white z-10 ${
//             isMobile 
//               ? 'opacity-100' 
//               : 'opacity-0 group-hover:opacity-100'
//           } transition-opacity duration-300 ease-in-out absolute top-[190px]`}
//         >
//           {description}
//         </p>
//       </div>
//       <img
//         src={imgSrc}
//         alt={title}
//         className={`w-full h-full object-cover block ${
//           isMobile ? '' : 'group-hover:blur-sm'
//         } transition-all duration-300 ease-in-out`}
//       />
//     </div>
//   );
// };

// // Reusable Cards component
// const Cards = ({ primaryHeading, paragraph, cardsData }) => {
//   return (
//     <section className="text-white py-36">
//       <div className="max-w-[1200px] mx-auto px-4">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row lg:items-start gap-12 mb-12">
//           <h2 className="text-4xl font-bold  lg:w-1/4 xl:w-1/5 shrink-0">
//             {primaryHeading}
//           </h2>
//           <p className="text-xl font-normal text-left lg:w-3/4 xl:w-4/5">
//             {paragraph}
//           </p>
//         </div>

//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
//           {cardsData.map((card, index) => (
//             <Card
//               key={index}
//               title={card.title}
//               description={card.description}
//               imgSrc={card.imgSrc}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cards;


