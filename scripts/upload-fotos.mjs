/**
 * Faz upload das fotos placeholder para o Payload CMS em produção.
 * Vanessa pode substituir a qualquer momento pelo painel /admin.
 *
 * Uso:
 *   node scripts/upload-fotos.mjs                          # local
 *   SEED_BASE_URL=https://... node scripts/upload-fotos.mjs  # produção
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env.local')
try {
  const lines = readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '')
  }
} catch { /* usa variáveis já no ambiente */ }

const BASE     = process.env.SEED_BASE_URL || 'http://localhost:3000'
const EMAIL    = process.env.PLAYWRIGHT_ADMIN_EMAIL
const PASSWORD = process.env.PLAYWRIGHT_ADMIN_PASSWORD

// Fotos de stock (Unsplash — licença livre para uso comercial)
const FOTOS = {
  sobre: {
    url: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=900&q=85',
    filename: 'foto-vanessa-placeholder.jpg',
    alt: 'Advogada Vanessa Vaz Marschallinger — foto de perfil',
  },
  escritorio: {
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85',
    filename: 'foto-escritorio-placeholder.jpg',
    alt: 'Ambiente do escritório de advocacia — Vanessa Vaz Marschallinger',
  },
}

async function login() {
  const res = await fetch(`${BASE}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const data = await res.json()
  if (!data.token) throw new Error(`Login falhou: ${JSON.stringify(data)}`)
  return data.token
}

async function downloadImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Falha ao baixar imagem: ${url} — ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function uploadMedia(token, buffer, filename, alt) {
  const formData = new FormData()
  const blob = new Blob([buffer], { type: 'image/jpeg' })
  formData.append('file', blob, filename)
  // Payload exige campos extras como JSON em _payload
  formData.append('_payload', JSON.stringify({ alt }))

  const res = await fetch(`${BASE}/api/media`, {
    method: 'POST',
    headers: { Authorization: `JWT ${token}` },
    body: formData,
  })
  const data = await res.json()
  if (!res.ok || !data.doc?.id) {
    throw new Error(`Falha no upload de ${filename}: ${JSON.stringify(data)}`)
  }
  return data.doc.id
}

async function updateSiteSettings(token, sobreFotoId, escritorioFotoId) {
  const res = await fetch(`${BASE}/api/globals/site-settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      sobreFoto: sobreFotoId,
      escritorioFoto: escritorioFotoId,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`Falha ao atualizar SiteSettings: ${JSON.stringify(data)}`)
  return data
}

async function run() {
  console.log(`\n📸  Fazendo upload das fotos em ${BASE}\n`)

  const token = await login()
  console.log('✅  Login OK')

  console.log('⬇️   Baixando foto — Sobre Mim...')
  const bufferSobre = await downloadImage(FOTOS.sobre.url)
  console.log('⬆️   Enviando para o Payload...')
  const sobreId = await uploadMedia(token, bufferSobre, FOTOS.sobre.filename, FOTOS.sobre.alt)
  console.log(`✅  Foto Sobre Mim salva — ID: ${sobreId}`)

  console.log('⬇️   Baixando foto — Escritório...')
  const bufferEscritorio = await downloadImage(FOTOS.escritorio.url)
  console.log('⬆️   Enviando para o Payload...')
  const escritorioId = await uploadMedia(token, bufferEscritorio, FOTOS.escritorio.filename, FOTOS.escritorio.alt)
  console.log(`✅  Foto Escritório salva — ID: ${escritorioId}`)

  console.log('\n🔗  Vinculando fotos ao SiteSettings...')
  await updateSiteSettings(token, sobreId, escritorioId)
  console.log('✅  SiteSettings atualizado!\n')

  console.log('🎉  Feito! As fotos já aparecem no site.')
  console.log('    Vanessa pode substituí-las quando quiser em:')
  console.log(`    ${BASE.replace('https://projeto-vanessa-two.vercel.app', 'https://projeto-vanessa-two.vercel.app')}/admin → Configurações → Fotos e Serviços\n`)
}

run().catch((e) => { console.error(e); process.exit(1) })
