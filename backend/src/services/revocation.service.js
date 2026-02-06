// Revocation service
const CredentialModel = require('../models/Credential.model');
const { getContract } = require('../config/blockchain');

const revokeCredential = async (credentialId, reason = 'unspecified') => {
    try {
        // Update database
        const credential = await CredentialModel.findOne({ credentialId });
        if (!credential) {
            throw new Error('Credential not found');
        }

        credential.status = 'revoked';
        credential.revocationReason = reason;
        credential.revokedAt = new Date();
        await credential.save();

        // Update blockchain if contract is available
        const contract = getContract();
        if (contract) {
            const tx = await contract.revokeCredential(credentialId);
            await tx.wait();
        }

        return {
            credentialId,
            status: 'revoked',
            reason,
            revokedAt: credential.revokedAt,
        };
    } catch (error) {
        throw new Error(`Failed to revoke credential: ${error.message}`);
    }
};

const checkRevocationStatus = async (credentialId) => {
    try {
        const credential = await CredentialModel.findOne({ credentialId });
        if (!credential) {
            throw new Error('Credential not found');
        }

        return {
            credentialId,
            status: credential.status,
            revoked: credential.status === 'revoked',
            revokedAt: credential.revokedAt,
            revocationReason: credential.revocationReason,
        };
    } catch (error) {
        throw new Error(`Failed to check revocation status: ${error.message}`);
    }
};

module.exports = {
    revokeCredential,
    checkRevocationStatus,
};
