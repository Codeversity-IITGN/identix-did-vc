// Authentication middleware
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: {
                    message: 'No token provided',
                    status: 401,
                },
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: {
                message: 'Invalid token',
                status: 401,
            },
        });
    }
};

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: {
                    message: 'Unauthorized',
                    status: 401,
                },
            });
        }

        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({
                error: {
                    message: 'Forbidden',
                    status: 403,
                },
            });
        }

        next();
    };
};

module.exports = {
    authenticate,
    authorize,
};
