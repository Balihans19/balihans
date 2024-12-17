
import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ExpandableMenu = ({ title, videoUrl, sections }) => {
  const [expandedSections, setExpandedSections] = useState([]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prevSections => {
      if (prevSections.includes(sectionId)) {
        return prevSections.filter(id => id !== sectionId);
      } else {
        return [...prevSections, sectionId];
      }
    });
  };

  const renderContent = (content) => {
    const { description, bulletPoints } = content;
    
    return (
      <div className="space-y-4">
        {/* Description part */}
        <p className="text-sm md:text-lg lg:text-xl">{description}</p>
        
        {/* Bullet points */}
        <ul className="space-y-3">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="mt-2 block w-2 h-2 rounded-full bg-black flex-shrink-0"></span>
              <span className="text-sm md:text-lg lg:text-xl">{point.trim()}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto my-24">
      {/* Background video container */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay with title */}
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="bg-black bg-opacity-50 p-9 w-full sm:w-[75vh] text-center mb-10">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Expandable sections */}
      <div className="p-4 space-y-6 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
        {sections.map((section) => (
          <div key={section.id} className="rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">{section.title}</span>
              <div className="rounded-full bg-black p-2">
                {expandedSections.includes(section.id) ? (
                  <ArrowUp className="w-6 h-6 text-white" />
                ) : (
                  <ArrowDown className="w-6 h-6 text-white" />
                )}
              </div>
            </button>
            {expandedSections.includes(section.id) && (
              <div className="p-6 bg-gray-100 mt-2 rounded-lg ">
                {renderContent(section.content)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandableMenu;
