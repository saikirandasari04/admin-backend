const jwt = require('jsonwebtoken');
const JWT_SECRET = 'dfvvabfzdbdfbefhfdvbzfbfbeerewrewrewg';

  module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access denied' });

  const token = authHeader.split(' ')[1]; // Remove 'Bearer '

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};