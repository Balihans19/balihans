import React from "react";

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
      <div className="relative text-white min-h-[55vh] flex items-center">
        {/* Diagonal Background with Overlay */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 11%, 0 100%)" }}
        >
          {/* Dark Overlay */}
          <div className={`absolute inset-0 bg-black/50 z-10`}></div>

          {/* Background Pattern */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
            }}
          ></div>
        </div>
      </div>

      {/* Content Section with Overlap */}
      <div className="relative text-white px-4 sm:px-6 lg:px-8 -mt-48 z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[30%_80%] gap-12">
          <div className="relative z-30">
            <img
              src={imageSrc}
              alt="Leadership"
              className="w-[35vh] h-[40vh] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl mb-10">{title}</h1>
            <h2 className="text-4xl mb-6">{subtitle}</h2>
            <p className="text-lg leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SustainabilityMainDiv;
