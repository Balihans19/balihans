import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveRight } from "lucide-react"; // Icon for the "Apply" button

// JobCard Component
// Represents a single job opening card with job details and an "Apply" button.
const JobCard = ({ job }) => {
  const navigate = useNavigate(); // Hook to navigate between routes

  return (
    <div className="bg-white p-6 h-full flex flex-col justify-between border border-gray-300">
      {/* Job Details Section */}
      <div className="flex flex-col">
        {/* Job Category and Subcategory */}
        <div className="flex items-start text-black font-bold space-x-4 text-base">
          <p className="min-w-[80px] line-clamp-1">{job.category}</p> {/* Displays the job category */}
          <p className="line-clamp-1">{job.subCategory}</p> {/* Displays the job subcategory */}
        </div>
        
        <hr className="my-2" /> {/* Divider line */}
        
        {/* Job Title and Attributes */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#39639b] line-clamp-2 min-h-[56px]">
            {job.title} {/* Displays the job title */}
          </h3>
          
          {/* Job Details such as experience, location, and type */}
          <div className="space-y-1">
            <p className="text-lg text-black font-bold line-clamp-1">{job.experience}</p> {/* Experience required */}
            <p className="text-lg text-black font-bold line-clamp-1">{job.location}</p> {/* Job location */}
            <p className="text-lg text-black font-bold line-clamp-1">{job.type}</p> {/* Job type (e.g., full-time) */}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => navigate('/submit-resume')} // Navigate to the "Submit Resume" page
        className="mt-4 text-[#39639b] hover:text-blue-800 font-bold text-lg flex items-center"
      >
        Apply <span className="ml-4"><MoveRight size={40} color="#39639b" /></span> {/* Icon */}
      </button>
    </div>
  );
};

// JobGrid Component
// Displays a grid of job openings using the JobCard component.
const JobGrid = ({ jobOpenings = [] }) => {
  return (
    <div className="py-36 px-4">
      <div className="max-w-full mx-4 lg:mx-16 xl:mx-32">
        {/* Header Section */}
        <h2 className="text-4xl font-bold text-white text-left">Explore Openings</h2>
        <hr className="w-full mt-6 mb-12" /> {/* Decorative divider */}
        
        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 bg-white">
          {jobOpenings.map((job, index) => (
            <JobCard key={index} job={job} /> // Render each job using JobCard
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobGrid;
