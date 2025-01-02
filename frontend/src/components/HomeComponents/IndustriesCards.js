import React from 'react';
import { Link } from 'react-router-dom';

// Predefined navigation links for industry routes
const links = [
  "/banking-and-financial-services",
  "/communications-and-information-services", 
  "/energy-resources-and-utilities",
  "/healthcare-and-life-sciences",
  "/high-tech",
  "/hospitality",
  "/insurance",
  "/manufacturing",
  "/media-and-entertainment",
  "/professional-services",
  "/retail-and-consumer-goods",
  "/travel-and-logistics"
];

/**
 * IndustriesCards Component
 * Renders a responsive grid of industry cards with hover effects and navigation links
 * 
 * @component
 *  props
 *  props.title - Section heading text
 *  props.description - Optional description text below heading
 *  props.industriesData - Array of industry objects
 *  props.titleWidth='lg:w-1/6' - Optional custom width class for title on large screens
 *  props.showDescription=true - Toggle description visibility
 * 
 */
const IndustriesCards = ({
  title,
  description,
  industriesData,
  titleWidth = 'lg:w-1/6',
  showDescription = true,
}) => {
  return (
    // Main section container with padding and text color
    <section className="text-white py-36">
      <div className="container mx-auto px-4">
        {/* Responsive header layout: vertical on mobile, horizontal on desktop */}
        <div className="flex flex-col lg:flex-row lg:items-center mb-12">
          <h2 className={`text-2xl md:text-3xl xl:text-4xl font-bold mb-4 lg:mb-0 ${titleWidth} w-full`}>
            {title}
          </h2>
          {showDescription && (
            <p className="text-xl font-normal lg:w-11/12 w-full lg:pl-12">
              {description}
            </p>
          )}
        </div>

        {/* Responsive grid layout: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {industriesData.map((industry, index) => (
            // Card wrapper with hover effects and navigation
            <Link
              to={links[index]}
              key={index}
              className="relative h-[300px] lg:h-[13vh] w-full lg:max-w-7xl overflow-hidden rounded-lg group"
            >
              {/* Overlay with hover effect: darker at rest, lighter on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-10 flex items-center justify-center transition-all duration-300 ease-in-out z-10">
                <h3 className="text-2xl xl:text-3xl text-center text-[#e3e5e6]">
                  {industry.name}
                </h3>
              </div>
              {/* Background image with blur effect on hover */}
              <img
                src={industry.image}
                alt={industry.name}
                className="w-full h-full object-cover group-hover:blur-sm transition-all duration-300 ease-in-out"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesCards;


