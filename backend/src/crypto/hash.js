// Hashing utilities
const crypto = require('crypto');

const hashCredential = (credential) => {
    const credentialString = JSON.stringify(credential);
    return crypto.createHash('sha256').update(credentialString).digest('hex');
};

const hashData = (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
};

const hashWithAlgorithm = (data, algorithm = 'sha256') => {
    return crypto.createHash(algorithm).update(data).digest('hex');
};

module.exports = {
    hashCredential,
    hashData,
    hashWithAlgorithm,
};
