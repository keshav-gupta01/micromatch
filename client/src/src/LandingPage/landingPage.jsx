import React from 'react'
import { HeroSection, Navbar,Companies,Courses, Achievement,Categories,FeedBack,CTA,Footer } from './components'
import InfluencerSlider from "./components/InfluencerSlider.jsx";

function LandingPage() {

  return (
    <div className="app">
        <Navbar/>
        <HeroSection/>
        <Companies/>
        <InfluencerSlider/>
        <Achievement/>
        <Categories/>
        {/* <FeedBack/> */}
        <CTA/>
        <Footer/>
    </div>
  )
}

export default LandingPage
