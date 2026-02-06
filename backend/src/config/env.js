// Environment configuration
require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Database
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/identix',

    // Blockchain
    BLOCKCHAIN_RPC_URL: process.env.BLOCKCHAIN_RPC_URL || 'http://localhost:8545',
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,

    // JWT
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',

    // Rate limiting
    RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
};
