const Brand = require('../models/BrandProfile');
const User = require('../models/User');
const Campaign = require('../models/campaignProfile');
const { cloudinary } = require('../config/cloudinary');
const { getRecommendedInfluencers, sendCampaignInvitation } = require('../services/recommendationService');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

exports.register = async (req, res) => {
  try {
    const {
      businessName,
      legalEntityName,
      businessType,
      category,
      email,
      phoneNo,
      address,
      websiteOrSocialMedia,
      description
    } = req.body;

    const brandLogo = req.file?.path || null;

    const newBrand = new Brand({
      user: req.user.id,
      businessName,
      legalEntityName,
      businessType,
      category,
      email,
      phoneNo,
      address,
      website: websiteOrSocialMedia,
      description,
      brand_logo: brandLogo,
      status: 'pending'
    });

    await newBrand.save();
    await User.findByIdAndUpdate(newBrand.user, { role: 'brand' });
    res.status(201).json({ success: true, brand: newBrand });
  } catch (error) {
    console.error('Error registering brand:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getPendingBrands = async (req, res) => {
  try {
    const pendingBrands = await Brand.find({ status: 'pending' }).populate('user', 'name email');
    res.json(pendingBrands);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending brands', error: err.message });
  }
};

exports.getBrandProfile = async (req, res) => {
  try {
    const brand = await Brand.findOne({ user: req.user.id });
    if (!brand) return res.status(404).json({ message: 'Brand profile not found' });
    
    const data = {
      logo: brand.brand_logo,
      businessName: brand.businessName,
      website: brand.website,
      industry: brand.category,
      description: brand.description,
      email: brand.email
    };
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching brand profile', error: err.message });
  }
};

exports.updateBrandProfile = async (req, res) => {
  try {
    const brand = await Brand.findOne({ user: req.user.id });
    if (!brand) return res.status(404).json({ message: 'Brand profile not found' });
    
    const brandLogo = req.file?.path || null;
    const { businessName, website, industry, description, email } = req.body;
    
    brand.brand_logo = brandLogo || brand.brand_logo;
    brand.businessName = businessName;
    brand.website = website;
    brand.category = industry;
    brand.description = description;
    brand.email = email;

    await brand.save();

    res.status(200).json({ success: true, message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating brand profile:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.approveBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    
    brand.status = 'approved';
    await brand.save();
    res.json({ message: 'Brand approved and role updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving brand', error: err.message });
  }
};

exports.rejectBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    await brand.remove();
    res.json({ message: 'Brand rejected and deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting brand', error: err.message });
  }
};

exports.createCampaign = async (req, res) => {
  try {
    console.log('Create Campaign request body:', req.body);
    console.log('Files received:', req.files);
    
    const { 
      campaignName, 
      category, 
      budget, 
      minFollowers, 
      productDescription,
      ecommLink,
      isLocationSpecific,
      location,
      products,
      hashtags,
      mediaInfo,
      campaignRange  // Added this field
    } = req.body;

    // Validate required fields
    if (!campaignName || !category || !budget || !minFollowers || !productDescription) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check brand approval status
    const brand = await Brand.findOne({ user: req.user.id });
    if (!brand) return res.status(404).json({ message: 'Brand profile not found' });
    if (brand.status !== 'approved') return res.status(403).json({ message: 'Brand not approved' });

    // Validate media files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one media file is required' });
    }

    // Parse JSON data that came as strings
    let parsedLocation = isLocationSpecific === 'yes' ? JSON.parse(location) : null;
    let parsedProducts = products ? JSON.parse(products) : [];
    let parsedMediaInfo = mediaInfo ? JSON.parse(mediaInfo) : [];

    // Set camp_type based on campaignRange
    let camp_type = 0; // default
    if (campaignRange === 'local') {
      camp_type = 1;
    } else if (campaignRange === 'regional') {
      camp_type = 2;
    }

    // Create campaign
    const campaign = new Campaign({
      brand: brand._id,
      campaignName,
      category,
      budget: parseFloat(budget),
      minFollowers: parseInt(minFollowers),
      productDescription,
      ecommLink,
      isLocationSpecific,
      location: parsedLocation,
      media: req.files.map(file => file.path),
      mediaInfo: parsedMediaInfo,
      products: parsedProducts,
      hashtags,
      camp_type, // Added this field
      status: 'active'
    });

    console.log('Campaign to be saved:', campaign);
    
    await campaign.save();
    brand.uploaded_campaigns.push(campaign._id);
    await brand.save(); // Save brand after adding campaign

    // Automatically find recommended influencers
    try {
      console.log('Finding recommended influencers for campaign:', campaign._id);
      const influencers = await getRecommendedInfluencers(campaign._id);
      
      // Update campaign with matched influencers (FIXED TYPO)
      campaign.matchedInfluencers = influencers;
      await campaign.save();
      
      console.log(`Found ${influencers.length} matched influencers`);
      
      // Send invitations to matched influencers
      console.log('Sending invitations to matched influencers');
      const results = [];
      for (const influencerId of influencers) {
        try { 
          await sendCampaignInvitation(influencerId, campaign._id);
          results.push({ influencerId, status: 'success' });
        } catch (err) {
          results.push({ influencerId, status: 'failed', error: err.message });
        }
        // Wait 15 seconds before sending the next email
        await delay(15000);
      }
      console.log('Invitation results:', results);
    } catch (error) {
      console.error('Error finding recommended influencers:', error);
      // Don't stop the response, just log the error
    }

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      campaign
    });

  } catch (error) {
    console.error('DETAILED ERROR in createCampaign:', error);
    console.error('Error stack trace:', error.stack);
    res.status(500).json({ 
      success: false,
      message: 'Error creating campaign',
      error: error.message 
    });
  }
};

