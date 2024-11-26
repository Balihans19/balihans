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
        <div className="w-full bg-black/80 pb-10 pt-10">
          <div className="container mx-auto px-8">
            <h2 className="text-4xl font-normal text-white mb-5">
              Our services
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20">
              {services.map((service, index) => {
                // Determine if this is a left column or right column item
                const isLeftColumn = index % 2 === 0;
                const columnClass = isLeftColumn ? 'pr-8' : 'pl-8';

                return (
                  <a
                    key={index}
                    href={service.href}
                    className={`group border-b border-white/30 py-6 flex items-center justify-between hover:border-white transition-all duration-300 ${columnClass}`}
                  >
                    <span className="text-2xl text-white font-light tracking-wide">
                      {service.title}
                    </span>
                    <MoveRight
                      className="w-8 h-8 text-white transform group-hover:translate-x-2 transition-transform duration-300"
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


