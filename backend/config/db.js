const mongoose = require('mongoose');

// Replace this connection string with your MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://gauravsaklani12:Gaurav0020@cluster02.wdbklcn.mongodb.net/login-signup?retryWrites=true&w=majority&appName=Cluster02';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas Connected...');
  } catch (err) {
    console.error('Database connection error:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;