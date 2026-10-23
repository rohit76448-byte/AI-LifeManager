const express = require('express');
const router = express.Router();
const vaultController = require('../controllers/vault.controller');
const { enforceZeroKnowledgeAiBarrier } = require('../config/security');

// Zero-knowledge barrier prevents automated RAG extraction
router.use(enforceZeroKnowledgeAiBarrier);

router.post('/verify-pin', vaultController.verifyPin);
router.get('/records', vaultController.getVaultRecords);
router.post('/records', vaultController.addVaultRecord);

module.exports = router;
