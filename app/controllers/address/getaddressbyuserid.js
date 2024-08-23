const jwt = require('jsonwebtoken');
const db = require("../../models");
const Address = db.Address;

module.exports = async function(req, res, next) {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token not provided.' });
    }

   var decoded = await jwt.verify(token, 'your_secret_key'); 
   const { userId } = decoded;

      // Fetch user's address from the database
      const userAddress = await Address.findOne({ userId });
      console.log('User Address from database:', userAddress); // Log user's address

      if (!userAddress) {
        return res.status(404).json({ error: 'User address not found.'});
      }

      return res.status(200).json({ data:userAddress});

 
  } catch (error) {
    console.error('Error in authMiddleware:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
