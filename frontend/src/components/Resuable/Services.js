import React from 'react';
import { MoveRight } from 'lucide-react';

const Services = ({ 
  services, 
  backgroundImage, 
  backgroundVideo,
  backgroundType 
}) => {
  return (
    <section className="relative w-full h-screen">
      {/* Background Rendering */}
      {backgroundType === 'image' && backgroundImage && (
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {backgroundType === 'video' && backgroundVideo && (
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="w-full bg-black/80 pb-2 sm:pb-4 md:pb-6 lg:pb-8 pt-2 sm:pt-4 md:pt-6 lg:pt-8">
          <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 2xl:px-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-5">
              Our services
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 sm:gap-x-8 md:gap-x-12 lg:gap-x-20">
              {services.map((service, index) => {
                // Determine if this is a left column or right column item
                const isLeftColumn = index % 2 === 0;
                const columnClass = isLeftColumn 
                  ? 'sm:pr-2 md:pr-4 lg:pr-8' 
                  : 'sm:pl-2 md:pl-4 lg:pl-8';

                return (
                  <a
                    key={index}
                    href={service.href}
                    className={`
                      group border-b border-white/30 
                      py-3 sm:py-4 md:py-6 
                      flex items-center justify-between 
                      hover:border-white transition-all duration-300 
                      text-base sm:text-lg md:text-xl lg:text-2xl 
                      ${columnClass}
                    `}
                  >
                    <span className="text-white font-light tracking-wide">
                      {service.title}
                    </span>
                    <MoveRight
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white transform group-hover:translate-x-2 transition-transform duration-300"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;


