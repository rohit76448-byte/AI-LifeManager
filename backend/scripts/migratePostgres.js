/**
 * POSTGRESQL SCHEMA MIGRATION & INITIALIZATION SCRIPT
 * Reads schema.sql and runs it against your PostgreSQL database.
 * 
 * Usage:
 *   node backend/scripts/migratePostgres.js
 */

const fs = require('fs');
const path = require('path');
const { getPool, query } = require('../config/postgres');

async function migrate() {
  console.log('====================================================');
  console.log('   AI LifeManager — PostgreSQL Database Migration    ');
  console.log('====================================================\n');

  const schemaPath = path.join(__dirname, '..', 'models', 'schema.sql');
  if (!fs.existsSync(schemaPath)) {
    console.error('✗ Schema file not found at:', schemaPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(schemaPath, 'utf8');
  console.log('1. Reading schema DDL from backend/models/schema.sql...');

  const pool = getPool();

  try {
    console.log('2. Testing database connection...');
    const testRes = await query('SELECT current_database() as db_name, version() as pg_version');
    console.log(`   Connected to Database: "${testRes.rows[0].db_name}"`);
    console.log(`   PostgreSQL Version: ${testRes.rows[0].pg_version.split(',')[0]}\n`);

    console.log('3. Applying tables and constraints from schema.sql...');
    await query(sql);
    console.log('   ✓ Schema executed successfully!\n');

    console.log('4. Verifying created tables in database:');
    const tablesRes = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

    tablesRes.rows.forEach(r => {
      console.log(`   • ${r.table_name}`);
    });

    console.log(`\n✓ Migration complete! Total tables: ${tablesRes.rowCount}`);
    console.log('Your PostgreSQL database is now ready for production use.\n');

  } catch (err) {
    console.error('\n✗ Migration failed with error:');
    console.error(err.message);
    if (err.message.includes('password authentication failed') || err.message.includes('ECONNREFUSED')) {
      console.error('\nPlease check your DATABASE_URL in backend/.env:');
      console.error('  DATABASE_URL=postgres://username:password@localhost:5432/lifemanager');
    }
  } finally {
    await pool.end();
  }
}

migrate();
