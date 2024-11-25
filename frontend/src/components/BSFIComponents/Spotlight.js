import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Spotlight = ({ spotlightItems }) => {
  const [startIndex, setStartIndex] = useState(0);

  const showNextSlide = () => {
    setStartIndex((prev) => (prev + 3 >= spotlightItems.length ? 0 : prev + 1));
  };

  const showPrevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? spotlightItems.length - 3 : prev - 1));
  };

  const visibleItems = [
    spotlightItems[startIndex],
    spotlightItems[(startIndex + 1) % spotlightItems.length],
    spotlightItems[(startIndex + 2) % spotlightItems.length],
  ];

  return (
    <div className="relative text-white py-12 px-4 mx-12 my-12">
      <h2 className="text-center text-4xl mb-16">Spotlight</h2>

      <div className="flex justify-between items-center">
        <button
          onClick={showPrevSlide}
          className="w-12 h-12 flex items-center justify-center bg-gray-200   rounded-full shadow z-10"
        >
          <ArrowLeft size={40} color='black' />
        </button>

        <div className="grid grid-cols-3 gap-36 mx-auto">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col text-left w-[35vh] h-[50vh] transform transition-all duration-500 ease-in-out"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-4/5 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={showNextSlide}
          className=" w-12 h-12 flex items-center justify-center bg-gray-200   rounded-full shadow z-10"
        >
          <ArrowRight size={40} color='black' />
        </button>
      </div>
    </div>
  );
};

export default Spotlight;
