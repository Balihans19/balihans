import React from "react";
import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Footer Component - Main footer component for the website
 * Contains navigation links organized by category, social media links, and featured case studies
 */
const Footer = () => {
  // Array of industry links with their routes
  // Some routes are empty strings indicating they're not yet implemented
  const industries = [
    { name: "Banking & Financial Services", route: "/banking-and-financial-services" },
    { name: "Communications & Information Services", route: "/communications-and-information-services" },
    { name: "Energy, Resources & Utilities", route: "/energy-resources-and-utilities" },
    { name: "Healthcare & Life Sciences", route: "/healthcare-and-life-sciences" },
    { name: "High-Tech", route: "/high-tech" },
    { name: "Hospitality", route: "/hospitality" },
    { name: "Insurance", route: "/insurance" },
    { name: "Manufacturing", route: "/manufacturing" },
    { name: "Media & Entertainment", route: "/media-and-entertainment" },
    { name: "Professional Services", route: "/professional-services" },
    { name: "Retail & Consumer Goods", route: "" },
    { name: "Travel & Logistics", route: "" },
    { name: "Transportation", route: "" },
  ];

  // Array of service links with their routes
  // Some routes are empty strings indicating they're not yet implemented
  const services = [
    { name: "Strategy and Consulting", route: "/strategy-and-consulting" },
    { name: "Artificial Intelligence", route: "/artificial-intelligence" },
    { name: "Cloud & Infrastructure", route: "/cloud-and-infrastructure" },
    { name: "Digital Enterprise", route: "/digital-enterprise" },
    { name: "Cybersecurity", route: "/cybersecurity" },
    { name: "Data & Analytics", route: "/data-and-analytics" },
    { name: "Internet of Things (IoT)", route: "/internet-of-things" },
    { name: "Web3 Solutions", route: "/web3-solutions" },
    { name: "Testing Services", route: "/testing-services" },
  ];

  // Array of company information links
  // Contains routes to various company pages and information
  const aboutBalihans = [
    { name: "Corporate Overview", route: "" },
    { name: "Leadership", route: "/leadership" },
    { name: "Our Brand", route: "/" },
    { name: "Corporate Sustainability", route: "/corporate-sustainability" },
    { name: "Diversity, Equity, and Inclusion", route: "/diversity-equity-and-inclusion" },
    { name: "Recognition", route: "/" },
    { name: "Customer Speak", route: "/customer-speak" },
  ];

  return (
    <footer className="bg-[#101215] px-7 md:px-7 lg:px-20 xl:px-36 text-white ">
      <div className="container py-24  lg:py-12 ">
        {/* Main grid layout for footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Industries Navigation Column */}
          <div>
            <h2 className="text-xl font-bold mb-4">Industries</h2>
            <ul className="space-y-5 text-sm text-[#e3e5e6]">
              {industries.map((industry, index) => (
                <li key={index} className="hover:underline">
                  <Link to={industry.route}>{industry.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Navigation Column */}
          <div>
            <h2 className="text-xl font-bold  mb-4">Services</h2>
            <ul className="space-y-5 text-sm  text-[#e3e5e6]">
              {services.map((service, index) => (
                <li key={index} className="hover:underline">
                  <Link to={service.route}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Company Navigation Column */}
          <div>
            <h2 className="text-xl font-bold  mb-4">About Balihans</h2>
            <ul className="space-y-5 text-sm text-[#e3e5e6]">
              {aboutBalihans.map((about, index) => (
                <li key={index} className="hover:underline">
                  <Link to={about.route}>{about.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links and Case Studies Column */}
          <div>
            {/* Social Media Section */}
            <h2 className="text-xl font-bold  mb-4">Follow us</h2>
            <div className="flex space-x-4 mb-4">
                <a href="https://www.linkedin.com/company/balihans/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={24} />
               </a>
            </div>

            {/* Featured Case Studies Section */}
            <h2 className="text-xl font-bold  mb-4">Featured case-study</h2>
            <div className="space-y-4">
              {/* E-commerce Case Study */}
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dnijlfi48/image/upload/f_webp,q_auto/v1730886548/Untitled_design_20_uqhti3.png"
                  alt="E-commerce"
                  className="w-[20vh] lg:w-[25vh] h-32 object-cover"
                />
                <p className="absolute inset-0 flex items-center text-[#e3e5e6] text-sm justify-center bg-black bg-opacity-50 text-center px-4 w-[20vh] lg:w-[25vh]">
                  52% increase in customer satisfaction for e-commerce refund
                </p>
              </div>

              {/* Insurance Case Study */}
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dnijlfi48/image/upload/f_webp,q_auto/v1730886548/Untitled_design_30_xuetna.png"
                  alt="Insurance"
                  className="w-[20vh] lg:w-[25vh] h-32 object-cover"
                />
                <p className="absolute inset-0 flex items-center justify-center  text-[#e3e5e6]  text-sm bg-black bg-opacity-50 text-center px-4 w-[20vh] lg:w-[25vh]">
                  Faster claim settlement for insurance company
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section with Logo, Copyright, and Legal Links */}
        <div className="mt-10 border-t border-gray-700 pt-6">
          {/* Responsive grid layout for bottom section */}
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[20%_20%_60%] gap-y-6 items-center">
            
            {/* Company Logo */}
            <div className="text-left">
              <img src="https://res.cloudinary.com/dnijlfi48/image/upload/v1734432935/Balihans_-_logo_off-white_m6wkoi.webp" 
                   alt="Balihans Logo" 
                   className="h-[5vh] xl:h-[6vh]  md:mx-0" />
            </div>

            {/* Copyright Information */}
            <div className="text-left  text-sm md:text-left">
              <p>@2024 Balihans LLC</p>
              <p>@2024 Balihans Software Private Limited</p>
            </div>

            {/* Legal Links */}
            <div className="text-left text-sm md:col-span-2 lg:col-span-1 lg:text-right space-x-4">
              <a href="/privacy-policy" className="hover:underline">Privacy Notice</a>
              <a href="/cookie-policy" className="hover:underline">Cookie Policy</a>
              <a href="/disclaimer" className="hover:underline">Disclaimer</a>
              <a href="/security-policy" className="hover:underline">Security Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


