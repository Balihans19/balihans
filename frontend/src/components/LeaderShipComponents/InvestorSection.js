import React from 'react';


const InvestorSection = ({backgroundImageUrl}) => {
  return (
    <div className="min-h-screen  text-white p-6 lg:p-12">
      <div className="max-w-full mx-24">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl  mb-6">
              INVESTORS
            </h1>
            
            <p className="text-lg lg:text-xl leading-relaxed mb-6">
              Our company is a dynamic and rapidly growing IT and business solutions company that presents a compelling investment opportunity for long-term investors. With a strong track record of innovation, customer satisfaction, and financial performance, we are well-positioned to capitalize on the growing demand for digital transformation services.
            </p>

            <div className="my-8">
              <h2 className="text-2xl lg:text-3xl  mb-4">
                Join us on our journey of growth and innovation
              </h2>
              <p className="text-xl leading-relaxed mb-6">
                We offer a compelling investment opportunity for those seeking long-term value and sustainable returns. By investing in our company, you are supporting a dynamic and innovative company that is poised to make a significant impact on the industry.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-28">
              <button className="bg-transparent border border-white text-sm lg:text-base font-semibold py-3 px-6 lg:py-4 lg:px-12 cursor-pointer hover:bg-[#2c2c2c] hover:text-white transition-colors">
                Learn more.
              </button>
              <button variant="outline" className="bg-transparent border border-white text-sm lg:text-base font-semibold py-3 px-6 lg:py-4 lg:px-16 cursor-pointer hover:bg-[#2c2c2c] hover:text-white transition-colors">
                Join us.
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="hidden lg:block">
            <div className="relative h-[700px] w-full">
              <img 
                src={backgroundImageUrl}
                alt="Business professionals"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorSection;