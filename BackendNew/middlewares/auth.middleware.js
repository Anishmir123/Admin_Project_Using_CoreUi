const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized: Token missing' });
  }

  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
