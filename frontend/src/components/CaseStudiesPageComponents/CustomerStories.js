import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Import icons for navigation
import { useNavigate } from 'react-router-dom'; // React Router hook for navigation
import { useQuery } from 'react-query'; // React Query hook for data fetching and caching

const CustomerStories = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const ITEMS_PER_PAGE = 9; // Number of stories to display per page
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page index

  // Fetch customer stories with pagination
  const { data, isLoading, error } = useQuery(
    ['customerStories', currentPage], // React Query key to cache data per page
    async () => {
      // Fetch stories data from the backend API
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/case-studies/stories?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) throw new Error('Failed to fetch stories'); // Throw an error if the request fails
      return response.json(); // Parse the JSON response
    }
  );

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>; // Show a loading indicator while fetching data
  if (error) return <div>Error loading stories</div>; // Display an error message if fetching fails

  const { stories = [], pagination = { totalPages: 1, currentPage: 0 } } = data || {}; // Destructure stories and pagination from fetched data

  // Navigate to the next page of stories, if available
  const handleNext = () => {
    if (currentPage < pagination.totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navigate to the previous page of stories, if available
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to a detailed view of a specific story
  const handleCardClick = (slug) => {
    navigate(`/case-study/${slug}`); // Construct URL using the story's slug
  };

  return (
    <div className="bg-[#101215] py-36 px-8 lg:px-20 xl:px-36 text-white">
      {/* Header section */}
      <h2 className="text-2xl font-semibold mb-6">CUSTOMER STORIES</h2>
      <div className="flex justify-end mt-6 mb-6">
        <hr className="w-full border-white/20" /> {/* Decorative horizontal line */}
      </div>

      {/* Stories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-24">
        {stories.map((story) => (
          <div 
            key={story.slug} // Use a unique slug as the key for React elements
            className="p-4 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => handleCardClick(story.slug)} // Navigate to the story's detail page on click
            role="link" // Accessibility role to indicate link behavior
            tabIndex={0} // Make the card focusable for keyboard navigation
          >
            <img
              src={story.backgroundImageUrl} // Display the story's background image
              alt={story.categories.join(", ")} // Alt text as comma-separated categories
              className="w-[300px] md:w-full h-80 object-cover mb-4"
            />
            {/* Story category and heading */}
            <h3 className="text-lg font-bold mt-8 flex flex-col md:flex-row">
              <span>{story.categories[0]}</span> {/* Primary category */}
              {story.categories[1] && (
                <span className="font-bold ml-0 md:ml-6">{story.categories[1]}</span> // Secondary category
              )}
            </h3>
            <p className="text-lg mt-2 max-w-80 md:max-w-2xl">{story.heading}</p> {/* Story heading */}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6 mb-6">
        <hr className="w-full border-white/20" /> {/* Another decorative horizontal line */}
      </div>

      {/* Pagination controls */}
      {pagination && (
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
               disabled={currentPage === pagination.totalPages - 1}
               className={`p-0 xs:p-1 rounded-full ${
                 currentPage === pagination.totalPages - 1
                   ? "bg-white"
                   : "bg-gray-300 hover:bg-gray-400"
               }`}
             >
               <ArrowRight className="text-black" size={28} />
             </button>
           </div>
         </div>
       )}
    </div>
  );
};

export default CustomerStories;
