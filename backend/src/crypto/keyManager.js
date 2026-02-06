// Key manager for cryptographic operations
const crypto = require('crypto');
const { getAgent } = require('../config/veramo');

const generateKeyPair = async (type = 'Secp256k1') => {
    try {
        const agent = getAgent();
        const key = await agent.keyManagerCreate({
            kms: 'local',
            type,
        });
        return key;
    } catch (error) {
        throw new Error(`Failed to generate key pair: ${error.message}`);
    }
};

const getKey = async (kid) => {
    try {
        const agent = getAgent();
        const key = await agent.keyManagerGet({ kid });
        return key;
    } catch (error) {
        throw new Error(`Failed to get key: ${error.message}`);
    }
};

const deleteKey = async (kid) => {
    try {
        const agent = getAgent();
        await agent.keyManagerDelete({ kid });
        return { success: true };
    } catch (error) {
        throw new Error(`Failed to delete key: ${error.message}`);
    }
};

const importKey = async (privateKeyHex, type = 'Secp256k1') => {
    try {
        const agent = getAgent();
        const key = await agent.keyManagerImport({
            kms: 'local',
            type,
            privateKeyHex,
        });
        return key;
    } catch (error) {
        throw new Error(`Failed to import key: ${error.message}`);
    }
};

module.exports = {
    generateKeyPair,
    getKey,
    deleteKey,
    importKey,
};
