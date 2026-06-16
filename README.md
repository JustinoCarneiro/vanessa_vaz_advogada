# VVM Advocacia — Site Institucional + Blog

Site profissional com blog integrado para **Vanessa Vaz Marschallinger**, advogada especializada em Direito Previdenciário (baseada em Gunskirchen, Áustria, com atendimento internacional).

---

## Stack e versões exatas

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router, SSR/SSG) | 15.4.11 |
| Runtime | React | 19.1.2 |
| CMS | Payload CMS (embutido no Next.js) | 3.x |
| Banco de dados | PostgreSQL via Neon | — |
| ORM / adapter | `@payloadcms/db-postgres` (drizzle por baixo) | 3.x |
| Rich text | Lexical (`@payloadcms/richtext-lexical`) | 3.x |
| Armazenamento de mídia | Vercel Blob (`@payloadcms/storage-vercel-blob`) | 3.85.1+ |
| Estilização | Tailwind CSS | 3.4.x |
| Email | Nodemailer + Gmail SMTP | 9.x |
| Otimização de imagens | sharp | 0.33.x |
| Testes unitários | Jest + ts-jest | 29.x |
| Testes E2E | Playwright | 1.60.x |
| Deploy | Vercel | — |
| Node.js mínimo | — | 20+ |

---

## Infraestrutura em produção

A infraestrutura está **inteiramente na conta da cliente** (Vanessa Vaz Marschallinger). O desenvolvedor **não tem controle** — qualquer acesso requer credenciais dela.

| Serviço | Conta | Projeto / recurso |
|---|---|---|
| Vercel | vazvanessamarschallinger@gmail.com | `vanessa-vaz-advogada` |
| Neon (PostgreSQL) | vazvanessamarschallinger@gmail.com | `ep-broad-thunder-ais0lkb2.c-4.us-east-1.aws.neon.tech` |
| Vercel Blob | vazvanessamarschallinger@gmail.com | `store_TogqL7TC60PxomF4` (vanessa-vaz-advogada-blob) |
| Gmail SMTP | vazvanessamarschallinger@gmail.com | App password configurada |
| Domínio | — | `vanessavazadv.com.br` |
| GitHub (código) | JustinoCarneiro | `JustinoCarneiro/vanessa_vaz_advogada` |

> O repositório GitHub permanece na conta do desenvolvedor. Push na branch `main` dispara deploy automático no Vercel da cliente.

---

## Variáveis de ambiente

O arquivo `.env.local` **nunca deve ser commitado** (já está no `.gitignore`). Copie `.env.example` como ponto de partida.

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URI` | Sim | Connection string do Neon PostgreSQL. Incluir `?uselibpqcompat=true&sslmode=require` no final. |
| `PAYLOAD_SECRET` | Sim | Chave secreta para JWT do Payload (mín. 32 caracteres). Gere com `openssl rand -base64 32`. |
| `BLOB_READ_WRITE_TOKEN` | Produção | Token do Vercel Blob. Gerado automaticamente ao criar o Blob Store no Vercel. Em dev local sem token, uploads ficam em `/public/media` (simulado). |
| `GMAIL_USER` | Produção | Email Gmail remetente dos emails de contato. |
| `GMAIL_APP_PASSWORD` | Produção | Senha de app do Gmail (16 caracteres, gerada em Google Conta → Segurança → Senhas de app). |
| `CONTACT_EMAIL_TO` | Não | Destinatário dos emails de contato. Se vazio, usa `GMAIL_USER`. |
| `NEXT_PUBLIC_SERVER_URL` | Sim | URL pública do site sem barra final. Em dev: `http://localhost:3000`. Em prod: `https://vanessavazadv.com.br`. |
| `PLAYWRIGHT_ADMIN_EMAIL` | Testes E2E | Email do admin para testes automatizados. |
| `PLAYWRIGHT_ADMIN_PASSWORD` | Testes E2E | Senha do admin para testes automatizados. |

---

## Instalação e desenvolvimento local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis
cp .env.example .env.local
# Editar .env.local com as credenciais reais

# 3. Rodar em desenvolvimento
npm run dev
```

- Site: `http://localhost:3000`
- Painel CMS: `http://localhost:3000/admin`

Na primeira execução com um banco vazio, o Payload cria todas as tabelas automaticamente (via `push: true` no config) e solicita a criação do primeiro usuário administrador.

---

## Estrutura do projeto

