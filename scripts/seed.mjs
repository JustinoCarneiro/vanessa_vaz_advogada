/**
 * Seed de dados fictícios para desenvolvimento.
 * Cria categorias, faz upload de imagens do Unsplash e publica artigos de blog.
 *
 * Pré-requisito: servidor rodando em http://localhost:3000
 * Credenciais lidas de .env.local (PLAYWRIGHT_ADMIN_EMAIL / PLAYWRIGHT_ADMIN_PASSWORD)
 *
 * Uso:
 *   npm run seed
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// --- Carrega .env.local manualmente ---
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env.local')
try {
  const lines = readFileSync(envPath, 'utf-8').split('\n')
  for (const line of lines) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) process.env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '')
  }
} catch { /* usa variáveis já no ambiente */ }

const BASE     = 'http://localhost:3000'
const EMAIL    = process.env.PLAYWRIGHT_ADMIN_EMAIL
const PASSWORD = process.env.PLAYWRIGHT_ADMIN_PASSWORD

if (!EMAIL || !PASSWORD) {
  console.error('❌  Defina PLAYWRIGHT_ADMIN_EMAIL e PLAYWRIGHT_ADMIN_PASSWORD no .env.local')
  process.exit(1)
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function lexical(...blocks) {
  return {
    root: { type: 'root', children: blocks, direction: 'ltr', format: '', indent: 0, version: 1 },
  }
}

function p(text) {
  return {
    type: 'paragraph', direction: 'ltr', format: '', indent: 0, version: 1,
    children: [{ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
  }
}

function h2(text) {
  return {
    type: 'heading', tag: 'h2', direction: 'ltr', format: '', indent: 0, version: 1,
    children: [{ type: 'text', text, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
  }
}

async function apiJSON(method, path, body, token) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(json).slice(0, 200)}`)
  return json
}

async function uploadImage(unsplashId, filename, alt, token) {
  const url = `https://images.unsplash.com/${unsplashId}?w=900&h=600&q=80&auto=format&fit=crop`
  process.stdout.write(`    ↓ Baixando imagem...`)

  const imgRes = await fetch(url)
  if (!imgRes.ok) throw new Error(`Download falhou: ${url} (${imgRes.status})`)
  const buffer = await imgRes.arrayBuffer()
  process.stdout.write(` ${Math.round(buffer.byteLength / 1024)} KB\n`)

  const blob = new Blob([buffer], { type: 'image/jpeg' })
  const form = new FormData()
  form.append('file', blob, filename)
  form.append('_payload', JSON.stringify({ alt }))

  const uploadRes = await fetch(`${BASE}/api/media`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  })
  const uploadJson = await uploadRes.json()
  if (!uploadRes.ok) throw new Error(`Upload falhou: ${JSON.stringify(uploadJson).slice(0, 200)}`)
  return uploadJson.doc.id
}

// ─── Dados ──────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: 'Aposentadoria',               slug: 'aposentadoria' },
  { name: 'Benefícios por Incapacidade', slug: 'beneficios-por-incapacidade' },
  { name: 'Pensão por Morte',            slug: 'pensao-por-morte' },
  { name: 'BPC / LOAS',                 slug: 'bpc-loas' },
  { name: 'Revisão de Benefício',        slug: 'revisao-de-beneficio' },
]

// Unsplash photo IDs + metadados de imagem para cada post
const POST_IMAGES = {
  'reforma-da-previdencia-o-que-mudou': {
    id:       'photo-1589829545856-d10d557cf95f',
    filename: 'reform-previdencia.jpg',
    alt:      'Documentos jurídicos e martelo sobre mesa de escritório',
  },
  'bpc-loas-quem-tem-direito': {
    id:       'photo-1576091160550-2173dba999ef',
    filename: 'bpc-loas-idoso.jpg',
    alt:      'Idosa sendo atendida por assistente social',
  },
  'pensao-por-morte-como-garantir': {
    id:       'photo-1529156069898-49953e39b3ac',
    filename: 'familia-pensao.jpg',
    alt:      'Família reunida representando proteção e amparo',
  },
  'auxilio-incapacidade-vs-aposentadoria-invalidez': {
    id:       'photo-1559757148-5c350d0d3c56',
    filename: 'consulta-medica.jpg',
    alt:      'Consulta médica com profissional da saúde',
  },
  'revisao-salario-beneficio': {
    id:       'photo-1450101499163-c8848c66ca85',
    filename: 'documentos-revisao.jpg',
    alt:      'Cálculos e documentos sobre mesa, revisão de benefício previdenciário',
  },
  'aposentadoria-especial-agentes-nocivos': {
    id:       'photo-1504307651254-35680f356dfd',
    filename: 'trabalhador-especial.jpg',
    alt:      'Trabalhador com equipamentos de proteção individual em ambiente industrial',
  },
}

function buildPosts(catIds) {
  const apo = catIds['aposentadoria']
  const inc = catIds['beneficios-por-incapacidade']
  const pen = catIds['pensao-por-morte']
  const bpc = catIds['bpc-loas']
  const rev = catIds['revisao-de-beneficio']

  return [
    {
      title: 'Reforma da Previdência: o que realmente mudou para quem está perto de se aposentar',
      slug: 'reforma-da-previdencia-o-que-mudou',
      excerpt: 'A EC 103/2019 trouxe novas regras de transição que muita gente ainda não entende — e que podem fazer diferença de anos na sua aposentadoria.',
      category: apo,
      publishedAt: '2024-11-10T10:00:00.000Z',
      content: lexical(
        p('A Emenda Constitucional 103/2019 — chamada de Reforma da Previdência — trouxe mudanças profundas nas regras de aposentadoria no Brasil. Para quem estava perto de se aposentar, o impacto pode ser significativo. Entender as regras de transição é fundamental para não perder tempo nem dinheiro.'),
        h2('O que são as regras de transição?'),
        p('As regras de transição foram criadas para proteger os segurados que já haviam contribuído por muitos anos antes da reforma entrar em vigor. Em vez de exigir que todos se adequassem imediatamente às novas exigências de idade mínima, o legislador criou cinco opções de transição, e cada segurado pode escolher a mais vantajosa para o seu caso.'),
        h2('Pontos: a regra mais comum'),
        p('Uma das regras mais utilizadas é o sistema de pontos. O segurado precisa atingir uma combinação de idade + tempo de contribuição que soma determinado número de pontos (86/96 em 2024, aumentando progressivamente). Para muitos trabalhadores, essa pode ser a forma mais rápida de se aposentar.'),
        h2('Aposentadoria por tempo de contribuição acabou?'),
        p('Sim. Após a reforma, não existe mais a aposentadoria por tempo de contribuição pura — aquela que exigia apenas 30 anos (mulher) ou 35 anos (homem) sem limite de idade. Agora, toda aposentadoria exige o cumprimento de uma idade mínima, seja pela regra atual ou pelas transições.'),
        h2('O que fazer agora?'),
        p('Se você está próximo de se aposentar, o primeiro passo é fazer um planejamento previdenciário detalhado. É essencial revisar o CNIS, verificar se todos os vínculos empregatícios estão registrados e calcular cada uma das regras de transição para identificar a mais vantajosa.')
      ),
    },
    {
      title: 'BPC/LOAS: quem tem direito, como pedir e os erros mais comuns',
      slug: 'bpc-loas-quem-tem-direito',
      excerpt: 'O Benefício de Prestação Continuada é um direito constitucional de idosos e pessoas com deficiência de baixa renda — mas muitos pedidos são negados indevidamente pelo INSS.',
      category: bpc,
      publishedAt: '2024-10-22T10:00:00.000Z',
      content: lexical(
        p('O BPC/LOAS garante um salário mínimo mensal à pessoa idosa acima de 65 anos ou à pessoa com deficiência que comprove não ter meios de prover a própria manutenção. Após a Reforma da Previdência, as regras mudaram bastante e muitas famílias acabam perdendo o benefício por desinformação.'),
        h2('Quem tem direito?'),
        p('Para ter direito ao BPC, a renda familiar per capita deve ser inferior a 1/4 do salário mínimo. Mas atenção: o Supremo Tribunal Federal já reconheceu que esse critério não é absoluto. Situações de miserabilidade comprovadas por outros meios podem ser aceitas pelos juízes.'),
        h2('Pessoa com deficiência: o que é considerado?'),
        p('Após a Lei Brasileira de Inclusão (Lei 13.146/2015), a definição de deficiência para fins do BPC ficou mais ampla. A análise deve ser biopsicossocial — considera não apenas o impedimento físico ou mental, mas o impacto dele na participação plena na sociedade.'),
        h2('Por que os pedidos são negados?'),
        p('Os principais motivos de negativa são: renda per capita acima do limite, ausência de documentação médica suficiente, falta de comprovação de residência ou vínculos familiares, e erros no preenchimento do formulário do INSS.'),
        h2('Retroativos: tenho direito?'),
        p('Sim. Quando o BPC é concedido judicialmente após uma negativa indevida, o INSS deve pagar os valores retroativos desde a data do requerimento administrativo. Esses valores podem ser significativos dependendo do tempo de espera.')
      ),
    },
    {
      title: 'Pensão por morte: como garantir o benefício para os dependentes',
      slug: 'pensao-por-morte-como-garantir',
      excerpt: 'A perda de um ente querido já é difícil. Não receber o benefício que é por direito por falta de informação é ainda mais injusto. Entenda as regras atuais.',
      category: pen,
      publishedAt: '2024-09-15T10:00:00.000Z',
      content: lexical(
        p('A pensão por morte é o benefício pago pelo INSS aos dependentes do segurado que faleceu — seja ele empregado, autônomo, MEI ou contribuinte facultativo. Após a Reforma da Previdência, as regras mudaram bastante.'),
        h2('Quem são os dependentes?'),
        p('Os dependentes de primeira classe são: cônjuge ou companheiro(a), filho(a) menor de 21 anos ou com deficiência. Esses têm preferência sobre os demais e, enquanto existirem, excluem os dependentes de segunda e terceira classes.'),
        h2('Quanto tempo de relacionamento é exigido?'),
        p('Após a reforma, o cônjuge ou companheiro precisa comprovar pelo menos 2 anos de casamento ou união estável para ter direito à pensão vitalícia. Caso contrário, o benefício dura de 4 meses até no máximo 20 anos, dependendo da idade do pensionista.'),
        h2('E os filhos?'),
        p('Os filhos recebem pensão até os 21 anos, ou sem prazo se forem pessoas com deficiência. Atenção: filhos maiores de 21 anos que cursam faculdade NÃO têm direito à pensão — isso foi extinto pela Reforma.'),
        h2('O que fazer quando o INSS nega?'),
        p('A negativa de pensão por morte é um dos casos mais frequentes na minha prática. Muitas vezes o INSS nega por falta de comprovação de união estável, por considerar que o falecido não tinha qualidade de segurado, ou por entender que a dependência econômica não foi demonstrada.')
      ),
    },
    {
      title: 'Auxílio por incapacidade ou aposentadoria por invalidez: qual a diferença?',
      slug: 'auxilio-incapacidade-vs-aposentadoria-invalidez',
      excerpt: 'Muita gente confunde os dois benefícios — e essa confusão pode custar caro na hora de pedir ao INSS. Entenda as diferenças e quando cada um se aplica.',
      category: inc,
      publishedAt: '2024-08-20T10:00:00.000Z',
      content: lexical(
        p('Quando um trabalhador fica doente ou sofre um acidente e não consegue mais exercer suas atividades, o INSS oferece dois benefícios distintos: o auxílio por incapacidade temporária e a aposentadoria por incapacidade permanente. A diferença entre eles impacta diretamente nos valores recebidos.'),
        h2('Auxílio por incapacidade temporária'),
        p('É concedido quando a incapacidade para o trabalho é temporária — há expectativa de recuperação. O segurado precisa estar incapaz por mais de 15 dias consecutivos. O benefício corresponde a 91% do salário de benefício e pode durar enquanto durar a incapacidade, sujeito a perícias periódicas do INSS.'),
        h2('Aposentadoria por incapacidade permanente'),
        p('É concedida quando a incapacidade é definitiva e total para qualquer atividade. O valor é de 100% do salário de benefício. Em casos em que a doença ou acidente exige assistência permanente de terceiros, há um acréscimo de 25%.'),
        h2('Qualidade de segurado: um requisito crítico'),
        p('Para ter direito a qualquer um dos dois benefícios, o trabalhador precisa manter a qualidade de segurado — estar com as contribuições em dia ou dentro do período de graça. Exceção: algumas doenças graves dispensam carência.'),
        h2('O INSS negou: o que fazer?'),
        p('É muito comum o INSS negar esses benefícios ou conceder um quando o correto seria o outro. Uma análise jurídica completa, com laudos de especialistas e documentação médica robusta, frequentemente consegue reverter a decisão administrativa ou judicial.')
      ),
    },
    {
      title: 'Revisão do salário de benefício: você pode estar recebendo menos do que merece',
      slug: 'revisao-salario-beneficio',
      excerpt: 'Erros no cálculo do benefício são mais comuns do que parecem. Uma revisão criteriosa pode aumentar significativamente o valor que você recebe todo mês.',
      category: rev,
      publishedAt: '2024-07-05T10:00:00.000Z',
      content: lexical(
        p('Muitos segurados do INSS nunca questionam o valor do benefício que recebem — e alguns estão, há anos, recebendo menos do que teriam direito. Erros no cálculo do salário de benefício, na escolha do período básico de cálculo ou na aplicação dos índices de correção são frequentes.'),
        h2('O que é o salário de benefício?'),
        p('O salário de benefício é a base de cálculo usada pelo INSS para definir o valor da aposentadoria ou auxílio. Após a Reforma, ele é calculado com base na média de todos os salários de contribuição desde julho de 1994.'),
        h2('A revisão mais importante'),
        p('A "revisão da vida toda" — que permite incluir todos os salários anteriores a julho de 1994 se isso for mais vantajoso para o segurado — foi um dos temas mais discutidos no STF recentemente. Há situações individuais em que a revisão ainda pode ser aplicada, dependendo da data do requerimento.'),
        h2('Outros tipos de revisão'),
        p('Além da revisão do salário de benefício, existem outras hipóteses: correção do período de carência, inclusão de vínculos empregatícios não registrados no CNIS, revisão de benefícios concedidos com erro material, e revisão por mudança de espécie.'),
        h2('Existe prazo para pedir revisão?'),
        p('Sim. O prazo para revisão de benefício previdenciário é de 10 anos a partir do primeiro pagamento — o prazo decadencial. Por isso, não deixe para depois: se você suspeita que está recebendo menos do que deveria, consulte uma advogada previdenciarista o quanto antes.')
      ),
    },
    {
      title: 'Aposentadoria especial: trabalhadores expostos a agentes nocivos têm regras diferenciadas',
      slug: 'aposentadoria-especial-agentes-nocivos',
      excerpt: 'Ruído, calor, poeiras, agentes químicos e biológicos: se você trabalhou exposto a esses riscos, pode ter direito a se aposentar antes com a aposentadoria especial.',
      category: apo,
      publishedAt: '2024-06-01T10:00:00.000Z',
      content: lexical(
        p('A aposentadoria especial é um benefício destinado ao segurado que trabalhou em condições prejudiciais à saúde ou à integridade física durante pelo menos 15, 20 ou 25 anos — dependendo do nível de exposição. Após a Reforma da Previdência, as regras mudaram, mas o direito continua existindo.'),
        h2('Quais atividades geram direito?'),
        p('A lista de agentes nocivos reconhecidos pelo INSS é extensa: ruído acima de determinados decibéis, calor excessivo, exposição a agentes químicos como benzeno, amianto e solventes, radiação ionizante, agentes biológicos (como profissionais de saúde), entre outros.'),
        h2('Como comprovar a exposição?'),
        p('A prova da exposição a agentes nocivos é feita principalmente pelo PPP (Perfil Profissiográfico Previdenciário), documento que deve ser fornecido pela empresa. Em casos onde a empresa foi encerrada ou o PPP não está disponível, é possível utilizar LTCAT, laudos técnicos e prova testemunhal.'),
        h2('Conversão de tempo especial para comum'),
        p('Se você trabalhou em condições especiais mas não completou os anos exigidos, pode converter esse tempo para tempo comum — com um fator de multiplicação. Por exemplo, 1 ano de trabalho especial em condição de 15 anos equivale a 2 anos de tempo comum.'),
        h2('O INSS não reconheceu?'),
        p('É muito frequente o INSS negar o reconhecimento de tempo especial por falhas na documentação ou por entender que a atividade não gerava exposição habitual. A via judicial é o caminho mais eficaz, especialmente quando há laudos técnicos e testemunhos que comprovam as condições de trabalho.')
      ),
    },
  ]
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔐  Autenticando...')
  const { token } = await apiJSON('POST', '/api/users/login', { email: EMAIL, password: PASSWORD })
  console.log('✅  Autenticado\n')

  // ── Categorias ──────────────────────────────────────────────────────────
  console.log('📂  Categorias...')
  const catIds = {}
  for (const cat of CATEGORIES) {
    const existing = await apiJSON('GET', `/api/categories?where[slug][equals]=${cat.slug}&limit=1`, null, token)
    if (existing.docs?.length > 0) {
      catIds[cat.slug] = existing.docs[0].id
      console.log(`  ⏭️   Já existe: ${cat.name}`)
    } else {
      const created = await apiJSON('POST', '/api/categories', cat, token)
      catIds[cat.slug] = created.doc.id
      console.log(`  ✅  Criada: ${cat.name}`)
    }
  }

  // ── Posts + imagens ─────────────────────────────────────────────────────
  console.log('\n📝  Posts...')
  const posts = buildPosts(catIds)

  for (const post of posts) {
    const img = POST_IMAGES[post.slug]
    console.log(`\n  → ${post.title}`)

    // Verifica se o post já existe
    const existing = await apiJSON('GET', `/api/posts?where[slug][equals]=${post.slug}&limit=1`, null, token)

    // Faz upload da imagem (sempre, para garantir que está vinculada)
    let coverImage = null
    if (img) {
      try {
        const mediaId = await uploadImage(img.id, img.filename, img.alt, token)
        coverImage = mediaId
        console.log(`    🖼️  Imagem enviada (ID ${mediaId})`)
      } catch (e) {
        console.warn(`    ⚠️  Falha no upload da imagem: ${e.message}`)
      }
    }

    const payload = { ...post, status: 'published', ...(coverImage ? { coverImage } : {}) }

    if (existing.docs?.length > 0) {
      // Atualiza o post existente com a imagem
      const postId = existing.docs[0].id
      await apiJSON('PATCH', `/api/posts/${postId}`, payload, token)
      console.log(`    ✅  Atualizado (ID ${postId})`)
    } else {
      const created = await apiJSON('POST', '/api/posts', payload, token)
      console.log(`    ✅  Publicado (ID ${created.doc.id})`)
    }
  }

  console.log('\n🎉  Seed concluído! Acesse http://localhost:3000/blog\n')
}

main().catch((err) => {
  console.error('\n❌  Erro no seed:', err.message)
  process.exit(1)
})
