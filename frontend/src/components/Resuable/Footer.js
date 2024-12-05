import React from "react";
import { Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Mapping for Industries
  const industries = [
    { name: "Banking & Financial Services", route: "/bsfi" },
    { name: "Communications & Information Services", route: "/industries/communications" },
    { name: "Energy, Resources & Utilities", route: "/energy" },
    { name: "Healthcare & Life Sciences", route: "/healthcare" },
    { name: "High-Tech", route: "/high-tech" },
    { name: "Hospitality", route: "" },
    { name: "Insurance", route: "" },
    { name: "Manufacturing", route: "" },
    { name: "Media & Entertainment", route: "" },
    { name: "Professional Services", route: "" },
    { name: "Retail & Consumer Goods", route: "" },
    { name: "Travel & Logistics", route: "" },
    { name: "Transportation", route: "" },
  ];

  // Mapping for Services
  const services = [
    { name: "Strategy and Consulting", route: "/strategy-and-consulting" },
    { name: "Artificial Intelligence", route: "/ai" },
    { name: "Cloud & Infrastructure", route: "/cloud-and-infrastrucute" },
    { name: "Digital Enterprise", route: "" },
    { name: "Network Solutions", route: "" },
    { name: "Cybersecurity", route: "/cybersecurity" },
    { name: "Data & Analytics", route: "/data-and-analytics" },
    { name: "Engineering Services", route: "" },
    { name: "Sustainability Services", route: "" },
  ];

  // Mapping for About Balihans
  const aboutBalihans = [
    { name: "Corporate Overview", route: "" },
    { name: "Leadership", route: "/leadership" },
    { name: "Our Brand", route: "" },
    { name: "Corporate Sustainability", route: "/sustainability" },
    { name: "Diversity, Equity, and Inclusion", route: "/diversity" },
    { name: "Recognition", route: "" },
    { name: "Customer Speak", route: "" },
  ];

  return (
    <footer className="bg-[#101215] text-white ">
      <div className="container mx-auto px-4 py-4 md:px-20 xl:px-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Industries Column */}
          <div>
            <h2 className="text-2xl mb-4">Industries</h2>
            <ul className="space-y-2 text-[#e3e5e6]">
              {industries.map((industry, index) => (
                <li key={index} className="hover:underline">
                  <Link to={industry.route}>{industry.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h2 className="text-2xl mb-4">Services</h2>
            <ul className="space-y-2 text-[#e3e5e6]">
              {services.map((service, index) => (
                <li key={index} className="hover:underline">
                  <Link to={service.route}>{service.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Balihans Column */}
          <div>
            <h2 className="text-2xl mb-4">About Balihans</h2>
            <ul className="space-y-2 text-[#e3e5e6]">
              {aboutBalihans.map((about, index) => (
                <li key={index} className="hover:underline">
                  <Link to={about.route}>{about.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
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
      <a href="/privacy" className="hover:underline">
        Privacy Notice
      </a>
      <a href="/cookie" className="hover:underline">
        Cookie Policy
      </a>
      <a href="/disclaimer" className="hover:underline">
        Disclaimer
      </a>
      <a href="/security" className="hover:underline">
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

