const jwt = require('jsonwebtoken');
const User = require('../Models/user');

// 🔐 PROTECT
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Not authorized, no token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    if (!decoded.user_id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const user = await User.findById(decoded.user_id).select('-password');

    if (!user) {
      return res.status(401).json({
        message: 'User not found'
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("AUTH ERROR:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({
      message: 'Invalid token'
    });
  }
};

// 🛡 ADMIN
const admin = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'User missing in request'
      });
    }

    if (req.user.accountType?.toLowerCase() !== 'admin') {
      return res.status(403).json({
        message: 'Admin access required'
      });
    }

    next();

  } catch (error) {
    console.log("ADMIN AUTH ERROR:", error.message);

    return res.status(500).json({
      message: 'Admin authorization failed'
    });
  }
};

module.exports = { protect, admin };