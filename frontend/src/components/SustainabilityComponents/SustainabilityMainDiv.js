import React from "react";

/**
 * A flexible component for displaying a sustainability section
 * with a background image, text content, and an optional image.
 *
 * props - Props for the SustainabilityMainDiv component.
 * props.backgroundImage - URL of the background image.
 * props.title - The main title of the section.
 * props.subtitle - A subtitle for the section.
 * props.description - The description text for the section.
 * props.imageSrc - URL of the image to display alongside the text.
 */
function SustainabilityMainDiv({
  backgroundImage,
  title,
  subtitle,
  description,
  imageSrc,
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#191c20]">
      {/* Header Section */}
      <div className="relative text-white min-h-[50vh] sm:min-h-[55vh] flex items-center">
        {/* Diagonal Background with Overlay */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 11%, 0 100%)" }}
        >
          {/* Dark Overlay to enhance contrast */}
          <div className={`absolute inset-0 bg-black/50 z-10`}></div>

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          ></div>
        </div>
      </div>

      {/* Content Section with Overlap */}
      <div className="relative text-white px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 -mt-36 sm:-mt-40 md:-mt-44 lg:-mt-48 z-20">
        <div className="max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[35%_65%] lg:grid-cols-[30%_70%] gap-8 md:gap-10 lg:gap-12">
          {/* Image Section */}
          <div className="relative z-30 flex justify-center md:justify-start">
            <img
              src={imageSrc}
              alt="Leadership"
              className="w-[20vh] h-[25vh] sm:w-[30vh] sm:h-[35vh] md:w-[35vh] md:h-[40vh] lg:w-[35vh] lg:h-[40vh] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col justify-center text-center md:text-left">
            {/* Section Title */}
            <h1 className="text-xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              {title}
            </h1>
            {/* Section Subtitle */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6">
              {subtitle}
            </h2>
            {/* Section Description */}
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SustainabilityMainDiv;



