# ROADMAP — Vanessa Vaz Marschallinger (MVP Completo)

## Contexto
Site institucional + blog com CMS para advogada previdenciária.
Stack: Next.js 15.4 (App Router) + Payload CMS 3.x + PostgreSQL (Neon) + Tailwind CSS.
Deploy: Vercel (projeto `projeto-vanessa`). URL de produção: `https://projeto-vanessa-two.vercel.app`.
Uploads de mídia: Vercel Blob (`@payloadcms/storage-vercel-blob`, CDN público).
Domínio e hospedagem: cliente contrata e paga.

> ⚠️ RISCO DE PRAZO REGISTRADO
> Escopo calculado em 16 dias comprimido em 7 dias a pedido do dev.
> Condição de viabilidade: M01+M02 fecham no dia 1, SEO feito inline
> durante o desenvolvimento, sem retrabalho de identidade visual.
> Qualquer mudança de escopo retorna à Fase 1 — não se codifica na hora.

---

## Fórmula de prazo aplicada

```
Prazo = Fase 2 (2d, identidade pronta) + Σ módulos + 2d (Fase 5)
      = 2 + 12 + 2
      = 16 dias (comprimido para 7 dias — risco aceito pelo dev)
```

Pesos: Pequeno 1-2d · Médio 3-4d · Grande 5-7d

---

## Mapa de módulos

| ID | Módulo | Peso | Dias | Histórias |
|---|---|---|---|---|
| M01 | Setup Next.js + Payload + Deploy base | Pequeno | 1d | H5.1 |
| M02 | Tokens CSS + componentes base (identidade VVM) | Pequeno | 1d | — |
| M03 | Páginas institucionais (Home + carrossel + Sobre + Escritório + Serviços) | Médio | 3d | H1.1, H1.2, H1.3, H1.4 |
| M04 | Blog público (listagem + busca + categorias + artigo) | Médio | 3d | H2.1, H2.2 |
| M05 | CMS Payload (coleções Post + Category + Mensagem) | Pequeno | 2d | H2.3, H2.4, H3.2 |
| M06 | Formulário de contato + envio de email | Pequeno | 1d | H3.1 |
| M07 | SEO estrutural (meta, sitemap, OG, Schema.org) | Pequeno | 1d | H4.1, H4.2 |

**Total de módulos:** 12 dias

---

## Ordem de execução Kanban

```
Dia 1:   M01 → M02   (fundação — tudo depende disso)
Dia 2-3: M05         (CMS primeiro — M03 e M04 dependem dos dados)
Dia 3-5: M03         (páginas institucionais — consome CMS)
Dia 4-6: M04         (blog público — consome CMS em paralelo com M03)
Dia 6:   M06         (formulário — independente, rápido)
Dia 6-7: M07         (SEO inline — idealmente feito junto com M03/M04)
Dia 7:   Fase 5      (smoke test + deploy final)
```

> Regra: M05 (CMS) entra antes de M03 e M04 porque as páginas consomem
> as coleções do Payload. Construir o front antes do schema é retrabalho.

---

## Detalhamento por módulo e contratos de API

---

### M01 · Setup Next.js + Payload + Deploy base

**Objetivo:** repositório funcionando, Payload conectado ao PostgreSQL,
deploy automático na Vercel configurado.

**Entregáveis:**
- Projeto Next.js 14 com App Router inicializado
- Payload CMS instalado e configurado (`payload.config.ts`)
- PostgreSQL provisionado (Neon ou Supabase — free tier)
- Variáveis de ambiente documentadas no `.env.example`
- Deploy base na Vercel com CI/CD via GitHub

**Sem contrato de API neste módulo** — apenas infraestrutura.

---

### M02 · Tokens CSS + componentes base

**Objetivo:** sistema de design extraído do manual VVM implementado em
Tailwind + CSS custom properties. Componentes atômicos prontos.

**Tokens obrigatórios:**
```css
--color-teal-dark:   #3D5C5F;
--color-teal-mid:    #89B0AF;
--color-mint:        #BDE4DA;
--color-black:       #000000;
--color-white:       #FFFFFF;
--font-display:      'Petita', serif;
--font-body:         'Montserrat', sans-serif;
```

**Componentes base:**
- `<Button>` (variantes: primary, secondary, ghost)
- `<Logo>` (variantes: dourado, preto, branco, teal)
- `<NavBar>` (desktop + mobile hamburguer)
- `<Footer>`
- `<Container>` (wrapper de largura máxima)
- `<SectionTitle>`

**Sem contrato de API neste módulo** — apenas componentes.

---

### M03 · Páginas institucionais

**Objetivo:** páginas responsivas e acessíveis AA, conteúdo gerenciado via CMS.

**Rotas geradas:**
- `/` — Home com hero carrossel
- `/sobre` — Sobre Mim
- `/escritorio` — Sobre o Escritório
- `/servicos` — Serviços
- `/contato` — Página de Contato (shell — formulário é M06)

