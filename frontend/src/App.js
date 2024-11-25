import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Resuable/Navbar';
import Footer from './components/Resuable/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUsPages/AboutUs';
import LeaderShip from './pages/AboutUsPages/LeaderShip';
import Diversity from './pages/AboutUsPages/Diversity';
import Sustainability from './pages/AboutUsPages/Sustainability';
import WhatWeDo from './pages/WhatWeDoPages/WhatWeDo';
import BSFI from './pages/IndustriesPages/BSFI';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="leadership" element={<LeaderShip />} />
        <Route path="diversity" element={<Diversity />} />
        <Route path="sustainability" element={<Sustainability />} />

        <Route path="/what-we-do" element={<WhatWeDo />} />

        <Route path="/bsfi" element={<BSFI/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;