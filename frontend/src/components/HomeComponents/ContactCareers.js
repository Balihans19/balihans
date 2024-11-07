
import React from 'react';

const ContactCareers = () => {
  return (
    <div className="text-black py-28 px-8 bg-[#f8f9fa] min-h-screen flex flex-col justify-center">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* Contact Us Section */}
      <div className="flex flex-col items-center text-center border-b-2 md:border-b-0 md:border-r-2 border-gray-700 pt-16 pb-8 md:pb-0 md:pr-8 h-[35vh]">
        <h2 className="text-5xl font-medium mb-4">Contact Us</h2>
        <p className="text-gray-700 text-xl mb-6">Find out what can we help you achieve.</p>
        <button className="border border-black px-6 py-3 text-xl text-black hover:bg-black hover:text-white transition duration-300">
          Let's talk
        </button>
      </div>
  
      {/* Careers Section */}
      <div className="flex flex-col items-center text-center pt-8 md:pt-16 md:pl-8">
        <h2 className="text-5xl font-medium mb-4">Careers</h2>
        <p className="text-gray-700 text-xl mb-6">Join our team. Realize your potential.</p>
        <button className="border border-black px-6 py-3 text-xl text-black hover:bg-black hover:text-white transition duration-300">
          Explore opportunities
        </button>
      </div>
    </div>
  </div>  
  );
};

export default ContactCareers;




