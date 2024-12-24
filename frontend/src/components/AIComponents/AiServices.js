
import React from 'react';
import { MoveRight } from 'lucide-react'; // Icon component for indicating navigation

// Array of services, each with a title and a corresponding href link
const services = [
  { title: 'Banking & Financial Services', href: '/bsfi' },
  { title: 'Communications & Information Services', href: '/communications' },
  { title: 'Energy, Resources & Utilities', href: '/energy' },
  { title: 'Healthcare & Life Sciences', href: '/health-care' },
  { title: 'High-Tech', href: '/high-tech' },
  { title: 'Hospitality', href: '/hospitality' },
  { title: 'Insurance', href: '/insurance' },
  { title: 'Manufacturing', href: '/manufacturing' },
  { title: 'Media & Entertainment', href: '/media' },
  { title: 'Professional Services', href: '/professional' },
  { title: 'Retail & Consumer Goods', href: '/retail' },
  { title: 'Travel & Logistics', href: '/travel' },
];

// Functional component to render the AI Services section
const AiServices = ({ 
  title, // Title for the section
  backgroundImage, // URL of the background image
  backgroundVideo, // URL of the background video
  backgroundType, // Type of background, can be "image" or "video"
}) => {
  return (
    <section className="relative w-full h-screen">
      {/* Conditional rendering of the background */}
      {backgroundType === "image" && backgroundImage && (
        <img
          src={backgroundImage} // Source of the background image
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover" // Ensures the image covers the entire section
        />
      )}

      {backgroundType === "video" && backgroundVideo && (
        <video
          src={backgroundVideo} // Source of the background video
          autoPlay // Automatically plays the video
          loop // Loops the video playback
          muted // Mutes the video
          className="absolute inset-0 w-full h-full object-cover" // Ensures the video covers the entire section
        />
      )}

      {/* Semi-transparent dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main content container */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        {/* Bottom section with a black background */}
        <div className="w-full h-[60%] 2xl:h-[50%] bg-black/80 py-6">
          <div className="container mx-auto xl:px-3">
            {/* Section title */}
            <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-5">
              {title}
            </h2>

            {/* Grid container for service links */}
            <div className="grid grid-cols-2 gap-x-5 sm:gap-x-20">
              {services.map((service, index) => {
                // Determine column placement (left or right)
                const isLeftColumn = index % 2 === 0; 
                const columnClass = isLeftColumn ? "pr-8" : "pl-8"; // Adjust padding based on column

                return (
                  <a
                    key={index} // Unique key for each service item
                    href={service.href} // Link for the service
                    className={`group border-b border-white/30 py-4 flex items-center justify-between hover:border-white transition-all duration-300 ${columnClass}`}
                  >
                    {/* Service title */}
                    <span className="text-xs sm:text-xs md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl text-white font-light tracking-wide">
                      {service.title}
                    </span>
                    {/* Animated arrow icon */}
                    <MoveRight
                      className="w-8 h-8 text-white transform group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiServices;

