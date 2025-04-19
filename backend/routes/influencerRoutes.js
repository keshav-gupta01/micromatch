const express = require('express');
const router = express.Router();
const { verifyInstagram, registerInfluencer, getInfluencerProfile, updateInfluencerProfile } = require('../controllers/influencerControllers');
// Verify Instagram via OAuth
router.get('/verify-instagram', verifyInstagram);

// Register Influencer
router.post('/register', registerInfluencer);

// Get Influencer Profile
router.get('/:id', getInfluencerProfile);

// Update Influencer Profile
router.put('/:id', updateInfluencerProfile);

module.exports = router;
