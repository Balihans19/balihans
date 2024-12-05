import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Linkedin } from 'lucide-react';

const LeaderShipRole = ({leadershipData}) => {
 

  const [activeType, setActiveType] = useState('executive');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentData = leadershipData[activeType];
  const currentProfile = currentData[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex(prev => 
      prev === 0 ? currentData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prev => 
      prev === currentData.length - 1 ? 0 : prev + 1
    );
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen  py-16">
      {/* Header Section */}
      <div className="max-w-full mx-40">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <button
            onClick={() => handleTypeChange('executive')}
            className={`text-3xl md:text-4xl font-bold pl-20  transition-colors duration-300
              ${activeType === 'executive' ? 'text-white' : 'text-gray-500'}`}
          >
            Executive leadership
          </button>
          <button
            onClick={() => handleTypeChange('nonExecutive')}
            className={`text-3xl md:text-4xl font-bold pr-20 transition-colors duration-300
              ${activeType === 'nonExecutive' ? 'text-white' : 'text-gray-500'}`}
          >
            Non-executive leadership
          </button>
        </div>
        <div className="h-px  bg-gray-700 mt-8 mb-16"></div>

        {/* Content Section */}
        <div className="relative px-12">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 
              shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <ArrowLeft size={30}  />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 
              shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <ArrowRight size={30}  />
          </button>

          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-16">
            {/* Profile Image */}
            <div className="w-full h-[500px]">
              <img
                src={currentProfile.image}
                alt={`${currentProfile.name} Profile`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-2 border border-gray-600 rounded">
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-white mb-2">
                    {currentProfile.name}
                  </h3>
                  <p className="text-2xl text-gray-400">
                    {currentProfile.role}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-xl text-gray-300 leading-relaxed">
                  {currentProfile.description}
                </p>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {currentProfile.description2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderShipRole;