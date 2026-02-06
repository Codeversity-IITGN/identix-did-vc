// Main Express application setup
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { initVeramo } = require('./config/veramo');

const didRoutes = require('./routes/did.routes');
const credentialRoutes = require('./routes/credential.routes');
const blockchainRoutes = require('./routes/blockchain.routes');

const app = express();

// Initialize database and Veramo
(async () => {
    await connectDB();
    await initVeramo();
})();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/did', didRoutes);
app.use('/api/credentials', credentialRoutes);
app.use('/api/blockchain', blockchainRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

module.exports = app;
