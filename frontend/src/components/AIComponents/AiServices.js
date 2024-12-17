


import React from 'react';
import { MoveRight } from 'lucide-react';

const services = [
    { title: 'Banking & Financial Services', href: '/bsfi' },
    { title: 'Communications & Information Services', href: '/communications' },
    { title: 'Energy, Resources & Utilities', href: '/energy' },
    { title: 'Healthcare & Life Sciences', href: '/health-care' },
    { title: 'High-Tech', href: '/high-tech' },
    { title: 'Hospitality', href: '/hospitality' },
    { title: 'Insurance', href: '/insurance' },
    { title: 'Manufacturing', href: '/manufacturing' },
    { title: 'Media & Entertainment', href: '/media' },
    { title: 'Professional Services', href: '/professional' },
    { title: 'Retail & Consumer Goods', href: '/retail' },
    { title: 'Travel & Logistics', href: '/travel' },
  ];
  

const AiServices = ({ 
    title,
  backgroundImage, 
  backgroundVideo,
  backgroundType 
}) => {
  return (
    <section className="relative w-full h-screen">
  {/* Background Rendering */}
  {backgroundType === "image" && backgroundImage && (
    <img
      src={backgroundImage}
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover"
    />
  )}

  {backgroundType === "video" && backgroundVideo && (
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
  <div className="relative z-10 h-full flex flex-col justify-end ">
    <div className="w-full h-[60%] 2xl:h-[50%] bg-black/80 py-6 ">
      <div className="container mx-auto xl:px-3">
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-5">{title}</h2>
        <div className="grid grid-cols-2 gap-x-5 sm:gap-x-20 ">
          {services.map((service, index) => {
            // Determine if this is a left column or right column item
            const isLeftColumn = index % 2 === 0;
            const columnClass = isLeftColumn ? "pr-8" : "pl-8";

            return (
              <a
                key={index}
                href={service.href}
                className={`group border-b border-white/30 py-4 flex items-center justify-between hover:border-white transition-all duration-300 ${columnClass}`}
              >
                <span className="text-xs sm:text-xs md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl text-white font-light tracking-wide">
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

export default AiServices;

