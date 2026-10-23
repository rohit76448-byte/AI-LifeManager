const express = require('express');
const router = express.Router();
const financeController = require('../controllers/finance.controller');

router.get('/summary', financeController.getFinanceSummary);
router.post('/transactions', financeController.createTransaction);
router.post('/accounts', financeController.createAccount);

module.exports = router;
