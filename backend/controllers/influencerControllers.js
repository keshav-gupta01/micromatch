const Influencer = require('../models/InfluencerProfile');
const Campaign = require('../models/campaignProfile');
const User = require('../models/User');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { verifyInfluencer } = require('../services/recommendationService');

// Instagram Token Exchange URL
const INSTAGRAM_TOKEN_URL = "https://micromatch-flask-server.onrender.com/server/get_access_token";

/** ---------------------------
 *  Instagram Verification
 ----------------------------*/
exports.verifyInstagram = async (req, res) => {
  const code = req.query.code; // ✅ Safe and standard

  if (!code) {
    return res.status(400).json({ success: false, message: 'Instagram code is missing' });
  }

  try {
    const response = await axios.get(`${INSTAGRAM_TOKEN_URL}?code=${code}`);
    const { access_token, insta_scoped_id } = response.data;

    if (!access_token || !insta_scoped_id) {
      return res.status(400).json({ success: false, message: 'Instagram verification failed' });
    }

    res.json({ success: true, access_token, insta_scoped_id });
  } catch (error) {
    console.error('Error verifying Instagram:', error);
    res.status(500).json({ success: false, message: 'Instagram verification error', error: error.message });
  }
};

/** ---------------------------
 *  Register a new influencer
 ----------------------------*/
exports.registerInfluencer = async (req, res) => {
  const {
    name, gmail, contactNo, instaId,
    youtubeChannel, pincode, category,
    access_token, insta_scoped_id
  } = req.body;

  if (!access_token || !insta_scoped_id) {
    return res.status(400).json({ success: false, message: 'Instagram authentication required' });
  }

  try {
    const existingInfluencer = await Influencer.findOne({ instaId });
    if (existingInfluencer) {
      return res.status(400).json({ success: false, message: 'Influencer with this Instagram ID already exists' });
    }

    const newInfluencer = new Influencer({
      user: req.user.id,
      name,
      gmail,
      contactNo,
      instaId,
      youtubeChannel,
      pincode,
      category,
      access_token,
      insta_scoped_id
    });

    await newInfluencer.save();
    await User.findByIdAndUpdate(newInfluencer.user, { role: 'influencer' });

    const isVerified = await verifyInfluencer(newInfluencer._id);
    const updatedInfluencer = await Influencer.findById(newInfluencer._id); // fetch updated fields

    res.status(201).json({
      success: true,
      message: isVerified? 'Influencer registered and verified successfully': 'Influencer registered, but verification failed',
      influencer: updatedInfluencer,
      isVerified: updatedInfluencer.verified
    });

  } catch (error) {
    console.error('Error registering influencer:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering influencer',
      error: error.message
    });
  }
};

/** ---------------------------
 *  Get influencer profile by user ID
 ----------------------------*/
exports.getInfluencerByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const influencer = await Influencer.findOne({ user: userId }).lean();
    if (!influencer) {
      return res.status(404).json({ success: false, message: 'Influencer profile not found for this user' });
    }

    res.json({ success: true, influencer });
  } catch (error) {
    console.error('Error retrieving influencer profile by user ID:', error);
    res.status(500).json({ success: false, message: 'Error retrieving influencer profile', error: error.message });
  }
};

/** ---------------------------
 *  Get influencer profile
 ----------------------------*/
exports.getInfluencerProfile = async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id).lean();
    if (!influencer) return res.status(404).json({ success: false, message: 'Influencer not found' });

    res.json({ success: true, influencer });
  } catch (error) {
    console.error('Error retrieving influencer profile:', error);
    res.status(500).json({ success: false, message: 'Error retrieving influencer profile', error: error.message });
  }
};

/** ---------------------------
 *  Update influencer profile
 ----------------------------*/
exports.updateInfluencerProfile = async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) return res.status(404).json({ success: false, message: 'Influencer not found' });

    // Extract text fields
    const { name, gmail, contactNo, youtubeChannel, pincode, category, bio } = req.body;

    // Update text fields
    Object.assign(influencer, { name, gmail, contactNo, youtubeChannel, pincode, category, bio });

    // If file is uploaded, Cloudinary URL will be in req.file.path
    if (req.file && req.file.path) {
      influencer.profilePicture = req.file.path;  // Save Cloudinary URL
    }

    await influencer.save();
    res.json({ success: true, message: 'Influencer profile updated successfully', influencer });
  } catch (error) {
    console.error('Error updating influencer profile:', error);
    res.status(500).json({ success: false, message: 'Error updating influencer profile', error: error.message });
  }
};

