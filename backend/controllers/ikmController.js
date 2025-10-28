const db = require('../config/db');

// GET /api/ikm (Publik)
exports.getVerifiedIkms = async (req, res) => {
  try {
    // Query ini mengambil data dari tabel 'ikm_profiles' yang user-nya sudah 'is_verified'
    const { rows } = await db.query(
      `SELECT p.id, p.user_id, p.nama_usaha, p.desc, p.img, p.link, u.is_verified
       FROM ikm_profiles p
       JOIN users u ON p.user_id = u.user_id
       WHERE u.is_verified = true`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/ikm/:id (Publik)
exports.getIkmById = async (req, res) => {
  try {
    const { id } = req.params; // Ini adalah 'id' dari ikm_profiles
    const { rows } = await db.query(
      `SELECT p.id, p.user_id, p.nama_usaha, p.desc, p.img, p.link, u.is_verified
       FROM ikm_profiles p
       JOIN users u ON p.user_id = u.user_id
       WHERE p.id = $1 AND u.is_verified = true`,
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'IKM tidak ditemukan atau belum diverifikasi' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/ikm/profile/me (Hanya IKM terproteksi)
exports.getMyIkmProfile = async (req, res) => {
  try {
    const userId = req.user.user_id; // Diambil dari middleware 'protect'
    const { rows } = await db.query(
      `SELECT * FROM ikm_profiles WHERE user_id = $1`,
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profil IKM tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// PUT /api/ikm/profile (Hanya IKM terproteksi)
exports.updateIkmProfile = async (req, res) => {
  try {
    const userId = req.user.user_id; // Diambil dari middleware 'protect'
    const { nama_usaha, desc, link, img } = req.body;
    
    const { rows } = await db.query(
      `UPDATE ikm_profiles
       SET nama_usaha = $1, "desc" = $2, link = $3, img = $4
       WHERE user_id = $5
       RETURNING *`,
      [nama_usaha, desc, link, img, userId]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Profil IKM tidak ditemukan' });
    }
    res.json({ message: 'Profil berhasil diperbarui', profile: rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};