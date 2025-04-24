const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const influencerRoutes = require('./routes/influencerRoutes');
const authRoutes = require('./routes/authRoutes');
const brandRoutes = require('./routes/brandRoutes');
const { cloudinary } = require('./config/cloudinary'); // Add this line

// Initialize environment variables
dotenv.config();

// Verify Cloudinary connection (add this block)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' })); // Increased for media uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Add this line

app.use(cors({
  origin: 'https://micromatch.onrender.com'  // Replace with your actual frontend URL
}));

// Routes
app.use('/api/influencers', influencerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);

// Add Cloudinary health check endpoint (optional)
app.get('/api/cloudinary-status', (req, res) => {
  cloudinary.api.ping()
    .then(() => res.json({ status: 'connected' }))
    .catch(() => res.status(500).json({ status: 'disconnected' }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Cloudinary configured: ${!!cloudinary.config().api_key}`); // Add this line
});