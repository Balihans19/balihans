import React from 'react';

const ContactCareers = ({ variant}) => {
  const styles = {
    light: {
      background: 'bg-[#f8f9fa]',
      text: 'text-gray-900',
      subtext: 'text-gray-700',
      button: 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
      divider: 'bg-gray-600'
    },
    dark: {
      background: 'bg-[#191c20]',
      text: 'text-white',
      subtext: 'text-gray-300',
      button: 'border-white text-white hover:bg-white hover:text-gray-900',
      divider: 'bg-gray-600'
    }
  };

  const currentStyle = styles[variant];

  return (
    <div className={`min-h-screen ${currentStyle.background} flex items-center justify-center`}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 relative">
        {/* Responsive Divider Line - Vertical on md+, Horizontal on small */}
        <div className={`absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-0.5 h-0.5 md:h-[30vh] ${currentStyle.divider}
          left-0 top-1/2 -translate-y-1/2
          block md:hidden`} 
        />
        <div className={`absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-0.5 md:h-[30vh] ${currentStyle.divider}
          hidden md:block`} 
        />

        {/* Contact Us Section */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="max-w-md text-center">
            <h2 className={`text-5xl mb-4 ${currentStyle.text}`}>Contact Us</h2>
            <p className={`${currentStyle.subtext} text-xl mb-6`}>
              Find out what can we help you achieve.
            </p>
            <button className={`border-2 px-6 py-3 text-xl transition duration-300 ${currentStyle.button}`}>
              Let's talk
            </button>
          </div>
        </div>

        {/* Careers Section */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="max-w-md text-center">
            <h2 className={`text-5xl mb-4 ${currentStyle.text}`}>Careers</h2>
            <p className={`${currentStyle.subtext} text-xl mb-6`}>
              Join our team. Realize your potential.
            </p>
            <button className={`border-2 px-6 py-3 text-xl transition duration-300 ${currentStyle.button}`}>
              Explore opportunities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCareers;
