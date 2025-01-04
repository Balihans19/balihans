import React from "react";
import { MoveRight } from 'lucide-react';


const ContactUsMainDiv = ({
  backgroundImageUrl,
  heading,
  description,
  values=[]
}) => {
  
   
  return (
    <div className="relative min-h-screen lg:min-h-[850px] text-white w-full">
      {/* Grayscale background container */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          filter: 'grayscale(100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }}
      />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent" style={{ zIndex: 1 }}></div>

      {/* Main content container */}
      <div className="relative z-10 max-w-full mt-12 md:mt-0 px-4 py-16 sm:px-6 lg:px-20 xl:px-36">
        {/* Header section */}
        <div className="flex justify-end items-start">
          <div className="mr-14 max-w-2xl w-full">
            <div className="flex gap-12 text-left font-bold text-base sm:text-lg lg:text-2xl">
              <h1>{heading}</h1>
            </div>
          </div>
        </div>

        {/* Decorative horizontal rule */}
        <div className="flex justify-end items-start">
          <hr className="w-full my-6" />
        </div>

        <div className="flex justify-end items-start">
          <div className="mr-14 text-left max-w-2xl w-full">
            <p className="text-base sm:text-xl lg:text-xl mb-8">{description}</p>
          </div>
        </div>

        {/* Values section */}
        <div className="flex justify-end items-start">
          <div className="mr-14 max-w-2xl w-full">
            {values.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between border-b-4 border-[#add9f2] py-4 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <span className="text-sm xs:text-lg sm:text-xl md:text-2xl">
                  {item.title}
                </span>
                <MoveRight
                  color="#add9f2"
                  className="w-8 sm:w-10 h-8 sm:h-10 transform group-hover:translate-x-2 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsMainDiv;


