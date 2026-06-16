/**
 * Dropa todas as tabelas do banco para recriação limpa pelo Payload.
 */
import pg from 'pg';
const { Client } = pg;

const TARGET = 'postgresql://neondb_owner:npg_IECWrByus0o1@ep-broad-thunder-ais0lkb2.c-4.us-east-1.aws.neon.tech/neondb?uselibpqcompat=true&sslmode=require';
const c = new Client({ connectionString: TARGET });

await c.connect();

const { rows } = await c.query(`
  SELECT tablename FROM pg_tables WHERE schemaname = 'public'
`);

for (const { tablename } of rows) {
  await c.query(`DROP TABLE IF EXISTS "${tablename}" CASCADE`);
  console.log(`  dropped ${tablename}`);
}

// Dropa enums
const { rows: enums } = await c.query(`
  SELECT typname FROM pg_type t
  JOIN pg_namespace n ON n.oid = t.typnamespace
  WHERE n.nspname = 'public' AND t.typtype = 'e'
`);
for (const { typname } of enums) {
  await c.query(`DROP TYPE IF EXISTS "${typname}" CASCADE`);
  console.log(`  dropped enum ${typname}`);
}

await c.end();
console.log('\n✅ Banco limpo — rode npm run dev para o Payload recriar o schema');
