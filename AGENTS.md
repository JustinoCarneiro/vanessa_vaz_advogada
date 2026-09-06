# Vanessa Vaz Marschallinger — Contrato canônico de trabalho

## Objetivo

Site institucional + blog com CMS para uma advogada de advocacia previdenciária
(usuária única, não-técnica, do painel). Foco em SEO orgânico, performance e
autonomia de conteúdo. Metodologia OndaDev — versão em `ONDA_VERSION`.

## Mapa do repositório

| Caminho | Finalidade |
| --- | --- |
| `CLAUDE.md` | Espec Viva: stack, persona, princípios não-funcionais, épicos, convenções, premissas confirmadas. |
| `docs/spec.md` | Histórias de usuário completas e critérios de aceite. |
| `docs/ROADMAP.md` | Blueprint técnico, fórmula de prazo, mapa de módulos. |
| `docs/BRIEFING-FASE-2B.md` | Briefing de identidade visual para a Fase 2b. |
| `docs/METRICAS-*.md`, `docs/PROMPT-ANALISE-KPI.md` | KPIs e timesheet do projeto. |
| `src/` | Next.js (App Router) + Payload CMS (roda dentro do Next). |
| `src/collections/` | Coleções Payload (schema de conteúdo). |
| `src/components/` | Componentes React — PascalCase. |
| `design/` | `tokens.css` + `DESIGN.md` (identidade fechada da cliente). |
| `scripts/` | Automações locais de seed/setup (`seed.mjs`, `init-settings.mjs`, `generate-og.mjs`, `upload-fotos.mjs`). |
| `tests/e2e/` | Playwright (navegação, SEO, responsividade). Unit/integração com Jest. |
| `.ondadev/` | Protocolo de failover de cota e template de handoff entre agentes. |
| `.agents/`, `.claude/` | Skills OndaDev dos agentes (nunca edite os destinos; a fonte é o `onda-starter`). |
| `.github/workflows/` | CI de secret scanning (gitleaks nos commits do PR). |

## Autoridade da informação

| Assunto | Fonte canônica | Papel das demais fontes |
| --- | --- | --- |
| Escopo, histórias e aceite | `CLAUDE.md` + `docs/spec.md` | Jira (board `VND`) apenas reflete o status. |
| Ordem técnica e progresso | `docs/ROADMAP.md` | Jira é projeção visual. |
| Decisão de arquitetura | `docs/ROADMAP.md` + histórico Git | — |
| Código e histórico versionado | Git | GitHub registra PRs, revisão e CI. |
| Trabalho externo | Jira/GitHub | Nunca sobrescreve a verdade local sem decisão explícita. |

Jira é uma projeção do status, nunca o bloqueio da edição local. A spec muda
primeiro nos arquivos; o board `VND` é acertado depois, à mão na UI — **nunca
disparado automaticamente por edição de doc**. Exclusão de issue exige
confirmação explícita.

## Comandos verificados

```bash
npm ci
npm run lint
npm run build            # next build — pega erro de tipo que o lint não pega
npm test                 # Jest — unit + integração
npm run test:e2e         # Playwright — navegação, SEO, responsividade
npm run dev              # Next dev (Payload sincroniza o schema sozinho fora de produção)
npm run generate:types   # regenera os tipos do Payload após mudar coleção
```

## Fronteiras e convenções

- **Diretiva Primária:** não altere a sintaxe ou o comportamento de código
  existente sem um teste que justifique a quebra (ciclo TDD).
- **Responsivo mobile-first** para visitantes; painel CMS otimizado para desktop
  (a cliente publica do computador).
- **Autonomia de conteúdo via CMS**: nada de conteúdo hardcoded que a cliente
  deveria editar no Payload; a Home reflete o que está publicado.
- **SEO nativo em todas as páginas** (meta tags, OG, `sitemap.xml`, `robots.txt`);
  imagens via `next/image`; alvo de LCP < 2,5s.
- **Custo sob controle**: free tier (Vercel, Neon, Vercel Blob). Não introduza
  dependência paga sem decisão registrada.
- Admin único no MVP; multi-usuário é backlog pós-MVP.
- Componentes em `src/components/` (PascalCase), páginas em `src/app/`, coleções
  em `src/collections/`. Commits em português, imperativo.
- Documentação em português claro; nomes técnicos no idioma da tecnologia.

## Segurança e classes de risco

Dado da cliente e do painel Payload. Nunca versione, exiba em log ou cole em
prompt: `PAYLOAD_SECRET` real, tokens do Vercel Blob/Resend, senhas, string de
conexão do Neon, credenciais do painel. `.env.local` e `.env*` não são
versionados; `.env.example` só com placeholders.

| Nível | Exemplos | Regra |
| --- | --- | --- |
| R0 | Leitura, docs, testes locais | Executar e validar normalmente. |
| R1 | Código, dependência, schema/coleção Payload, CI, configuração compartilhada | Declarar impacto, testar e pedir revisão de diff. |
| R2 | Produção (Vercel), migração de dados, credenciais, deploy, exclusão de conteúdo | Exigir autorização explícita e alvo confirmado. |

## Definition of Done

1. atende a uma história de `docs/spec.md` com critérios verificáveis;
2. executa os testes que existem (`lint`, `build`, Jest, Playwright) e reporta o
   resultado;
3. atualiza `CLAUDE.md`, `docs/spec.md`, `docs/ROADMAP.md` ou os docs de métrica
   quando o contrato mudou;
4. não introduz segredo, credencial ou dado da cliente no repositório;
5. passa por revisão proporcional ao risco e deixa um diff compreensível;
6. registra handoff com mudanças, validações, decisões, riscos e pendências.

Não afirme que testes, CI, deploy ou sincronização passaram sem evidência.

## Revisão e handoff entre agentes

Claude e Codex seguem este arquivo como núcleo comum. Um autor por PR; o outro
revisa o diff quando o risco (R1/R2) exige, com o mínimo suficiente (contrato,
diff, logs de teste). Quando a cota de um agente acaba, o outro assume por
handoff — protocolo na metodologia OndaDev 3.0 (`ONDA_VERSION`), com
`scripts/ai-checkpoint.sh` preenchendo `.ondadev/handoff/current.md`.

Síntese de handoff:

```text
Escopo: …
Mudanças: …
Validações executadas e resultado: …
Decisões/ADRs: …
Riscos, bloqueios e próximos passos: …
```
