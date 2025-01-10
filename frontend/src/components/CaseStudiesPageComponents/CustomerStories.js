

import React, { useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';


/**
 * CustomerStories Component
 * 
 * A paginated grid display of customer case studies/success stories.
 * Features responsive design, pagination controls, and navigation to individual story pages.
 */


const CustomerStories = () => {
  // Navigation hook for routing to individual story pages
  const navigate = useNavigate();
  
  // Pagination configuration
  const ITEMS_PER_PAGE = 9;  // Number of stories displayed per page
  const [currentPage, setCurrentPage] = useState(0);

  /**
   * Fetch customer stories data using react-query
   * Maintains previous data while loading new data to prevent UI flicker
   * 
   * Response shape expected:
   * {
   *   stories: Array<{
   *     slug: string,
   *     backgroundImageUrl: string,
   *     categories: string[],
   *     heading: string
   *   }>,
   *   pagination: {
   *     totalPages: number,
   *     currentPage: number
   *   }
   * }
   */
  const { data, isLoading, error } = useQuery(
    ['customerStories', currentPage],
    async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/case-studies/stories?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) throw new Error('Failed to fetch stories');
      return response.json();
    },
    {
      keepPreviousData: true
    }
  );

  /**
   * Handles navigation to next page
   * Preserves scroll position during page transition to prevent jarring UX
   *  e - Click event
   */
  const handleNext = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (currentPage < (data?.pagination?.totalPages || 1) - 1) {
      const scrollPos = window.scrollY;
      
      setCurrentPage(prev => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollPos,
            behavior: 'instant'
          });
        });
        return prev + 1;
      });
    }
  }, [currentPage, data?.pagination?.totalPages]);

  /**
   * Handles navigation to previous page
   * Preserves scroll position during page transition to prevent jarring UX
   *  e - Click event
   */
  const handlePrevious = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (currentPage > 0) {
      const scrollPos = window.scrollY;
      
      setCurrentPage(prev => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: scrollPos,
            behavior: 'instant'
          });
        });
        return prev - 1;
      });
    }
  }, [currentPage]);

  // Loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading stories</div>;

  // Destructure data with defaults to prevent errors if data is undefined
  const { stories = [], pagination = { totalPages: 1, currentPage: 0 } } = data || {};

  /**
   * Navigate to individual story page
   *  slug - URL slug for the story
   */
  const handleCardClick = (slug) => {
    navigate(`/case-study/${slug}`);
  };

  return (
    <div className="bg-[#101215] py-36 px-8 lg:px-20 xl:px-36 text-white">
      {/* Page header */}
      <h2 className="text-2xl font-semibold mb-6">CUSTOMER STORIES</h2>
      <div className="flex justify-end mt-6 mb-6">
        <hr className="w-full border-white/20" />
      </div>

      {/* Responsive grid of story cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-24">
        {stories.map((story) => (
          <div 
            key={story.slug}
            className="p-4 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => handleCardClick(story.slug)}
            role="link"
            tabIndex={0}
          >
            {/* Story card content */}
            <img
              src={story.backgroundImageUrl}
              alt={story.categories.join(", ")}
              className="w-[300px] md:w-full h-80 object-cover mb-4"
            />
            <h3 className="text-lg font-bold mt-8 flex flex-col md:flex-row">
              <span>{story.categories[0]}</span>
              {/* Optional second category */}
              {story.categories[1] && (
                <span className="font-bold ml-0 md:ml-6">{story.categories[1]}</span>
              )}
            </h3>
            <p className="text-lg mt-2 max-w-80 md:max-w-2xl">{story.heading}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6 mb-6">
        <hr className="w-full border-white/20" />
      </div>

      {/* Pagination controls */}
      {pagination && (
        <div className="flex justify-end mt-4 items-center gap-2 xs:gap-4">
          {/* Previous page controls */}
          <div className="flex items-center gap-2 xs:gap-6">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 0}
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
          {/* Next page controls */}
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

