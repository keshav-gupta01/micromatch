const express = require('express');
const { registerBrand, getPendingBrands, approveBrand, rejectBrand, createCampaign } = require('../controllers/brandControllers'); // Importing individual functions
const { upload } = require('../config/cloudinary');
const router = express.Router();

// In brandRoutes.js
const protect = require('../middleware/auth');
const  adminOnly = require('../middleware/adminMiddleware');
const brandOnly = require('../middleware/brandMiddleware'); // Assuming you have a middleware to check if the user is a brand

// brand submits profile
router.post('/register', protect, registerBrand);

// admin routes
router.get('/pending', protect, adminOnly, getPendingBrands);
router.put('/approve/:id', protect, adminOnly, approveBrand);
router.delete('/reject/:id', protect, adminOnly, rejectBrand);
router.post('/launchCampaign', protect, brandOnly, upload.array('media', 5), createCampaign);

module.exports = router;
