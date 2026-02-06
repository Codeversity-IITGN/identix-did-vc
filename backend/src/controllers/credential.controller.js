// Credential controller
const credentialService = require('../services/credential.service');
const verificationService = require('../services/verification.service');
const revocationService = require('../services/revocation.service');

const issueCredential = async (req, res, next) => {
    try {
        const { issuerDID, holderDID, credentialSubject, type } = req.body;
        const credential = await credentialService.issueCredential({
            issuerDID,
            holderDID,
            credentialSubject,
            type,
        });
        res.status(201).json({ success: true, data: credential });
    } catch (error) {
        next(error);
    }
};

const verifyCredential = async (req, res, next) => {
    try {
        const { credential } = req.body;
        const result = await verificationService.verifyCredential(credential);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const revokeCredential = async (req, res, next) => {
    try {
        const { credentialId, reason } = req.body;
        const result = await revocationService.revokeCredential(credentialId, reason);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

const getCredential = async (req, res, next) => {
    try {
        const { credentialId } = req.params;
        const credential = await credentialService.getCredential(credentialId);
        res.status(200).json({ success: true, data: credential });
    } catch (error) {
        next(error);
    }
};

const getCredentialsByHolder = async (req, res, next) => {
    try {
        const { did } = req.params;
        const credentials = await credentialService.getCredentialsByHolder(did);
        res.status(200).json({ success: true, data: credentials });
    } catch (error) {
        next(error);
    }
};

const getCredentialsByIssuer = async (req, res, next) => {
    try {
        const { did } = req.params;
        const credentials = await credentialService.getCredentialsByIssuer(did);
        res.status(200).json({ success: true, data: credentials });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    issueCredential,
    verifyCredential,
    revokeCredential,
    getCredential,
    getCredentialsByHolder,
    getCredentialsByIssuer,
};
