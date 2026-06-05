const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();
const dns = require('dns');

const createAdmin = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('❌ MONGO_URI is not set. Please add it to backend/.env.');
    process.exit(1);
  }

  try {
    dns.setServers(['8.8.8.8']);
  } catch (e) {
    console.warn('Could not set DNS servers:', e.message || e);
  }

  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 20000 });

  const email = 'muzfs1@gmail.com';
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log('Admin already exists, no new user created.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin123', 10); // SET YOUR PASSWORD HERE
  const admin = new User({
    name: 'Admin',
    email,
    password: hashedPassword,
    role: 'admin',
    purchasedCourses: []
  });

  await admin.save();
  console.log('Admin account created!');
  process.exit(0);
};

createAdmin();