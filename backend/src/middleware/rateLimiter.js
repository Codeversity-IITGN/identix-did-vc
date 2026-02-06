// Rate limiting middleware
const rateLimit = require('express-rate-limit');
const { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } = require('../config/env');

const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX_REQUESTS,
    message: {
        error: {
            message: 'Too many requests, please try again later',
            status: 429,
        },
    },
    standardHeaders: true,
    legacyHeaders: false,
});

const strictLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 requests per window
    message: {
        error: {
            message: 'Too many requests, please try again later',
            status: 429,
        },
    },
});

module.exports = {
    limiter,
    strictLimiter,
};
