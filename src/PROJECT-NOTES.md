# Notas de produção — Fase 2b · VVM Advocacia Previdenciária

Workflow acordado: gerar telas na ordem do briefing (uploads/BRIEFING-FASE-2B-67f9c446.md),
uma por vez, aguardando aprovação. Formato de cada tela (.dc.html): card de notas de design
→ frame Desktop 1280 → frame Mobile 375 (+ card de notas mobile) → prancha de Estados interativos.
Fundo da prancha #E8EBEB, frames brancos radius 10px, labels uppercase teal.

## Status
- [x] Home.dc.html — APROVADA
- [x] Blog.dc.html — APROVADA (verificador passou: busca/filtros/paginação/capas ok)
- [x] Artigo.dc.html — APROVADA
- [x] Servicos.dc.html — APROVADA (mobile: serviços em carrossel)
- [x] Contato.dc.html — APROVADA (form validado, erro/sucesso inline)
- [x] Sobre.dc.html — APROVADA
- [x] Escritorio.dc.html — gerada, aguardando aprovação (ÚLTIMA — Fase 2b completa)

## Sistema (decisões já tomadas — manter consistência)
- Fontes: títulos 'Cormorant Garamond' (fallback aprovado da Petita, weights 500/600,
  itálico no blockquote); corpo/UI Montserrat 400/500/600/700. Google Fonts no helmet.
- Cores: teal escuro #3D5C5F (principal, hover #2F484B), teal médio #89B0AF (bordas/ícones,
  NUNCA texto sobre branco), menta #BDE4DA (bgs suaves, pills, círculos de ícone),
  texto #111/#222/#333, bordas #E4EAE9/#EDF1F0/#D5DEDC, zebra tabela #F7FAF9,
  bg blockquote #F2F9F6, dourado SÓ no logo.
- Legendas/metadados sobre branco: teal escuro 13px (adaptação AA documentada).
- Assets (cor real verificada por pixel — nomes não batem com conteúdo):
  - assets/logo-dourado.png = horizontal dourado → header sobre branco (52px desktop, 38px mobile)
  - assets/logo-teal.png = horizontal BRANCO → footer sobre teal escuro (56px/48px)
  - assets/marcadagua-branco.png = branca → decorativa em seções teal escuro (opacity 0.08)
  - assets/marcadagua-preto.png = na real TEAL ESCURO → decorativa sobre menta (opacity 0.10)
  - assets/simbolo-teal-escuro.png = teal escuro → cards de notas
  - assets/simbolo-teal-medio.png → byline autora; assets/simbolo-menta.png → estado vazio
- Placeholders: contato@vvmadvocacia.adv.br · Florianópolis · SC · OAB/SC 12.345 · © 2026.
  Fotos Unsplash (advogada/escritório) até receber ensaio real.
- Nav desktop: links 14px/500 #111, ativo = 600 teal + border-bottom 2px; CTA "Fale Comigo"
  bg teal padding 13px 28px radius 4px. Focus rings sempre visíveis (outline teal/menta).
- Botão sobre teal escuro: bg branco texto teal, hover bg menta.
- Cards: hover translateY(-5px) + sombra rgba(61,92,95,0.15-0.18).
- Footer desktop: grid 1.4fr/1fr/1fr/1fr (logo+tagline, Navegação, Contato, Redes
  com ícones Instagram/LinkedIn/WhatsApp em círculos 42px) + linha OAB/copyright.
- Copiar nav/footer/markup-base lendo os .dc.html existentes (Home.dc.html é a referência).
- Blog: 9 posts fictícios, 6/página; categorias Aposentadoria, Incapacidade, Perícia Médica,
  BPC/LOAS, Pensão por Morte, Revisão, Notícias do INSS.
- Artigo de referência: "Aposentadoria negada pelo INSS: o que fazer nos primeiros 30 dias"
  (12 mai 2026, 7 min) — anterior: perícia médica; próximo: regras de transição.

## Telas restantes — requisitos do briefing
- SERVIÇOS: hero teal escuro (título+subtítulo), cards de serviço expandidos (ícone, nome,
  descrição detalhada, CTA individual), seção diferencial/por que Vanessa, CTA final.
- CONTATO: form nome/email/telefone(opcional)/assunto/mensagem, botão "Enviar Mensagem",
  sucesso inline, erro por campo (validação visível), infos ao lado (email + cidade/UF).
- SOBRE MIM: foto destaque, bio com formação/trajetória, linha do tempo, blockquote filosofia.
- ESCRITÓRIO: missão e valores, diferenciais, foto do ambiente, CTA contato.
