import React, { useState, useEffect} from 'react';

const MainDiv = ( { slidesData,
  headerTitle,
  headerDescription,
  backgroundImageUrl,
  knowMoreText}) => {


  const [currentSlide, setCurrentSlide] = useState(0);

  const setSlide = (index) => setCurrentSlide(index);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slidesData.length]);

  return (
    <div className="flex flex-col min-h-screen bg-[#191c20]">
      {/* Header Section */}
      <div 
        className="relative  h-[55vh] " 
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 11%, 0 100%)' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url('${backgroundImageUrl}')` }} ></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl pl-36 pb-44 h-full flex flex-col justify-center">
          <h1 className="text-3xl  text-[#FAF9F6] md:text-4xl  mb-4">
            {headerTitle}
          </h1>
          <p className="text-normal text-gray-100 md:text-xl max-w-2xl">
            {headerDescription}
          </p>
        </div>
      </div>

      {/* Slideshow Section */}
      <div
        className="relative h-[70vh] -mt-[52vh]" 
        style={{ clipPath: 'polygon(0 100%, 100% 5%, 100% 100%, 0 100%)' }}
      >
        {/* Slideshow Video */}
        <div className="absolute inset-0 z-0">
  <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent"></div> {/* Gradient overlay */}
  <video
    key={slidesData[currentSlide].videoUrl} // Add key to re-render video element
    autoPlay
    loop
    muted
    className="w-full h-full object-cover"
  >
    <source src={slidesData[currentSlide].videoUrl} type="video/mp4" />
  </video>
</div>
         


        {/* Slideshow Text */}
        <div className="relative z-10 flex h-full max-full">
  {/* Outer container for absolute positioning */}
  <div className="absolute right-36 bottom-16 w-[50vh] flex flex-col items-end justify-center text-white">
    <div className="flex flex-col items-start  p-2 rounded mb-4">
      <h1 className="text-3xl md:text-4xl mb-4 transition-all duration-500">
        {slidesData[currentSlide].heading}
      </h1>
      <p className="text-sm md:text-base lg:text-xl mb-4 max-w-lg">
        {slidesData[currentSlide].description}
      </p>
      <button className="bg-transparent border border-white text-sm lg:text-base font-semibold py-3 px-6 lg:py-4 lg:px-8 cursor-pointer hover:bg-[#2c2c2c] hover:text-white transition-colors">
        {knowMoreText}
      </button>
    </div>
  </div>
</div>


        {/* Slideshow Bullets */}
        <div className="absolute inset-x-0 bottom-5 flex justify-end mr-10 md:mr-36 space-x-2 z-10">
          {slidesData.map((_, index) => (
            <span
              key={index}
              className={`w-8 h-8 bg-[#d9d9d9]  rounded-full cursor-pointer transition-colors duration-300 ${
                currentSlide === index ? 'bg-opacity-100' : 'hover:bg-opacity-70'
              }`}
              onClick={() => setSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Footer Section */}
       <div className="bg-[#f8f9fa] text-black py-12">
      <div className="max-w-full  px-4 md:px-8 lg:px-12 xl:mx-24 text-left">
        <p className="text-xl md:text-2xl lg:text-2xl">
          Stay ahead of the curve with Balihans. Our expertise in 
          <span className="italic"> technology </span> 
          modernization, process <span className="italic"> optimization</span>, and customer<span className="italic"> experience</span> transformation will propel your business forward.
        </p>
      </div>
    </div>
    


    </div>
  );
};


export default MainDiv;

