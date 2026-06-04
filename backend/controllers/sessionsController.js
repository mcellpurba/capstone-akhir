import pool from '../config/db.js';

const generateToken = (user) => {
  const payload = `${user.id}:${user.username}:${Date.now()}`;
  return Buffer.from(payload).toString('base64');
};

// @desc    Create session (Login)
// @route   POST /api/sessions
// @access  Public
export const createSession = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username dan password wajib diisi' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).json({
      message: 'Login berhasil',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete session (Logout)
// @route   DELETE /api/sessions
// @access  Public
export const deleteSession = (req, res) => {
  res.json({ message: 'Logout berhasil' });
};
