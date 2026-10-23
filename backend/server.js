/**
 * MINE AI LIFEMANAGER - BACKEND SERVER
 * Express REST API service for Tasks, Finance, Vault, and MediCare.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const tasksRoutes = require('./routes/tasks.routes');
const financeRoutes = require('./routes/finance.routes');
const vaultRoutes = require('./routes/vault.routes');
const medicareRoutes = require('./routes/medicare.routes');
const postgres = require('./config/postgres');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const isPgConfigured = postgres.isConfigured();
  let dbStatus = 'json_store';

  if (isPgConfigured) {
    const pgCheck = await postgres.testConnection();
    dbStatus = pgCheck.success ? 'postgresql_connected' : 'postgresql_connection_error';
  }

  res.json({
    status: 'online',
    service: 'AI LifeManager API Suite',
    databaseEngine: dbStatus,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mount modular section routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/vault', vaultRoutes);
app.use('/api/medicare', medicareRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// Start Server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Mine AI LifeManager Backend running on port ${PORT}`);
    console.log(`- Health Check: http://localhost:${PORT}/api/health`);
    console.log(`- Tasks API:    http://localhost:${PORT}/api/tasks`);
    console.log(`- Finance API:  http://localhost:${PORT}/api/finance/summary`);
    console.log(`- MediCare API: http://localhost:${PORT}/api/medicare/medicines`);
    console.log(`- Vault API:    http://localhost:${PORT}/api/vault (Zero-Knowledge Protected)`);
    console.log(`====================================================`);
  });
}

module.exports = app;
