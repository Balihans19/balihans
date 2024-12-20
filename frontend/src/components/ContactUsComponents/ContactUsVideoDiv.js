import React, { useState, useRef } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const ContactUsVideoDiv = ({ bgVideo, mainTitle, subTitle, officeData }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const sectionRefs = useRef({});

  const toggleSection = (section) => {
    // Toggle only the clicked section without affecting others
    if (expandedSection === section) {
      setExpandedSection(null); // Close it if it's already open
    } else {
      setExpandedSection(section); // Open it if it's not open
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Left Side: Video */}
      <div className="w-full md:w-[55%] flex items-center justify-center">
        <video src={bgVideo} autoPlay loop muted className="w-full h-full" />
      </div>

      {/* Right Side: Content */}
      <div className="w-full md:w-[45%] flex flex-col justify-center max-w-4xl px-8">
        {/* Main Title */}
        <h1 className="text-xl md:text-2xl max-w-xl font-bold mb-8">{mainTitle}</h1>

        {/* Subtitle and Office Data */}
        <div>
          <h2 className="text-xl md:text-2xl mb-4">{subTitle}</h2>

          <div className="space-y-6 max-w-sm lg:max-w-lg text-black">
            {officeData.map((office, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                {/* Button to toggle section */}
                <button
                  className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => toggleSection(office.title)}
                >
                  <span className="text-lg sm:text-xl md:text-2xl font-bold">
                    {office.title}
                  </span>
                  <div className="rounded-full bg-black p-2">
                    {expandedSection === office.title ? (
                      <ArrowUp className="w-6 h-6 text-white" />
                    ) : (
                      <ArrowDown className="w-6 h-6 text-white" />
                    )}
                  </div>
                </button>

                {/* Expandable content */}
                <div
                  ref={(el) => (sectionRefs.current[office.title] = el)}
                  style={{
                    maxHeight: expandedSection === office.title
                      ? `${sectionRefs.current[office.title]?.scrollHeight}px`
                      : "0",
                    transition: "max-height 0.5s ease",
                    overflow: "hidden",
                  }}
                >
                  <div className="p-6 bg-gray-100 mt-2 rounded-lg">
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
