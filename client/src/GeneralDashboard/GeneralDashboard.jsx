import React from 'react'
import Navbar from './components/Navbar'
import { HeroSection,Companies,Courses, About,Categories,FeedBack,CTA,Footer } from '../LandingPage/components'
import InfluencerSlider from "../LandingPage/components/InfluencerSlider.jsx";

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
        <Categories/>
        <CTA/>
        <div id="support-section">
        <Footer/>
        </div>
    </div>
  )
}

export default LandingPage
