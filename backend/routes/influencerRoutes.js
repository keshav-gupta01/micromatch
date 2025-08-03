const express = require('express');
const router = express.Router();
const { 
  verifyInstagram, 
  registerInfluencer, 
  getInfluencerProfile,
  getInfluencerByUserId, // New function
  updateInfluencerProfile,
  changePassword,
  verifyInfluencerProfile,
  getEligibleCampaigns,
  getAcceptedCampaigns, // New route for accepted campaigns
  acceptCampaign,
  submitCampaignStory,
  validateCampaignManually
} = require('../controllers/influencerControllers');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');
const influencerOnly = require('../middleware/influencerMiddleware');

// Public routes
router.get('/verify-instagram', verifyInstagram);
router.post('/register', registerInfluencer);

// Protected routes - require authentication
router.get('/by-user/:userId', auth, getInfluencerByUserId); // New route to get influencer by user ID
router.get('/:id', auth, getInfluencerProfile);
router.put('/:id', auth, upload.single('profilePicture'),updateInfluencerProfile );
router.post('/:id/change-password', auth, changePassword); // New password change route
router.post('/:id/verify', auth, verifyInfluencerProfile);

// Protected routes - require influencer role
router.get('/:id/campaigns/eligible', auth, influencerOnly, getEligibleCampaigns);
router.get('/:id/campaigns/accepted', auth, influencerOnly, getAcceptedCampaigns); // New route
router.post('/:influencerId/campaigns/:campaignId/accept', auth, influencerOnly, acceptCampaign);
router.post('/:influencerId/campaigns/:campaignId/submit', auth, influencerOnly, submitCampaignStory);
router.post('/:influencerId/campaigns/:campaignId/validate', auth, influencerOnly, validateCampaignManually);

module.exports = router;