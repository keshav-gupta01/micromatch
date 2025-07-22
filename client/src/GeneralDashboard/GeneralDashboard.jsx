import React from 'react'
import { HeroSection, Navbar,Companies, About,CTA,Footer } from './components/index.js'
import InfluencerSlider from "./components/InfluencerSlider.jsx";

function LandingPage() {

  return (
    <div className="app">
        <Navbar/>
        <HeroSection/>
        <Companies/>
        <div id="about-section">
        <About/>
        </div>
        <InfluencerSlider/>
        <CTA/>
        <div id="support-section">
        <Footer/>
        </div>
    </div>
  )
}

export default LandingPage
