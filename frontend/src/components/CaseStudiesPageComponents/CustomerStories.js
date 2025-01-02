import React,  { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react"; 

const CustomerStories = ({stories = []}) => {
 

  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(stories.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentStories = stories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-[#101215] py-36 px-8 lg:px-20 xl:px-36 text-white">
      <h2 className="text-2xl font-semibold mb-6">CUSTOMER STORIES</h2>
      <div className="flex justify-end mt-6 mb-6">
        <hr className="w-full border-white/20" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-24">
        {currentStories.map((story, index) => (
          <div key={index} className="p-4">
            <img
              src={story.image}
              alt={story.category}
              className="w-[300px] md:w-full h-80 object-cover mb-4"
            />
            <h3 className="text-lg font-bold mt-8 flex flex-col md:flex-row">
                 <span>{story.category}</span>
                 <span className="font-bold ml-0 md:ml-6">{story.subCategory}</span>
            </h3>
            <p className="text-lg mt-2 max-w-80 md:max-w-2xl">{story.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6 mb-6">
        <hr className="w-full border-white/20" />
      </div>
      <div className="flex justify-end mt-4 items-center gap-2 xs:gap-4">
        <div className="flex items-center gap-2 xs:gap-6">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`p-0 xs:p-1 rounded-full ${
              currentPage === 0 ? "bg-white" : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <ArrowLeft className="text-black" size={28} />
          </button>
          <span className="text-base xs:text-xl">Previous</span>
        </div>
        <span className="text-3xl">|</span>
        <div className="flex items-center gap-2 xs:gap-6">
          <span className="text-base xs:text-xl">Next</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`p-0 xs:p-1 rounded-full ${
              currentPage === totalPages - 1
                ? "bg-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <ArrowRight className="text-black" size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerStories;




// import React,  { useState } from "react";
// import { ArrowLeft, ArrowRight } from "lucide-react"; 

// const CustomerStories = () => {
//   const stories = [
//     {
//       category: "MANUFACTURING",
//       subCategory: "WORKFLOW AUTOMATION",
//       description: "US Based Manufacturing Company Modernize Shop Floor",
//       image: "https://res.cloudinary.com/dnijlfi48/image/upload/v1733920909/Untitled_design_12_rwh0tb_dalrsp.webp", // Replace with actual image URL
//     },
//     {
//       category: "FINANCE",
//       subCategory: "CYBER SECURITY",
//       description: "Elevating Security Posture with a 24/7 SOC",
//       image: "https://res.cloudinary.com/dnijlfi48/image/upload/v1733920909/Untitled_design_12_rwh0tb_dalrsp.webp", // Replace with actual image URL
//     },
//     {
//       category: "MEDIA",
//       subCategory: "DIGITAL TRANSFORMATION",
//       description:
//         "Balihans Empowers Media Company Through Digital Transformation",
//       image: "https://res.cloudinary.com/dnijlfi48/image/upload/v1733920909/Untitled_design_12_rwh0tb_dalrsp.webp", // Replace with actual image URL
//     },
//     {
//         category: "MANUFACTURING",
//         subCategory: "WORKFLOW AUTOMATION",
//         description: "US Based Manufacturing Company Modernize Shop Floor",
//         image: "https://via.placeholder.com/300", // Replace with actual image URL
//       },
//       {
//         category: "FINANCE",
//         subCategory: "CYBER SECURITY",
//         description: "Elevating Security Posture with a 24/7 SOC",
//         image: "https://via.placeholder.com/300", // Replace with actual image URL
//       },
//       {
//         category: "MEDIA",
//         subCategory: "DIGITAL TRANSFORMATION",
//         description:
//           "Balihans Empowers Media Company Through Digital Transformation",
//         image: "https://via.placeholder.com/300", // Replace with actual image URL
//       },
//       {
//         category: "MANUFACTURING",
//         subCategory: "WORKFLOW AUTOMATION",
//         description: "US Based Manufacturing Company Modernize Shop Floor",
//         image: "https://via.placeholder.com/300", // Replace with actual image URL
//       },
//       {
//         category: "FINANCE",
//         subCategory: "CYBER SECURITY",
//         description: "Elevating Security Posture with a 24/7 SOC",
//         image: "https://via.placeholder.com/300", // Replace with actual image URL
//       },
//       {
//         category: "MEDIA",
//         subCategory: "DIGITAL TRANSFORMATION",
//         description:
//           "Balihans Empowers Media Company Through Digital Transformation",
//         image: "https://via.placeholder.com/300", // Replace with actual image URL
//       },
      
//   ];

//   const ITEMS_PER_PAGE = 9;
//   const [currentPage, setCurrentPage] = useState(0);

//   const totalPages = Math.ceil(stories.length / ITEMS_PER_PAGE);

//   const handleNext = () => {
//     if (currentPage < totalPages - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const startIndex = currentPage * ITEMS_PER_PAGE;
//   const currentStories = stories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//   return (
//     <div className="bg-[#101215] py-36 px-36 text-white">
//       <h2 className="text-2xl font-semibold mb-6">CUSTOMER STORIES</h2>
//       <div className="flex justify-end mt-6 mb-6">
//         <hr className="w-full border-white/20" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-24">
//         {currentStories.map((story, index) => (
//           <div key={index} className="p-4">
//             <img
//               src={story.image}
//               alt={story.category}
//               className="w-full h-80 object-cover mb-4"
//             />
//             <h3 className="text-lg font-bold mt-8">
//               {story.category}{" "}
//               <span className="font-bold ml-4">{story.subCategory}</span>
//             </h3>
//             <p className="text-lg mt-2">{story.description}</p>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-end mt-6 mb-6">
//         <hr className="w-full border-white/20" />
//       </div>
//       <div className="flex justify-end mt-4 items-center gap-4">
//         <div className="flex items-center gap-6">
//           <button
//             onClick={handlePrevious}
//             disabled={currentPage === 0}
//             className={`p-1 rounded-full ${
//               currentPage === 0 ? "bg-white" : "bg-gray-700 hover:bg-gray-600"
//             }`}
//           >
//             <ArrowLeft className="text-black" size={28} />
//           </button>
//           <span className="text-xl">Previous</span>
//         </div>
//         <span className="text-3xl">|</span>
//         <div className="flex items-center gap-6">
//           <span className="text-xl">Next</span>
//           <button
//             onClick={handleNext}
//             disabled={currentPage === totalPages - 1}
//             className={`p-1 rounded-full ${
//               currentPage === totalPages - 1
//                 ? "bg-white"
//                 : "bg-gray-700 hover:bg-gray-600"
//             }`}
//           >
//             <ArrowRight className="text-black" size={28} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerStories;
