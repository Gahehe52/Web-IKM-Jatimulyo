const jwt = require('jsonwebtoken'); // [cite: 594]
const db = require('../config/db');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // [cite: 596-597]
    try {
      // 1. Ambil token dari header
      token = req.headers.authorization.split(' ')[1]; // [cite: 600]
      
      // 2. Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 3. Ambil data user dari DB (tanpa password)
      const { rows } = await db.query(
        'SELECT user_id, email, role, is_verified FROM users WHERE user_id = $1', 
        [decoded.userId]
      ); // [cite: 601-602]
      
      if (rows.length === 0) {
        throw new Error('User tidak ditemukan');
      }
      
      // 4. Tempelkan data user ke request
      req.user = rows[0]; // [cite: 603]
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Tidak terotorisasi, token gagal' }); // [cite: 605-606]
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Tidak terotorisasi, tidak ada token' }); // [cite: 610-611]
  }
};

const authorize = (...roles) => { // [cite: 614]
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) { // [cite: 616]
      return res.status(403).json({ 
        message: `Role '${req.user.role}' tidak diizinkan mengakses rute ini` 
      }); // [cite: 617-620]
    }
    next();
  };
};

module.exports = { protect, authorize }; // [cite: 624]