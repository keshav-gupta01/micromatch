const Influencer = require('../models/InfluencerProfile');
const Campaign = require('../models/campaignProfile');
const axios = require('axios');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

// Enhanced Nodemailer configuration with better error handling
const createTransporter = () => {
  // Check if email credentials are available
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('Email credentials not found in environment variables');
    console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
    console.error('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set' : 'Not set');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Additional configuration for better reliability
    secure: true,
    port: 465,
    logger: true, // Enable logging
    debug: false, // Set to true for detailed debugging
  });
};

// Create transporter instance
const transporter = createTransporter();

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
    console.log(matchingInfluencers.length);
    // 2. Format influencers data for the recommendation API
    const formattedInfluencers = matchingInfluencers.map((inf) => ({
      pincode: inf.pincode,
      access_token: inf.access_token,
      id: inf._id.toString()
    }));

    console.log('Formatted influencers for API:', formattedInfluencers.length);

    // 3. Prepare payload and send request to Flask API
    const apiUrl = process.env.RECOMMENDATION_API_URL || 'https://micromatch-flask-server.onrender.com/server/recommend_influencers';

    const payload = {
      campaign_data: {
        pincode: campaign.location?.pincode || null,
        camp_type: campaign.camp_type || 0,
      },
      influencers: formattedInfluencers
    };

    console.log('Sending request to Flask API:', apiUrl);
    console.log('Payload:', JSON.stringify(payload, null, 2));

    const response = await axios.post(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 120000  //(3 minutes wait)
    });

    console.log('Flask API response:', response.data);

    // 4. Handle the response - expecting array of influencer IDs
    let recommendedIds = [];
    if (Array.isArray(response.data)) {
      recommendedIds = response.data.map((id) => {
        try {
          return new mongoose.Types.ObjectId(id);
        } catch (err) {
          console.error('Invalid ObjectId:', id);
          return null;
        }
      }).filter(id => id !== null);
    } else if (Array.isArray(response.data.ranked_influencers)) {
      recommendedIds = response.data.ranked_influencers.map((id) => {
        try {
          return new mongoose.Types.ObjectId(id);
        } catch (err) {
          console.error('Invalid ObjectId:', id);
          return null;
        }
      }).filter(id => id !== null);
    }

    console.log('Recommended influencer IDs:', recommendedIds);
    return recommendedIds;

  } catch (error) {
    console.error('Error in getRecommendedInfluencers:', error.message);
    if (error.response) {
      console.error('API Response error:', error.response.data);
      console.error('API Response status:', error.response.status);
    }
    throw error;
  }
};

exports.sendCampaignInvitation = async (influencerId, campaignId) => {
  try {
    // Check if transporter is available
    if (!transporter) {
      throw new Error('Email service not configured - missing EMAIL_USER or EMAIL_PASSWORD in environment variables');
    }

    // Get influencer details
    const influencer = await Influencer.findById(influencerId);
    if (!influencer) {
      throw new Error('Influencer not found');
    }

    // Get campaign details
    const campaign = await Campaign.findById(campaignId).populate('brand');
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // Validate influencer email
    if (!influencer.gmail) {
      throw new Error('Influencer email not found');
    }
    
    console.log('Sending email to:', influencer.gmail);
    console.log('Email service configured:', !!transporter);
    
    // Create email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: influencer.gmail,
      subject: `New Campaign Opportunity: ${campaign.campaignName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Campaign Opportunity</h2>
          <p>Hello ${influencer.name},</p>
          <p>You have been selected for the "<strong>${campaign.campaignName}</strong>" campaign based on your profile matching their requirements.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Campaign Details:</h3>
            <ul style="list-style-type: none; padding: 0;">
              <li><strong>Campaign Name:</strong> ${campaign.campaignName}</li>
              <li><strong>Category:</strong> ${campaign.category}</li>
              <li><strong>Product:</strong> ${campaign.productDescription}</li>
              <li><strong>Budget:</strong> ₹${campaign.budget}</li>
              ${campaign.ecommLink ? `<li><strong>Product Link:</strong> <a href="${campaign.ecommLink}">View Product</a></li>` : ''}
            </ul>
          </div>
          
          <p>Login to your MicroMatch dashboard to view complete details and accept this campaign.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'https://micromatch.onrender.com/'}/influencer-dashboard" 
               style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
               View Campaign
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            MicroMatch Team
          </p>
        </div>
      `
    };

    // Test transporter connection before sending
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    // Send email using Nodemailer
    const info = await transporter.sendMail(mailOptions);
    console.log(`Invitation email sent successfully to ${influencer.gmail}`);
    console.log('Message ID:', info.messageId);

    // Add campaign to eligible_campaigns for the influencer
    await Influencer.findByIdAndUpdate(
      influencerId,
      { $addToSet: { eligible_campaigns: campaignId } }
    );
    
    return true;
  } catch (error) {
    console.error('Error sending campaign invitation:', error);
    
    // Provide more specific error messages
    if (error.code === 'EAUTH') {
      console.error('Authentication failed - check EMAIL_USER and EMAIL_PASSWORD');
    } else if (error.code === 'ECONNECTION') {
      console.error('Connection failed - check internet connection and SMTP server');
    }
    
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
      accessToken: influencer.access_token
    }, {
      timeout: 30000
    });

    const isFake = response.data.is_fake;
    const description = response.data.description;
    
    // Update influencer verification status
    await Influencer.findByIdAndUpdate(
      influencerId,
      { 
        verified: !isFake,
        verified_status: !isFake? 'Influencer verified successfully': 'verification failed :' + description 
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
      "access_token": influencer.access_token,
      "media": {
        "media_count": campaign.mediaInfo.length,
        "media_list": campaign.mediaInfo,
      }
    }, {
      timeout: 30000
    });
    
    const user_story_url = response.data.user_story_url;
    
    return {
      isValid: !response.data.error,
      description: response.data.description || "Campaign validation completed",
      user_story_url
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
    const apiUrl = process.env.ANALYTICS_API_URL || 'https://micromatch-flask-server.onrender.com/server/provide_campaign_analytics';
    
    const response = await axios.post(apiUrl, {
      "access_token": influencer.access_token
    }, {
      timeout: 30000
    });
    
    return {
      views: response.data.views || 0,
      reach: response.data.reach || 0,
      shares: response.data.shares || 0,
      error: response.data.error || false
    };
  } catch (error) {
    console.error('Error getting campaign analytics:', error);
    throw error;
  }
};