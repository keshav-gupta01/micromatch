const express = require('express');

const { 
  register,
  getBrandProfile,
  getPendingBrands, 
  approveBrand, 
  rejectBrand, 
  createCampaign,
  findRecommendedInfluencers,  
  getCampaignAnalytics 
} = require('../controllers/brandControllers');
const { upload } = require('../config/cloudinary');
const router = express.Router();

const protect = require('../middleware/auth');
const adminOnly = require('../middleware/adminMiddleware');
const brandOnly = require('../middleware/brandMiddleware');
const { get } = require('mongoose');

// brand submits profile
// brand submits profile with logo upload
router.post('/register', protect, upload.single('brand_logo'), register);


// admin routes
router.get('/pending', protect, adminOnly, getPendingBrands);
router.put('/approve/:id', protect, adminOnly, approveBrand);
router.delete('/reject/:id', protect, adminOnly, rejectBrand);
router.get('/profile', protect, brandOnly,getBrandProfile); // Get brand profile
// brand routes
router.post('/launchCampaign', protect, brandOnly, upload.array('media', 5), createCampaign);

// These routes are still available but may not be needed as frequently since matching happens automatically
router.get('/campaigns/:campaignId/recommend', protect, brandOnly, findRecommendedInfluencers);
//router.post('/campaigns/:campaignId/invite', protect, brandOnly, sendCampaignInvitations);
router.get('/campaigns/:campaignId/analytics', protect, brandOnly, getCampaignAnalytics);

module.exports = router;