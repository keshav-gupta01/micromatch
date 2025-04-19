const mongoose = require('mongoose');

const InfluencerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gmail: { type: String, required: true },
    contactNo: { type: String, required: true },
    instaId: { type: String, required: true, unique: true },
    youtubeChannel: { type: String },
    pincode: { type: String },
    category: { type: String },
    accessToken: { type: String, required: true },
    instagramId: { type: String, required: true },
    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Influencer', InfluencerSchema);
