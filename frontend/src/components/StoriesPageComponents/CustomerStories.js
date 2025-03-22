import React, { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Import icons for pagination
import { useNavigate } from "react-router-dom"; // Import navigate hook for routing
import { useQuery } from "react-query"; // Import query hook for data fetching

const CustomerStories = ({ contentType = "case-study" }) => {
  const navigate = useNavigate(); // Initialize navigation hook
  const ITEMS_PER_PAGE = 9; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(0); // State for tracking current page

  // Function to determine the API endpoint based on the content type
  // const getEndpoint = () => {
  //   return contentType === "case-study"
  //     ? "case-studies/stories"
  //     : "white-papers/stories";
  // };
  const getEndpoint = () => {
    if (contentType === "case-study") {
      return "case-studies/stories";
    } else if (contentType === "blog") {
      return "blog/stories";
    } else {
      return "white-papers/stories";
    }
  };

  // Fetch data using react-query with pagination, error handling, and caching
  const { data, isLoading, error } = useQuery(
    [contentType, currentPage], // Query key includes contentType and currentPage for caching
    async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/${getEndpoint()}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) throw new Error(`Failed to fetch ${contentType}`); // Handle errors
      return response.json(); // Return data in JSON format
    },
    {
      keepPreviousData: true, // Keep previous data while fetching new data
    }
  );

  // Handler for the "Next" button, increments the page if not at the last page
  const handleNext = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (currentPage < (data?.pagination?.totalPages || 1) - 1) {
        const scrollPos = window.scrollY; // Save current scroll position

        setCurrentPage((prev) => {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: scrollPos, // Keep scroll position the same
              behavior: "instant", // Instant scroll behavior
            });
          });
          return prev + 1; // Increment current page
        });
      }
    },
    [currentPage, data?.pagination?.totalPages] // Dependencies for the callback
  );

  // Handler for the "Previous" button, decrements the page if not at the first page
  const handlePrevious = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (currentPage > 0) {
        const scrollPos = window.scrollY; // Save current scroll position

        setCurrentPage((prev) => {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: scrollPos, // Keep scroll position the same
              behavior: "instant", // Instant scroll behavior
            });
          });
          return prev - 1; // Decrement current page
        });
      }
    },
    [currentPage] // Dependency for the callback
  );

  // Display loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading content</div>;

  // Extract stories and pagination data from the fetched response
  const { stories = [], pagination = { totalPages: 1, currentPage: 0 } } = data || {};

  // Navigate to the individual story page based on the slug
  const handleCardClick = (slug) => {
    navigate(`/${contentType}/${slug}`);
  };

  // Function to determine card height based on content type
  const getCardHeight = () => {
    return contentType === "case-study" ? "h-80" : "h-[500px]"; // Conditional height for each content type
  };

  // Add hardcoded categories for "white-paper" content
  const processedStories = stories.map((story) => {
    if (contentType === "white-paper") {
      return {
        ...story,
        categories: ["WHITEPAPER", "BALIHANS"], // Default categories for white papers
      };
    }
    return story; // No changes for case studies
  });

  return (
    <div className="bg-[#101215] py-36 px-8 lg:px-20 xl:px-36 text-white">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-6">
         {contentType === "case-study" ? "CUSTOMER STORIES": contentType === "blog"? "BLOGS": "WHITEPAPERS"}
       </h2>

      {/* Horizontal line separator */}
      <div className="flex justify-end mt-6 mb-6">
        <hr className="w-full border-white/20" />
      </div>

      {/* Cards Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-24">
        {processedStories.map((item) => (
          <div
            key={item.slug} // Unique key for each item
            className="p-4 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => handleCardClick(item.slug)} // Navigate to the selected story on click
            role="link" // Accessibility role
            tabIndex={0} // Allow focus for keyboard navigation
          >
            <img
              src={item.backgroundImageUrl}
              alt={item.categories?.join(", ") || item.heading || "Story image"}
              className={`w-[300px] md:w-full ${getCardHeight()} object-cover mb-4`}
            />
            {/* Displaying Categories */}
            <h3 className="text-lg font-bold mt-8 flex flex-col md:flex-row">
              {item.categories?.[0] && <span>{item.categories[0]}</span>}
              {item.categories?.[1] && (
                <span className="font-bold ml-0 md:ml-6">{item.categories[1]}</span>
              )}
            </h3>
            {/* Displaying Heading */}
            <p
              className={`text-lg mt-2 max-w-80 md:max-w-2xl ${
                contentType === "white-paper" ? "line-clamp-3" : ""
              }`}
            >
              {item.heading}
            </p>
          </div>
        ))}
      </div>

      {/* Horizontal line separator */}
      <div className="flex justify-end mt-6 mb-6">
        <hr className="w-full border-white/20" />
      </div>

      {/* Pagination Controls */}
      {pagination && (
        <div className="flex justify-end mt-4 items-center gap-2 xs:gap-4">
          <div className="flex items-center gap-2 xs:gap-6">
            <button
              onClick={handlePrevious} // Previous page button click handler
              disabled={currentPage === 0} // Disable if at the first page
              className={`p-0 xs:p-1 rounded-full ${
                currentPage === 0 ? "bg-white" : "bg-gray-700 hover:bg-gray-600"
              }`}
              type="button"
            >
              <ArrowLeft className="text-black" size={28} />
            </button>
            <span className="text-base xs:text-xl">Previous</span>
          </div>
          <span className="text-3xl">|</span>
          <div className="flex items-center gap-2 xs:gap-6">
            <span className="text-base xs:text-xl">Next</span>
            <button
              onClick={handleNext} // Next page button click handler
              disabled={currentPage === pagination.totalPages - 1} // Disable if at the last page
              className={`p-0 xs:p-1 rounded-full ${
                currentPage === pagination.totalPages - 1
                  ? "bg-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              type="button"
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
