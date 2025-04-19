const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token for debugging
    console.log('Decoded JWT:', decoded); // Added log for debugging

    req.user = decoded; // Set decoded to req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
};
