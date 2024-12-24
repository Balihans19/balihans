import React, { useState, useRef } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const ContactUsVideoDiv = ({ bgVideo, mainTitle, subTitle, officeData }) => {
  // Local state to track which section is expanded or collapsed
  const [expandedSection, setExpandedSection] = useState(null);
  
  // Using a ref to store references for each expandable section's DOM element for smooth transitions
  const sectionRefs = useRef({});

  // Function to toggle the visibility of a section based on the section's title
  const toggleSection = (section) => {
    // Close the section if it's already open, otherwise open it
    if (expandedSection === section) {
      setExpandedSection(null); // Close the section
    } else {
      setExpandedSection(section); // Open the section
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Left Side: Background Video */}
      <div className="w-full md:w-[55%] flex items-center justify-center">
        {/* The video element plays the background video, it is muted and loops indefinitely */}
        <video src={bgVideo} autoPlay loop muted className="w-full h-full" />
      </div>

      {/* Right Side: Content */}
      <div className="w-full md:w-[45%] flex flex-col justify-center max-w-4xl px-8">
        {/* Main Title */}
        <h1 className="text-xl md:text-2xl max-w-xl font-bold mb-8">{mainTitle}</h1>

        {/* Subtitle and Office Data */}
        <div>
          <h2 className="text-xl md:text-2xl mb-4">{subTitle}</h2>

          {/* Mapping over the officeData to display each office */}
          <div className="space-y-6 max-w-sm lg:max-w-lg text-black">
            {officeData.map((office, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                {/* Button to toggle the visibility of the office's description */}
                <button
                  className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => toggleSection(office.title)}
                >
                  {/* Title of the office */}
                  <span className="text-lg sm:text-xl md:text-2xl font-bold">
                    {office.title}
                  </span>
                  
                  {/* Arrow icon to indicate expansion or collapse */}
                  <div className="rounded-full bg-black p-2">
                    {/* Conditionally render arrow up or down based on the expanded section */}
                    {expandedSection === office.title ? (
                      <ArrowUp className="w-6 h-6 text-white" />
                    ) : (
                      <ArrowDown className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>

                {/* Expandable content that displays the office description */}
                <div
                  ref={(el) => (sectionRefs.current[office.title] = el)} // Storing ref for each section
                  style={{
                    maxHeight: expandedSection === office.title
                      ? `${sectionRefs.current[office.title]?.scrollHeight}px` // Expanding the section
                      : "0", // Collapsing the section
                    transition: "max-height 0.5s ease", // Smooth transition for expanding/collapsing
                    overflow: "hidden", // Hide content when collapsed
                  }}
                >
                  <div className="p-6 bg-gray-100 mt-2 rounded-lg">
                    {/* Displaying the office description, with line breaks for multiple lines */}
                    {Array.isArray(office.description) ? (
                      office.description.map((line, i) => (
                        <React.Fragment key={i}>
                          <p className="text-base sm:text-lg">{line}</p>
                          {i < office.description.length - 1 && (
                            <hr className="my-4 border-black" />
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <p className="text-base sm:text-lg">{office.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsVideoDiv;


