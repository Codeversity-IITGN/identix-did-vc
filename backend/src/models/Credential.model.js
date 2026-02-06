// Credential model
const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
    credentialId: {
        type: String,
        required: true,
        unique: true,
    },
    issuer: {
        type: String,
        required: true,
    },
    holder: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    credentialSubject: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
    },
    credential: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'revoked', 'expired'],
        default: 'active',
    },
    issuanceDate: {
        type: Date,
        default: Date.now,
    },
    expirationDate: Date,
    revocationReason: String,
    revokedAt: Date,
    blockchainHash: String,
    blockchainTxHash: String,
}, {
    timestamps: true,
});

credentialSchema.index({ holder: 1 });
credentialSchema.index({ issuer: 1 });
credentialSchema.index({ status: 1 });

module.exports = mongoose.model('Credential', credentialSchema);
