# Vanessa Vaz Marschallinger — Site Institucional + Blog (MVP Completo)
Site profissional com blog integrado para advogada de advocacia previdenciária.

## Stack
- **Frontend/Backend:** Next.js 14 (App Router, SSR/SSG)
- **CMS:** Payload CMS 2.x (roda dentro do Next.js, sem servidor separado)
- **Banco:** PostgreSQL (via Payload)
- **Estilização:** Tailwind CSS
- **Deploy:** Vercel (frontend) — cliente contrata e paga
- **Domínio:** cliente registra e paga — Onda orienta por email
- **Email (formulário):** Resend ou Nodemailer via API route do Next.js

## Perfil de projeto
Landing Page / Site institucional com CMS. Foco em SEO orgânico, performance e
facilidade de gestão de conteúdo pela cliente não-técnica.

## Persona crítica
**Vanessa** — advogada, não-técnica, usuária única do painel CMS. O painel
precisa ser simples o suficiente para publicar posts sem suporte técnico.
Dispositivo principal: desktop. Visitantes do site: mobile-first.

## Princípios não-funcionais críticos
- SEO nativo em todas as páginas (meta tags, OG, sitemap.xml, robots.txt)
- Performance: LCP < 2.5s, imagens otimizadas via next/image
- Acessibilidade AA mínima
- Responsividade completa (mobile-first)
- Admin único no MVP (multi-usuário é backlog pós-MVP)

## Épicos
- E1 · Páginas Institucionais (Home, Sobre, Serviços, Contato)
- E2 · Blog com CMS
- E3 · Formulário de Contato
- E4 · SEO e Performance
- E5 · Infraestrutura e Deploy

## Identidade visual
Cliente tem identidade fechada. Não criar do zero.
Assets em: `./design/` (tokens.css + DESIGN.md extraídos do manual da marca)
- Paleta principal: teal escuro #3D5C5F · teal médio #89B0AF · menta #BDE4DA · preto · branco
- Tipografia: Petita (display) + Montserrat (corpo/UI)
- Logo: símbolo VM circular + logotipo horizontal (dourado / preto / branco / teal)

## Convenções
- Componentes em `src/components/` — PascalCase
- Páginas em `src/app/` — App Router do Next.js
- Coleções Payload em `src/collections/`
- Variáveis de ambiente em `.env.local` (nunca commitar)
- Commits em português, imperativo: "Adiciona hero da home"

## Ponteiros
- Spec completa: `docs/spec.md`
- Roadmap e contratos: `docs/ROADMAP.md`
- Identidade visual: `design/tokens.css` + `design/DESIGN.md`
- Briefing para Claude Design (Fase 2b): `docs/BRIEFING-FASE-2B.md`

## Premissas confirmadas com o cliente
- Domínio e hospedagem: cliente contrata e paga (Onda orienta)
- Painel CMS: admin único no MVP
- Blog: somente leitura para visitantes (sem comentários)
- Formulário de contato: email clássico (não WhatsApp)
- Carrossel de fotos na home (referência: mikaeliscudeler.com.br)
- Formatação rich text no blog: embeds YouTube + tabelas + imagens
- Categorias no blog: sim
- Barra de pesquisa no blog: sim
- Páginas fixas: Home · Sobre Mim · Sobre o Escritório · Serviços · Blog · Contato
