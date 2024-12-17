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
    <div className={'min-h-screen bg-[#f8f9fa] py-12 md:py-36'}>
      <div className="max-w-full  px-8 lg:px-28 xl:px-36">
        <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-8 md:mb-16">{title}</h1>
        
        {/* Compact Single-Line Navigation */}
        <div className="relative mb-8 md:mb-12 w-full">
  <div
    className="flex justify-between items-center pb-4 border-b border-gray-700 whitespace-nowrap 
                overflow-x-auto scrollbar-hide"
  >
    {slides.map((slide, index) => (
      <button
        key={slide.title}
        onClick={() => setActiveSlide(slide.title)}
        className={`
          ${index === 0 ? 'ml-0' : 'ml-4'}
          ${index === slides.length - 1 ? 'mr-0' : 'mr-4'}
          text-sm md:text-lg lg:text-xl xl:text-2xl
          font-bold transition-colors duration-300 
          pb-2 flex-shrink-0 
          ${activeSlide === slide.title
            ? 'text-black'
            : 'text-gray-400 hover:text-black'
          }
        `}
      >
        {slide.title}
      </button>
    ))}
  </div>
</div>


        {/* Content Section */}
        {activeContent && (
          <div className="grid md:grid-cols-[40%_60%] gap-4 items-center">
            <div className="order-2 md:order-1">
              <p className="text-base md:text-xl leading-relaxed mb-6 w-full md:w-[60vh] max-w-full">
                {activeContent.description}
              </p>
              {showButton && (
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
