const influencerOnly = (req, res, next) => {
    if (req.user.role === 'influencer'){
      next();
    } else {
      res.status(403).json({ message: 'influencer access only' });
    }
  };
  
  module.exports = influencerOnly;
  