import React, { useState, useRef } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * ExpandableMenu Component
 * A responsive menu component featuring a video background header and expandable sections.
 * 
 * 
 *  props
 *  props.title - The main title displayed over the video background
 *  props.videoUrl - URL for the background video
 *  props.sections - Array of section objects to be displayed
 * 
 *  Section
 *  id - Unique identifier for the section
 *  title - Section title
 *  content - Section content object
 * 
 *  Content
 *  description - Main description text
 *  bulletPoints - Array of bullet points
 */
const ExpandableMenu = ({ title, videoUrl, sections }) => {
  // Track which sections are currently expanded
  const [expandedSections, setExpandedSections] = useState([]);
  
  // Store refs for each section to handle smooth animations
  const sectionRefs = useRef({});

  /**
   * Toggles the expansion state of a section
   * If section is expanded, it will collapse and vice versa
   * 
   *  sectionId - ID of the section to toggle
   */
  const toggleSection = (sectionId) => {
    setExpandedSections((prevSections) => {
      if (prevSections.includes(sectionId)) {
        return prevSections.filter((id) => id !== sectionId);
      } else {
        return [...prevSections, sectionId];
      }
    });
  };

  /**
   * Renders the content for a section including description and bullet points
   * 
   * content - Content object containing description and bullet points
   * Rendered content
   */
  const renderContent = (content) => {
    const { description, bulletPoints } = content;

    return (
      <div className="space-y-4">
        {/* Description section */}
        <p className="text-sm md:text-lg lg:text-xl">{description}</p>

        {/* Bullet points list */}
        <ul className="space-y-3">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start space-x-2">
              {/* Bullet point dot */}
              <span className="mt-2 block w-2 h-2 rounded-full bg-black flex-shrink-0"></span>
              {/* Bullet point text */}
              <span className="text-sm md:text-lg lg:text-xl">{point.trim()}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto my-24">
      {/* Video Background Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        {/* Autoplaying background video */}
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

        {/* Semi-transparent overlay with title */}
        <div className="absolute inset-0 flex items-end justify-center">
          <div className="bg-black bg-opacity-50 p-9 w-full sm:w-[75vh] text-center mb-10">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white">
              {title}
            </h1>
          </div>
        </div>
      </div>

      {/* Expandable Sections Container */}
      <div className="p-4 space-y-6 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
        {sections.map((section) => (
          <div key={section.id} className="rounded-lg overflow-hidden">
            {/* Section Toggle Button */}
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <span className="text-lg sm:text-xl md:text-2xl font-bold">{section.title}</span>
              {/* Toggle Icon */}
              <div className="rounded-full bg-black p-2">
                {expandedSections.includes(section.id) ? (
                  <ArrowUp className="w-6 h-6 text-white" />
                ) : (
                  <ArrowDown className="w-6 h-6 text-white" />
                )}
              </div>
            </button>

            {/* Expandable Content Container */}
            <div
              ref={(el) => (sectionRefs.current[section.id] = el)}
              style={{
                // Dynamic height calculation for smooth animation
                maxHeight: expandedSections.includes(section.id)
                  ? `${sectionRefs.current[section.id]?.scrollHeight}px`
                  : '0',
                transition: 'max-height 0.5s ease',
                overflow: 'hidden',
              }}
            >
              {/* Section Content */}
              <div className="p-6 bg-gray-100 mt-2 rounded-lg">
                {renderContent(section.content)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpandableMenu;



