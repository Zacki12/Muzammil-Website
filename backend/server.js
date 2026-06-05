const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allows your Next.js frontend to talk to this API
app.use(express.json()); // Parses incoming JSON requests

// Routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/public', require('./routes/public'));

// Database Connection
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('❌ MONGO_URI is not set. Please add it to backend/.env.');
  process.exit(1);
}

// Ensure DNS SRV lookups work by using a public resolver when local DNS blocks SRV
try {
  dns.setServers(['8.8.8.8']);
} catch (e) {
  console.warn('Could not set DNS servers:', e.message || e);
}

mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 20000 })
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message || err);
    process.exit(1);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Secure Backend API running on port ${PORT}`);
});