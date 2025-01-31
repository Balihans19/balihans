const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('AuthMiddleware hit');

  // Check for token in cookies
  const token = req.cookies?.adminToken;  // Safely access cookies
  console.log('Token from cookies:', token);

  if (!token) {
    console.log('No token found');
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    // Attach the admin ID to the request object
    req.adminId = decoded.adminId;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
