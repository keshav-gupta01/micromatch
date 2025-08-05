import React, { useState, useEffect } from 'react';

const CampaignsBrowsePage = () => {
  const [eligibleCampaigns, setEligibleCampaigns] = useState([]);
  const [acceptedCampaigns, setAcceptedCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('eligible');
  const [submitModal, setSubmitModal] = useState({ isOpen: false, campaignId: null, campaignName: '' });
  const [storyUrl, setStoryUrl] = useState('');

  const influencerId = localStorage.getItem('influencerId');

  /** ===============================
   * Fetch Eligible Campaigns
   =============================== */
  const fetchEligibleCampaigns = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://micromatch-backend-gpchh5eudjfmdqa2.centralindia-01.azurewebsites.net/api/influencers/${influencerId}/campaigns/eligible`, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      if (data.success) setEligibleCampaigns(data.campaigns);
      else throw new Error(data.message || 'Failed to load eligible campaigns');
    } catch (err) {
      console.error('Error fetching eligible campaigns:', err);
      setError('Failed to load eligible campaigns.');
    }
  };

  /** ===============================
   * Fetch Accepted Campaigns
   =============================== */
  const fetchAcceptedCampaigns = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://micromatch-backend-gpchh5eudjfmdqa2.centralindia-01.azurewebsites.net/api/influencers/${influencerId}/campaigns/accepted`, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      if (data.success) setAcceptedCampaigns(data.campaigns);
      else throw new Error(data.message || 'Failed to load accepted campaigns');
    } catch (err) {
      console.error('Error fetching accepted campaigns:', err);
      setError('Failed to load accepted campaigns.');
    }
  };

  /** ===============================
   * Accept Campaign
   =============================== */
  const handleAcceptCampaign = async (campaignId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://micromatch-backend-gpchh5eudjfmdqa2.centralindia-01.azurewebsites.net/api/influencers/${influencerId}/campaigns/${campaignId}/accept`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        // Optimistically update UI
        setEligibleCampaigns(prev => prev.filter(c => c._id !== campaignId));
        const accepted = eligibleCampaigns.find(c => c._id === campaignId);
        if (accepted) setAcceptedCampaigns(prev => [...prev, accepted]);

        // Sync with DB
        await fetchAcceptedCampaigns();
        alert('Campaign accepted successfully!');
      } else throw new Error(data.message);
    } catch (error) {
      console.error('Error accepting campaign:', error);
      alert('Failed to accept campaign. Please try again.');
    }
  };

  /** ===============================
   * Submit Campaign Story
   =============================== */
  const handleSubmitStory = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://micromatch-backend-gpchh5eudjfmdqa2.centralindia-01.azurewebsites.net/api/influencers/${influencerId}/campaigns/${submitModal.campaignId}/submit`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ storyUrl })
      });
      const data = await response.json();
      if (data.success) {
        setSubmitModal({ isOpen: false, campaignId: null, campaignName: '' });
        setStoryUrl('');
        await fetchAcceptedCampaigns();
        alert('Campaign story submitted successfully!');
      } else throw new Error(data.message);
    } catch (error) {
      console.error('Error submitting story:', error);
      alert('Failed to submit story. Please try again.');
    }
  };

  /** ===============================
   * Initial Fetch
   =============================== */
  useEffect(() => {
    const fetchAll = async () => {
      if (!influencerId) {
        setError('No influencer ID found. Please log in again.');
        setLoading(false);
        return;
      }
      setLoading(true);
      await Promise.all([fetchEligibleCampaigns(), fetchAcceptedCampaigns()]);
      setLoading(false);
    };
    fetchAll();
  }, [influencerId]);

  const currentCampaigns = activeTab === 'eligible' ? eligibleCampaigns : acceptedCampaigns;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Browse Campaigns</h1>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('eligible')}
          className={`px-4 py-2 border-b-2 ${activeTab === 'eligible' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Eligible Campaigns ({eligibleCampaigns.length})
        </button>
        <button
          onClick={() => setActiveTab('accepted')}
          className={`px-4 py-2 border-b-2 ml-4 ${activeTab === 'accepted' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Accepted Campaigns ({acceptedCampaigns.length})
        </button>
      </div>

      {loading && <div className="text-gray-500">Loading campaigns...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {!loading && !error && currentCampaigns.length === 0 && (
        <div className="text-gray-500">No {activeTab} campaigns found.</div>
      )}

      {!loading && !error && currentCampaigns.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentCampaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={campaign.brand?.logo || "/api/placeholder/60/60"}
                    alt="logo"
                    className="w-10 h-10 rounded-full"
                  />
                  <h3 className="font-semibold">{campaign.brand?.brandName}</h3>
                </div>
                <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                  {activeTab === 'eligible' ? 'Available' : 'Accepted'}
                </span>
              </div>

              {/* Campaign Details */}
              <h2 className="text-xl font-bold mb-2">{campaign.campaignName}</h2>
              <p className="text-gray-600 mb-4">{campaign.productDescription}</p>
              <div className="text-sm text-gray-500 mb-4">
                Budget: ${campaign.budget} | Deadline: {campaign.deadline}
              </div>

              {/* Media Files for Accepted Campaigns */}
              {activeTab === 'accepted' && campaign.media && campaign.media.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Campaign Files:</h4>
                  <div className="space-y-2">
                    {campaign.media.map((url, idx) => {
                      const downloadUrl = url.includes('/upload/')
                        ? url.replace('/upload/', '/upload/fl_attachment/')
                        : url;
                      return (
                        <div key={idx} className="flex items-center space-x-3">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Preview File {idx + 1}
                          </a>
                          <a
                            href={downloadUrl}
                            className="px-2 py-1 bg-green-600 text-white rounded"
                            download
                          >
                            Download
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Action Button */}
              {activeTab === 'eligible' ? (
                <button
                  onClick={() => handleAcceptCampaign(campaign._id)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Accept Campaign
                </button>
              ) : (
                <button
                  onClick={() =>
                    setSubmitModal({
                      isOpen: true,
                      campaignId: campaign._id,
                      campaignName: campaign.campaignName,
                    })
                  }
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
                >
                  Submit Story
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Submit Story Modal */}
      {submitModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Submit Story URL</h3>
            <p className="text-gray-600 mb-4">Campaign: {submitModal.campaignName}</p>
            <input
              type="url"
              placeholder="Enter your Instagram story URL"
              value={storyUrl}
              onChange={(e) => setStoryUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setSubmitModal({ isOpen: false, campaignId: null, campaignName: '' })}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitStory}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignsBrowsePage;
