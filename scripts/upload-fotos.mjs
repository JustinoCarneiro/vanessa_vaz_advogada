/**
 * Faz upload das fotos da Vanessa para o Payload CMS e vincula ao SiteSettings.
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

const FOTOS = {
  sobre: {
    path: resolve(__dirname, '..', 'public', 'fotos', 'IMG_0959.png'),
    filename: 'vanessa-vaz-marschallinger-perfil.png',
    alt: 'Vanessa Vaz Marschallinger — advogada previdenciária',
  },
  escritorio: {
    path: resolve(__dirname, '..', 'public', 'fotos', 'IMG_0960.png'),
    filename: 'vanessa-vaz-marschallinger-escritorio.png',
    alt: 'Vanessa Vaz Marschallinger — escritório de advocacia',
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

async function uploadMedia(token, filePath, filename, alt) {
  const buffer = readFileSync(filePath)
  const formData = new FormData()
  const blob = new Blob([buffer], { type: 'image/png' })
  formData.append('file', blob, filename)
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

async function getSiteSettings(token) {
  const res = await fetch(`${BASE}/api/globals/site-settings`, {
    headers: { Authorization: `JWT ${token}` },
  })
  return res.json().catch(() => ({}))
}

async function updateSiteSettings(token, sobreFotoId, escritorioFotoId) {
  const current = await getSiteSettings(token)
  const res = await fetch(`${BASE}/api/globals/site-settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({
      ...current,
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

  console.log('⬆️   Enviando foto de perfil (IMG_0959)...')
  const sobreId = await uploadMedia(token, FOTOS.sobre.path, FOTOS.sobre.filename, FOTOS.sobre.alt)
  console.log(`✅  Foto de perfil salva — ID: ${sobreId}`)

  console.log('⬆️   Enviando foto do escritório (IMG_0960)...')
  const escritorioId = await uploadMedia(token, FOTOS.escritorio.path, FOTOS.escritorio.filename, FOTOS.escritorio.alt)
  console.log(`✅  Foto do escritório salva — ID: ${escritorioId}`)

  console.log('\n🔗  Vinculando fotos ao SiteSettings...')
  await updateSiteSettings(token, sobreId, escritorioId)
  console.log('✅  SiteSettings atualizado!\n')

  console.log('🎉  Feito! As fotos já aparecem no site.')
  console.log('    Vanessa pode substituí-las quando quiser em:')
  console.log(`    ${BASE}/admin → Configurações → Fotos e Serviços\n`)
}

run().catch((e) => { console.error(e); process.exit(1) })
