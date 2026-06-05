const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 1. Initial Admin Setup (You can disable this after creating your account)
router.post('/register-admin', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      purchasedCourses: []
    });

    await admin.save();
    res.status(201).json({ message: 'Admin created successfully. You can now log in.' });
  } catch (error) {
    console.error('Register admin error:', error);
    res.status(500).json({ error: 'Server error during setup' });
  }
});

// 2. Admin Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });

    if (user.role !== 'admin') return res.status(403).json({ error: 'Access denied. Admins only.' });

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('❌ JWT_SECRET is not configured in backend/.env');
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      jwtSecret, 
      { expiresIn: '24h' }
    );

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;  