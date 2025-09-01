const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Express middleware to authenticate and extract user from JWT
function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && typeof authHeader === 'string' ? authHeader.split(' ')[1] : null;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } catch (e) {
    console.error('authenticateToken unexpected error:', e);
    return res.status(500).json({ error: 'Authentication error' });
  }
}

module.exports = authenticateToken;
