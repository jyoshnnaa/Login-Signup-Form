const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

// Parse JSON
app.use(express.json());

// CORS - allow any frontend port dynamically
app.use(cors({
  origin: ['http://localhost:5173', 
    'http://localhost:5174', 
    'http://localhost:5175',
  'https://login-signup-form-frontend.onrender.com'
],
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);

const PORT = 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
