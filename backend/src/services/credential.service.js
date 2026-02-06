// Credential service
const { getAgent } = require('../config/veramo');
const CredentialModel = require('../models/Credential.model');

const issueCredential = async ({ issuerDID, holderDID, credentialSubject, type }) => {
    try {
        const agent = getAgent();
        const credentialType = Array.isArray(type) ? (type[1] || type[0]) : (type || 'CustomCredential');

        // Create verifiable credential
        const verifiableCredential = await agent.createVerifiableCredential({
            credential: {
                '@context': ['https://www.w3.org/2018/credentials/v1'],
                type: ['VerifiableCredential', credentialType],
                issuer: { id: issuerDID },
                credentialSubject: {
                    id: holderDID,
                    ...credentialSubject,
                },
                issuanceDate: new Date().toISOString(),
            },
            proofFormat: 'jwt',
        });

        // Generate credential ID (use JWT if available, otherwise use a hash)
        const credentialId = verifiableCredential.proof?.jwt || 
                            verifiableCredential.id || 
                            `cred:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`;

        // Save to database
        const credentialRecord = new CredentialModel({
            credentialId,
            issuer: issuerDID,
            holder: holderDID,
            type: credentialType,
            credentialSubject,
            credential: verifiableCredential,
            status: 'active',
            issuanceDate: new Date(verifiableCredential.issuanceDate || Date.now()),
        });

        await credentialRecord.save();

        // Return credential with ID
        return {
            ...verifiableCredential,
            id: credentialId,
        };
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
        // Return the stored credential object with ID
        return {
            ...credential.credential,
            id: credential.credentialId,
            status: credential.status,
        };
    } catch (error) {
        throw new Error(`Failed to get credential: ${error.message}`);
    }
};

const getCredentialsByHolder = async (holderDID) => {
    try {
        const credentials = await CredentialModel.find({ holder: holderDID });
        return credentials.map(cred => ({
            ...cred.credential,
            id: cred.credentialId,
            status: cred.status,
            type: cred.type,
        }));
    } catch (error) {
        throw new Error(`Failed to get credentials: ${error.message}`);
    }
};

const getCredentialsByIssuer = async (issuerDID) => {
    try {
        const credentials = await CredentialModel.find({ issuer: issuerDID });
        return credentials.map(cred => ({
            ...cred.credential,
            id: cred.credentialId,
            status: cred.status,
            type: cred.type,
            holder: cred.holder,
            credentialSubject: cred.credentialSubject,
            issuanceDate: cred.issuanceDate,
        }));
    } catch (error) {
        throw new Error(`Failed to get credentials: ${error.message}`);
    }
};

module.exports = {
    issueCredential,
    getCredential,
    getCredentialsByHolder,
    getCredentialsByIssuer,
};