```
vanessa-vaz-projeto/
├── src/
│   ├── app/
│   │   ├── (site)/                  # Grupo de rotas públicas (compartilham NavBar + Footer)
│   │   │   ├── page.tsx             # Home
│   │   │   ├── sobre/page.tsx       # Sobre Mim
│   │   │   ├── escritorio/page.tsx  # Sobre o Escritório
│   │   │   ├── servicos/page.tsx    # Serviços (cards do CMS)
│   │   │   ├── brasileiros-no-exterior/page.tsx
│   │   │   ├── contato/page.tsx     # Formulário de contato
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx         # Listagem com busca e filtro por categoria
│   │   │   │   ├── [slug]/page.tsx  # Artigo individual (SSG com revalidação)
│   │   │   │   └── categoria/[slug]/page.tsx
│   │   │   └── layout.tsx           # Layout com NavBar + Footer
│   │   ├── (payload)/               # Grupo do Payload CMS (rotas internas)
│   │   │   ├── admin/
│   │   │   │   └── importMap.js     # ⚠️ Editado manualmente — ver seção "Quirks"
│   │   │   ├── api/[...slug]/route.ts
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   └── contact/route.ts     # API route do formulário de contato
│   │   ├── sitemap.ts               # Sitemap dinâmico (home + páginas + posts)
│   │   ├── robots.ts
│   │   ├── globals.css              # Reset + variáveis CSS globais + fontes
│   │   └── layout.tsx               # Root layout (metadata global, fontes)
│   │
│   ├── collections/                 # Schemas das coleções do Payload CMS
│   │   ├── Users.ts                 # Usuários admin
│   │   ├── Posts.ts                 # Posts do blog (título, slug, rich text, capa, categoria)
│   │   ├── Categories.ts            # Categorias do blog (nome + slug auto-gerado)
│   │   ├── ContactMessages.ts       # Mensagens do formulário de contato
│   │   └── Media.ts                 # Upload de imagens (Vercel Blob em prod)
│   │
│   ├── globals/
│   │   └── SiteSettings.ts          # Global: fotos (Sobre + Escritório) e cards de serviços
│   │
│   ├── components/
│   │   ├── blog/
│   │   │   ├── PostCard.tsx         # Card de post na listagem
│   │   │   ├── SearchBar.tsx        # Barra de busca (client component)
│   │   │   ├── CategoryPills.tsx    # Filtro por categoria (client component)
│   │   │   └── RichTextRenderer.tsx # Renderiza Lexical JSON → HTML
│   │   ├── contact/
│   │   │   └── ContactForm.tsx      # Formulário de contato com validação client-side
│   │   ├── home/
│   │   │   ├── HeroCarousel.tsx     # Hero com carrossel de slides (client component)
│   │   │   ├── ServiceCard.tsx      # Card simples para a seção "Áreas de Atuação" da home
│   │   │   ├── CtaSection.tsx       # Seção de chamada para ação
│   │   │   └── ExteriorSection.tsx  # Seção sobre brasileiros no exterior
│   │   ├── layout/
│   │   │   ├── NavBar.tsx           # Navbar responsiva com menu mobile
│   │   │   ├── Footer.tsx           # Footer com links e redes sociais
│   │   │   └── NavigationProgress.tsx # Barra de progresso de navegação
│   │   ├── servicos/
│   │   │   ├── ServicosCards.tsx    # Cards completos de serviços (página /servicos)
│   │   │   └── servicosIcons.tsx    # Mapa de ícones SVG por slug
│   │   ├── seo/
│   │   │   └── JsonLd.tsx           # Schema.org JSON-LD (LegalService)
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Container.tsx        # Wrapper com max-width e padding padrão
│   │       ├── Logo.tsx             # Componente do logotipo
│   │       └── SectionTitle.tsx     # Título de seção com overline
│   │
│   ├── lib/
│   │   └── api.ts                   # Helpers com cache (getPosts, getPostBySlug, getCategories, getSiteSettings)
│   │
│   └── __tests__/                   # Testes unitários (Jest)
│       ├── m01/infrastructure.test.ts
│       ├── m02/components.test.ts
│       ├── m03/pages.test.ts
│       ├── m04/blog.test.ts
│       ├── m05/collections.test.ts
│       ├── m06/contact.test.ts
│       └── m07/seo.test.ts
│
├── scripts/                         # Scripts utilitários (Node.js ESM)
│   ├── seed.mjs                     # Popula banco com dados de exemplo
│   ├── init-settings.mjs            # Inicializa SiteSettings no CMS
│   ├── upload-fotos.mjs             # Faz upload das fotos para o Blob em produção
│   └── generate-og.mjs              # Gera imagens Open Graph estáticas
│
├── design/                          # Identidade visual da cliente
│   ├── tokens.css                   # Tokens de cor, tipografia e espaçamento
│   └── DESIGN.md                    # Manual resumido da marca
│
├── docs/                            # Documentação técnica
│   ├── spec.md                      # Especificação funcional completa
│   ├── ROADMAP.md                   # Roadmap com módulos e pesos
│   ├── MIGRACAO-CONTAS.md           # Histórico e guia da migração de contas
│   └── BRIEFING-FASE-2B.md          # Briefing de design (fase 2b)
│
├── payload.config.ts                # Configuração central do Payload CMS
├── next.config.ts                   # Configuração do Next.js
├── tailwind.config.ts
├── tsconfig.json
├── jest.config.ts
├── playwright.config.ts
├── CLAUDE.md                        # Instruções para o agente Claude Code
└── .env.example                     # Template de variáveis de ambiente
```