**Componentes específicos:**
- `<HeroCarousel>` — autoplay, navegação por dots, next/image obrigatório
- `<ServiceCard>` — ícone + título + descrição + CTA
- `<AboutSection>` — foto + bio + formação

**CMS-conectado (via SiteSettings global):**
- Foto "Quem é Vanessa" na home → campo `sobreFoto`
- Foto do escritório → campo `escritorioFoto`
- Cards de Áreas de Atuação na home → array `servicos` (título + descrição + ícone)
- Os mesmos dados `servicos` alimentam a página `/servicos`

**Foto segura:** `object-fit: cover` + `object-position: top` garante que qualquer
proporção de imagem enviada pela cliente não quebre o layout.

---

### M04 · Blog público

**Rotas geradas:**
- `/blog` — listagem paginada (9 por página)
- `/blog/[slug]` — artigo individual
- `/blog/categoria/[slug]` — listagem filtrada por categoria

**GET /api/posts**
```
Request:
  query params:
    page?:     number    (default: 1)
    limit?:    number    (default: 9)
    category?: string   (slug da categoria)
    search?:   string   (busca por título e conteúdo)

Response 200:
  {
    docs: [
      {
        id:          string,
        title:       string,
        slug:        string,
        excerpt:     string,
        coverImage:  { url: string, alt: string },
        category:    { id: string, name: string, slug: string },
        publishedAt: string (ISO 8601),
        readingTime: number (minutos estimados)
      }
    ],
    totalDocs:  number,
    totalPages: number,
    page:       number,
    hasNextPage: boolean,
    hasPrevPage: boolean
  }

Response 404: { error: "Nenhum post encontrado" }
```

**GET /api/posts/[slug]**
```
Request:
  params: slug (string)

Response 200:
  {
    id:          string,
    title:       string,
    slug:        string,
    content:     object (Payload rich text — Lexical),
    coverImage:  { url: string, alt: string },
    category:    { id: string, name: string, slug: string },
    meta:        { title: string, description: string },
    publishedAt: string (ISO 8601),
    updatedAt:   string (ISO 8601)
  }

Response 404: { error: "Post não encontrado" }
```

**GET /api/categories**
```
Response 200:
  {
    docs: [
      {
        id:          string,
        name:        string,
        slug:        string,
        description: string | null,
        postCount:   number
      }
    ]
  }
```

---

### M05 · CMS Payload — Coleções + Global SiteSettings

**Objetivo:** schema das coleções e do global no Payload CMS que alimentam M03, M04 e M06.

**Global: SiteSettings** (`src/globals/SiteSettings.ts`)
```typescript
{
  slug:  'site-settings',
  label: 'Fotos e Serviços',
  admin: { group: 'Configurações' },
  fields: [
    { name: 'sobreFoto',     type: 'upload', relationTo: 'media' },
    { name: 'escritorioFoto', type: 'upload', relationTo: 'media' },
    {
      name: 'servicos', type: 'array', minRows: 1, maxRows: 6,
      fields: [
        { name: 'icone',    type: 'select', options: ICONES_OPTIONS },  // 20 opções
        { name: 'titulo',   type: 'text',     required: true },
        { name: 'descricao', type: 'textarea', required: true },
        { name: 'itens',    type: 'array', fields: [{ name: 'item', type: 'text' }] }
      ]
    }
  ]
}
```

**Ícones disponíveis (20):** relogio · escudo · coracao · pessoa · casa · setas ·
balanca · calendario · documento · estrela · maos · familia · medico · maleta ·
dinheiro · cadeado · conquista · telefone · check · atencao

Mapeados em `src/components/servicos/servicosIcons.tsx` → `getIcone(slug)` com
fallback para `'escudo'`. `ICONES_OPTIONS` importado pelo SiteSettings para o select.

**Dashboard — organização por grupos:**
| Grupo | Itens |
|---|---|
| Blog | Artigos do Blog · Categorias do Blog |
| Contato | Mensagens de Contato |
| Configurações | Fotos e Serviços · Arquivos e Imagens |
| (oculto) | Administradores (hidden para usuário logado) |

**Coleção: Posts** (`src/collections/Posts.ts`)
```typescript
{
  slug:        'posts',
  admin:       { group: 'Blog' },
  fields: [
    { name: 'title',       type: 'text',         required: true },
    { name: 'slug',        type: 'text',         unique: true, index: true },
    { name: 'status',      type: 'select',       options: ['draft','published'] },
    { name: 'category',    type: 'relationship', relationTo: 'categories' },
    { name: 'coverImage',  type: 'upload',       relationTo: 'media' },
    { name: 'excerpt',     type: 'textarea' },
    { name: 'content',     type: 'richText'  },  // Lexical editor
    { name: 'meta',        type: 'group',        fields: [title, description] },
    { name: 'publishedAt', type: 'date' }
  ],
  access: { read: ({ doc }) => doc?.status === 'published' }
}
```

