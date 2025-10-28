const db = require('../config/db');

// GET /api/admin/unverified (Admin)
exports.getUnverifiedIkms = async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT p.id, p.nama_usaha, u.email, u.is_verified 
       FROM ikm_profiles p
       JOIN users u ON p.user_id = u.user_id
       WHERE u.is_verified = false`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/verify/:id (Admin)
exports.verifyIkm = async (req, res) => {
  try {
    const { id } = req.params; // Ini adalah 'id' dari ikm_profiles
    
    const { rows } = await db.query(
      `UPDATE users u
       SET is_verified = true
       FROM ikm_profiles p
       WHERE p.id = $1 AND u.user_id = p.user_id
       RETURNING u.user_id, u.email, u.is_verified`,
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'IKM tidak ditemukan' });
    }
    res.json({ message: 'IKM berhasil diverifikasi', user: rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/users (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT user_id, email, role, is_verified FROM users ORDER BY role, email');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};