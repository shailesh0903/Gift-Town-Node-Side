// authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    // Get token from request headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token not provided.' });
    }

    // Verify token
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token.' });
      }
      // If token is valid, attach token and user information to request object
      req.token = token;
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
