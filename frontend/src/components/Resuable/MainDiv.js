import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation if using React Router

const MainDiv = ({
  headerTitle,
  headerDescription,
  backgroundImageUrl,
  knowMoreText = "Know More",
  videoData,
  isSlideshow = false,
  slideshowInterval = 5000, // Default 5 seconds between slides
  footerText,
  footerItalicWords = [],
  showLetsTalkButton,
  descriptionWidths = ['lg:max-w-xl', 'lg:max-w-xl', 'lg:max-w-xl', 'lg:max-w-xl'], // Custom widths for each slide
  defaultDescriptionWidth = 'lg:max-w-4xl', // Default width when slideshow is false
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate(); // Initialize the navigation function

  // Auto-sliding effect
  useEffect(() => {
    if (isSlideshow && Array.isArray(videoData) && videoData.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % videoData.length);
      }, slideshowInterval);

      return () => clearInterval(interval);
    }
  }, [isSlideshow, videoData, slideshowInterval]);

  if (!videoData || (Array.isArray(videoData) && !videoData.length)) {
    return null;
  }

  const videos = Array.isArray(videoData) ? videoData : [videoData];

  const renderTextWithItalics = (text, italicWords) => {
    if (!Array.isArray(italicWords) || !italicWords.length) return text;

    const words = text.split(' ');
    return words.map((word, index) => {
      const shouldItalicize = italicWords.some((italicWord) =>
        word.toLowerCase().includes(italicWord.toLowerCase())
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

          <div className="relative z-10 max-w-44 xs:max-w-xs md:max-w-6xl pl-6 lg:pl-20 xl:pl-36 pb-44 h-full flex flex-col justify-center">
            <h1 className="text-sm xs:text-lg sm:text-xl md:text-3xl xl:text-4xl mt-5 md:mt-0 font-bold text-[#FAF9F6] ">
              {headerTitle}
            </h1>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg xl:text-xl text-gray-100 max-w-sm sm:max-w-md lg:max-w-2xl tracking-tighter">
              {headerDescription}
            </p>
            {showLetsTalkButton && (
        <Link
          to="/contact-us"  // Use Link to navigate to the Contact Us page
          className="mt-6 flex items-center text-sm xs:text-base md:text-lg xl:text-xl text-white"
        >
          Let's Talk
          <div className="ml-4 xs:w-10 xs:h-10 w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 transition-colors">
            <ArrowRight size={32} className="text-black" />
          </div>
        </Link>
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
            <div className="absolute right-12 md:right-0 lg:right-12 xl:right-16 bottom-16 w-[10vh] sm:w-[40vh] md:w-[50vh] flex flex-col items-start justify-start text-white">
              <div className="flex flex-col items-start p-2 rounded mb-4">
                <h1 className="text-md sm:text-xl md:text-3xl xl:text-4xl font-bold transition-all duration-500">
                  {videos[currentSlide].heading}
                </h1>
                <p
                  className={`text-sm md:text-base lg:text-xl mb-6 tracking-tighter ${
                    isSlideshow
                      ? descriptionWidths[currentSlide] || 'lg:max-w-4xl'
                      : defaultDescriptionWidth
                  }`}
                >
                  {videos[currentSlide].description}
                </p>
                <button
                  className="bg-transparent border border-white text-xs sm:text-sm lg:text-base font-semibold py-3 px-6 lg:py-4 lg:px-8 cursor-pointer hover:bg-[#2c2c2c] hover:text-white transition-colors"
                  onClick={() =>
                    navigate(videos[currentSlide].linkUrl || '/')
                  } // Navigate to the URL
                >
                  {knowMoreText}
                </button>
              </div>
            </div>
          </div>

          {/* Slideshow Bullets */}
          {isSlideshow && videos.length > 1 && (
            <div className="absolute inset-x-0 bottom-5 flex justify-end mr-8 sm:mr-16 md:mr-16 lg:mr-20 xl:mr-36 space-x-2 z-10">
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
          <div className="max-w-full px-4 md:px-7 lg:px-20 xl:px-36  text-left">
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





