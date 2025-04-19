const Brand = require('../models/BrandProfile');
const User = require('../models/User');
const Campaign = require('../models/campaignProfile');
const { cloudinary } = require('../config/cloudinary');
exports.registerBrand = async (req, res) => {
  try {
    // Log the user information to inspect it
    console.log('User:', req.user); // Added log for debugging

    const { businessName, category, description, website } = req.body;
    const existing = await Brand.findOne({ user: req.user.id });

    if (existing) return res.status(400).json({ message: 'Brand profile already submitted' });

    const brand = await Brand.create({
      user: req.user.id,
      businessName,
      category,
      description,
      website
    });

    res.status(201).json({ message: 'Brand profile submitted', brand });
  } catch (err) {
    res.status(500).json({ message: 'Error registering brand', error: err.message });
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

exports.approveBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: 'Brand not found' });

    brand.status = 'approved';
    await brand.save();

    await User.findByIdAndUpdate(brand.user, { role: 'brand' });

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
      mediaInfo
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
      status: 'pending'
    });

    console.log('Campaign to be saved:', campaign);
    
    await campaign.save();

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

