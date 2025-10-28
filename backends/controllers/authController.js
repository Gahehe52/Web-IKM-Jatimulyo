const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fungsi helper untuk generate token
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Logika untuk POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { email, password, role, nama_usaha, nama_perusahaan } = req.body;
  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) return res.status(400).json({ message: 'Email sudah ada' });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING user_id',
      [email, password_hash, role]
    );
    const userId = newUser.rows[0].user_id;

    if (role === 'ikm') {
      await db.query('INSERT INTO ikm_profiles (user_id, nama_usaha) VALUES ($1, $2)', [userId, nama_usaha]);
    } else if (role === 'industri') {
      await db.query('INSERT INTO industry_profiles (user_id, nama_perusahaan) VALUES ($1, $2)', [userId, nama_perusahaan]);
    }

    res.status(201).json({ message: 'Registrasi sukses' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logika untuk POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];
    if (!user) return res.status(400).json({ message: 'Email atau password salah' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Email atau password salah' });

    const token = generateToken(user.user_id, user.role);
    res.json({
      token,
      user: { user_id: user.user_id, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};