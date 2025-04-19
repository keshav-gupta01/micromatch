import React from "react";
import { AiOutlineBell } from "react-icons/ai";
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
    <>
      {/* Dashboard Header */}
      <div className="flex items-center justify-between px-5 md:px-10 py-4 bg-white shadow-md">
        {/* Dashboard Title */}
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          <AiOutlineBell className="text-2xl text-gray-600 cursor-pointer" />
          <span className="text-gray-700 font-medium">Sarah Johnson</span>
          <img src="/path/to/profile-picture.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
        </div>
      </div>
      <div className="bg-green-500 text-white text-xl p-5 m-5 rounded-lg shadow-lg">
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