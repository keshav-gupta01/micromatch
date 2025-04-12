// src/BusinessDashboard/BusinessDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardOverview from './components/DashboardOverview';
import PreviousCampaigns from './components/PreviousCampaigns';
import Wallet from './components/Wallet';
import LaunchCampaign from './components/LaunchCampaign';

const dummyCampaigns = []
const BusinessDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "Business User",
    avatar: "/api/placeholder/80/80",
    role: "Business"
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const icons = {
    revenue: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    collaborations: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    logout: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    profile: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    settings: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    menu: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    notification: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    overview: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    launch: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    ),
    previous: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    ),
    analytics: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    ),
    wallet: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    )

  };

  return (
    <div className="h-screen w-screen flex bg-gray-100 overflow-hidden">
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
        <div className="py-4 px-3 border-b border-gray-800 flex justify-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {sidebarCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              )}
            </svg>
          </button>
        </div>
        <nav className="mt-6 flex-grow">
          <ul>
            {[
              { id: 'overview', icon: 'overview' },
              { id: 'launch campaign', icon: 'launch' },
              { id: 'previous campaigns', icon: 'previous' },
              { id: 'analytics', icon: 'analytics' },
              { id: 'wallet', icon: 'wallet' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left px-3 py-3 flex items-center ${activeTab === item.id
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className={`${sidebarCollapsed ? 'mx-auto' : ''}`}>
                    {icons[item.icon]}
                  </span>
                  {!sidebarCollapsed && (
                    <span className="ml-3 capitalize">{item.id}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {!sidebarCollapsed && (
          <div className="p-4 text-gray-400 text-xs border-t border-gray-800">
            <p>© 2023 Influencer Platform</p>
            <p>Version 2.1.0</p>
          </div>
        )}
      </div>
      <div className="flex-grow overflow-y-auto">
        <header className="bg-white py-3 px-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize">
                {activeTab}
            </h1>
            <div className="flex items-center space-x-4">
                <button className="relative p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
                {icons.notification}
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="relative">
                    <div
                    className="flex items-center cursor-pointer"
                    onClick={toggleUserMenu}
                    >
                    <img
                        src={user.avatar}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                    <div className="hidden md:block ml-3">
                        <h3 className="font-medium text-sm text-gray-800">{user.name}</h3>
                        <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    </div>
                    {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                            <ul className="py-1">
                                <li className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                                <span className="mr-2 text-gray-500">{icons.profile}</span>
                                <span className="text-sm">Profile</span>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                                <span className="mr-2 text-gray-500">{icons.settings}</span>
                                <span className="text-sm">Settings</span>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100 flex items-center text-red-600 cursor-pointer border-t border-gray-100">
                                <span className="mr-2">{icons.logout}</span>
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

            {activeTab === 'previous campaigns' && <PreviousCampaigns campaigns={dummyCampaigns} />}
            {activeTab === 'launch campaign' && <LaunchCampaign />}
            
            {activeTab === 'analytics' && <div>Analytics</div>}
            {activeTab === 'wallet' && <Wallet />}
        </main>
      </div>
    </div>
  );
};

export default BusinessDashboard;