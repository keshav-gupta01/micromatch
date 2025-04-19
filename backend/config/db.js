const mongoose = require('mongoose');

//const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    if (!MONGO_URI) {
      throw new Error('❌ MONGO_URI is undefined! Please check your .env file.');
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Atlas Connected...');
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
