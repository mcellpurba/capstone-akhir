import pool from '../config/db.js';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) return res.status(400).json({ message: 'Mohon isi semua data' });
  if (password.length < 6) return res.status(400).json({ message: 'Password minimal 6 karakter' });
  
  try {
    // Check if user exists
    const checkUser = await pool.query('SELECT * FROM users WHERE email = $1 OR username = $2', [email, username]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username atau email sudah terdaftar' });
    }

    // Insert user
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, password] // NOTE: In production, password should be hashed with bcrypt!
    );

    // Create empty profile for new user
    await pool.query('INSERT INTO profiles (username) VALUES ($1)', [username]);

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: result.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [id, username] = decoded.split(':');
    
    const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1 AND username = $2', [id, username]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Token tidak valid' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: 'Token tidak valid' });
  }
};
