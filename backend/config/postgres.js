/**
 * POSTGRESQL CONNECTION POOL & QUERY CLIENT
 * Connects to PostgreSQL, Supabase, Neon, AWS RDS, or local Postgres.
 */

const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectionString = process.env.DATABASE_URL || '';

// Determine if SSL is required (e.g. Supabase, Neon, Cloud hosting)
const isProductionOrCloud = 
  connectionString.includes('supabase.co') ||
  connectionString.includes('neon.tech') ||
  connectionString.includes('rds.amazonaws.com') ||
  connectionString.includes('sslmode=require') ||
  process.env.NODE_ENV === 'production';

const poolConfig = connectionString
  ? {
      connectionString,
      ssl: isProductionOrCloud ? { rejectUnauthorized: false } : false,
      max: 20, // Max concurrent connections in pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    }
  : {
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
      database: process.env.PGDATABASE || 'lifemanager',
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      ssl: false,
      max: 10
    };

let pool = null;

function getPool() {
  if (!pool) {
    pool = new Pool(poolConfig);

    pool.on('connect', () => {
      console.log('✓ [PostgreSQL] Client connected to pool');
    });

    pool.on('error', (err) => {
      console.error('✗ [PostgreSQL] Unexpected idle client error:', err.message);
    });
  }
  return pool;
}

/**
 * Execute parameterized SQL query
 * @param {string} text - SQL query string (use $1, $2, etc.)
 * @param {Array} params - Array of parameters
 */
async function query(text, params = []) {
  const start = Date.now();
  const currentPool = getPool();
  try {
    const res = await currentPool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log(`[PostgreSQL Query] ${duration}ms | rows: ${res.rowCount}`);
    }
    return res;
  } catch (err) {
    console.error('[PostgreSQL Error] Query failed:', err.message);
    throw err;
  }
}

/**
 * Test connectivity to PostgreSQL
 */
async function testConnection() {
  try {
    const res = await query('SELECT NOW() as now, current_database() as db_name, version() as pg_version');
    console.log('✓ [PostgreSQL] Connected successfully!');
    console.log(`  Database: ${res.rows[0].db_name}`);
    console.log(`  Server Time: ${res.rows[0].now}`);
    return { success: true, info: res.rows[0] };
  } catch (err) {
    console.error('✗ [PostgreSQL] Connection failed:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Check if PostgreSQL configuration is active
 */
function isConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.PGDATABASE);
}

module.exports = {
  getPool,
  query,
  testConnection,
  isConfigured
};
