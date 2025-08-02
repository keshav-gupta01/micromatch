const mongoose = require('mongoose');

const InfluencerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    gmail: { type: String, required: true },
    contactNo: { type: String, required: true },
    instaId: { type: String, required: true, unique: true },
    youtubeChannel: { type: String },
    pincode: { type: String },
    category: { type: String },
    // FIXED: Match the field names used in controller
    access_token: { type: String, required: true }, // Changed from accessToken
    insta_scoped_id: { type: String, required: true }, // Changed from instagramId
    verified: { type: Boolean, default: false },
    verified_status: { type: String, default: "Verification will be started, we will update you when it is done" }, // Fixed typo
    profilePicture: { type: String }, // Added for profile picture URL
    bio: { type: String }, // Added for bio
    // Campaign tracking fields
    eligible_campaigns: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Campaign' 
    }],
    accepted_campaigns: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Campaign' 
    }],
    applied_campaigns: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Campaign' 
    }],
    completed_campaigns: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Campaign' 
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('InfluencerProfile', InfluencerSchema); // Keep the model name as expected by refs