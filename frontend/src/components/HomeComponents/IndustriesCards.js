
import React from 'react';

const IndustriesCards = ({
  title,
  description,
  industriesData,
  titleWidth = 'lg:w-1/6', // Default title width
  showDescription = true // Control description visibility
}) => {
  return (
    <section className="text-white py-36">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 lg:mb-0 ${titleWidth} w-full`}>
            {title}
          </h2>
          {showDescription && (
            <p className="text-xl font-normal lg:w-11/12 w-full lg:pl-12">
              {description}
            </p>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {industriesData.map((industry, index) => (
            <div
              key={index}
              className="relative h-[300px] lg:h-[13vh] w-full lg:max-w-7xl overflow-hidden rounded-lg group"
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-10 flex items-center justify-center transition-all duration-300 ease-in-out z-10">
                <h3 className="text-3xl text-center text-[#e3e5e6]">
                  {industry.name}
                </h3>
              </div>
              <img
                src={industry.image}
                alt={industry.name}
                className="w-full h-full object-cover group-hover:blur-sm transition-all duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesCards;
