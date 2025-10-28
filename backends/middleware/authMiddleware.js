const jwt = require('jsonwebtoken');
const db = require('../config/db');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { rows } = await db.query('SELECT user_id, email, role FROM users WHERE user_id = $1', [decoded.userId]);
      if(rows.length === 0) throw new Error('User tidak ditemukan');

      req.user = rows[0]; // Menempelkan data user ke request
      next();
    } catch (error) {
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role '${req.user.role}' tidak diizinkan` });
    }
    next();
  };
};

module.exports = { protect, authorize };