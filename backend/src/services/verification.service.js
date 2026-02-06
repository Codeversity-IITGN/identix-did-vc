// Verification service
const { getAgent } = require('../config/veramo');

const verifyCredential = async (credential) => {
    try {
        const agent = getAgent();

        // Verify the credential
        const result = await agent.verifyCredential({
            credential,
        });

        return {
            verified: result.verified,
            issuer: credential.issuer,
            subject: credential.credentialSubject,
            issuanceDate: credential.issuanceDate,
            expirationDate: credential.expirationDate,
            errors: result.error ? [result.error] : [],
        };
    } catch (error) {
        throw new Error(`Failed to verify credential: ${error.message}`);
    }
};

const verifyPresentation = async (presentation) => {
    try {
        const agent = getAgent();

        const result = await agent.verifyPresentation({
            presentation,
        });

        return {
            verified: result.verified,
            holder: presentation.holder,
            credentials: presentation.verifiableCredential,
            errors: result.error ? [result.error] : [],
        };
    } catch (error) {
        throw new Error(`Failed to verify presentation: ${error.message}`);
    }
};

module.exports = {
    verifyCredential,
    verifyPresentation,
};
