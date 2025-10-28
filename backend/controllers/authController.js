const db = require('../config/db'); // [cite: 641]
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fungsi helper untuk generate token [cite: 642]
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { 
    expiresIn: '1d' 
  }); // [cite: 644]
};

// Logika untuk POST /api/auth/register [cite: 647]
exports.registerUser = async (req, res) => {
  const { email, password, role, nama_usaha } = req.body; // [cite: 648]

  if (!email || !password || !role || !nama_usaha) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  try {
    // 1. Cek apakah user sudah ada
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar' }); // [cite: 651]
    }
    
    // 2. Enkripsi password
    const salt = await bcrypt.genSalt(10); // [cite: 652]
    const password_hash = await bcrypt.hash(password, salt); // [cite: 653]
    
    // 3. Buat user baru
    const newUser = await db.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING user_id',
      [email, password_hash, role]
    ); // [cite: 654-658]
    const userId = newUser.rows[0].user_id;

    // 4. Buat profil IKM yang terhubung
    if (role === 'ikm') {
      await db.query(
        'INSERT INTO ikm_profiles (user_id, nama_usaha) VALUES ($1, $2)', 
        [userId, nama_usaha]
      ); // [cite: 661-662]
    } 
    // Anda bisa tambahkan 'else if (role === 'industri')' [cite: 662]
    
    res.status(201).json({ message: 'Registrasi sukses. Akun Anda akan diverifikasi oleh Admin.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Logika untuk POST /api/auth/login [cite: 669]
exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // [cite: 670]
  try {
    // 1. Cari user berdasarkan email
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]); // [cite: 672]
    const user = rows[0];
    
    if (!user) {
      return res.status(400).json({ message: 'Email atau password salah' }); // [cite: 674]
    }

    // 2. Cek apakah user sudah diverifikasi (kecuali admin)
    if (user.role !== 'admin' && !user.is_verified) {
      return res.status(403).json({ message: 'Akun Anda belum diverifikasi oleh Admin.' });
    }
    
    // 3. Bandingkan password
    const isMatch = await bcrypt.compare(password, user.password_hash); // [cite: 675-676]
    if (!isMatch) {
      return res.status(400).json({ message: 'Email atau password salah' }); // [cite: 677]
    }
    
    // 4. Buat dan kirim token
    const token = generateToken(user.user_id, user.role); // [cite: 678]
    res.json({
      token,
      user: { user_id: user.user_id, email: user.email, role: user.role } // [cite: 680-681]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};