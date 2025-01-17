// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const secret = process.env.JWT_SECRET; // Store this securely, e.g., in environment variables

// //extra add here 
// const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
// console.log('Generated Token:', token);

// const generateToken = (user) => {
//   return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
// };

// const verifyToken = (token) => {
//   return jwt.verify(token, secret);
// };

// module.exports = {
//   generateToken,
//   verifyToken
// };

// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const secret = process.env.JWT_SECRET; // Ensure this is set in your .env file

// // Function to generate token
// const generateToken = (user) => {
//   const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
//   console.log('Generated Token:', token);  // Debug log
//   return token;
// };

// // Function to verify token
// const verifyToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, secret);
//     console.log('Decoded Token:', decoded);  // Debug log
//     return decoded;
//   } catch (err) {
//     console.error('Token Verification Error:', err.message);  // Debug log
//     throw err;  // Throw the error to be caught in the controller
//   }
// };

// module.exports = {
//   generateToken,
//   verifyToken,
// };


// jwt.utils.js
const jwt = require('jsonwebtoken');


const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in the environment variables.");
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  // Generate and return the token with an expiry of 1 hour
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};



const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(403).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded; // Attach decoded user info to request
    next(); // Continue to the next middleware or route handler
  });
};

module.exports = { verifyToken,generateToken };

