import React from "react";
import Business from "./components/Business.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollTop from "./components/ScrollTop.jsx";
import Testimonials from "./components/Testimonials.jsx";
import InfluencerSlider from "./components/InfluencerSlider.jsx";
import './GeneralDashboard.css';

const GeneralDashboard = () => {
  return (
    <><div className="bg-green-500 text-white text-xl p-5 m-5 rounded-lg shadow-lg">
      Tailwind is working!
    </div>
    <div className="bg-primary text-white w-full h-full">
        {/* Navbar Component */}
        <Navbar />

        {/* Scroll-to-top functionality */}
        <ScrollTop />

        {/* Main Content Container */}
        <div className="container px-5 md:px-10 mx-auto">
          {/* Hero Section */}
          <Hero />

          {/* Business Section */}
          <Business />

          {/* Influencer Slider Section */}
          <InfluencerSlider />

          {/* Testimonials Section */}
          <Testimonials />

          {/* Footer Section */}
          <Footer />
        </div>
      </div></>
  );
};

export default GeneralDashboard;