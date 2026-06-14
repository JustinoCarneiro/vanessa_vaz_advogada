# VVM Advocacia — Site Institucional

Site profissional com blog integrado para **Vanessa Vaz Marschallinger**, advogada especializada em Direito Previdenciário (Florianópolis/SC).

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15.4 (App Router, SSR/SSG) |
| CMS | Payload CMS 3.x (embutido no Next.js) |
| Banco de dados | PostgreSQL via Neon |
| Estilização | Tailwind CSS 3.x |
| Email | Resend |
| Testes Unitários | Jest + ts-jest |
| Testes E2E | Playwright |
| Deploy | Vercel |

## Pré-requisitos

- Node.js 20+
- Banco PostgreSQL acessível (recomendado: [Neon](https://neon.tech))
- Conta no [Resend](https://resend.com) para envio de emails

## Instalação

```bash
npm install
```

Copie o arquivo de variáveis de ambiente e preencha os valores reais:

```bash
cp .env.example .env.local
```

**Nunca comite `.env.local`.** O arquivo já está no `.gitignore`.

### Variáveis obrigatórias

| Variável | Descrição |
|---|---|
| `DATABASE_URI` | String de conexão PostgreSQL (ex: Neon) |
| `PAYLOAD_SECRET` | Chave secreta do Payload CMS (mín. 32 caracteres) |
| `RESEND_API_KEY` | API key do Resend para emails do formulário |
| `CONTACT_EMAIL_TO` | Destinatário dos emails de contato |
| `NEXT_PUBLIC_SERVER_URL` | URL pública do site (ex: `https://vvmadvocacia.adv.br`) |

## Desenvolvimento

```bash
npm run dev
```

O site fica disponível em `http://localhost:3000` e o painel CMS em `http://localhost:3000/admin`.

Na primeira execução, o Payload cria as tabelas e solicita a criação do primeiro usuário administrador.

## Testes

```bash
npm test              # executa testes unitários (Jest)
npm run test:watch    # modo watch
npx playwright test   # executa testes end-to-end (Playwright)
npx playwright test --ui  # abre interface visual dos testes E2E
```

O projeto usa TDD com verificações de sistema de arquivos e testes automatizados no navegador. São 305 testes unitários (Jest) e suítes completas de navegação (Playwright) distribuídos em módulos:

| Módulo | Cobertura |
|---|---|
| M01 — Infraestrutura | Estrutura de arquivos e configurações |
| M02 — Componentes UI | NavBar, Footer, Button, Container, SectionTitle, Logo |
| M03 — Páginas institucionais | Home, Sobre, Escritório, Serviços, Contato |
| M04 — Blog | Listagem, busca, filtro por categoria, artigo individual |
| M05 — Coleções Payload | Posts, Categories, ContactMessages, Media, Users |
| M06 — Formulário de contato | API route, validação, envio de email |
| M07 — SEO estrutural | Sitemap, robots.txt, metadata global, Schema.org |

## Build e deploy

```bash
npm run build   # build de produção
npm start       # inicia o servidor de produção
```

O deploy é feito na **Vercel**. Configure as mesmas variáveis de `.env.local` no painel da Vercel antes de fazer o primeiro deploy.

## Estrutura do projeto

```
src/
├── app/
│   ├── (site)/          # Rotas públicas do site
│   │   ├── page.tsx         # Home
│   │   ├── sobre/
│   │   ├── escritorio/
│   │   ├── servicos/
│   │   ├── brasileiros-no-exterior/
│   │   ├── contato/
│   │   └── blog/
│   ├── (payload)/       # Painel admin do Payload CMS
│   ├── api/contact/     # API route do formulário de contato
│   ├── layout.tsx       # Root layout (metadata global)
│   ├── sitemap.ts       # Sitemap dinâmico
│   └── robots.ts        # robots.txt
├── collections/         # Definições de coleções do Payload
├── components/
│   ├── blog/            # PostCard, SearchBar, CategoryPills, RichTextRenderer
│   ├── contact/         # ContactForm
│   ├── home/            # HeroCarousel, ServiceCard, CtaSection
│   ├── layout/          # NavBar, Footer
│   ├── seo/             # JsonLd
│   └── ui/              # Button, Container, Logo, SectionTitle
├── lib/
│   └── api.ts           # Helpers Payload (getPosts, getPostBySlug, getCategories)
└── __tests__/           # Suítes de teste por módulo (m01–m07)
```

## Painel CMS

Acesse `/admin` com o usuário criado na primeira execução. A Vanessa pode:

- Criar, editar e publicar artigos no blog (editor rich text Lexical)
- Gerenciar categorias
- Fazer upload de imagens
- Visualizar mensagens recebidas pelo formulário de contato

## Identidade visual

Paleta e tipografia seguem o manual da marca fechado com a cliente. Assets em `design/`.

| Token | Valor |
|---|---|
| Teal escuro | `#3D5C5F` |
| Teal médio | `#89B0AF` |
| Menta | `#BDE4DA` |
| Fonte display | Cormorant Garamond |
| Fonte corpo | Montserrat |
