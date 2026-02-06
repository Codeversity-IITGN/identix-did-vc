// Credential service
const { getAgent } = require('../config/veramo');
const CredentialModel = require('../models/Credential.model');

const issueCredential = async ({ issuerDID, holderDID, credentialSubject, type }) => {
    try {
        const agent = getAgent();

        // Create verifiable credential
        const verifiableCredential = await agent.createVerifiableCredential({
            credential: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiableCredential', type || 'CustomCredential'],
                issuer: { id: issuerDID },
                credentialSubject: {
                    id: holderDID,
                    ...credentialSubject,
                },
                issuanceDate: new Date().toISOString(),
            },
            proofFormat: 'jwt',
        });

        // Save to database
        const credentialRecord = new CredentialModel({
            credentialId: verifiableCredential.proof.jwt,
            issuer: issuerDID,
            holder: holderDID,
            type,
            credentialSubject,
            credential: verifiableCredential,
            status: 'active',
        });

        await credentialRecord.save();

        return verifiableCredential;
    } catch (error) {
        throw new Error(`Failed to issue credential: ${error.message}`);
    }
};

const getCredential = async (credentialId) => {
    try {
        const credential = await CredentialModel.findOne({ credentialId });
        if (!credential) {
            throw new Error('Credential not found');
        }
        return credential;
    } catch (error) {
        throw new Error(`Failed to get credential: ${error.message}`);
    }
};

const getCredentialsByHolder = async (holderDID) => {
    try {
        const credentials = await CredentialModel.find({ holder: holderDID });
        return credentials;
    } catch (error) {
        throw new Error(`Failed to get credentials: ${error.message}`);
    }
};

module.exports = {
    issueCredential,
    getCredential,
    getCredentialsByHolder,
};
