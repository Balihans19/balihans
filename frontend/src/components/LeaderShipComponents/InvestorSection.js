import React from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * InvestorSection Component
 * Renders a responsive investor information section with text content and image
 * 
 *  props
 *  props.backgroundImageUrl - URL for the section's image
 */
const InvestorSection = ({ backgroundImageUrl }) => {

  const navigate = useNavigate();

  const handleJoinUsClick = () => {
    navigate('/contact-us');
  };
 
  const handleLearnMoreClick = () => {
    navigate('/what-we-do');
  };

  return (
    // Main container with responsive padding
    <div className="min-h-screen text-black bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 md:py-8 lg:py-24">
      <div className="max-w-7xl 2xl:max-w-full mx-auto 2xl:mx-24">
        {/* Two-column grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left column: Text content */}
          <div className="space-y-4 sm:space-y-8">
            {/* Section header with responsive typography */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              INVESTORS
            </h1>
            {/* Main description with responsive text size */}
            <p className="text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-4">
              Our company is a dynamic and rapidly growing IT and business solutions company that presents a compelling investment opportunity for long-term investors. With a strong track record of innovation, customer satisfaction, and financial performance, we are well-positioned to capitalize on the growing demand for digital transformation services.
            </p>
            
            {/* Secondary content section */}
            <div className="my-4 sm:my-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
                Join us on our journey of growth and innovation
              </h2>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
                We offer a compelling investment opportunity for those seeking long-term value and sustainable returns. By investing in our company, you are supporting a dynamic and innovative company that is poised to make a significant impact on the industry.
              </p>
            </div>

            {/* CTA buttons with hover effects */}
            <div className="flex flex-wrap gap-4">
              <button onClick={handleLearnMoreClick} className="bg-transparent border text-xs sm:text-sm md:text-base font-semibold py-2 px-4 sm:py-3 sm:px-6 cursor-pointer border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
                Learn more.
              </button>
              <button onClick={handleJoinUsClick} className="bg-transparent border text-xs sm:text-sm md:text-base font-semibold py-2 px-4 sm:py-3 sm:px-6 cursor-pointer border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
                Join us.
              </button>
            </div>
          </div>

          {/* Right column: Responsive image */}
          <div className="h-48 sm:h-60 md:h-80 lg:h-[600px] w-full">
            <img
              src={backgroundImageUrl}
              alt="Business professionals"
              className="rounded-lg object-cover w-full h-full shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorSection;

