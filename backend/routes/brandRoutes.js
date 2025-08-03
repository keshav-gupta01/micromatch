const express = require('express');
const { 
  register,
  getBrandProfile,
  getPendingBrands,
  updateBrandProfile,
  approveBrand, 
  rejectBrand, 
  createCampaign,
  findRecommendedInfluencers,  
  getCampaignAnalytics ,
  getbrandByUserId,
  passwordchange
} = require('../controllers/brandControllers');
const { upload } = require('../config/cloudinary');
const router = express.Router();
const auth = require('../middleware/auth');
const protect = require('../middleware/auth');
const adminOnly = require('../middleware/adminMiddleware');
const brandOnly = require('../middleware/brandMiddleware');

// Brand submits profile with logo upload
router.post('/register', protect, upload.single('brand_logo'), register);

// FIXED: Added missing '/' before 'update'
router.post('/update', protect, brandOnly, upload.single('brand_logo'), updateBrandProfile);

// Admin routes
router.get('/pending', protect, adminOnly, getPendingBrands);
router.put('/approve/:id', protect, adminOnly, approveBrand);
router.delete('/reject/:id', protect, adminOnly, rejectBrand);

// Brand routes
router.get('/getprofile', protect, brandOnly, getBrandProfile); // Get brand profile
router.post('/launchCampaign', protect, brandOnly, upload.array('media', 5), createCampaign);
router.post('/:id/changepassword', auth, passwordchange ); // New password change route
router.get('/by-user/:userId', auth, getbrandByUserId); // New route to get influencer by user ID

// Campaign management routes
router.get('/campaigns/:campaignId/recommend', protect, brandOnly, findRecommendedInfluencers);
router.get('/campaigns/:campaignId/analytics', protect, brandOnly, getCampaignAnalytics);

module.exports = router;