/**
 * Importa apenas dados (sem schema) do banco antigo para o novo.
 * Ordem respeita dependências de FK.
 */
import pg from 'pg';
const { Client } = pg;

const SOURCE = 'postgresql://neondb_owner:npg_piHsF1V4dTrM@ep-ancient-mode-at4w7fpa.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require';
const TARGET = 'postgresql://neondb_owner:npg_IECWrByus0o1@ep-broad-thunder-ais0lkb2.c-4.us-east-1.aws.neon.tech/neondb?uselibpqcompat=true&sslmode=require';

const ORDER = [
  'users',
  'users_sessions',
  'categories',
  'media',
  'posts',
  'site_settings',
  'site_settings_servicos',
  'site_settings_servicos_itens',
  'payload_preferences',
  'payload_preferences_rels',
  'payload_locked_documents',
  'payload_locked_documents_rels',
  'payload_migrations',
  'payload_kv',
  'contact_messages',
];

const src = new Client({ connectionString: SOURCE });
const tgt = new Client({ connectionString: TARGET });

await src.connect();
await tgt.connect();

let total = 0;
for (const table of ORDER) {
  const { rows } = await src.query(`SELECT * FROM "${table}"`);
  if (rows.length === 0) { console.log(`  ${table}: vazio`); continue; }

  // Limpa destino antes de inserir (evita conflitos com dados criados pelo Payload)
  await tgt.query(`DELETE FROM "${table}"`);

  const cols = Object.keys(rows[0]).map(k => `"${k}"`).join(', ');
  const placeholders = Object.keys(rows[0]).map((_, i) => `$${i + 1}`).join(', ');

  let ok = 0;
  for (const row of rows) {
    try {
      await tgt.query(
        `INSERT INTO "${table}" (${cols}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`,
        Object.values(row)
      );
      ok++;
    } catch (e) {
      console.error(`  ERRO ${table}: ${e.message}`);
    }
  }

  // Atualiza sequence se a tabela tiver coluna id numérica
  try {
    const { rows: [seq] } = await tgt.query(`
      SELECT pg_get_serial_sequence('"${table}"', 'id') AS seq
    `);
    if (seq?.seq) {
      await tgt.query(`SELECT setval('${seq.seq}', (SELECT MAX(id) FROM "${table}") + 1)`);
    }
  } catch (_) {}

  console.log(`  ${table}: ${ok}/${rows.length}`);
  total += ok;
}

console.log(`\n✅ ${total} registros importados`);
await src.end();
await tgt.end();