---

## Arquitetura — decisões importantes

### Payload CMS embutido no Next.js

O Payload 3.x roda **dentro** do mesmo processo Next.js, sem servidor separado. As rotas do admin (`/admin`) e da API (`/api/...`) são servidas pelo Next.js como route groups `(payload)`.

Isso significa:
- Um único deploy no Vercel serve tanto o site público quanto o painel CMS.
- O Payload acessa o banco diretamente via `getPayload({ config })` — sem HTTP entre site e CMS.
- O custo de produção é zero além do Vercel Hobby.

### Schema do banco — `push: true`

O Payload está configurado com `push: true` no adapter PostgreSQL:

```ts
db: postgresAdapter({
  pool: { connectionString: process.env.DATABASE_URI },
  push: true,  // sincroniza schema automaticamente ao iniciar
})
```

Isso equivale ao `db push` do Prisma/Drizzle: o Payload compara o schema esperado com o banco real e aplica as diferenças automaticamente no startup. **Não há arquivos de migration manuais.**

> Se o banco ficar com schema inconsistente (ex: após migração manual de dados), dropar todas as tabelas e reiniciar o servidor é suficiente — o Payload recria tudo corretamente.

### Armazenamento de mídia

Em desenvolvimento (sem `BLOB_READ_WRITE_TOKEN`): uploads ficam em memória/disco local.

Em produção: o plugin `@payloadcms/storage-vercel-blob` intercepta uploads e os envia para o Vercel Blob com `disablePayloadAccessControl: true`, o que faz as URLs apontar diretamente para o CDN do Blob (`*.public.blob.vercel-storage.com`) sem proxy pelo servidor.

O plugin só é instanciado quando `BLOB_READ_WRITE_TOKEN` está definido, evitando erros em desenvolvimento.

### Caching com `unstable_cache`

Todas as queries ao Payload em `src/lib/api.ts` passam por `unstable_cache` do Next.js com revalidação de 60 segundos e tags para invalidação pontual:

- `posts` / `post-{slug}` — artigos do blog
- `categories` — categorias (revalida a cada 5 min)
- `site-settings` — fotos e serviços

Buscas com filtros dinâmicos (query de busca, filtro de categoria) **não são cacheadas** para evitar explosão de cache keys.

### Formulário de contato

A API em `src/app/api/contact/route.ts`:
1. Valida os campos (nome, email, telefone, assunto, mensagem)
2. Salva a mensagem na coleção `ContactMessages` do Payload (visível no painel `/admin`)
3. Envia email via Gmail SMTP (Nodemailer) — falha silenciosamente se as variáveis não estiverem configuradas

O salvamento no banco é sempre realizado, independente do envio do email. Isso garante que nenhuma mensagem seja perdida.

### Global `SiteSettings`

Armazena configurações gerais editáveis pelo painel CMS:
- `sobreFoto` — foto da advogada (exibida na home e na página /sobre)
- `escritorioFoto` — foto do escritório (/escritorio)
- `servicos` — array de cards de serviços (título, descrição, ícone, itens em bullets)

Os serviços são exibidos tanto na home (seção "Áreas de Atuação" — cards simples) quanto na página `/servicos` (cards expandidos com bullets e botão CTA). A ordem no CMS define a ordem de exibição.

---

## Identidade visual

| Token | Valor |
|---|---|
| Teal escuro (primária) | `#3D5C5F` |
| Teal médio | `#89B0AF` |
| Menta (fundo) | `#BDE4DA` |
| Preto texto | `#111111` |
| Cinza corpo | `#333333` |
| Fonte display | Cormorant Garamond (via Google Fonts) |
| Fonte corpo / UI | Montserrat (via Google Fonts) |

Arquivos completos em `design/tokens.css` e `design/DESIGN.md`.

---

## Painel CMS — o que a Vanessa pode editar

Acesse `vanessavazadv.com.br/admin` com as credenciais dela.

