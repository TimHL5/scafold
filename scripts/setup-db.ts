import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join } from 'path';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set. Usage:');
    console.error('  DATABASE_URL=<connection-string> npx tsx scripts/setup-db.ts');
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const initSql = readFileSync(join(__dirname, 'init-db.sql'), 'utf-8');
  await sql.query(initSql);
  console.log('Database initialized successfully — post_state table created.');
}

main().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
