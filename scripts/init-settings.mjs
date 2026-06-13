/**
 * Inicializa o Global SiteSettings com o conteúdo dos serviços.
 * As fotos devem ser enviadas manualmente pelo painel /admin.
 *
 * Uso:
 *   node scripts/init-settings.mjs                   # local
 *   SEED_BASE_URL=https://... node scripts/init-settings.mjs  # produção
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

const SERVICOS = [
  {
    titulo: 'Aposentadorias',
    descricao:
      'Análise completa do histórico contributivo para identificar a melhor regra — por idade, tempo de contribuição ou transição — antes de qualquer protocolo. O pedido certo, feito na hora certa, evita anos de espera.',
    itens: [
      { item: 'Planejamento previdenciário' },
      { item: 'Contagem e correção do CNIS' },
      { item: 'Requerimento e acompanhamento no INSS' },
    ],
  },
  {
    titulo: 'Aposentadoria Especial',
    descricao:
      'Reconhecimento do tempo trabalhado em condições insalubres ou perigosas — saúde, indústria, transporte, segurança. A diferença entre a negativa e a concessão costuma estar na qualidade da prova técnica.',
    itens: [
      { item: 'Análise de PPP e LTCAT' },
      { item: 'Conversão de tempo especial em comum' },
      { item: 'Recurso administrativo e ação judicial' },
    ],
  },
  {
    titulo: 'Benefícios por Incapacidade',
    descricao:
      'Auxílio-doença e aposentadoria por invalidez: preparação para a perícia médica, prorrogação de benefício e contestação de alta indevida — para que a doença não vire também um problema de renda.',
    itens: [
      { item: 'Preparação documental para a perícia' },
      { item: 'Prorrogação e restabelecimento' },
      { item: 'Contestação de alta indevida' },
    ],
  },
  {
    titulo: 'BPC / LOAS',
    descricao:
      'Benefício assistencial para pessoas com deficiência e idosos a partir de 65 anos em situação de baixa renda. Acompanhamento desde o CadÚnico até a via judicial, quando o INSS nega indevidamente.',
    itens: [
      { item: 'Avaliação dos requisitos do benefício' },
      { item: 'Comprovação de renda e deficiência' },
      { item: 'Requerimento, recurso e ação judicial' },
    ],
  },
  {
    titulo: 'Pensão por Morte',
    descricao:
      'Orientação completa aos dependentes — cônjuge, filhos, companheiros em união estável — com a sensibilidade que o momento exige e a atenção técnica que os prazos impõem.',
    itens: [
      { item: 'Habilitação de dependentes' },
      { item: 'Comprovação de união estável e dependência' },
      { item: 'Prazos, retroativos e duração do benefício' },
    ],
  },
  {
    titulo: 'Revisão de Benefícios',
    descricao:
      'Reanálise do cálculo do benefício já concedido: vínculos não computados, salários ignorados e erros de fator. Quando o INSS erra na conta, a diferença é sua por direito.',
    itens: [
      { item: 'Conferência integral do cálculo' },
      { item: 'Inclusão de vínculos e salários ignorados' },
      { item: 'Revisão administrativa e judicial' },
    ],
  },
]

async function run() {
  console.log(`\n🔧  Inicializando SiteSettings em ${BASE}\n`)

  const token = await login()
  console.log('✅  Login OK')

  const res = await fetch(`${BASE}/api/globals/site-settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify({ servicos: SERVICOS }),
  })

  const data = await res.json()

  if (!res.ok) {
    console.error('❌  Erro ao salvar:', JSON.stringify(data, null, 2))
    process.exit(1)
  }

  console.log('✅  SiteSettings salvo com 6 serviços')
  console.log('\n📸  Fotos pendentes — faça upload pelo painel:')
  console.log('    /admin  →  Configurações do Site  →  Foto - Sobre Mim / Foto - Escritório\n')
}

run().catch((e) => { console.error(e); process.exit(1) })
