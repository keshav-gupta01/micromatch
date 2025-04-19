import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Profile from './components/Profile';
import { User, Bell, LogOut, Settings, DollarSign, Users, Activity, UserPlus } from "lucide-react";
import PreviousCollaborations from './components/PreviousCollaborations';
import AvailableOpportunities from './components/AvailableOpportunities';
const InfluencerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // User information
  const user = {
    name: "Sarah Johnson",
    avatar: "/api/placeholder/80/80",
    role: "Content Creator",
  };
  

  const previousCollaborations = [
    { id: 1, brand: "FitStyle", type: "Sponsored Post", status: "Completed", payment: "$500" },
    { id: 2, brand: "GlowCosmetics", type: "Product Review", status: "Completed", payment: "$300" },
    { id: 3, brand: "TechGadgets", type: "Unboxing Video", status: "Completed", payment: "$650" },
    { id: 4, brand: "EcoFriendly", type: "Brand Ambassador", status: "Completed", payment: "$800" },
    { id: 5, brand: "TravelMore", type: "Instagram Story", status: "Completed", payment: "$250" },
  ];

  const availableCollaborations = [
    {
      id: 1,
      brand: "Food Delight",
      logo: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",      
      description: "Showcase our range of gourmet desserts and pastries.",
      payment: "$450",
      deadline: "2024-01-15"
    },
    {
      id: 2,
      brand: "First Gear Cafe",
      logo: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Create a video highlighting our popular coffee blends and breakfast options.",
      payment: "$300",
      deadline: "2023-12-20"
    },
    {
      id: 3,
      brand: "Fenny's Kitchen",
      logo: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
      description: "Share your dining experience featuring our family meal recipes.",
      payment: "$380",
      deadline: "2024-01-05"
    },
    {
      id: 4,
      brand: "Rasoi Restaurant",      
      logo: "https://images.unsplash.com/photo-1552590635-27c2c2128abf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Create a review video showcasing our authentic Indian dishes.",
      payment: "$550",
      deadline: "2023-12-28"
    },
  ];

  const payments = [
    { id: 1, date: "2023-10-01", amount: "$500", brand: "FitStyle", status: "Paid" },
    { id: 2, date: "2023-09-15", amount: "$300", brand: "GlowCosmetics", status: "Pending" },
    { id: 3, date: "2023-08-22", amount: "$650", brand: "TechGadgets", status: "Paid" },
    { id: 4, date: "2023-07-30", amount: "$800", brand: "EcoFriendly", status: "Paid" },
    { id: 5, date: "2023-07-10", amount: "$250", brand: "TravelMore", status: "Pending" },
  ];

  // Define icons here
  const Revenue = <DollarSign size={20} color="#F59E0B" />;
  const Collaborations = <Users size={20} color="#3B82F6" />;
  const Engagement = <Activity size={20} color="#6EE7B7" />;
  const Followers = <UserPlus size={20} color="#DC2626" />;
  const stats = [
    { label: "Total Earnings", value: "$2,500", icon: Revenue },
   { label: "Active Collaborations", value: "4", icon: Collaborations },
   { label: "Engagement Rate", value: "8.5%", icon: Engagement },
   { label: "Total Followers", value: "125K", icon: Followers },
 ];
  // Toggle user menu
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Navigate to available opportunities page
  const navigateToAvailableOpportunities = () => {
    navigate('/campaigns-browse-page');
  };

  

  return (
    <div className="h-screen w-screen flex bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {/* Main content */}
      <div className="flex-grow overflow-y-auto" >
        {/* Header - with user profile moved to right side */}
        <header className="bg-white py-3 px-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
           {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <h1 className="text-2xl font-semibold text-gray-800">
          
            {activeTab === 'profile' && 'Profile Information'}
          </h1>
          
        </header>
        
        {/* Main content area */}
        <main className="p-6">
          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                  >
                    <div className="flex items-start">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Previous Collaborations - Professional Table */}
              <div className="mb-8 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Previous Collaborations</h2>
                  <button className="text-blue-600 text-sm hover:text-blue-800">View All</button>
                </div>
                <div className="overflow-x-auto">
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
                      {previousCollaborations.map((collab) => (
                        <tr key={collab.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6 text-sm text-gray-900">{collab.brand}</td>
                          <td className="py-4 px-6 text-sm text-gray-900">{collab.type}</td>
                          <td className="py-4 px-6 text-sm">
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              {collab.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm font-medium text-gray-900">{collab.payment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Available Collaborations - Card Style with Brand Logos */}
              <div className="mb-8 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Available Opportunities</h2>
                  <button 
                    className="text-blue-600 text-sm hover:text-blue-800" 
                    onClick={navigateToAvailableOpportunities} // Added onClick handler here
                  >
                    Browse More
                  </button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {availableCollaborations.map((collab) => (
                    <div 
                      key={collab.id} 
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center mb-3">
                        <img 
                          src={collab.logo} 
                          alt={`${collab.brand} logo`} 
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-800">{collab.brand}</h3>
                          <span className="font-bold text-gray-900">{collab.payment}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{collab.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Deadline: {collab.deadline}</span>
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'Sales' && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
              </div>
              <div className="overflow-x-auto">
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
                        <td className="py-4 px-6 text-sm text-gray-900">{payment.date}</td>
                        <td className="py-4 px-6 text-sm text-gray-900">{payment.brand}</td>
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{payment.amount}</td>
                        <td className="py-4 px-6 text-sm">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            payment.status === 'Paid' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                          View Receipt
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
         {activeTab === 'profile' && <Profile />}
         {activeTab === 'previous-collaborations' && <PreviousCollaborations previousCollaborations={previousCollaborations}/>}
         {activeTab === 'available-opportunities' && <AvailableOpportunities availableCollaborations={availableCollaborations}/>}
       </main>
      </div>
    </div>
  );
};

export default InfluencerDashboard;