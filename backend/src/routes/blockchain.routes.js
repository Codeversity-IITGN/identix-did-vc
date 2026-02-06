// Blockchain routes
const express = require('express');
const router = express.Router();
const blockchainController = require('../controllers/blockchain.controller');

router.post('/anchor', blockchainController.anchorCredential);
router.get('/verify/:hash', blockchainController.verifyOnChain);
router.get('/status/:credentialId', blockchainController.getRevocationStatus);

module.exports = router;
