const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM User WHERE Username = ?';

  try {
    const [rows] = await pool.query(sql, username);
    if (!rows.length) {
      return res.status(401).json({ message: 'Tài khoản không tồn tại' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Sai mật khẩu' });
    }

    const payload = { userId: user.UserID, userType: user.UserType };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
