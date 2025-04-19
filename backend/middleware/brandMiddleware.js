const brandOnly = (req, res, next) => {
    if (req.user.role === 'brand') {
      next();
    } else {
      res.status(403).json({ message: 'Brand access only' });
    }
  };
  
  module.exports = brandOnly;
  