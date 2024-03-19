const jwt = require('jsonwebtoken');
const { readUser } = require('@directus/sdk');
const { getDirectusClient } = require('../utils/directusService.js');

const directusClient = getDirectusClient();

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }
  try {
    const extractedToken = token.split(' ')[1];
    // I am user decoded here instead of verify because the token was created by Directus and i have have access to the secret key
    const decoded = jwt.decode(extractedToken);
    const activeUser = await directusClient.request(readUser(decoded.id));
    console.log('activeUser', activeUser);
    res.user = activeUser;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authMiddleware;