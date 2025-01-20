import React, { useState, useEffect, useCallback } from 'react'; 
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WhitePaperSlides = ({ spotlightItems = [], title = "Spotlight" }) => {
  const [current, setCurrent] = useState(0); // Current slide index
  const [isMobile, setIsMobile] = useState(false);
  const [slides, setSlides] = useState([]); // Fetched slides
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch slides from the API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/whitepaperslidespage/random`);
        setSlides(response.data); // Update slides state with fetched data
      } catch (error) {
        console.error('Error fetching slides:', error);
        setError('Failed to load slides.'); // Update error state
      }
    };
    fetchSlides();
  }, []);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const prev = useCallback(() => {
    setCurrent((curr) => {
      const slidesPerView = isMobile ? 2 : 3;
      return curr === 0 ? slides.length - slidesPerView : curr - 1;
    });
  }, [slides.length, isMobile]);

  const next = useCallback(() => {
    setCurrent((curr) => {
      const slidesPerView = isMobile ? 2 : 3;
      return curr === slides.length - slidesPerView ? 0 : curr + 1;
    });
  }, [slides.length, isMobile]);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(next, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, next]);

  const handleSlideClick = (slide) => {
    if (slide.link) {
      navigate(slide.link);
    }
  };

  const displayedSlides = slides.length > 0 ? slides : spotlightItems;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full bg-[#f8f9fa]">
      <div className="max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 py-36">
        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 mb-24">{title}</h1>
        <div className="relative">
          <div className="overflow-hidden relative">
            <div
              className="flex transition-transform ease-out duration-1000"
              style={{ transform: `translateX(-${current * (isMobile ? 50 : 33.33)}%)` }}
            >
              {displayedSlides.map((item, index) => (
                <div key={index} className={`${isMobile ? 'w-1/2' : 'w-1/3'} flex-shrink-0 px-4 md:px-10` }  onClick={() => handleSlideClick(item)}>
                  <div className="relative h-[700px] flex flex-col overflow-hidden group">
                    <div className="overflow-hidden h-[72%] mb-4">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 origin-center"
                      />
                    </div>
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-black text-sm sm:text-lg xl:text-2xl font-bold mb-2 line-clamp-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-md flex-grow line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!isMobile && (
            <>
              <button
                onClick={prev}
                className="absolute top-1/2 left-2 md:-left-16 xl:-left-16 2xl:-left-24 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"
              >
                <ArrowLeft size={40} color="white" />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-2 md:-right-16 xl:-right-16 2xl:-right-24 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"
              >
                <ArrowRight size={40} color="white" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhitePaperSlides;
