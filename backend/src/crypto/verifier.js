// Signature verification operations
const { getAgent } = require('../config/veramo');

const verifySignature = async (data, signature, publicKey) => {
    try {
        // Implementation depends on signature algorithm
        // This is a placeholder
        return true;
    } catch (error) {
        throw new Error(`Failed to verify signature: ${error.message}`);
    }
};

const verifyJWT = async (jwt) => {
    try {
        const agent = getAgent();
        const result = await agent.verifyCredential({
            credential: jwt,
        });
        return result.verified;
    } catch (error) {
        throw new Error(`Failed to verify JWT: ${error.message}`);
    }
};

module.exports = {
    verifySignature,
    verifyJWT,
};
