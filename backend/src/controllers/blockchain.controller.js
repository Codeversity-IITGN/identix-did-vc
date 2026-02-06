// Blockchain controller
const { getContract } = require('../config/blockchain');
const { hashCredential } = require('../crypto/hash');

const anchorCredential = async (req, res, next) => {
    try {
        const { credential } = req.body;
        const hash = hashCredential(credential);

        const contract = getContract();
        if (!contract) {
            throw new Error('Smart contract not initialized');
        }

        // Anchor hash to blockchain
        const tx = await contract.anchorCredential(hash);
        await tx.wait();

        res.status(200).json({
            success: true,
            data: {
                hash,
                transactionHash: tx.hash,
                blockNumber: tx.blockNumber,
            },
        });
    } catch (error) {
        next(error);
    }
};

const verifyOnChain = async (req, res, next) => {
    try {
        const { hash } = req.params;

        const contract = getContract();
        if (!contract) {
            throw new Error('Smart contract not initialized');
        }

        const isAnchored = await contract.verifyCredential(hash);

        res.status(200).json({
            success: true,
            data: { hash, isAnchored },
        });
    } catch (error) {
        next(error);
    }
};

const getRevocationStatus = async (req, res, next) => {
    try {
        const { credentialId } = req.params;

        const contract = getContract();
        if (!contract) {
            throw new Error('Smart contract not initialized');
        }

        const isRevoked = await contract.isRevoked(credentialId);

        res.status(200).json({
            success: true,
            data: { credentialId, isRevoked },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    anchorCredential,
    verifyOnChain,
    getRevocationStatus,
};
