import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './signup/signup.jsx';
import Login from './login/login.jsx';
import GeneralDashboard from './GeneralDashboard/GeneralDashboard.jsx';
import InfluencerSignIn from './GeneralDashboard/components/InfluencerSignIn.jsx';
import BrandSignIn from './GeneralDashboard/components/BrandSignIn.jsx';
import InfluencerDashboard from './InfluencerDashboard/InfluencerDashboard.jsx';
import CampaignsBrowsePage from './InfluencerDashboard/CampaignsBrowsePage.jsx';
import AdminDashboard from './AdminDashboard/AdminDashboard.jsx';
import BusinessDashboard from './BusinessDashboard/BusinessDashboard.jsx';
import LandingPage from './LandingPage/landingPage.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/general-dashboard" element={<GeneralDashboard />} />
        <Route path = "/influencer-signin" element = {<InfluencerSignIn/>}></Route>
        <Route path = "/brand-signin" element = {<BrandSignIn/>}></Route>
        <Route path = "/influencer-dashboard" element = {<InfluencerDashboard/>}></Route>
        <Route path="/campaigns-browse-page" element={<CampaignsBrowsePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/business-dashboard" element={<BusinessDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