**Coleção: Categories** (`src/collections/Categories.ts`)
```typescript
{
  slug:  'categories',
  admin: { group: 'Blog' },
  fields: [
    { name: 'name',        type: 'text',     required: true },
    { name: 'slug',        type: 'text',     unique: true },
    { name: 'description', type: 'textarea' }
  ]
}
```

**Coleção: ContactMessages** (`src/collections/ContactMessages.ts`)
```typescript
{
  slug:  'contact-messages',
  admin: { group: 'Contato' },
  fields: [
    { name: 'name',    type: 'text',     required: true },
    { name: 'email',   type: 'email',    required: true },
    { name: 'phone',   type: 'text' },
    { name: 'subject', type: 'text',     required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'read',    type: 'checkbox', defaultValue: false }
  ],
  access: { read: isAdmin, create: () => true }
}
```

**Coleção: Media** (`src/collections/Media.ts`)
```typescript
{
  slug:   'media',
  admin:  { group: 'Configurações' },
  upload: {
    mimeTypes:  ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    imageSizes: [thumbnail(400×300), card(900×600), hero(1800×auto)],
    // Em produção: arquivos enviados para Vercel Blob (CDN direto)
  }
}
```

**Sem contrato de API externo** — Payload expõe `/api/*` automaticamente.

---

### Padrão de migração de schema (CRÍTICO)

`push: true` no `postgresAdapter` sincroniza o schema **em runtime**, mas o
`next build` executa queries SSG **antes** do Payload inicializar. Qualquer nova
coluna em tabela existente precisa ser aplicada manualmente antes do deploy:

```sql
-- Exemplo: adicionar coluna 'icone' à tabela de serviços
ALTER TABLE site_settings_servicos ADD COLUMN IF NOT EXISTS icone varchar;
```

Executar via painel SQL do Neon (ou `psql`), depois fazer redeploy na Vercel.
Nunca adicionar campo novo e fazer deploy em um único passo — o build vai falhar
com erro PostgreSQL 42703 (`column does not exist`).

---

### M06 · Formulário de contato + envio de email

**POST /api/contact**
```
Request body:
  {
    name:    string  (required, min 2 chars),
    email:   string  (required, valid email),
    phone?:  string,
    subject: string  (required),
    message: string  (required, min 20 chars),
    _hp:     string  (honeypot — deve ser vazio)
  }

Response 200:
  { success: true, message: "Mensagem enviada com sucesso" }

Response 400:
  { success: false, errors: { [field]: string } }

Response 500:
  { success: false, message: "Erro interno. Tente novamente." }
```

**Fluxo interno:**
1. Valida campos no servidor (nunca confiar só no client)
2. Checa honeypot (`_hp` deve ser `""`)
3. Salva em `ContactMessages` via Payload local API
4. Envia email para Vanessa via Resend (`vanessavaz8@gmail.com`)
5. Retorna resposta ao cliente

**Variáveis de ambiente necessárias:**
```
RESEND_API_KEY=
CONTACT_EMAIL_TO=vanessavaz8@gmail.com
```

---

### M07 · SEO estrutural

**Objetivo:** implementar SEO técnico em todas as rotas.

**Checklist por rota:**
- `generateMetadata()` com title e description únicos
- OG image (estática para páginas fixas, dinâmica para posts via `og/[slug]`)
- `sitemap.ts` gerado dinamicamente (inclui todos os posts publicados)
- `robots.ts` configurado (bloqueia `/admin`, libera o resto)
- Schema.org `LegalService` na home e `/servicos`
- `next/font` para Montserrat (Petita via self-hosted se não estiver no Google Fonts)

**Sem contrato de API** — implementação via Next.js Metadata API.

---

---

### Scripts de dados (package.json)

| Script | O que faz |
|---|---|
| `npm run seed` | Popula posts/categorias de exemplo no ambiente local |
| `npm run seed:prod` | Mesmo, em produção |
| `npm run init-settings` | Cria/atualiza o SiteSettings com os 6 serviços padrão (local) |
| `npm run init-settings:prod` | Mesmo, em produção |
| `npm run upload-fotos:prod` | Baixa 2 fotos stock Unsplash e vincula ao SiteSettings (produção) |

> Scripts de produção lêem `PLAYWRIGHT_ADMIN_EMAIL` e `PLAYWRIGHT_ADMIN_PASSWORD`
> do `.env.local`. Nunca commitar essas variáveis.

---

## Definição de pronto

- **Belo:** identidade VVM aplicada corretamente — teal, Petita + Montserrat, logo nas variantes certas por contexto
- **Fluido:** estados de erro, carregamento e vazio tratados em todas as telas; responsivo mobile-first; carrossel funciona em touch
- **Seguro:** sem credenciais no repo; formulário com honeypot; painel Payload acessível só com login; dados de contato não expostos publicamente
