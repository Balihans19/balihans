import React, { useState, useEffect } from 'react';
import {ArrowRight } from 'lucide-react';

const MainDiv = ({
  headerTitle,
  headerDescription,
  backgroundImageUrl,
  knowMoreText = "Know More",
  videoData,
  isSlideshow = false,
  slideshowInterval = 5000, // Default 5 seconds between slides
  // Footer props
  footerText,
  footerItalicWords = [], // Default value for italic words
  showLetsTalkButton
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-sliding effect
  useEffect(() => {
    // Only run auto-sliding if slideshow is enabled and multiple videos exist
    if (isSlideshow && Array.isArray(videoData) && videoData.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % videoData.length);
      }, slideshowInterval);

      // Cleanup interval on component unmount or when dependencies change
      return () => clearInterval(interval);
    }
  }, [isSlideshow, videoData, slideshowInterval]);

  // Early return if no video data
  if (!videoData || (Array.isArray(videoData) && !videoData.length)) {
    return null;
  }

  // Normalize video data to always be an array
  const videos = Array.isArray(videoData) ? videoData : [videoData];

  // Function to render text with italic words
  const renderTextWithItalics = (text, italicWords) => {
    if (!Array.isArray(italicWords) || !italicWords.length) return text;

    const words = text.split(' ');
    return words.map((word, index) => {
      const shouldItalicize = italicWords.some(
        italicWord => word.toLowerCase().includes(italicWord.toLowerCase())
      );

      return (
        <React.Fragment key={index}>
          {shouldItalicize ? <span className="italic">{word}</span> : word}
          {index < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="flex flex-col">
      <div className="pt-20 lg:pt-0">
        {/* Header Section */}
        <div
          className="relative h-[55vh]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 11%, 0 100%)' }}
        >
          {backgroundImageUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-50"
              style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
            />
          )}

          <div className="relative z-10 max-w-6xl pl-6 lg:pl-20 xl:pl-36 pb-44 h-full flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl xl:text-4xl text-[#FAF9F6] mb-4">
              {headerTitle}
            </h1>
            <p className="text-base md:text-lg xl:text-xl text-gray-100 max-w-lg lg:max-w-2xl">
              {headerDescription}
            </p>
            {showLetsTalkButton && (
              <button className="mt-4 flex items-center text-base md:text-lg xl:text-xl text-white">
                     Let's Talk
                 <div 
                   className="ml-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 transition-colors"
                    >
                   <ArrowRight size={32} className="text-gray-500" />
               </div>
            </button>
            )}
          </div>
        </div>

        {/* Video Section */}
        <div
          className="relative h-[70vh] -mt-[52vh]"
          style={{ clipPath: 'polygon(0 100%, 100% 5%, 100% 100%, 0 100%)' }}
        >
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
            <video
              key={videos[currentSlide].videoUrl}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            >
              <source src={videos[currentSlide].videoUrl} type="video/mp4" />
            </video>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 flex h-full">
            <div className="absolute right-6 lg:right-12 xl:right-36 bottom-16 w-[50vh] flex flex-col items-end justify-center text-white">
              <div className="flex flex-col items-start p-2 rounded mb-4">
                <h1 className="text-3xl xl:text-4xl mb-4 transition-all duration-500">
                  {videos[currentSlide].heading}
                </h1>
                <p className="text-sm md:text-base lg:text-xl mb-4 max-w-sm">
                  {videos[currentSlide].description}
                </p>
                <button className="bg-transparent border border-white text-sm lg:text-base font-semibold py-3 px-6 lg:py-4 lg:px-8 cursor-pointer hover:bg-[#2c2c2c] hover:text-white transition-colors">
                  {knowMoreText}
                </button>
              </div>
            </div>
          </div>

          {/* Slideshow Bullets */}
          {isSlideshow && videos.length > 1 && (
            <div className="absolute inset-x-0 bottom-5 flex justify-end mr-6 lg:mr-10 xl:mr-36 space-x-2 z-10">
              {videos.map((_, index) => (
                <span
                  key={index}
                  className={`w-6 lg:w-8 h-6 lg:h-8 bg-[#d9d9d9] rounded-full cursor-pointer transition-colors duration-300 ${
                    currentSlide === index
                      ? 'bg-opacity-100'
                      : 'bg-opacity-50 hover:bg-opacity-70'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="bg-[#f8f9fa] text-black py-12">
          <div className="max-w-full px-4 md:px-8 lg:px-12 xl:mx-24 text-left">
            <p className="text-xl md:text-2xl lg:text-2xl">
              {renderTextWithItalics(footerText, footerItalicWords)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDiv;
