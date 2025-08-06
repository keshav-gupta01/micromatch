import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DashboardOverview from './components/DashboardOverview';
import PreviousCampaigns from './components/PreviousCampaigns';
import Wallet from './components/Wallet';
import LaunchCampaign from './components/LaunchCampaign';

const dummyCampaigns = [];

const BusinessDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [brand, setBrand] = useState(null);

  const navigate = useNavigate();

  // =====================
  // Fetch Brand Profile
  // =====================
  useEffect(() => {
    const fetchBrandProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

       const res = await axios.get('https://micromatch-backend.onrender.com/api/brands/getprofile', {
          headers: { 'x-auth-token': token },
        });

        setBrand(res.data);
      } catch (err) {
        console.error('Error fetching brand profile:', err);
        navigate('/login');
      }
    };

    fetchBrandProfile();
  }, [navigate]);

  // =====================
  // Logout Function
  // =====================
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  // Show loader until brand is fetched
  if (!brand) return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen w-screen flex bg-[#96AED0] overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
        {/* Sidebar Toggle */}
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

        {/* Sidebar Navigation */}
        <nav className="mt-6 flex-grow">
          <ul>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'launch campaign', label: 'Launch Campaign' },
              { id: 'previous campaigns', label: 'Previous Campaigns' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'wallet', label: 'Wallet' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left px-3 py-3 flex items-center ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white font-medium'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {!sidebarCollapsed && <span className="ml-3 capitalize">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto">
        {/* Header */}
        <header className="bg-white py-3 px-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize">{activeTab}</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              {/* Notification Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleUserMenu}
              >
                {/* Brand Logo instead of user icon */}
                <img
                  src={brand.logo || '/default-avatar.png'}
                  alt="Brand Logo"
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <div className="hidden md:block ml-3">
                  <h3 className="font-medium text-sm text-gray-800">{brand.businessName}</h3>
                  <p className="text-xs text-gray-500">{brand.email}</p>
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
                    <Link to="/business-dashboard/profile">
                      <li className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                        <span className="text-sm">Profile</span>
                      </li>
                    </Link>
                    <Link to="/business-dashboard/settings">
                      <li className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                        <span className="text-sm">Settings</span>
                      </li>
                    </Link>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 flex items-center text-red-600 cursor-pointer border-t border-gray-100"
                      onClick={handleLogout}
                    >
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
