import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageTopNavigator from './components/Resuable/PageTopNavigator';
import Navbar from './components/Resuable/Navbar';
import Footer from './components/Resuable/Footer';
import Home from './pages/HomePages/Home';
import AboutUs from './pages/AboutUsPages/AboutUs';
import LeaderShip from './pages/AboutUsPages/LeaderShip';
import Diversity from './pages/AboutUsPages/Diversity';
import Sustainability from './pages/AboutUsPages/Sustainability';
import WhatWeDo from './pages/WhatWeDoPages/WhatWeDo';
import BSFI from './pages/IndustriesPages/BSFI';
import Energy from './pages/IndustriesPages/Energy';
import HealthCare from './pages/IndustriesPages/HealthCare';
import Communications from './pages/IndustriesPages/Communications';
import HighTech from './pages/IndustriesPages/HighTech';
import AI from './pages/WhatWeDoPages/AI';
import StrategyAndConsulting from './pages/WhatWeDoPages/StrategyAndConsulting';
import CloudAndInfrastructure from './pages/WhatWeDoPages/CloudAndInfrastructure';
import Cybersecurity from './pages/WhatWeDoPages/Cybersecurity';
import DataAndAnalytics from './pages/WhatWeDoPages/DataAndAnalytics';
import DigitalEnterprise from './pages/WhatWeDoPages/DigitalEnterprise';
import HomeCaseStudyOne from './pages/HomePages/HomeCaseStudyOne';
import HomeCaseStudyTwo from './pages/HomePages/HomeCaseStudyTwo';
import HomeCaseStudyThree from './pages/HomePages/HomeCaseStudyThree';




function App() {
  return (
    <Router>

      <PageTopNavigator />

      <Navbar />
     <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/balihans-helps-us-based-manufacturing-company-modernize-shop-floor" element={<HomeCaseStudyOne />} />
        <Route path="/elevating-security-posture-with-a-24/7-soc" element={<HomeCaseStudyTwo />} />
        <Route path="/balihans-empowers-media-company-through-digital-transformation" element={<HomeCaseStudyThree />} />
 
        {/* AboutUs Pages */}
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="leadership" element={<LeaderShip />} />
        <Route path="diversity" element={<Diversity />} />
        <Route path="sustainability" element={<Sustainability />} />

         {/* What we do Pages */}
        <Route path="/what-we-do" element={<WhatWeDo />} />

        <Route path="/strategy-and-consulting" element={<StrategyAndConsulting />} />
        <Route path="/cloud-and-infrastructure" element={<CloudAndInfrastructure />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/cybersecurity" element={<Cybersecurity />} />
        <Route path="/data-and-analytics" element={<DataAndAnalytics />} />
        <Route path="/digital-enterprise" element={<DigitalEnterprise />} />

        {/* Industries Pages */}

        <Route path="/bsfi" element={<BSFI/>} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/health-care" element={<HealthCare />} />
        <Route path="/communications" element={<Communications />} />
        <Route path="/high-tech" element={<HighTech />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;




