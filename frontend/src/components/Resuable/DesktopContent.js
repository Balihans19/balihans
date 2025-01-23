
import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  // About Us section
  aboutCustomer: {
    backgroundImage: 'url("https://res.cloudinary.com/dnijlfi48/image/upload/v1737098666/Untitled_design_97_tmkwuq.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
   
  },
  aboutFaster: {
    backgroundImage: 'url("https://res.cloudinary.com/dnijlfi48/image/upload/v1737098925/Untitled_design_32_moqp7n_ebulxd.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
 
};
export const desktopContent = [
 {
      name: 'ABOUT US',
       route: '/about-us',
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
              <li className="mb-2">
                <Link to="/" className="text-white hover:underline">Our Brand</Link>
              </li>
              <li className="mb-2">
                <Link to="/corporate-sustainability" className="text-white hover:underline">Corporate Sustainability</Link>
              </li>
            </ul>
          </div>

          <div className="w-full min-w-[300px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
              <li className="mb-2">
                <Link to="/diversity-equity-and-inclusion" className="text-white hover:underline">Diversity, Equity, and Inclusion</Link>
              </li>
              
              <li className="mb-2">
                <Link to="/customer-speak" className="text-white hover:underline">Customer Speak</Link>
              </li>
            </ul>
          </div>
          <div className="min-w-[250] xl:min-w-[350px]">
             <Link to="/case-study/52-percent-increase-customer-satisfaction-ecommerce-refund" className="block">
               <div style={styles.aboutCustomer} className="relative min-h-[200px] lg:min-h-[250px] text-center p-4 lg:pl-10">
                 <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                 <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1 relative z-10">
                   52% increase in customer satisfaction for e-commerce refund
                 </p>
               </div>
             </Link>
             <Link to="/case-study/faster-claim-settlement-for-insurance-company" className="block">
               <div style={styles.aboutFaster} className="relative min-h-[200px] lg:min-h-[250px] text-center p-4 lg:pl-10">
                 <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                 <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1 relative z-10">
                   Faster claim settlement for insurance company
                 </p>
               </div>
             </Link>
          </div>
 
        </div>
      ),
    },
    {
      name: 'WHAT WE DO',
      route: '/what-we-do',
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
                <Link to="/artificial-intelligence" className="text-white hover:underline">Artificial Intelligence</Link>
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
              <li className="mb-2">
                <Link to="/cybersecurity" className="text-white hover:underline">Cybersecurity</Link>
              </li>
              <li className="mb-2">
                <Link to="/data-and-analytics" className="text-white hover:underline">Data & Analytics</Link>
              </li>
              <li className="mb-2">
                <Link to="/internet-of-things" className="text-white hover:underline">Internet of Things (IoT)</Link>
              </li>
            </ul>
          </div>
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-lg p-0">
            <li className="mb-2">
                <Link to="/web3-solutions" className="text-white hover:underline">Web3 Solutions</Link>
              </li>
              <li className="mb-2">
                <Link to="/testing-services" className="text-white hover:underline">Testing Services</Link>
              </li>

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
            <li className="mb-2">
                <Link to="/infocus" className="text-white hover:underline">InFocus</Link>
              </li>
              <li className="mb-2">Balihans Research</li>
            </ul>
          </div>
    
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
            <li className="mb-2">
                <Link to="/what-we-do" className="text-white hover:underline">Balihans Innovation</Link>
              </li>
              
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
                <Link to="/banking-and-financial-services" className="text-white hover:underline">Banking & Financial Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/communications-and-information-services" className="text-white hover:underline">Communications & Information Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/energy-resources-and-utilities" className="text-white hover:underline">Energy, Resources & Utilities</Link>
              </li>
              <li className="mb-2">
                <Link to="/healthcare-and-life-sciences" className="text-white hover:underline">Healthcare & Life Sciences</Link>
              </li>
              <li className="mb-2">
                <Link to="/high-tech" className="text-white hover:underline">High Tech</Link>
              </li>
              <li className="mb-2">
                <Link to="/hospitality" className="text-white hover:underline">Hospitality</Link>
              </li>
              
            </ul>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
            <li className="mb-2">
                <Link to="/insurance" className="text-white hover:underline">Insurance</Link>
              </li>
            <li className="mb-2">
                <Link to="/manufacturing" className="text-white hover:underline">Manufacturing</Link>
              </li>
              <li className="mb-2">
                <Link to="/media-and-entertainment" className="text-white hover:underline">Media & Entertainment</Link>
              </li>
              <li className="mb-2">
                <Link to="/professional-services" className="text-white hover:underline">Professional Services</Link>
              </li>
              <li className="mb-2">
                <Link to="/retail-and-consumer-goods" className="text-white hover:underline">Retail & Consumer Goods</Link>
              </li>
              <li className="mb-2">
                <Link to="/travel-and-logistics" className="text-white hover:underline">Travel & Logistics</Link>
              </li>
            </ul>
          </div>

          <div className="min-w-[250] xl:min-w-[350px]">
             <Link to="/case-study/52-percent-increase-customer-satisfaction-ecommerce-refund" className="block">
               <div style={styles.aboutCustomer} className="relative min-h-[200px] lg:min-h-[250px] text-center p-4 lg:pl-10">
                 <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                 <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1 relative z-10">
                   52% increase in customer satisfaction for e-commerce refund
                 </p>
               </div>
             </Link>
             <Link to="/case-study/faster-claim-settlement-for-insurance-company" className="block">
               <div style={styles.aboutFaster} className="relative min-h-[200px] lg:min-h-[250px] text-center  p-4 lg:pl-10">
                 <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                 <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1 relative z-10">
                   Faster claim settlement for insurance company
                 </p>
               </div>
             </Link>
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
            <li className="mb-2">
                <Link to="/case-studies" className="text-white hover:underline">Case Studies</Link>
              </li>
              <li className="mb-2">
                <Link to="/what-we-do" className="text-white hover:underline">Balihans Innovation</Link>
              </li>
              <li className="mb-2">
                <Link to="/infocus" className="text-white hover:underline">Insights</Link>
              </li>
              
              <li className="mb-2">
                <Link to="/customer-speak" className="text-white hover:underline">Customer Speak</Link>
              </li>
              
            </ul>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            {/* Empty column for spacing */}
          </div>

          <div className="min-w-[250] xl:min-w-[350px]">
             <Link to="/case-study/52-percent-increase-customer-satisfaction-ecommerce-refund" className="block">
               <div style={styles.aboutCustomer} className="relative min-h-[200px] lg:min-h-[250px] text-center p-4 lg:pl-10">
                 <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                 <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1 relative z-10">
                   52% increase in customer satisfaction for e-commerce refund
                 </p>
               </div>
             </Link>
             <Link to="/case-study/faster-claim-settlement-for-insurance-company" className="block">
               <div style={styles.aboutFaster} className="relative min-h-[200px] lg:min-h-[250px] text-center  p-4 lg:pl-10">
                 <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                 <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1 relative z-10">
                   Faster claim settlement for insurance company
                 </p>
               </div>
             </Link>
          </div>
        </div>
      ),
    },
    {
      name: 'CAREERS',
      route: '/join-us',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl mx-auto px-4 text-white">
          <div className="w-full min-w-[200px] my-4 md:my-8">
            <h3 className="text-2xl lg:text-3xl mb-5">Careers</h3>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            <ul className="list-none text-base lg:text-lg p-0">
            
              <li className="mb-2">
                <Link to="/about-us" className="text-white hover:underline">Why Balihans</Link>
              </li>
              <li className="mb-2">
                <Link to="/diversity-equity-and-inclusion" className="text-white hover:underline">Diversity & Inclusion</Link>
              </li>
              <li className="mb-2">
                <Link to="/join-us" className="text-white hover:underline">Join Us</Link>
              </li>
             
            </ul>
          </div>

          <div className="w-full min-w-[200px] my-4 md:my-8">
            {/* Empty column for spacing */}
          </div>

          <div className="min-w-[250] xl:min-w-[350px]">
             <Link to="/case-study/52-percent-increase-customer-satisfaction-ecommerce-refund" className="block">
               <div style={styles.aboutCustomer} className="relative min-h-[200px] lg:min-h-[250px] text-center p-4 lg:pl-10">
                 <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                 <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1 relative z-10">
                   52% increase in customer satisfaction for e-commerce refund
                 </p>
               </div>
             </Link>
             <Link to="/case-study/faster-claim-settlement-for-insurance-company" className="block">
               <div style={styles.aboutFaster} className="relative min-h-[200px] lg:min-h-[250px] text-center  p-4 lg:pl-10">
                 <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
                 <p className="text-white text-base lg:text-lg pt-16 lg:pt-24 mb-1 relative z-10">
                   Faster claim settlement for insurance company
                 </p>
               </div>
             </Link>
          </div>
        </div>
      ),
    },
    {
      name: 'CONTACT US',
      route: '/contact-us',
      
    },
  ];
