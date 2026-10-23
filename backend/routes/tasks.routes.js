const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask);
router.patch('/:id/toggle', tasksController.toggleTaskCompletion);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
