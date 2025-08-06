const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const influencerRoutes = require('./routes/influencerRoutes');
const authRoutes = require('./routes/authRoutes');
const brandRoutes = require('./routes/brandRoutes');
const { cloudinary } = require('./config/cloudinary');

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connect to MongoDB
connectDB();

const app = express();

const allowedOrigins = [
  'https://kind-meadow-0a1d96300.1.azurestaticapps.net',
  'https://micromatch.onrender.com',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
};

app.use(cors(corsOptions));


// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Root endpoint
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Routes
app.use('/api/influencers', influencerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/brands', brandRoutes);

// Optional: Cloudinary Health Check
app.get('/api/cloudinary-status', (req, res) => {
  cloudinary.api.ping()
    .then(() => res.json({ status: 'connected' }))
    .catch(() => res.status(500).json({ status: 'disconnected' }));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Cloudinary configured: ${!!cloudinary.config().api_key}`);
});
