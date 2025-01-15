import React from 'react';
import { MoveRight } from 'lucide-react';

// Reusable ServiceCard Component
const ServiceCard = ({ title, href }) => (
  <div
    className="group flex items-center justify-between border-b border-gray-200 py-4 hover:border-gray-400 transition-colors duration-300"
  >
    <a href={href} className="flex items-center justify-between w-full no-underline">
      <h3 className="text-2xl  text-gray-900">{title}</h3>
      <div className="flex items-center">
        <div className="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-gray-100 transition-colors duration-300">
          <MoveRight className="w-10 h-10 text-gray-600 transform group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
    </a>
  </div>
);

// Main Reusable BusinessServices Component
const BusinessServices = ({ title, description, heroImage, services }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black opacity-90"></div>
          <img
            src={heroImage}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center px-7 lg:px-20 xl:px-36 max-w-6xl">
          <h1 className="text-2xl md:text-3xl  lg:text-4xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl ">
            {description}
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-[#f8f9fa] py-16">
        <div className="max-w-full px-7 lg:px-20 xl:px-36">
          <h2 className="text-2xl md:text-4xl font-bold mb-12">Our services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessServices;