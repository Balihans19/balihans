import React, { useState, useEffect, useCallback } from 'react'; 
import { ArrowLeft, ArrowRight } from 'lucide-react';  

const Spotlight = ({ spotlightItems, title = "Spotlight" }) => {   
  const [current, setCurrent] = useState(0);   
  const [isMobile, setIsMobile] = useState(false);    

  const handleResize = useCallback(() => {     
    setIsMobile(window.innerWidth < 1024);   
  }, []);    

  useEffect(() => {     
    handleResize();     
    window.addEventListener('resize', handleResize);     
    return () => window.removeEventListener('resize', handleResize);   
  }, [handleResize]);    

  const prev = useCallback(() => {     
    setCurrent((curr) => (curr === 0 ? spotlightItems.length - 3 : curr - 1));   
  }, [spotlightItems.length]);    

  const next = useCallback(() => {     
    setCurrent((curr) => (curr === spotlightItems.length - 3 ? 0 : curr + 1));   
  }, [spotlightItems.length]);    

  useEffect(() => {     
    if (isMobile) {       
      const interval = setInterval(next, 3000);       
      return () => clearInterval(interval);     
    }   
  }, [isMobile, next]);    

  return (     
    <div className="w-full bg-[#f8f9fa]">       
      <div className="max-w-4xl xl:max-w-7xl mx-auto px-4 py-36">         
        <h1 className="text-3xl md:text-5xl text-center text-gray-900 mb-24">           
          {title}         
        </h1>         
        <div className="relative">           
          <div className="overflow-hidden relative">             
            <div               
              className="flex transition-transform ease-out duration-1000"               
              style={{ transform: `translateX(-${current * 33.33}%)` }}             
            >               
              {spotlightItems.map((item, index) => (                 
                <div key={index} className="w-1/3 flex-shrink-0 px-4 md:px-10">                   
                  <div className="relative h-[500px] overflow-hidden group">                     
                    <img                       
                      src={item.imageUrl}                       
                      alt={item.title}                       
                      className="object-cover w-full h-4/5 transition-transform duration-500 ease-in-out group-hover:scale-110"                     
                    />                     
                    <div className="absolute inset-0 top-auto -bottom-1 flex flex-col justify-end ">                       
                      <h3 className="text-black text-2xl mb-2 line-clamp-2">                         
                        {item.title}                       
                      </h3>                       
                      <p className="text-gray-500 text-md">                         
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
                className="absolute top-1/2 left-2 md:-left-16 xl:-left-24 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"               
              >                 
                <ArrowLeft size={40} color="white" />               
              </button>               
              <button                 
                onClick={next}                 
                className="absolute top-1/2 right-2 md:-right-16 xl:-right-24 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"               
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

export default Spotlight;





