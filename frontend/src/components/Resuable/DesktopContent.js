
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto px-4 text-white">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-3xl lg:text-4xl mb-5">About Us</h3>
          </div>
          
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-xl lg:text-2xl mb-5">Corporate Overview</h3>
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

          <div className="w-full min-w-[200px] my-4 md:my-8">
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
        <div className="grid grid-cols-1 gap-8 w-full max-w-5xl mx-auto px-4 text-white">
        {/* What We Do Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-3xl lg:text-4xl mb-5">Our Services</h3>
          </div>
          
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-xl lg:text-2xl mb-5">Strategy & Consulting</h3>
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">Enterprise Process Optimization</li>
              <li className="mb-2">Digital Transformation</li>
              <li className="mb-2">Technology Modernization</li>
            </ul>
          </div>
    
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">Artificial Intelligence</li>
              <li className="mb-2">Cloud & Infrastructure</li>
              <li className="mb-2">Cognitive Operations</li>
              <li className="mb-2">Network Solutions</li>
            </ul>
          </div>
          <div className="w-full min-w-[200px] my-4 md:my-8">

            <ul className="list-none text-lg p-0">
              <li className="mb-2">Cybersecurity</li>
              <li className="mb-2">Data & Analytics</li>
              <li className="mb-2">Engineering Services</li>
              <li className="mb-2">Sustainability Services</li>
              <li className="mb-2">Business Process Solutions</li>
          </ul>
       </div>
        </div>
    
        {/* Spotlight Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-3xl lg:text-4xl mb-5">Spotlight</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto px-4 text-white">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-3xl lg:text-4xl mb-5">Industries</h3>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              
              <li className="mb-2">
                <Link to="/bsfi" className="text-white hover:underline">Banking & Financial Services</Link>
              </li>
              <li className="mb-2">Communications & Information Services</li>
              <li className="mb-2">Energy, Resources & Utilities</li>
              <li className="mb-2">Healthcare & Life Sciences</li>
              <li className="mb-2">High Tech</li>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto px-4 text-white">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-3xl lg:text-4xl mb-5">Insights</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto px-4 text-white">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-3xl lg:text-4xl mb-5">Careers</h3>
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