| Seção | O que fazer |
|---|---|
| **Posts** | Criar, editar e publicar artigos do blog. Editor Lexical com rich text (negrito, listas, links, imagens embutidas, YouTube). |
| **Categories** | Criar categorias para organizar os posts. |
| **Media** | Upload de imagens. Em produção, vão para o Vercel Blob automaticamente. |
| **Contact Messages** | Ver mensagens recebidas pelo formulário de contato. |
| **Fotos e Serviços** (global) | Atualizar a foto da advogada, a foto do escritório e o conteúdo dos cards de serviços. |

---

## Scripts disponíveis

```bash
npm run dev              # Desenvolvimento local
npm run build            # Build de produção
npm start                # Servidor de produção (após build)
npm test                 # Testes unitários (Jest)
npm run test:watch       # Jest no modo watch
npm run test:e2e         # Testes E2E (Playwright)
npm run test:e2e:ui      # Playwright com interface visual
npm run seed             # Popula banco local com dados de exemplo
npm run init-settings    # Inicializa SiteSettings (fotos + serviços) no banco local
npm run generate-og      # Gera imagens Open Graph estáticas
```

---

## Deploy

Push na branch `main` → deploy automático no Vercel da Vanessa.

O Vercel está conectado ao repositório `JustinoCarneiro/vanessa_vaz_advogada`. Qualquer PR gera um deploy de preview com URL temporária.

Build command: `next build` (detectado automaticamente).
Output directory: `.next` (detectado automaticamente).

---

## Quirks críticos — leia antes de mexer

### 1. `importMap.js` é editado manualmente

O arquivo `src/app/(payload)/admin/importMap.js` **não deve ser gerado** via `npm run generate:importmap` (ou `payload generate:importmap`). Em produção no Vercel, esse comando falha silenciosamente e deixa o painel com tela branca.

O arquivo é mantido manualmente. Ao adicionar novos plugins ou componentes customizados ao Payload, edite-o diretamente seguindo o padrão dos imports já existentes.

### 2. Erros de migration ao iniciar

Se o servidor lançar erro do tipo `Failed query: ALTER TABLE ... ALTER COLUMN "id" SET DATA TYPE serial`, o schema do banco ficou inconsistente (geralmente após migração manual de dados). A solução:

1. Dropar todas as tabelas com o script `scripts/drop-tables.mjs` (ou manualmente no console do Neon)
2. Rodar `npm run dev` — o Payload recria o schema corretamente via `push: true`
3. Se necessário, re-importar os dados com um script de INSERT

### 3. `BLOB_READ_WRITE_TOKEN` em desenvolvimento

Sem esse token, uploads funcionam localmente mas os arquivos não persistem entre sessões (ficam em memória). Para testar uploads em desenvolvimento apontando para produção, adicione o token de produção no `.env.local` — mas cuidado: uploads locais vão para o Blob de produção.

### 4. Banco em desenvolvimento aponta para produção

O `.env.local` atual aponta para o banco da Vanessa (produção). Qualquer alteração via painel local (`localhost:3000/admin`) afeta os dados reais. Use com cautela — especialmente operações de delete.

---

## Testes

```
src/__tests__/
├── m01/ — Infraestrutura (estrutura de arquivos, configurações)
├── m02/ — Componentes UI (NavBar, Footer, Button, Container, etc.)
├── m03/ — Páginas institucionais (Home, Sobre, Escritório, Serviços, Contato)
├── m04/ — Blog (listagem, busca, filtro, artigo individual)
├── m05/ — Coleções Payload (Posts, Categories, ContactMessages, Media, Users)
├── m06/ — Formulário de contato (API route, validação, email)
└── m07/ — SEO (sitemap, robots.txt, metadata, Schema.org)
```

---

## Troubleshooting

| Problema | Verificar |
|---|---|
| Painel `/admin` com tela branca | `importMap.js` desatualizado. Comparar com o último commit funcional. |
| Posts / serviços não aparecem | Logs do Vercel → Deployments → último deploy. Verificar `DATABASE_URI`. |
| Email de contato não chega | `GMAIL_USER` e `GMAIL_APP_PASSWORD` configurados no Vercel? Verificar spam. |
| Upload de foto falha em produção | `BLOB_READ_WRITE_TOKEN` válido? Verificar no Vercel → Settings → Env Vars. |
| Build falha no Vercel | Ver Build Logs. Erros comuns: variável env faltando, problema de tipo TypeScript. |
| Schema do banco inconsistente | Dropar tabelas + reiniciar (ver Quirk #2 acima). |

---

## Histórico

| Data | Evento |
|---|---|
| 2026-06 | Migração completa: Vercel + Neon + Blob transferidos para a conta da cliente |
| 2026-06 | Domínio `vanessavazadv.com.br` configurado no Vercel da cliente |
| 2026-06 | Deploy inicial — MVP completo (páginas institucionais + blog + formulário) |
