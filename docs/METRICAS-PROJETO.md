# Métricas do Projeto — vanessa-vaz-projeto

> Registro de coleta para a **Análise de KPIs de Fechamento** (metodologia Onda, seção 14).
> Padrão e catálogo: `docs/METRICAS-KPI.md`. Prompt da análise: `docs/PROMPT-ANALISE-KPI.md`.
>
> **Regra de dado sensível:** só o *custo/hora interno da empresa* fica fora deste arquivo — no
> sibling privado `<projeto>-docs-privados/` ou informado na hora da análise. Todo o resto
> (datas, valor do contrato, comissão, timesheet, esperas) mora aqui, versionado com o projeto.
>
> ⚠ **2026-09-02:** projeto entregue em jun/2026 (toques esporádicos depois). Blocos 1–2 por
> reconstruir; bloco 3 semeado com a estimativa retroativa por proxy de commit. Panorama entre
> projetos: `onda-starter/historico-projetos/PANORAMA-KPI.md`.

---

## 1. Kickoff — preencher na Fase 0

| Campo | Valor |
|---|---|
| Nome / slug | vanessa-vaz-projeto / `<slug-para-o-arquivo-de-analise>` |
| Valor do contrato (bruto) | **R$ 525,20** — site institucional + blog (MVP de jun/2026), preço baixo deliberado para captar a cliente no início (informado por Marcos, 2026-10-20; antes constava R$ 420). A landing `/previdencia-no-exterior` é aditivo de R$ 400,00 (seção 5) |
| Moeda | BRL |
| Canal | Contrato direto |
| Comissão de plataforma % | n/a (direto) |
| Taxa de saque % | n/a (direto) |
| Regime tributário | `<Simples ~6% / MEI fixo / PJ / n/a>` |
| Valor/hora alvo (referência) | ⚠ não era o alvo — preço de captação abaixo do custo/hora real (~R$ 104/h, ver `onda-starter-docs-privados/FINANCEIRO-POR-PROJETO.md`); effective rate do site institucional ~R$ 525,20 ÷ ~25–29h ≈ **R$ 18–21/h** (as horas estimadas são quase todas do MVP de jun/2026; as da landing, set–out/2026, não foram registradas) |
| Custo/hora interno | **não aqui** — ver sibling privado / informar na análise |
| Data — aceite da proposta | `<AAAA-MM-DD>` |
| Data — início do prazo (gatilho contratual) | `<AAAA-MM-DD>` |
| Data — limite contratual | `<AAAA-MM-DD>` |
| Data — entrega real | `<AAAA-MM-DD ou "em curso">` |
| Deploy / hospedagem | `<Vercel / VPS Coolify / ...>` (conta de quem: `<cliente / Onda>`) |

## 2. Peso dos módulos — copiar do `ROADMAP.md` quando existir (Fase 3)

| Módulo | Peso | Dias estimados |
|---|---|---|
| `<M01 ...>` | `<Pequeno/Médio/Grande>` | `<1-2 / 3-4 / 5-7>` |

Σ dias estimados: `<__>`

## 3. Timesheet — uma linha por sessão (Fase 4)

Nunca registrado. A linha `(est. retroativa)` abaixo é a estimativa por proxy de commit
(sessões separadas por > 2,5 h + 0,75 h/sessão de ramp-up; detalhe por sessão em
`onda-starter/historico-projetos/estimativas-horas-2026-09-02.md`). Projeto praticamente encerrado
— se houver nova sessão, registrar uma linha real aqui.

| Data | Fase (0–5) | Horas | Nota |
|---|---|---|---|
| _(primeira entrada real aqui)_ | | | |

Σ real registrada: **0 h**
Σ **(est. retroativa por proxy de commit)**: **~20 h piso · ~25–29 h central** — 51 commits, 9 sessões (quase tudo em jun/2026)

## 4. Log de espera / impedimento (Fase 4)

Abrir um episódio sempre que o trabalho **parar por causa externa** (não conta pausa própria).

| Início | Fim | Motivo | O que destrava |
|---|---|---|---|
| `<AAAA-MM-DD>` | `<AAAA-MM-DD ou "aberto">` | `<cliente / terceiro / técnico / interno>` | `<condição p/ retomar>` |

Σ dias em espera: `<__>`   ·   nº de episódios: `<__>`

## 5. Mudanças de escopo (espelho do changelog do `CLAUDE.md`)

| Mudança | Data | Peso equivalente | Aditivo faturado |
|---|---|---|---|
| M08 — landing `/previdencia-no-exterior` (criação; publicada em 2026-10-01) | 2026-09-22 | P (M08) | **R$ 400,00** (informado por Marcos, 2026-10-20) |
| Meta Pixel + banner de cookies + Política de Cookies (pedido da cliente/Claudia) | 2026-09-30 | P | não informado — confirmar |
| Verificação de domínio da Meta (metatag no `<head>`) | 2026-10-15 | P | não informado — confirmar |
| Código do anúncio (V01/V02/V03) na mensagem do WhatsApp | 2026-10-15 | P | não informado — confirmar |
| M09 — formatação do texto do blog | 2026-09-30 | P | não informado — confirmar |

Σ aditivo faturado informado: **R$ 400,00** (criação da landing). Total faturado: R$ 525,20 + R$ 400,00 =
**R$ 925,20**. Os itens "não informado" ficam como pendência até Marcos dizer se foram cobrados ou
absorvidos (R$ 0 com mudança > 0 dispara o alerta de escopo sem aditivo em `METRICAS-KPI.md`).

---

*Criado na Fase 0. Mantido durante a Fase 4. Consumido pela análise de fechamento (Fase 5),
que gera `docs/ANALISE-PROJETO-<slug>.md`.*
