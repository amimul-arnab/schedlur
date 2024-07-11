
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('Authorization');
  console.log('Authorization Header:', token); // Debug log

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Assuming token format "Bearer <token>"
    req.user = decoded.user;
    console.log('Decoded User:', req.user); // Debug log
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
