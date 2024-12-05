

import { useState } from 'react';

const ContentSwitcher = ({ 
  slides, 
  title,
  showButton,
  
}) => {
  const [activeSlide, setActiveSlide] = useState(slides[0]?.title || '');
  const activeContent = slides.find(slide => slide.title === activeSlide);

  if (!slides.length) return null;

  return (
    <div className={'min-h-screen bg-[#f8f9fa] py-36'}>
      <div className="max-w-max mx-24 pl-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-16">{title}</h1>

        {/* Navigation */}
        <div className="flex flex-wrap gap-[22vh] mb-12 border-b border-gray-700 pb-4">
          {slides.map((slide) => (
            <button
              key={slide.title}
              onClick={() => setActiveSlide(slide.title)}
              className={`text-lg md:text-2xl font-bold transition-colors duration-300 pb-2 ${
                activeSlide === slide.title 
                  ? 'text-black' 
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              {slide.title}
            </button>
          ))}
        </div>

        {/* Content Section */}
        {activeContent && (
          <div className="grid md:grid-cols-[40%_60%] gap-4 items-center">
            <div className="order-2 md:order-1">
              <p className="text-lg md:text-xl leading-relaxed mb-6 w-[60vh] max-w-full">
                {activeContent.description}
              </p>
              {showButton  && (
                <button className="border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300">
                  Read More
                </button>
              )}
            </div>

            <div className="order-1 md:order-2">
              <div className="relative overflow-hidden rounded-lg w-full max-w-full aspect-[6/3]">
                <img
                  src={activeContent.image}
                  alt={`Illustrating ${activeContent.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSwitcher;
