// Blockchain configuration
const { ethers } = require('ethers');
const { BLOCKCHAIN_RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = require('./env');

let provider;
let wallet;
let contract;

const initBlockchain = async () => {
    try {
        // Connect to blockchain
        provider = new ethers.JsonRpcProvider(BLOCKCHAIN_RPC_URL);

        // Create wallet
        if (PRIVATE_KEY) {
            wallet = new ethers.Wallet(PRIVATE_KEY, provider);
            console.log('✅ Blockchain wallet initialized');
        }

        // Load contract (ABI will be loaded from compiled contract)
        if (CONTRACT_ADDRESS) {
            // TODO: Load ABI from compiled contract
            // contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
            console.log('✅ Smart contract connected');
        }

        return { provider, wallet, contract };
    } catch (error) {
        console.error('❌ Blockchain initialization error:', error);
        throw error;
    }
};

const getProvider = () => provider;
const getWallet = () => wallet;
const getContract = () => contract;

module.exports = {
    initBlockchain,
    getProvider,
    getWallet,
    getContract,
};
