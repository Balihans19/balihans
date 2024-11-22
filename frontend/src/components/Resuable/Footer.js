import React from "react";
import { Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#101215] text-white py-10">
      <div className="container mx-auto px-4">
        {/* Grid Layout for footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Industries Column */}
          <div>
            <h2 className="text-2xl  mb-4">Industries</h2>
            <ul className="space-y-2 text-[#e3e5e6]">
              {[
                "Banking & Financial Services",
                "Communications & Information Services",
                "Energy, Resources & Utilities",
                "Healthcare & Life Sciences",
                "High-Tech",
                "Hospitality",
                "Insurance",
                "Manufacturing",
                "Media & Entertainment",
                "Professional Services",
                "Retail & Consumer Goods",
                "Travel & Logistics",
                "Transportation",
              ].map((industry) => (
                <li key={industry} className="hover:underline">
                  {industry}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h2 className="text-2xl  mb-4">Services</h2>
            <ul className="space-y-2 text-[#e3e5e6]">
              {[
                "Strategy and Consulting",
                "Enterprise Process Optimization",
                "Digital Transformation",
                "Technology Modernization",
                "Artificial Intelligence",
                "Cloud & Infrastructure",
                "Cognitive Operations",
                "Application Services",
                "Network Solutions",
                "Cybersecurity",
                "Data & Analytics",
                "Engineering Services",
                "Sustainability Services",
                "Business Process Solutions",
              ].map((service) => (
                <li key={service} className="hover:underline">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* About Balihans Column */}
          <div>
            <h2 className="text-2xl  mb-4">About Balihans</h2>
            <ul className="space-y-2 text-[#e3e5e6]">
              {[
                "Corporate Overview",
                "Leadership",
                "Our Brand",
                "Corporate Sustainability",
                "Diversity, Equity, and Inclusion",
                "Recognition",
                "Customer Speak",
              ].map((about) => (
                <li key={about} className="hover:underline">
                  {about}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links and Featured Case Study */}
          <div>
            <h2 className="text-2xl  mb-4">Follow us</h2>
            <div className="flex space-x-4 mb-4">
            <Linkedin size={24} />
            <Twitter size={24} />
            <Youtube size={24} />
            </div>
            <h2 className="text-2xl  mb-4">Featured case-study</h2>
            <div className="space-y-4">
              {/* Case Study 1 */}
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dnijlfi48/image/upload/f_webp,q_auto/v1730886548/Untitled_design_20_uqhti3.png"
                  alt="E-commerce"
                  className="w-[20vh] lg:w-[25vh] h-32 object-cover"
                />
                <p className="absolute inset-0 flex items-center text-[#e3e5e6] justify-center bg-black bg-opacity-50 text-center px-4 w-[20vh] lg:w-[25vh]">
                  52% increase in customer satisfaction for e-commerce refund
                </p>
              </div>

              {/* Case Study 2 */}
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dnijlfi48/image/upload/f_webp,q_auto/v1730886548/Untitled_design_30_xuetna.png"
                  alt="Insurance"
                  className="w-[20vh] lg:w-[25vh] h-32 object-cover"
                />
                <p className="absolute inset-0 flex items-center justify-center text-[#e3e5e6] bg-black bg-opacity-50 text-center px-4 w-[20vh] lg:w-[25vh]">
                  Faster claim settlement for insurance company
                </p>
              </div>
            </div>
          </div>
        </div>


   {/* Footer Bottom Section */}
<div className="mt-10 border-t border-gray-700 pt-6">
  {/* Grid layout with responsive behavior */}
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[20%_20%_60%] gap-y-6 items-center">
    
    {/* Column 1: Logo */}
    <div className="text-left">
      <img src="https://res.cloudinary.com/dbmwkp9a9/image/upload/f_webp,q_auto/v1729842945/Balihans_-_logo_off-white_semxwr.png" alt="Balihans Logo" className="w-36  md:mx-0" />
    </div>

    {/* Column 2: Company Name & Copyright */}
    <div className="text-left md:text-left">
      <p>@2024 Balihans LLC</p>
      <p>@2024 Balihans Software Private Limited</p>
    </div>

    {/* Column 3: Privacy Links */}
    <div className="text-left md:col-span-2 lg:col-span-1 lg:text-right space-x-4">
      <a href="#" className="hover:underline">
        Privacy Notice
      </a>
      <a href="#" className="hover:underline">
        Cookie Policy
      </a>
      <a href="#" className="hover:underline">
        Disclaimer
      </a>
      <a href="#" className="hover:underline">
        Security Policy
      </a>
      </div>
      </div>
      </div>

      </div>
    </footer>
  );
};

export default Footer;



