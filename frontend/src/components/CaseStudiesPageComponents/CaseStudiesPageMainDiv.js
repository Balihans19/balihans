import React from "react";

const CaseStudiesPagMainDiv = ({
  backgroundVideo, // URL of the background video
  categories = [], // Array of categories to display as labels
  title, // Title of the case study page
  description, // Description or main content of the case study page
}) => {
  return (
    <div className="relative min-h-[850px] text-white w-full mt-16 lg:mt-0">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover bg-fixed"
        autoPlay // Automatically play the video
        loop // Loop the video playback
        muted // Mute the video to avoid audio distractions
        playsInline // Ensure compatibility on mobile devices
        style={{ position: 'fixed', top: '0', left: '0', zIndex: '-1' }} // Fix video position behind content
      >
        <source src={backgroundVideo} type="video/mp4" /> {/* Video source */}
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black via-black/60 to-transparent"></div>
      {/* Adds a gradient overlay for better readability of content over the video */}

      {/* Content Container */}
      <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Header Categories */}
        <div className="flex justify-end">
          <div className="max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl w-full">
            <div className="flex gap-12 text-left font-bold text-base sm:text-lg lg:text-xl">
              {categories.map((category, index) => (
                <div key={index}>{category}</div> // Render each category
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-end mt-6 mb-6">
          <hr className="w-full border-white/20" /> {/* Decorative horizontal line */}
        </div>

        {/* Main Content */}
        <div className="flex justify-end">
          <div className="text-left max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl w-full">
            <h1 className="text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl font-bold mb-4">
              {title} {/* Display the title */}
            </h1>
            <p className="text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 text-justify">
              {description} {/* Display the description/content */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPagMainDiv;



