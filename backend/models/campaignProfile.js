const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  country: String,
  state: String,
  district: String,
  pincode: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
}, { _id: false });

const mediaInfoSchema = new mongoose.Schema({
  type: String, // 'image' or 'video'
}, { _id: false });

const campaignAnalyticsSchema = new mongoose.Schema({
  influencer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfluencerProfile' 
  },
  views: { type: Number, default: 0 },
  reach: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  description: String,
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const campaignSchema = new mongoose.Schema({
  brand: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Brand', // FIXED: Changed from 'BrandProfile' to 'Brand'
    required: true 
  },
  campaignName: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  budget: { 
    type: Number, 
    required: true 
  },
  minFollowers: { 
    type: Number, 
    required: true 
  },
  productDescription: { 
    type: String, 
    required: true 
  },
  ecommLink: String,
  isLocationSpecific: { 
    type: String, 
    enum: ['yes', 'no'], 
    default: 'no' 
  },
  location: locationSchema,
  media: [String], // Cloudinary URLs
  mediaInfo: [mediaInfoSchema],
  products: [productSchema],
  camp_type: { 
    type: Number, 
    default: 0 // 0: global, 1: local, 2: regional 
  },
  hashtags: String,
  status: { 
    type: String, 
    enum: ['active', 'completed', 'paused'], 
    default: 'active'
  },
  // FIXED: Removed typo "matchedInflxuencers"
  matchedInfluencers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfluencerProfile' 
  }],
  acceptedInfluencers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfluencerProfile' 
  }],
  completedInfluencers: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfluencerProfile' 
  }],
  // FIXED: Added proper spacing
  campaignAnalytics: [campaignAnalyticsSchema],
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);