const jwt = require('jsonwebtoken');
const config = require('config');

// MW function - has access to req/res object
// next - callback
module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, auth denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();

    // if token not valid
  } catch (err) {
    res.status(401).json({ msg: 'Token not valid' });
  }
};
