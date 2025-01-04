import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoveRight } from "lucide-react"; 



const JobCard = ({ job }) => {

  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 h-full flex flex-col justify-between border border-gray-300">
    <div className="flex flex-col">
      <div className="flex items-start text-black font-bold space-x-4 text-base">
        <p className="min-w-[80px] line-clamp-1">{job.category}</p>
        <p className="line-clamp-1">{job.subCategory}</p>
      </div>
      
      <hr className="my-2 " />
      
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-[#39639b] line-clamp-2 min-h-[56px]">
          {job.title}
        </h3>
        
        <div className="space-y-1">
          <p className="text-lg text-black font-bold line-clamp-1">
            {job.experience}
          </p>
          <p className="text-lg text-black font-bold line-clamp-1">
            {job.location}
          </p>
          <p className="text-lg text-black font-bold line-clamp-1">
            {job.type}
          </p>
        </div>
      </div>
    </div>

    <button
        onClick={() => navigate('/submit-resume')} 
        className="mt-4 text-[#39639b] hover:text-blue-800 font-bold text-lg flex items-center"
      >
        Apply <span className="ml-4"><MoveRight size={40} color="#39639b" />  </span>
      </button>
  </div>
  );
};

const JobGrid = ({jobOpenings=[]}) => {
  return (
    <div className=" py-36 px-4">
      <div className="max-w-full mx-4 lg:mx-16 xl:mx-32">
        <h2 className="text-4xl font-bold text-white text-left ">Explore Openings</h2>
        <hr className="w-full mt-6 mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 bg-white">
          {jobOpenings.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobGrid;



