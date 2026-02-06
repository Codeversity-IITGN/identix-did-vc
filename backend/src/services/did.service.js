// DID service
const { getAgent } = require('../config/veramo');
const DIDModel = require('../models/DID.model');

const createDID = async (method = 'ethr', options = {}) => {
    try {
        const agent = getAgent();

        // Create DID using Veramo
        const identifier = await agent.didManagerCreate({
            provider: `did:${method}`,
            options,
        });

        // Save to database
        const didRecord = new DIDModel({
            did: identifier.did,
            method,
            controllerKeyId: identifier.keys[0]?.kid,
            document: identifier,
        });

        await didRecord.save();

        return identifier;
    } catch (error) {
        throw new Error(`Failed to create DID: ${error.message}`);
    }
};

const resolveDID = async (did) => {
    try {
        const agent = getAgent();
        const didDocument = await agent.resolveDid({ didUrl: did });
        return didDocument;
    } catch (error) {
        throw new Error(`Failed to resolve DID: ${error.message}`);
    }
};

const updateDID = async (did, updates) => {
    try {
        // Implementation depends on DID method
        // This is a placeholder for DID document updates
        const didRecord = await DIDModel.findOne({ did });
        if (!didRecord) {
            throw new Error('DID not found');
        }

        // Update logic here
        Object.assign(didRecord, updates);
        await didRecord.save();

        return didRecord;
    } catch (error) {
        throw new Error(`Failed to update DID: ${error.message}`);
    }
};

const deleteDID = async (did) => {
    try {
        const agent = getAgent();
        await agent.didManagerDelete({ did });

        await DIDModel.deleteOne({ did });

        return { success: true };
    } catch (error) {
        throw new Error(`Failed to delete DID: ${error.message}`);
    }
};

module.exports = {
    createDID,
    resolveDID,
    updateDID,
    deleteDID,
};
