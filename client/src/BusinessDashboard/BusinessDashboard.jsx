// src/BusinessDashboard/BusinessDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardOverview from './components/DashboardOverview';
import PreviousCampaigns from './components/PreviousCampaigns';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import LaunchCampaign from './components/LaunchCampaign';
import { Sidebar } from './components/Sidebar';
import { User, Bell, LogOut, Settings } from "lucide-react";


const dummyCampaigns = []
const BusinessDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // Changed initial state to 'overview'
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "Business User",
    avatar: "/api/placeholder/80/80",
    role: "Business"
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className="h-screen w-screen flex bg-gray-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow overflow-y-auto">
        <header className="bg-white py-3 px-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize">
            {activeTab}
          </h1>
          <div className="flex items-center space-x-4">
            {/* Notification button */}
            <button className="relative p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              <Bell size={20} />

            </button>

            {/* User profile moved to right side */}
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleUserMenu}
              >

                <User size={20} className="mr-2 text-gray-500" />

                <div className="hidden md:block ml-3">
                  <h3 className="font-medium text-sm text-gray-800">{user.name}</h3>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>


                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <ul className="py-1">
                    <li className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" onClick={() => setActiveTab("profile")}>
                      <User size={20} className="mr-2 text-gray-500" />
                      <span className="text-sm">Profile</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                      <Settings size={20} className="mr-2 text-gray-500" />
                      <span className="text-sm">Settings</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 flex items-center text-red-600 cursor-pointer border-t border-gray-100">
                      <LogOut size={20} className="mr-2" />
                      <span className="text-sm">Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-6">
          {activeTab === 'overview' && <DashboardOverview />}
          {activeTab === 'previous-campaigns' && <PreviousCampaigns campaigns={dummyCampaigns} />} {/* Changed to 'previous-campaigns' */}
          {activeTab === 'launch-campaign' && <LaunchCampaign />} {/* Changed to 'launch-campaign' */}

          {activeTab === 'analytics' && <div>Analytics</div>}
          {activeTab === 'wallet' && <Wallet />}


          {activeTab === 'profile' && <Profile />}

        </main>
      </div>
    </div>
  );
};

export default BusinessDashboard;
