const Influencer = require('../models/InfluencerProfile');
const Campaign = require('../models/campaignProfile');
const axios = require('axios');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose'); 

// Configure Nodemailer transporter 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

exports.getRecommendedInfluencers = async (campaignId) => {
  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // 1. Find all influencers matching campaign category
    const matchingInfluencers = await Influencer.find({
      category: campaign.category
    });

    // 2. Format influencers data for the recommendation API
    const formattedInfluencers = matchingInfluencers.map((inf) => ({
      pincode: inf.pincode,
      access_token: inf.accessToken,
      id: inf._id.toString()
    }));

    // 3. Prepare payload and send request to Flask API
    const apiUrl = process.env.RECOMMENDATION_API_URL || 'https://micromatch-flask-server.onrender.com/server/recommend_influencers';

    const response = await axios.post(apiUrl, {
      campaigndata: {
        pincode: campaign.location?.pincode || '',
        camp_type: campaign.camp_type || 0,
      },
      influencers: formattedInfluencers
    });

    // 4. Convert returned influencer IDs to Mongoose ObjectId
    const recommendedIds = response.data.influencers.map((id) => mongoose.Types.ObjectId(id));

    return recommendedIds;

  } catch (error) {
    console.error('Error in getRecommendedInfluencers:', error);
    throw error;
  }
};

exports.sendCampaignInvitation = async (influencerId, campaignId) => {
  try {
    // Get influencer details
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) {
      throw new Error('Influencer not found');
    }

    // Get campaign details
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // Create email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: influencer.gmail,
      subject: `New Campaign Opportunity: ${campaign.campaignName}`,
      html: `
        <h2>New Campaign Opportunity</h2>
        <p>Hello ${influencer.name},</p>
        <p>You have been selected for the "${campaign.campaignName}" campaign based on your profile matching their requirements.</p>
        <p><strong>Campaign Details:</strong></p>
        <ul>
          <li>Category: ${campaign.category}</li>
          <li>Product: ${campaign.productDescription}</li>
        </ul>
        <p>Login to your MicroMatch dashboard to view and accept this campaign.</p>
        <p>Best regards,<br>MicroMatch Team</p>
      `
    };

    // Send email using Nodemailer
    await transporter.sendMail(mailOptions);

    // Add campaign to eligible_campaigns for the influencer
    await Influencer.findByIdAndUpdate(
      influencerId,
      { $push: { eligible_campaigns: campaignId } }
    );
    return true;
  } catch (error) {
    console.error('Error sending campaign invitation:', error);
    throw error;
  }
};

// Influencer verification service
exports.verifyInfluencer = async (influencerId) => {
  try {
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) {
      throw new Error('Influencer not found');
    }
    // Call external API to verify if influencer is fake
    const apiUrl = process.env.VERIFICATION_API_URL || 'https://micromatch-flask-server.onrender.com/server/is_fake_influencer';
    const response = await axios.post(apiUrl, {
      accessToken: influencer.accessToken
    });

    const isFake = response.data.is_fake;
    const description = response.data.description;
    
    // Update influencer verification status
    await Influencer.findByIdAndUpdate(
      influencerId,
      { 
        verified: !isFake,
        verfied_Status: description 
      }
    );
    return !isFake;
  } catch (error) {
    console.error('Error verifying influencer:', error);
    throw error;
  }
};

// Campaign validation service
exports.validateCampaign = async (influencerId, campaignId) => {
  try {
    // Get influencer and campaign data
    const influencer = await Influencer.findById(influencerId);
    const campaign = await Campaign.findById(campaignId);
    
    if (!influencer || !campaign) {
      throw new Error('Influencer or Campaign not found');
    }

    // Call external API to verify if the campaign post is valid
    const apiUrl = process.env.VALIDATION_API_URL || 'https://micromatch-flask-server.onrender.com/server/is_valid_campaign';
    
    const response = await axios.post(apiUrl, {
      "access_token": influencer.accessToken,
      "media": {
        "media_count": campaign.mediaInfo.length,
        "media_list": campaign.mediaInfo,
      }
    });
    
    const user_story_url = response.data.user_story_url;
    
    return {
      isValid: !response.data.error,
      description: response.data.description || "Campaign validation completed"
    };
  } catch (error) {
    console.error('Error validating campaign:', error);
    throw error;
  }
};

// Campaign analytics service
exports.getCampaignAnalytics = async (influencerId) => {
  try {
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) {
      throw new Error('Influencer not found');
    }

    // Call external API to get campaign analytics
    const apiUrl = process.env.ANALYTICS_API_URL || 'https://micromatch-flask-server.onrender.com/server/get_campaign_analytics';
    
    const response = await axios.post(apiUrl, {
      "access_token": influencer.accessToken
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting campaign analytics:', error);
    throw error;
  }
};