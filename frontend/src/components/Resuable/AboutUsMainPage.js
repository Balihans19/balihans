import React from 'react';
import { MoveRight } from 'lucide-react';

function AboutUsMainPage({
  headerText,
  description ,
  values ,
  backgroundImage ,
  missionTitle,
  missionText
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#191c20]">
      {/* Header Section */}
      <div className="relative text-white min-h-[55vh] flex items-center">
        {/* Diagonal Background with Overlay */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 11%, 0 100%)' }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative w-full">
          <div className="mx-36 text-center">
            <h1 className="text-3xl md:text-5xl mb-6">
              {headerText}
            </h1>
            <p className="text-lg md:text-2xl text-left">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="w-full text-white">
        <div className="container mx-32 px-4 py-12 md:py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-40">
            {/* Vision Section */}
            <div className="w-full md:w-2/3">
              {values.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between border-b-4 border-[#add9f2] py-4 text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <span className="text-2xl">{item.title}</span>
                  <MoveRight color='#add9f2' className="w-10 h-10 transform group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              ))}
            </div>

            {/* Mission Section */}
            <div className="w-full">
              <h2 className="text-3xl md:text-5xl mb-10">
                {missionTitle}
              </h2>
              <p className="text-lg md:text-2xl text-gray-200">
                {missionText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsMainPage;
