import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * A responsive carousel component for displaying sustainability slides.
 * 
 * slidesdata - Array of slide objects containing image, title, and description.
 */
const SustainCarousel = ({ slidesdata }) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Current slide index
    const [isAutoPlaying, setIsAutoPlaying] = useState(true); // Autoplay toggle

    useEffect(() => {
        // Ensure currentIndex resets if it exceeds the slidesdata length
        if (currentIndex >= slidesdata.length) {
            setCurrentIndex(0);
        }

        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % slidesdata.length); // Cycle through slides
            }, 5000); // Slide change interval: 5 seconds
        }
        return () => clearInterval(interval); // Cleanup interval on component unmount or autoplay toggle change
    }, [isAutoPlaying, slidesdata, slidesdata.length, currentIndex]);

    // Move to the next slide and pause autoplay
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slidesdata.length);
        setIsAutoPlaying(false);
    };

    // Move to the previous slide and pause autoplay
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slidesdata.length) % slidesdata.length);
        setIsAutoPlaying(false);
    };

    // Individual slide card component
    const SlideCard = ({ slide }) => (
        <div className="relative group cursor-pointer w-full">
            {/* Slide image */}
            <div className="relative h-[500px] overflow-hidden">
                <img
                    src={slide.image}
                    alt={slide.title}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                {/* Text overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 flex items-center">
                    <div className="absolute left-0 pl-8 lg:pl-12 text-left">
                        <h1 className="text-lg lg:text-4xl font-bold mb-4 text-white">
                            {slide.title}
                        </h1>
                        <p className="text-lg lg:text-2xl text-white max-w-lg">
                            {slide.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    // Handle empty slidesdata array gracefully
    if (!slidesdata || slidesdata.length === 0) {
        return null; // Return nothing if no slides are provided
    }

    return (
        <div className="max-w-lg xs:max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-4 my-36">
            {/* Carousel heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-24 text-white">
                Our Sustainability Initiatives
            </h2>

            <div className="relative">
                {/* Slide container */}
                <div className="overflow-hidden">
                    <div className="w-full">
                        <div
                            className="transition-all duration-500 ease-in-out"
                            style={{
                                opacity: 1,
                                transform: 'translateX(0)',
                            }}
                        >
                            <SlideCard slide={slidesdata[currentIndex]} />
                        </div>
                    </div>
                </div>

                {/* Previous slide button */}
                <button
                    onClick={prevSlide}
                    className="hidden lg:flex absolute -left-20 xl:-left-32 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-gray-200 rounded-full shadow z-10"
                    aria-label="Previous slide"
                >
                    <ArrowLeft size={40} />
                </button>
                
                {/* Next slide button */}
                <button
                    onClick={nextSlide}
                    className="hidden lg:flex absolute -right-20 xl:-right-32 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-gray-200 rounded-full shadow z-10"
                    aria-label="Next slide"
                >
                    <ArrowRight size={40} />
                </button>
            </div>
        </div>
    );
};

export default SustainCarousel;





