// Issuer model
const mongoose = require('mongoose');

const issuerSchema = new mongoose.Schema({
    did: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    website: String,
    email: String,
    publicKey: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    credentialsIssued: {
        type: Number,
        default: 0,
    },
    metadata: {
        type: Map,
        of: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Issuer', issuerSchema);
