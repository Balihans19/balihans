
import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  // About Us section
  aboutCustomer: {
    backgroundImage: 'url("https://res.cloudinary.com/dnijlfi48/image/upload/f_webp,q_auto/v1730886860/Untitled_design_31_ludy13.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
   
  },
  aboutFaster: {
    backgroundImage: 'url("https://res.cloudinary.com/dnijlfi48/image/upload/f_webp,q_auto/v1730886938/Untitled_design_32_moqp7n.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
 
};
export const desktopContent = [
 {
      name: 'ABOUT US',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 w-full max-w-6xl mx-auto px-4 text-white">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-2xl lg:text-3xl mb-5">About Us</h3>
          </div>
          
          <div className="w-full min-w-[250px] my-4 md:my-8">
            <h3 className="text-lg lg:text-xl mb-5">Corporate Overview</h3>
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">
                <Link to="/leadership" className="text-white hover:underline">Leadership</Link>
              </li>
              <li className="mb-2">Our Brand</li>
              <li className="mb-2">
                <Link to="/sustainability" className="text-white hover:underline">Corporate Sustainability</Link>
              </li>
            </ul>
          </div>

          <div className="w-full min-w-[300px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">
                <Link to="/diversity" className="text-white hover:underline">Diversity, Equity, and Inclusion</Link>
              </li>
              <li className="mb-2">Recognition</li>
              <li className="mb-2">Customer Speak</li>
            </ul>
          </div>

          <div className="min-w-[250] xl:min-w-[350px]">
            <div style={styles.aboutCustomer} className="min-h-[200px] md:min-h-[250px] text-center p-4 lg:pl-10 bg-black bg-opacity-80">
              <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1">
                52% increase in customer satisfaction for e-commerce refund
              </p>
            </div>
            <div style={styles.aboutFaster} className="min-h-[200px] lg:min-h-[250px] text-left p-4 lg:pl-10 bg-black bg-opacity-50">
              <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1">
                Faster claim settlement for insurance company
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'WHAT WE DO',
      content: (
        <div className="grid grid-cols-1 gap-8 w-full max-w-6xl mx-auto px-4 text-white">
        {/* What We Do Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-2xl lg:text-3xl mb-5">Our Services</h3>
          </div>
          
          <div className="w-full min-w-[280px] my-4 md:my-8">
            <h3 className="text-lg lg:text-xl mb-5"><Link to="/strategy-and-consulting" className="text-white hover:underline">Strategy & Consulting</Link> </h3>
            <ul className="list-none text-base lg:text-lg p-0">
            <li className="mb-2">
                <Link to="/ai" className="text-white hover:underline">Artificial Intelligence</Link>
              </li>
              <li className="mb-2">
                <Link to="/cloud-and-infrastructure" className="text-white hover:underline">Cloud & Infrastructure</Link>
              </li>
              <li className="mb-2">
                <Link to="/digital-enterprise" className="text-white hover:underline">Digital Enterprise</Link>
              </li>
            </ul>
          </div>
    
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
            <li className="mb-2">Network Solutions</li>
              <li className="mb-2">
                <Link to="/cybersecurity" className="text-white hover:underline">Cybersecurity</Link>
              </li>
              <li className="mb-2">
                <Link to="/data-and-analytics" className="text-white hover:underline">Data & Analytics</Link>
              </li>
            </ul>
          </div>
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-lg p-0">
              <li className="mb-2">Engineering Services</li>
              <li className="mb-2">Sustainability Services</li>
          </ul>
       </div>
        </div>
    
        {/* Spotlight Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-2xl lg:text-3xl mb-5">Spotlight</h3>
          </div>
          
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">InFocus</li>
              <li className="mb-2">Balihans Research</li>
            </ul>
          </div>
    
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">Balihans Innovation</li>
              
            </ul>
          </div>
          <div className="w-full min-w-[200px] my-4 md:my-8">
             {/* Empty column for spacing */}
       </div>
        </div>
      </div>
      ),
    },
    {
      name: 'INDUSTRIES',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-4 text-white">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-2xl lg:text-3xl mb-5">Industries</h3>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              
              <li className="mb-2">
                <Link to="/bsfi" className="text-white hover:underline">Banking & Financial Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/communications" className="text-white hover:underline">Communications & Information Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/energy" className="text-white hover:underline">Energy, Resources & Utilities</Link>
              </li>
              <li className="mb-2">
                <Link to="/health-care" className="text-white hover:underline">Healthcare & Life Sciences</Link>
              </li>
              <li className="mb-2">
                <Link to="/high-tech" className="text-white hover:underline">High Tech</Link>
              </li>
              <li className="mb-2">Hospitality</li>
              <li className="mb-2">Insurance</li>
            </ul>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">Manufacturing</li>
              <li className="mb-2">Media & Entertainment</li>
              <li className="mb-2">Professional Services</li>
              <li className="mb-2">Retail & Consumer Goods</li>
              <li className="mb-2">Travel & Logistics</li>
              <li className="mb-2">Transportation</li>
            </ul>
          </div>

          <div className="min-w-[250] xl:min-w-[350px]">
            <div style={styles.aboutCustomer} className="min-h-[200px] lg:min-h-[250px] text-center p-4 lg:pl-10 bg-black bg-opacity-50">
              <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1">
                52% increase in customer satisfaction for e-commerce refund
              </p>
            </div>
            <div style={styles.aboutFaster} className="min-h-[200px] lg:min-h-[250px] text-left p-4 lg:pl-10 bg-black bg-opacity-50">
              <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1">
                Faster claim settlement for insurance company
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'INSIGHTS',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-4 text-white">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-2xl lg:text-3xl mb-5">Insights</h3>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">Case Studies</li>
              <li className="mb-2">Views</li>
              <li className="mb-2">Insights</li>
              <li className="mb-2">News</li>
              <li className="mb-2">Events</li>
            </ul>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            {/* Empty column for spacing */}
          </div>

          <div className="min-w-[250] xl:min-w-[350px]">
            <div style={styles.aboutCustomer} className="min-h-[200px] lg:min-h-[250px] text-center p-4 lg:pl-10 bg-black bg-opacity-50">
              <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1">
                52% increase in customer satisfaction for e-commerce refund
              </p>
            </div>
            <div style={styles.aboutFaster} className="min-h-[200px] lg:min-h-[250px] text-left p-4 lg:pl-10 bg-black bg-opacity-50">
              <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1">
                Faster claim settlement for insurance company
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'CAREERS',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-4 text-white">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-2xl lg:text-3xl mb-5">Careers</h3>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">Why Balihans</li>
              <li className="mb-2">Diversity & Inclusion</li>
              <li className="mb-2">Join Us</li>
            </ul>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            {/* Empty column for spacing */}
          </div>

          <div className="min-w-[250] xl:min-w-[350px]">
            <div style={styles.aboutCustomer} className="min-h-[200px] lg:min-h-[250px] text-center p-4 lg:pl-10 bg-black bg-opacity-50">
              <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1">
                52% increase in customer satisfaction for e-commerce refund
              </p>
            </div>
            <div style={styles.aboutFaster} className="min-h-[200px] lg:min-h-[250px] text-left p-4 lg:pl-10 bg-black bg-opacity-50">
              <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1">
                Faster claim settlement for insurance company
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'CONTACT US',
      
    },
  ];