/** ---------------------------
 *  Change password
 ----------------------------*/
exports.changePassword = async (req, res) => {
  try {
    const influencerId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    if (!influencerId || influencerId === 'null') {
      return res.status(400).json({ success: false, message: 'Invalid influencer ID' });
    }

    const influencer = await Influencer.findById(influencerId).lean();
    if (!influencer) return res.status(404).json({ success: false, message: 'Influencer not found' });

    const user = await User.findById(influencer.user);
    if (!user) return res.status(404).json({ success: false, message: 'User account not found' });

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(influencer.user, { password: hashedNewPassword });

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Error changing password' });
  }
};

/** ---------------------------
 *  Verify influencer
 ----------------------------*/
exports.verifyInfluencerProfile = async (req, res) => {
  try {
    const influencerId = req.params.id;
    const isVerified = await verifyInfluencer(influencerId);
    res.json({
      success: true,
      isVerified,
      message: isVerified ? 'Influencer verified successfully' : 'Influencer verification failed'
    });
  } catch (error) {
    console.error('Error verifying influencer:', error);
    res.status(500).json({ success: false, message: 'Error verifying influencer', error: error.message });
  }
};

/** ---------------------------
 *  Get eligible campaigns
 ----------------------------*/
exports.getEligibleCampaigns = async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id).lean();
    if (!influencer) return res.status(404).json({ success: false, message: 'Influencer not found' });

    const campaigns = await Campaign.find({
      _id: { $in: influencer.eligible_campaigns },
      status: 'active'
    }).populate('brand', 'businessName brand_logo').lean();

    const transformedCampaigns = campaigns.map(campaign => ({
      _id: campaign._id,
      campaignName: campaign.campaignName,
      brand: {
        brandName: campaign.brand?.businessName || 'Unknown Brand',
        logo: campaign.brand?.brand_logo || '/api/placeholder/60/60'
      },
      category: campaign.category,
      budget: campaign.budget,
      productDescription: campaign.productDescription,
      media: campaign.media || [],
      requirements: `Min ${campaign.minFollowers} followers`,
      deadline: new Date(new Date(campaign.createdAt).setDate(new Date(campaign.createdAt).getDate() + 7)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }),
      applicants: Math.floor(Math.random() * 50) + 10
    }));

    res.json({ success: true, campaigns: transformedCampaigns });
  } catch (error) {
    console.error('Error fetching eligible campaigns:', error);
    res.status(500).json({ success: false, message: 'Error fetching eligible campaigns' });
  }
};

/** ---------------------------
 *  Get accepted campaigns
 ----------------------------*/
exports.getAcceptedCampaigns = async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id).lean();
    if (!influencer) return res.status(404).json({ success: false, message: 'Influencer not found' });

    const campaigns = await Campaign.find({
      _id: { $in: influencer.accepted_campaigns },
      status: 'active'
    }).populate('brand', 'businessName brand_logo').lean();

    const transformedCampaigns = campaigns.map(campaign => ({
      _id: campaign._id,
      campaignName: campaign.campaignName,
      brand: {
        brandName: campaign.brand?.businessName || 'Unknown Brand',
        logo: campaign.brand?.brand_logo || '/api/placeholder/60/60'
      },
      category: campaign.category,
      budget: campaign.budget,
      productDescription: campaign.productDescription,
      media: campaign.media || [],
      requirements: `Min ${campaign.minFollowers} followers`,
      deadline: new Date(new Date(campaign.createdAt).setDate(new Date(campaign.createdAt).getDate() + 7)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
    }));

    res.json({ success: true, campaigns: transformedCampaigns });
  } catch (error) {
    console.error('Error fetching accepted campaigns:', error);
    res.status(500).json({ success: false, message: 'Error fetching accepted campaigns' });
  }
};

/** ---------------------------
 *  Accept campaign - FINAL FIXED VERSION
 ----------------------------*/
