import React from 'react';

// Reusable GoalCard Component
const GoalCard = ({ title, subtitle }) => (
  <div className="bg-[#a4a4a4] backdrop-blur py-16 p-4 flex flex-col h-full">
    <div className="h-full flex flex-col justify-between">
      <p className="text-2xl">{title}</p>
      {subtitle && <p className="text-4xl text-gray-100">{subtitle}</p>}
    </div>
  </div>
);

// Main Reusable SustainabilityGoals Component
const SustainabilityGoals = ({ title, description, goals, backgroundImage }) => {
  return (
    <div className="min-h-screen text-white">
      {/* Header Section */}
      <div className="w-full px-4 md:px-8 py-12">
        <div className="max-w-full mx-28 mb-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <h1 className="text-3xl md:text-4xl font-bold whitespace-nowrap">{title}</h1>
          <p className="text-xl text-gray-300">{description}</p>
        </div>
      </div>

      {/* Goals Section with Background Image */}
      <div
        className="relative w-full p-4 md:p-8 min-h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/50"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-20">Our Sustainability Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((goal, index) => (
              <GoalCard key={index} title={goal.title} subtitle={goal.subtitle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityGoals;