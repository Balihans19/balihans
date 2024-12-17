import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SustainCarousel = ({ slidesdata }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        // Reset currentIndex if it's out of bounds after slidesdata changes
        if (currentIndex >= slidesdata.length) {
            setCurrentIndex(0);
        }

        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % slidesdata.length);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, slidesdata, slidesdata.length, currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slidesdata.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slidesdata.length) % slidesdata.length);
        setIsAutoPlaying(false);
    };

    const SlideCard = ({ slide }) => (
        <div className="relative group cursor-pointer w-full">
            <div className="relative h-[500px] overflow-hidden">
                <img
                    src={slide.image}
                    alt={slide.title}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
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

    // Guard against empty slidesdata
    if (!slidesdata || slidesdata.length === 0) {
        return null;
    }

    return (
        <div className="max-w-lg xs:max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto px-4 my-36">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-24 text-white">
                Our Sustainability Initiatives
            </h2>

            <div className="relative">
                <div className="overflow-hidden">
                    <div className="w-full">
                        <div
                            className="transition-all duration-500 ease-in-out"
                            style={{
                                opacity: 1,
                                transform: 'translateX(0)'
                            }}
                        >
                            <SlideCard slide={slidesdata[currentIndex]} />
                        </div>
                    </div>
                </div>

                <button
                    onClick={prevSlide}
                    className="hidden lg:flex absolute -left-20 xl:-left-32 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-gray-200 rounded-full shadow z-10"
                    aria-label="Previous slide"
                >
                    <ArrowLeft size={40} />
                </button>
                <button
                    onClick={nextSlide}
                    className="hidden lg:flex absolute -right-20 xl:-right-32 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center bg-gray-200 rounded-full shadow z-10"
                    aria-label="Next slide"
                >
                    <ArrowRight size={40}/>
                </button>
            </div>
        </div>
    );
};

export default SustainCarousel;