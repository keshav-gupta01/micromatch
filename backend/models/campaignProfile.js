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

const campaignSchema = new mongoose.Schema({
  brand: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'BrandProfile', 
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
  hashtags: String,
  status: { 
    type: String, 
    enum: ['pending', 'active', 'completed', 'rejected'], 
    default: 'pending' 
  },
  matchedInfluencers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfluencerProfile' 
  }],
  invitedInfluencers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'InfluencerProfile' 
  }]
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);