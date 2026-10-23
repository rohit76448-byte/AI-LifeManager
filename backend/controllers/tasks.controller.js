/**
 * TASKS & SCHEDULE CONTROLLER
 */

const { db, saveDatabase } = require('../config/database');

exports.getAllTasks = (req, res) => {
  const { listId, status } = req.query;
  let result = db.tasks || [];

  if (listId) {
    result = result.filter(t => t.listId.toLowerCase() === listId.toLowerCase());
  }
  if (status === 'completed') {
    result = result.filter(t => t.completed);
  } else if (status === 'pending') {
    result = result.filter(t => !t.completed);
  }

  res.json({
    success: true,
    total: result.length,
    lists: db.taskLists || [],
    tasks: result
  });
};

exports.createTask = (req, res) => {
  const { title, listId, priority, dueDate, dueTime, notes, tags } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Task title is required.' });
  }

  const newTask = {
    id: `task_${Date.now()}`,
    listId: listId || 'Personal',
    title: title.trim(),
    notes: notes || '',
    priority: priority || 'MEDIUM',
    dueDate: dueDate || new Date().toISOString().slice(0, 10),
    dueTime: dueTime || '09:00 AM',
    completed: false,
    tags: Array.isArray(tags) ? tags : ['General'],
    createdAt: new Date().toISOString()
  };

  db.tasks.push(newTask);
  saveDatabase();

  res.status(201).json({
    success: true,
    message: 'Task created successfully.',
    task: newTask
  });
};

exports.toggleTaskCompletion = (req, res) => {
  const { id } = req.params;
  const task = db.tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }

  task.completed = !task.completed;
  task.completedAt = task.completed ? new Date().toISOString() : null;
  saveDatabase();

  res.json({
    success: true,
    message: `Task marked as ${task.completed ? 'completed' : 'pending'}.`,
    task
  });
};

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const index = db.tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Task not found.' });
  }

  const removed = db.tasks.splice(index, 1)[0];
  saveDatabase();

  res.json({
    success: true,
    message: 'Task deleted successfully.',
    task: removed
  });
};
