import React from 'react';
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import '../GeneralDashboard.css';

const UserTypeSelection = ({ onBack }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation for Influencers
  const handleInfluencerClick = () => {
    navigate('/influencer-signin'); // Navigate to Influencer Sign In page
  };

  // Function to handle navigation for Brands
  const handleBrandClick = () => {
    navigate('/brand-signin'); // Navigate to Brand Sign In page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-black-gradient p-8 rounded-2xl w-full max-w-md box-shadow">
        <h2 className="text-gradient text-3xl font-semibold mb-8 text-center font-poppins">Choose your path</h2>
        
        <div className="space-y-6">
          {/* Button for Influencers */}
          <button
            onClick={handleInfluencerClick} // Navigate to Influencer Sign In
            className="w-full bg-blue-gradient p-0.5 rounded-lg hover:scale-105 transition-all"
          >
            <div className="bg-primary rounded-lg px-6 py-4 flex items-center justify-between">
              <span className="text-gradient font-semibold font-poppins">Continue as Influencer</span>
              <HiMiniArrowUpRight className="text-gradient text-xl" />
            </div>
          </button>
          
          {/* Button for Brands */}
          <button
            onClick={handleBrandClick} // Navigate to Brand Sign In
            className="w-full bg-blue-gradient p-0.5 rounded-lg hover:scale-105 transition-all"
          >
            <div className="bg-primary rounded-lg px-6 py-4 flex items-center justify-between">
              <span className="text-gradient font-semibold font-poppins">Continue as Brand</span>
              <HiMiniArrowUpRight className="text-gradient text-xl" />
            </div>
          </button>
        </div>
        
        {/* Go Back Button */}
        <button
          onClick={onBack} // Call the onBack function passed as a prop
          className="mt-8 text-dimWhite hover:text-white text-sm mx-auto block font-poppins"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;