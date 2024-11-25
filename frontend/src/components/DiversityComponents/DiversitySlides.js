import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const DiversitySlides = ({ diversitySlides = [] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Validate and ensure diversityslides is an array
  const slides = Array.isArray(diversitySlides) ? diversitySlides : [];

  useEffect(() => {
    let interval;
    if (isAutoPlaying && slides.length > 0) {
      interval = setInterval(() => {
        setStartIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  if (slides.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 my-36 text-center text-white">
        <h2 className="text-3xl md:text-4xl mb-24">Our DEI Goals</h2>
      
      </div>
    );
  }

  const getVisibleSlides = () => {
    const visibleSlides = [];
    const numSlidesToShow = Math.min(3, slides.length);
    
    for (let i = 0; i < numSlidesToShow; i++) {
      const index = (startIndex + i) % slides.length;
      visibleSlides.push(slides[index]);
    }
    return visibleSlides;
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const SlideCard = ({ slide, index }) => {
    if (!slide) return null;
    
    return (
      <div className="relative group cursor-pointer w-full">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
          <img
            src={slide.image}
            alt={slide.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 w-full bg-black/80">
              <h3 className="text-lg lg:text-3xl text-white mb-2 w-2/3">
                {slide.title}
              </h3>
              <p className="text-lg text-white mb-2">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-36">
      <h2 className="text-3xl md:text-4xl text-center mb-24 text-white">
        Our DEI Goals
      </h2>
      
      <div className="relative">
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-20">
            {getVisibleSlides().map((slide, index) => (
              <div
                key={`slide-${slide.id || index}-${startIndex + index}`}
                className="transition-all duration-500 ease-in-out"
                style={{
                  opacity: 1,
                  transform: 'translateX(0)'
                }}
              >
                <SlideCard slide={slide} index={index} />
              </div>
            ))}
          </div>
        </div>
        
        {slides.length > 3 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 md:-left-20 top-1/2 -translate-y-1/2 -translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-10"
              aria-label="Previous slide"
            >
              <ArrowLeft size={40} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 md:-right-20 top-1/2 -translate-y-1/2 translate-x-2 w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full shadow z-10"
              aria-label="Next slide"
            >
              <ArrowRight size={40}/>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DiversitySlides;