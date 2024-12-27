import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageTopNavigator from './components/Resuable/PageTopNavigator';
import Navbar from './components/Resuable/Navbar';
import Footer from './components/Resuable/Footer';

import Home from './pages/HomePages/Home';
import HomeCaseStudyOne from './pages/HomePages/HomeCaseStudyOne';
import HomeCaseStudyTwo from './pages/HomePages/HomeCaseStudyTwo';
import HomeCaseStudyThree from './pages/HomePages/HomeCaseStudyThree';
import HomeCaseStudyFour from './pages/HomePages/HomeCaseStudyFour';


import AboutUs from './pages/AboutUsPages/AboutUs';
import LeaderShip from './pages/AboutUsPages/LeaderShip';
import Diversity from './pages/AboutUsPages/Diversity';
import Sustainability from './pages/AboutUsPages/Sustainability';
import CustomerSpeak from './pages/AboutUsPages/CustomerSpeak';



import BSFI from './pages/IndustriesPages/BSFI';
import Energy from './pages/IndustriesPages/Energy';
import HealthCare from './pages/IndustriesPages/HealthCare';
import Communications from './pages/IndustriesPages/Communications';
import HighTech from './pages/IndustriesPages/HighTech';
import Hospitality from './pages/IndustriesPages/Hospitality';
import Insurance from './pages/IndustriesPages/Insurance';
import Manufacturing from './pages/IndustriesPages/Manufacturing';


import WhatWeDo from './pages/WhatWeDoPages/WhatWeDo';
import AI from './pages/WhatWeDoPages/AI';
import StrategyAndConsulting from './pages/WhatWeDoPages/StrategyAndConsulting';
import CloudAndInfrastructure from './pages/WhatWeDoPages/CloudAndInfrastructure';
import Cybersecurity from './pages/WhatWeDoPages/Cybersecurity';
import DataAndAnalytics from './pages/WhatWeDoPages/DataAndAnalytics';
import DigitalEnterprise from './pages/WhatWeDoPages/DigitalEnterprise';
import Web3Solutions from './pages/WhatWeDoPages/Web3Solutions';
import IOT from './pages/WhatWeDoPages/IOT';
import TestingServices from './pages/WhatWeDoPages/TestingServices';


import PrivacyPolicy from './pages/PoliciesPages/PrivacyPolicy';
import CookiePolicy from './pages/PoliciesPages/CookiePolicy';
import SecurityPolicy from './pages/PoliciesPages/SecurityPolicy';
import Disclaimer from './pages/PoliciesPages/Disclaimer';

import ContactUs from './pages/ContactUsPage/ContactUs';







function App() {
  return (
    <Router>

      <PageTopNavigator />

      <Navbar />
     <Routes>

        {/* Home Pages */}
        <Route path="/" element={<Home />} />
        
        <Route path="/balihans-helps-us-based-manufacturing-company-modernize-shop-floor" element={<HomeCaseStudyOne />} />
        <Route path="/elevating-security-posture-with-a-24/7-soc" element={<HomeCaseStudyTwo />} />
        <Route path="/balihans-empowers-media-company-through-digital-transformation" element={<HomeCaseStudyThree />} />
        <Route path="/optimizing-ecommerce-payments-for-seamless-checkout" element={<HomeCaseStudyFour />} />
 
        {/* AboutUs Pages */}
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/leadership" element={<LeaderShip />} />
        <Route path="/diversity-equity-and-inclusion" element={<Diversity />} />
        <Route path="/corporate-sustainability" element={<Sustainability />} />
        <Route path="/customer-speak" element={<CustomerSpeak />} />

         {/* What we do Pages */}
        <Route path="/what-we-do" element={<WhatWeDo />} />

        <Route path="/strategy-and-consulting" element={<StrategyAndConsulting />} />
        <Route path="/cloud-and-infrastructure" element={<CloudAndInfrastructure />} />
        <Route path="/artifical-intelligence" element={<AI />} />
        <Route path="/cybersecurity" element={<Cybersecurity />} />
        <Route path="/data-and-analytics" element={<DataAndAnalytics />} />
        <Route path="/digital-enterprise" element={<DigitalEnterprise />} />
        <Route path="/web3-solutions" element={<Web3Solutions />} />
        <Route path="/internet-of-things" element={<IOT />} />
        <Route path="/testing-services" element={<TestingServices />} />

        {/* Industries Pages */}

        <Route path="/banking-and-financial-services" element={<BSFI/>} />
        <Route path="/energy-resources-and-utilities" element={<Energy />} />
        <Route path="/healthcare-and-life-sciences" element={<HealthCare />} />
        <Route path="/communications-and-information-services" element={<Communications />} />
        <Route path="/high-tech" element={<HighTech />} />
        <Route path="/hospitality" element={<Hospitality />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route path="/manufacturing" element={<Manufacturing />} />


          {/* Policies Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/security-policy" element={<SecurityPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

         {/* ContactUs Pages */} 
        <Route path="/contact-us" element={<ContactUs />} />


      </Routes>
      <Footer />
    </Router>
  );
}

export default App;




