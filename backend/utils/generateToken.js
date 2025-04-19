// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (userId, role = null) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
