// Credential routes
const express = require('express');
const router = express.Router();
const credentialController = require('../controllers/credential.controller');

router.post('/issue', credentialController.issueCredential);
router.post('/verify', credentialController.verifyCredential);
router.post('/revoke', credentialController.revokeCredential);
router.get('/:credentialId', credentialController.getCredential);
router.get('/holder/:did', credentialController.getCredentialsByHolder);

module.exports = router;
