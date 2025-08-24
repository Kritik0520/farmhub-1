const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const farmer = await Farmer.findById(decoded.farmerId);

    if (!farmer) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.farmer = farmer;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if (username === process.env.ADMIN_USERNAME && 
        password === process.env.ADMIN_PASSWORD) {
      req.isAdmin = true;
      next();
    } else {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { auth, adminAuth };

