const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token not provided.' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        console.error('Error verifying token:', err); // Log the error for debugging
        return res.status(401).json({ error: 'Invalid token.' });
      }

      // Extract necessary fields from decoded token
      const { cust_name, mobile_no ,userId , password  } = decoded;

      // Attach decoded user information to request object
      req.user = {
        userId,
        cust_name,
        password,
        mobile_no
      };

      next();
    });
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
