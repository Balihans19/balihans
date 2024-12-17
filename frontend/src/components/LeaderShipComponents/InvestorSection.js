import React from 'react';

const InvestorSection = ({ backgroundImageUrl }) => {
  return (
    <div className="min-h-screen text-white p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="max-w-7xl 2xl:max-w-full  mx-auto 2xl:mx-24 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Text Content */}
          <div className="space-y-4 sm:space-y-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              INVESTORS
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-4">
              Our company is a dynamic and rapidly growing IT and business solutions company that presents a compelling investment opportunity for long-term investors. With a strong track record of innovation, customer satisfaction, and financial performance, we are well-positioned to capitalize on the growing demand for digital transformation services.
            </p>
            <div className="my-4 sm:my-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
                Join us on our journey of growth and innovation
              </h2>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl  leading-relaxed">
                We offer a compelling investment opportunity for those seeking long-term value and sustainable returns. By investing in our company, you are supporting a dynamic and innovative company that is poised to make a significant impact on the industry.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-transparent border border-white text-xs sm:text-sm md:text-base font-semibold py-2 px-4 sm:py-3 sm:px-6 cursor-pointer hover:bg-gray-700 transition-colors">
                Learn more.
              </button>
              <button className="bg-transparent border border-white text-xs sm:text-sm md:text-base font-semibold py-2 px-4 sm:py-3 sm:px-6 cursor-pointer hover:bg-gray-700 transition-colors">
                Join us.
              </button>
            </div>
          </div>

          {/* Image Section */}
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