exports.findRecommendedInfluencers = async (req, res) => {
  try {
    const campaignId = req.params.campaignId;
    
    // Get recommended influencers
    const influencers = await getRecommendedInfluencers(campaignId);
    
    // Update campaign with matched influencers
    await Campaign.findByIdAndUpdate(
      campaignId,
      { matchedInfluencers: influencers }
    );
    
    res.json({ 
      success: true, 
      message: 'Recommended influencers found',
      count: influencers.length,
      influencers 
    });
  } catch (error) {
    console.error('Error finding recommended influencers:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error finding recommended influencers',
      error: error.message 
    });
  }
};

// Get campaign analytics
exports.getCampaignAnalytics = async (req, res) => {
  try {
    const campaignId = req.params.campaignId;
    const campaign = await Campaign.findById(campaignId);
    
    if (!campaign) {
      return res.status(404).json({ 
        success: false, 
        message: 'Campaign not found' 
      });
    }
    
    const completedInfluencers = campaign.campaignAnalytics.length; // FIXED FIELD NAME
    let views = 0, reach = 0, shares = 0;
    
    for (const analytics of campaign.campaignAnalytics) { // FIXED FIELD NAME
      views += analytics.views || 0;
      reach += analytics.reach || 0;
      shares += analytics.shares || 0;
    }
    
    res.json({ 
      success: true, 
      campaign: {
        completedInfluencers,
        views,
        reach,
        shares
      }
    });
  } catch (error) {
    console.error('Error getting campaign analytics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error getting campaign analytics',
      error: error.message 
    });
  }
};

exports.passwordchange = async (req, res) => {
  try {
    const BrandId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    if (!BrandId || BrandId === 'null') {
      return res.status(400).json({ success: false, message: 'Invalid brand ID' });
    }

    const brand = await Brand.findById(BrandId).lean();
    if (!brand) return res.status(404).json({ success: false, message: 'brand not found' });

    const user = await User.findById(brand.user);
    if (!user) return res.status(404).json({ success: false, message: 'User account not found' });

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(brand.user, { password: hashedNewPassword });

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Error changing password' });
  }
};

exports.getbrandByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const brand = await Brand.findOne({ user: userId }).lean();
    if (!brand) {
      return res.status(404).json({ success: false, message: 'brand profile not found for this user' });
    }

    res.json({ success: true, brand });
  } catch (error) {
    console.error('Error retrieving brand profile by user ID:', error);
    res.status(500).json({ success: false, message: 'Error retrieving brand profile', error: error.message });
  }
};