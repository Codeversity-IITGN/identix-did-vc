// Digital signature operations
const { getAgent } = require('../config/veramo');

const signData = async (data, kid) => {
    try {
        const agent = getAgent();
        const signature = await agent.keyManagerSign({
            keyRef: kid,
            data,
        });
        return signature;
    } catch (error) {
        throw new Error(`Failed to sign data: ${error.message}`);
    }
};

const signJWT = async (payload, issuerDID) => {
    try {
        const agent = getAgent();
        const jwt = await agent.createVerifiableCredential({
            credential: payload,
            proofFormat: 'jwt',
        });
        return jwt;
    } catch (error) {
        throw new Error(`Failed to sign JWT: ${error.message}`);
    }
};

module.exports = {
    signData,
    signJWT,
};
