// DID model
const mongoose = require('mongoose');

const didSchema = new mongoose.Schema({
    did: {
        type: String,
        required: true,
        unique: true,
    },
    method: {
        type: String,
        required: true,
    },
    controllerKeyId: String,
    document: {
        type: Object,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    metadata: {
        type: Map,
        of: String,
    },
}, {
    timestamps: true,
});

didSchema.index({ method: 1 });

module.exports = mongoose.model('DID', didSchema);
