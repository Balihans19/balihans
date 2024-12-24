import React from 'react';
import { Link } from 'react-router-dom';

/**
 * The ContactCareers component is a responsive React functional component that displays 
 * two sections: "Contact Us" and "Careers." It supports a light or dark theme 
 * through the `variant` prop, allowing for styling customization.
 * 
 *  props - The component props.
 *  props.variant - Specifies the theme for the component.  Accepts "light" or "dark."
 * 
 */

const ContactCareers = ({ variant }) => {
  // Define styles for light and dark themes.
  const styles = {
    light: {
      background: 'bg-[#f8f9fa]', // Light background color.
      text: 'text-gray-900', // Dark text color for light theme.
      subtext: 'text-gray-700', // Subtext color for light theme.
      button: 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white', // Button styling.
      divider: 'bg-gray-600' // Divider color.
    },
    dark: {
      background: 'bg-[#191c20]', // Dark background color.
      text: 'text-white', // Light text color for dark theme.
      subtext: 'text-gray-300', // Subtext color for dark theme.
      button: 'border-white text-white hover:bg-white hover:text-gray-900', // Button styling.
      divider: 'bg-gray-600' // Divider color.
    }
  };

  // Select the styles based on the provided variant prop.
  const currentStyle = styles[variant];

  return (
    <div className={`min-h-screen ${currentStyle.background} flex items-center justify-center`}>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 relative">
        {/* Divider Line for Separation */}
        {/* Responsive divider: vertical for medium screens and above, horizontal for smaller screens */}
        <div 
          className={`absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-0.5 h-0.5 md:h-[30vh] ${currentStyle.divider} left-0 top-1/2 -translate-y-1/2 block md:hidden`} />
        <div 
          className={`absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-0.5 md:h-[30vh] ${currentStyle.divider} hidden md:block`}/>

        {/* Contact Us Section */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="max-w-md text-center">
            <h2 className={`text-5xl font-bold mb-4 ${currentStyle.text}`}>
              Contact Us
            </h2>
            <p className={`${currentStyle.subtext} text-xl mb-6`}>
              Find out what can we help you achieve.
            </p>
            {/* Call-to-action button for contacting */}
          <Link
              to="/contact-us"
              className={`border-2 px-6 py-3 text-xl transition duration-300 ${currentStyle.button}`}
            >
              Let's talk
            </Link>
          </div>
        </div>

        {/* Careers Section */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="max-w-md text-center">
            <h2 className={`text-5xl font-bold mb-4 ${currentStyle.text}`}>
              Careers
            </h2>
            <p className={`${currentStyle.subtext} text-xl mb-6`}>
              Join our team. Realize your potential.
            </p>
            {/* Call-to-action button for exploring career opportunities */}
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





