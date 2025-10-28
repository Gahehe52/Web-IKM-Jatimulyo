// Impor koneksi database
const db = require('../config/db');

/*
 * @desc    Admin mendapatkan daftar IKM yang BELUM terverifikasi
 * @route   GET /api/admin/unverified
 * @access  Private (Admin Only)
 */
exports.getUnverifiedIkms = async (req, res) => {
  try {
    // 1. Ambil semua IKM yang status 'is_verified' nya false
    const query = 'SELECT profile_id, nama_usaha, nama_pemilik, (SELECT email FROM users WHERE user_id = ikm_profiles.user_id) AS email FROM ikm_profiles WHERE is_verified = false';
    
    const { rows } = await db.query(query);

    // 2. Kirim datanya
    res.status(200).json(rows);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/*
 * @desc    Admin memverifikasi (menyetujui) IKM
 * @route   PUT /api/admin/verify/:ikm_id
 * @access  Private (Admin Only)
 */
exports.verifyIkm = async (req, res) => {
  try {
    // 1. Ambil 'ikm_id' dari parameter URL
    // Pastikan di file routes/adminRoutes.js Anda menggunakan /verify/:ikm_id
    const { ikm_id } = req.params;

    // 2. Buat query UPDATE untuk mengubah 'is_verified' menjadi true
    const query = `
      UPDATE ikm_profiles 
      SET is_verified = true 
      WHERE profile_id = $1 
      RETURNING *
    `;

    // 3. Eksekusi query
    const { rows } = await db.query(query, [ikm_id]);

    // 4. Cek apakah IKM-nya ada
    if (rows.length === 0) {
      return res.status(404).json({ message: 'IKM tidak ditemukan dengan ID tersebut' });
    }

    // 5. Kirim balasan sukses
    res.status(200).json({ message: `IKM ${rows[0].nama_usaha} berhasil diverifikasi`, ikm: rows[0] });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};