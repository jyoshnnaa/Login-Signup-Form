const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

// Parse JSON
app.use(express.json());

// CORS - allow frontend
app.use(cors({
  origin: ['https://login-signup-form-frontend.onrender.com', 'http://localhost:5173'],
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
}

start();

