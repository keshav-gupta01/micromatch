import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Settings from './components/Settings';
import CampaignsBrowsePage from './components/CampaignsBrowsePage';

const InfluencerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [influencerData, setInfluencerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collaborations, setCollaborations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalEarnings: '0',
    activeCollaborations: '0',
    engagementRate: '0%',
    totalFollowers: '0'
  });
  const navigate = useNavigate();
  
  // Get influencer ID from localStorage
  const influencerId = localStorage.getItem('influencerId');
  
  // Fetch influencer data on component mount
  useEffect(() => {
    const fetchInfluencerData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token || !influencerId || influencerId === 'null') {
          console.warn('Token or influencer ID not found');
          // Set fallback data for demo purposes
          setInfluencerData({
            name: "Jane Doe",
            profilePicture: "https://res.cloudinary.com/dmlzftk1w/image/upload/v1753626484/campaign_media/nrz9jf315akgnhtxln5n.png",
            gmail: "jane.doe@example.com",
            instaId: "@janedoe",
            verified: true,
            category: "Lifestyle"
          });
          // Load dummy data even without token
          await fetchCollaborations(null);
          await fetchPayments(null);
          await fetchStats(null);
          setLoading(false);
          return;
        }

        const response = await fetch(`https://micromatch-backend.onrender.com/api/influencers/${influencerId}`, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setInfluencerData(data.influencer);
            // Load dummy data for collaborations, payments, and stats
            await fetchCollaborations(token);
            await fetchPayments(token);
            await fetchStats(token);
          }
        } else {
          console.error('Failed to fetch influencer data');
          // Set fallback data
          setInfluencerData({
            name: "Jane Doe",
            profilePicture: "https://res.cloudinary.com/dmlzftk1w/image/upload/v1753626484/campaign_media/nrz9jf315akgnhtxln5n.png",
            gmail: "jane.doe@example.com",
            instaId: "@janedoe",
            verified: true,
            category: "Lifestyle"
          });
          // Still load dummy data even with fallback
          await fetchCollaborations(token);
          await fetchPayments(token);
          await fetchStats(token);
        }
      } catch (error) {
        console.error('Error fetching influencer data:', error);
        // Set fallback data
        setInfluencerData({
          name: "Jane Doe",
          profilePicture: "https://res.cloudinary.com/dmlzftk1w/image/upload/v1753626484/campaign_media/nrz9jf315akgnhtxln5n.png",
          gmail: "jane.doe@example.com",
          instaId: "@janedoe",
          verified: true,
          category: "Lifestyle"
        });
        // Still load dummy data even with error
        await fetchCollaborations(null);
        await fetchPayments(null);
        await fetchStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencerData();
  }, [influencerId]);

  // Set dummy collaborations data
  const fetchCollaborations = async (token) => {
    // Dummy collaborations data
    const dummyCollaborations = [
      { id: 1, brandName: "FitStyle", campaignType: "Sponsored Post", status: "Completed", payment: "500" },
      { id: 2, brandName: "GlowCosmetics", campaignType: "Product Review", status: "Completed", payment: "300" },
      { id: 3, brandName: "TechGadgets", campaignType: "Unboxing Video", status: "Completed", payment: "650" },
      { id: 4, brandName: "EcoFriendly", campaignType: "Brand Ambassador", status: "Active", payment: "800" },
      { id: 5, brandName: "TravelMore", campaignType: "Instagram Story", status: "Completed", payment: "250" },
    ];
    setCollaborations(dummyCollaborations);
  };

  // Set dummy payments data
  const fetchPayments = async (token) => {
    // Dummy payments data
    const dummyPayments = [
      { id: 1, date: "2023-10-01", amount: "500", brandName: "FitStyle", status: "Paid" },
      { id: 2, date: "2023-09-15", amount: "300", brandName: "GlowCosmetics", status: "Pending" },
      { id: 3, date: "2023-08-22", amount: "650", brandName: "TechGadgets", status: "Paid" },
      { id: 4, date: "2023-07-30", amount: "800", brandName: "EcoFriendly", status: "Paid" },
      { id: 5, date: "2023-07-10", amount: "250", brandName: "TravelMore", status: "Pending" },
    ];
    setPayments(dummyPayments);
  };

  // Set dummy stats data
  const fetchStats = async (token) => {
    // Dummy stats data
    const dummyStats = {
      totalEarnings: "2,500",
      activeCollaborations: "4",
      engagementRate: "8.5%",
      totalFollowers: "125K"
    };
    setStats(dummyStats);
  };
  
  // Default user data (fallback)
  const defaultUser = {
    name: "Sarah Johnson",
    avatar: "/api/placeholder/80/80",
    role: "Content Creator"
  };

  const user = influencerData ? {
    name: influencerData.name || defaultUser.name,
    avatar: influencerData.profilePicture || defaultUser.avatar,
    role: defaultUser.role,
    gmail: influencerData.gmail,
    instaId: influencerData.instaId,
    verified: influencerData.verified
  } : defaultUser;
  
  // Handle logout
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('influencerId');
    localStorage.removeItem('userType');
    sessionStorage.clear();
    
    // Navigate to login page
    navigate('/login');
  };

  // Stats data array for rendering
  const statsArray = [
    { label: "Total Earnings", value: `$${stats.totalEarnings}`, icon: "revenue" },
    { label: "Active Collaborations", value: stats.activeCollaborations, icon: "collaborations" },
    { label: "Engagement Rate", value: stats.engagementRate, icon: "engagement" },
    { label: "Total Followers", value: stats.totalFollowers, icon: "followers" },
  ];

  // Toggle user menu
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  // Icon components
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
    engagement: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    followers: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
    analytics: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#104581]"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex bg-[#96AED0] overflow-hidden">
      {/* Left sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-gray-900 text-white flex flex-col transition-all duration-300`}>
        {/* Toggle button */}
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
        
        {/* Navigation menu */}
        <nav className="mt-6 flex-grow">
          <ul>
            {[
              { id: 'overview', icon: 'overview' },
              { id: 'campaigns', icon: 'collaborations' },
              { id: 'payments', icon: 'revenue' },
              { id: 'analytics', icon: 'analytics' },
              { id: 'settings', icon: 'settings' }
            ].map((item) => (
              <li key={item.id}>
                <button
                  className={`w-full text-left px-3 py-3 flex items-center ${
                    activeTab === item.id
                      ? 'bg-[#104581] text-white font-medium'
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
        
        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 text-gray-400 text-xs border-t border-gray-800">
            <p>© 2023 Influencer Platform</p>
            <p>Version 2.1.0</p>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <div className="flex-grow overflow-y-auto">
        {/* Header */}
        <header className="bg-white py-3 px-6 flex justify-between items-center relative z-10">
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="flex items-center space-x-4">
            {/* Notification button */}
            <button className="relative p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
              {icons.notification}
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {/* User profile */}
            <div className="relative user-menu-container">
              <div 
                className="flex items-center cursor-pointer"
                onClick={toggleUserMenu}
              >
                <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
                />
                <div className="hidden md:block ml-3">
                  <div className="flex items-center">
                    <h3 className="font-medium text-sm text-gray-800">{user.name}</h3>
                    {user.verified && (
                      <span className="ml-1 text-green-500 text-xs">✓</span>
                    )}
                  </div>
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
              
              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <ul className="py-1">
                    <li>
                      <Link 
                        to="/influencer-dashboard/profile"
                        className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span className="mr-2 text-gray-500">{icons.profile}</span>
                        <span className="text-sm">Profile</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setActiveTab('settings');
                          setUserMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer text-left"
                      >
                        <span className="mr-2 text-gray-500">{icons.settings}</span>
                        <span className="text-sm">Settings</span>
                      </button>
                    </li>
                    <li className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 hover:bg-gray-100 flex items-center text-red-600 cursor-pointer text-left"
                      >
                        <span className="mr-2">{icons.logout}</span>
                        <span className="text-sm">Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Wavy bottom border */}
        <div className="relative bg-[#96AED0] w-full overflow-hidden h-12">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 120" 
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <path 
              fill="#ffffff" 
              d="M0,64L40,53.3C80,43,160,21,240,32C320,43,400,85,480,96C560,107,640,85,720,74.7C800,64,880,64,960,69.3C1040,75,1120,85,1200,80C1280,75,1360,53,1400,42.7L1440,32L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            />
          </svg>
        </div>
        
        {/* Main content area */}
        <main className="p-6">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsArray.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                  >
                    <div className="flex items-start">
                      <div className="p-3 rounded-lg bg-blue-100 text-[#104581] mr-4">
                        {icons[stat.icon]}
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Profile Summary Card */}
              {influencerData && (
                <div className="mb-8 bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Profile Summary</h2>
                    <Link 
                      to="/influencer-dashboard/profile"
                      className="text-[#104581] text-sm hover:text-blue-800"
                    >
                      Edit Profile
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src={user.avatar} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover border-4 border-[#104581] mr-4"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                        {user.verified && (
                          <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{user.instaId}</p>
                      <p className="text-gray-500 text-sm">{user.gmail}</p>
                      {influencerData.category && (
                        <p className="text-gray-500 text-sm">Category: {influencerData.category}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Previous Collaborations Table */}
              <div className="mb-8 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Previous Collaborations</h2>
                  <button className="text-[#104581] text-sm hover:text-[#104581]">View All</button>
                </div>
                <div className="overflow-x-auto">
                  {collaborations.length > 0 ? (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {collaborations.map((collab) => (
                          <tr key={collab.id} className="hover:bg-gray-50">
                            <td className="py-4 px-6 text-sm text-gray-900">{collab.brandName || collab.brand}</td>
                            <td className="py-4 px-6 text-sm text-gray-900">{collab.campaignType || collab.type}</td>
                            <td className="py-4 px-6 text-sm">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                collab.status === 'Completed' || collab.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : collab.status === 'Active' || collab.status === 'active'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {collab.status}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">
                              ${collab.payment || collab.amount || '0'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500 text-sm">No collaborations found</p>
                      <p className="text-gray-400 text-xs mt-1">Start applying to campaigns to see your collaborations here</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'campaigns' && <CampaignsBrowsePage />}
          {activeTab === 'settings' && <Settings />}
          
          {activeTab === 'payments' && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
              </div>
              <div className="overflow-x-auto">
                {payments.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6 text-sm text-gray-900">
                            {new Date(payment.date || payment.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900">{payment.brandName || payment.brand}</td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900">
                            ${payment.amount}
                          </td>
                          <td className="py-4 px-6 text-sm">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              payment.status === 'Paid' || payment.status === 'paid'
                                ? 'bg-green-100 text-green-800' 
                                : payment.status === 'Pending' || payment.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-[#104581] hover:text-blue-800 cursor-pointer">
                            View Receipt
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 text-sm">No payment history found</p>
                    <p className="text-gray-400 text-xs mt-1">Complete collaborations to see your payment history here</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Analytics tab */}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="text-center">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-500 text-sm mb-4">
                  We're working on bringing you detailed analytics about your performance, 
                  engagement rates, and collaboration insights.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <h4 className="font-medium text-blue-800 mb-2">What's coming:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Performance metrics and engagement analytics</li>
                    <li>• Campaign ROI and conversion tracking</li>
                    <li>• Audience demographics and insights</li>
                    <li>• Earnings and growth trends</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default InfluencerDashboard;