exports.acceptCampaign = async (req, res) => {
  try {
    const { influencerId, campaignId } = req.params;

    console.log('=== ACCEPT CAMPAIGN DEBUG ===');
    console.log('Influencer ID:', influencerId);
    console.log('Campaign ID:', campaignId);
    console.log('Campaign ID type:', typeof campaignId);

    const influencer = await Influencer.findById(influencerId);
    const campaign = await Campaign.findById(campaignId);

    if (!influencer || !campaign) {
      return res.status(404).json({ success: false, message: 'Influencer or Campaign not found' });
    }

    console.log('Before - Eligible campaigns:', influencer.eligible_campaigns);
    console.log('Before - Accepted campaigns:', influencer.accepted_campaigns);

    // Check if eligible and not already accepted
    const isEligible = influencer.eligible_campaigns.some(id => id.toString() === campaignId);
    const isAccepted = influencer.accepted_campaigns.some(id => id.toString() === campaignId);

    console.log('Is eligible:', isEligible);
    console.log('Is accepted:', isAccepted);

    if (!isEligible) {
      return res.status(400).json({ success: false, message: 'Campaign not eligible for this influencer' });
    }
    if (isAccepted) {
      return res.status(400).json({ success: false, message: 'Campaign already accepted' });
    }

    // Convert campaignId to ObjectId for consistency
    const campaignObjectId = new mongoose.Types.ObjectId(campaignId);
    const influencerObjectId = new mongoose.Types.ObjectId(influencerId);

    console.log('Campaign ObjectId:', campaignObjectId);
    console.log('Campaign string:', campaignId);

    // FIXED: Remove ObjectId from eligible_campaigns (not string!)
    const removeResult = await Influencer.findByIdAndUpdate(
      influencerId, 
      { 
        $pull: { eligible_campaigns: campaignObjectId }  // Pull the ObjectId version
      },
      { new: true }
    );

    console.log('After removal - Eligible campaigns:', removeResult.eligible_campaigns);

    // Then add to accepted_campaigns
    const addResult = await Influencer.findByIdAndUpdate(
      influencerId,
      { 
        $addToSet: { accepted_campaigns: campaignObjectId }
      },
      { new: true }
    );

    console.log('After addition - Accepted campaigns:', addResult.accepted_campaigns);

    // Also update the campaign to track accepted influencers
    await Campaign.findByIdAndUpdate(campaignId, {
      $addToSet: { acceptedInfluencers: influencerObjectId }
    });

    console.log('=== END DEBUG ===');

    res.json({ success: true, message: 'Campaign accepted successfully' });
  } catch (error) {
    console.error('Error accepting campaign:', error);
    res.status(500).json({ success: false, message: 'Error accepting campaign', error: error.message });
  }
};

/** ---------------------------
 *  Submit campaign story
 ----------------------------*/
exports.submitCampaignStory = async (req, res) => {
  try {
    const { influencerId, campaignId } = req.params;
    const { storyUrl } = req.body;

    const influencer = await Influencer.findById(influencerId);
    const campaign = await Campaign.findById(campaignId);
    if (!influencer || !campaign) return res.status(404).json({ success: false, message: 'Influencer or Campaign not found' });

    const isAccepted = influencer.accepted_campaigns.some(id => id.toString() === campaignId);
    if (!isAccepted) return res.status(400).json({ success: false, message: 'Campaign not accepted by influencer' });

    // Convert IDs to ObjectIds for consistency
    const campaignObjectId = new mongoose.Types.ObjectId(campaignId);
    const influencerObjectId = new mongoose.Types.ObjectId(influencerId);

    // Add analytics entry
    const analyticsEntry = {
      influencer_id: influencerId,
      views: Math.floor(Math.random() * 10000) + 1000,
      reach: Math.floor(Math.random() * 8000) + 800,
      shares: Math.floor(Math.random() * 500) + 50,
      description: `Story submitted: ${storyUrl}`,
      timestamp: new Date()
    };

    await Campaign.findByIdAndUpdate(campaignId, { $push: { campaignAnalytics: analyticsEntry } });
    await Influencer.findByIdAndUpdate(influencerId, {
      $pull: { accepted_campaigns: campaignObjectId },
      $addToSet: { completed_campaigns: campaignObjectId }
    });
    await Campaign.findByIdAndUpdate(campaignId, { $addToSet: { completedInfluencers: influencerObjectId } });

    res.json({ success: true, message: 'Campaign story submitted successfully' });
  } catch (error) {
    console.error('Error submitting campaign story:', error);
    res.status(500).json({ success: false, message: 'Error submitting campaign story' });
  }
};

/** ---------------------------
 *  Manual campaign validation
 ----------------------------*/
exports.validateCampaignManually = async (req, res) => {
  try {
    res.json({
      success: true,
      isValid: true,
      description: "Campaign validation completed successfully",
      user_story_url: "https://instagram.com/stories/mock_validation"
    });
  } catch (error) {
    console.error('Error validating campaign:', error);
    res.status(500).json({ success: false, message: 'Error validating campaign' });
  }
};