import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/home.jsx';
import Signup from './signup/signup.jsx';
import Login from './login/login.jsx';
import GeneralDashboard from './GeneralDashboard/GeneralDashboard.jsx';
import InfluencerSignIn from './GeneralDashboard/components/InfluencerSignIn.jsx';
import BrandSignIn from './GeneralDashboard/components/BrandSignIn.jsx';
import InfluencerDashboard from './InfluencerDashboard/InfluencerDashboard.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/general-dashboard" element={<GeneralDashboard />} />
        <Route path = "/influencer-signin" element = {<InfluencerSignIn/>}></Route>
        <Route path = "/brand-signin" element = {<BrandSignIn/>}></Route>
        <Route path = "/influencer-dashboard" element = {<InfluencerDashboard/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
