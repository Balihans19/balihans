import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageTopNavigator from './components/Resuable/PageTopNavigator';
import Navbar from './components/Resuable/Navbar';
import Footer from './components/Resuable/Footer';
import Home from './pages/Home';
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




function App() {
  return (
    <Router>

      <PageTopNavigator />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="leadership" element={<LeaderShip />} />
        <Route path="diversity" element={<Diversity />} />
        <Route path="sustainability" element={<Sustainability />} />

        <Route path="/what-we-do" element={<WhatWeDo />} />

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




