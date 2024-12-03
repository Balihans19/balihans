import React, { useState, useEffect, useCallback } from 'react'; 
import { ArrowLeft, ArrowRight } from 'lucide-react';  

const DuoCarousel = ({ slides, title }) => {   
  const [current, setCurrent] = useState(0);   
  const [isMobile, setIsMobile] = useState(false);    

  const handleResize = useCallback(() => {     
    setIsMobile(window.innerWidth < 1024);   
  }, []);    

  const prev = useCallback(() => {     
    setCurrent((curr) => (curr === 0 ? slides.length - 2 : curr - 1));   
  }, [slides.length]);    

  const next = useCallback(() => {     
    setCurrent((curr) => (curr === slides.length - 2 ? 0 : curr + 1));   
  }, [slides.length]);    

  useEffect(() => {     
    handleResize();     
    window.addEventListener('resize', handleResize);     
    return () => window.removeEventListener('resize', handleResize);   
  }, [handleResize]);    

  useEffect(() => {     
    if (isMobile) {       
      const interval = setInterval(next, 3000);       
      return () => clearInterval(interval);     
    }   
  }, [isMobile, next]);    

  return (     
    <div className="w-full bg-[#f8f9fa]">       
      <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 py-28">         
        <h1 className="text-3xl md:text-4xl text-center text-gray-900 mb-24">           
          {title}         
        </h1>         
        <div className="relative">           
          <div className="overflow-hidden relative">             
            <div                
              className="flex transition-transform ease-out duration-1000"                
              style={{ transform: `translateX(-${current * 50}%)` }}             
            >               
              {slides.map((slide, index) => (                 
                <div key={index} className="w-1/2 flex-shrink-0 px-4 md:px-10">                   
                  <div className="relative aspect-w-4 aspect-h-3 overflow-hidden group">                     
                    <img                        
                      src={slide.image}                        
                      alt={slide.alt}                        
                      className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"                      
                    />                     
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">                       
                      <div
                        className="absolute top-36 right-18 p-4 lg:p-6 flex flex-col"
                        style={{
                          height: '400px', // Fixed height for uniform alignment
                        }}
                      >
                        {/* Title */}
                        <h2 className="text-white text-center text-sm md:text-lg w-[30vh] lg:text-3xl mb-2 line-clamp-6">
                          {slide.title}
                        </h2>
                      </div>                     
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
                className="absolute top-1/2 left-2 md:-left-16 xl:-left-16 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"               
              >                 
                <ArrowLeft size={40} color='white' />               
              </button>               
              <button                  
                onClick={next}                  
                className="absolute top-1/2 right-2 md:-right-16 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"               
              >                 
                <ArrowRight size={40} color='white' />               
              </button>             
            </>           
          )}         
        </div>       
      </div>     
    </div>   
  ); 
};  

export default DuoCarousel;

// import React, { useState, useEffect, useCallback } from 'react'; 
// import { ArrowLeft, ArrowRight } from 'lucide-react';  

// const DuoCarousel = ({ slides, title }) => {   
//   const [current, setCurrent] = useState(0);   
//   const [isMobile, setIsMobile] = useState(false);    

//   const handleResize = useCallback(() => {     
//     setIsMobile(window.innerWidth < 1024);   
//   }, []);    

//   const prev = useCallback(() => {     
//     setCurrent((curr) => (curr === 0 ? slides.length - 2 : curr - 1));   
//   }, [slides.length]);    

//   const next = useCallback(() => {     
//     setCurrent((curr) => (curr === slides.length - 2 ? 0 : curr + 1));   
//   }, [slides.length]);    

//   useEffect(() => {     
//     handleResize();     
//     window.addEventListener('resize', handleResize);     
//     return () => window.removeEventListener('resize', handleResize);   
//   }, [handleResize]);    

//   useEffect(() => {     
//     if (isMobile) {       
//       const interval = setInterval(next, 3000);       
//       return () => clearInterval(interval);     
//     }   
//   }, [isMobile, next]);    

//   return (     
//     <div className="w-full bg-[#f8f9fa]">       
//       <div className="max-w-4xl xl:max-w-6xl mx-auto px-4 py-28">         
//         <h1 className="text-3xl md:text-4xl text-center text-gray-900 mb-24">           
//           {title}         
//         </h1>         
//         <div className="relative">           
//           <div className="overflow-hidden relative">             
//             <div                
//               className="flex transition-transform ease-out duration-1000"                
//               style={{ transform: `translateX(-${current * 50}%)` }}             
//             >               
//               {slides.map((slide, index) => (                 
//                 <div key={index} className="w-1/2 flex-shrink-0 px-4 md:px-10">                   
//                   <div className="relative aspect-w-4 aspect-h-3">                     
//                     <img                        
//                       src={slide.image}                        
//                       alt={slide.alt}                        
//                       className="object-cover  w-full h-full"                      
//                     />                     
//                     <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">                       
//                       <div
//                         className="absolute top-28 right-18 p-4 lg:p-6  flex flex-col "
//                         style={{
//                           height: '400px', // Fixed height for uniform alignment
//                         }}
//                       >
//                         {/* Title */}
//                         <h2 className="text-white text-center text-sm md:text-lg w-[30vh] lg:text-3xl mb-2 line-clamp-6">
//                           {slide.title}
//                         </h2>
//                       </div>                     
//                     </div>                   
//                   </div>                 
//                 </div>               
//               ))}             
//             </div>           
//           </div>           
//           {!isMobile && (             
//             <>               
//               <button                  
//                 onClick={prev}                  
//                 className="absolute top-1/2 left-2 md:-left-16 xl:-left-16 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"               
//               >                 
//                 <ArrowLeft size={40} color='white' />               
//               </button>               
//               <button                  
//                 onClick={next}                  
//                 className="absolute top-1/2 right-2 md:-right-16 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#191c20] rounded-full shadow z-10"               
//               >                 
//                 <ArrowRight size={40} color='white' />               
//               </button>             
//             </>           
//           )}         
//         </div>       
//       </div>     
//     </div>   
//   ); 
// };  

// export default DuoCarousel;
