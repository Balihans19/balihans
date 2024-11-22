import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Resuable/Navbar';
import Footer from './components/Resuable/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUsPages/AboutUs';
import LeaderShip from './pages/AboutUsPages/LeaderShip';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="leadership" element={<LeaderShip />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;