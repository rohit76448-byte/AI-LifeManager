const express = require('express');
const router = express.Router();
const medicareController = require('../controllers/medicare.controller');

router.get('/medicines', medicareController.getMedicines);
router.post('/medicines', medicareController.addMedicine);
router.get('/doses/today', medicareController.getTodayDoses);
router.post('/doses/:id/take', medicareController.markDoseTaken);
router.post('/safety-check', medicareController.checkDrugSafety);
router.get('/appointments', medicareController.getAppointments);
router.post('/appointments', medicareController.createAppointment);

module.exports = router;
