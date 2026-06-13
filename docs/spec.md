# Especificação Viva — Vanessa Vaz Marschallinger (MVP Completo)

## Contexto do domínio
Vanessa Vaz Marschallinger é advogada especializada em advocacia previdenciária
(INSS, aposentadorias, benefícios por incapacidade, pensões). O site é seu principal
canal de captação orgânica — clientes chegam via Google ao buscar termos como
"advogada previdenciária", "como dar entrada no INSS", "aposentadoria especial".

O blog é a ferramenta central de SEO: cada artigo publicado é uma nova página
indexada, respondendo dúvidas do cliente potencial. Não é conteúdo decorativo —
é infraestrutura de captação.

Vanessa não tem equipe técnica. Ela precisa publicar posts sozinha, sem suporte,
via painel intuitivo.

---

## Atores

| Ator | Papel | Acesso |
|---|---|---|
| Visitante | Lê o site, lê o blog, envia formulário de contato | Público, sem login |
| Vanessa (Admin) | Publica e edita posts, gerencia categorias, visualiza mensagens de contato | Painel Payload CMS — login com email/senha |

---

## E1 · Páginas Institucionais

### H1.1 — Home com carrossel
> Como visitante, quero ver uma página inicial impactante com fotos que mudam,
> para entender quem é Vanessa e sentir confiança antes de entrar em contato.

**Critérios de aceite:**
- Dado que acesso a home, quando a página carrega, então vejo um hero com carrossel
  de fotos que transicionam automaticamente (intervalo ≥ 3s)
- Dado que estou no mobile, quando visualizo o carrossel, então as fotos se adaptam
  sem cortar rostos ou elementos importantes
- Dado que a página carrega, quando mede performance, então LCP < 2.5s mesmo com
  imagens no carrossel (next/image obrigatório)
- A home deve apresentar: hero com carrossel · resumo de quem é Vanessa ·
  áreas de atuação em destaque · chamada para contato · link para o blog

### H1.2 — Página Sobre Mim
> Como visitante, quero conhecer a trajetória e formação de Vanessa,
> para avaliar se ela é a profissional certa para meu caso.

**Critérios de aceite:**
- Dado que acesso /sobre, quando a página carrega, então vejo bio, formação,
  experiência e foto profissional de Vanessa
- A página deve ter meta description única otimizada para SEO

### H1.3 — Página Sobre o Escritório
> Como visitante, quero entender como o escritório funciona,
> para saber o que esperar ao contratar Vanessa.

**Critérios de aceite:**
- Dado que acesso /escritorio, quando a página carrega, então vejo missão,
  valores, estrutura e diferenciais do escritório
- Conteúdo distinto da página Sobre Mim (pessoa ≠ escritório)

### H1.4 — Página Serviços
> Como visitante, quero ver as áreas de atuação detalhadas,
> para saber se Vanessa atende meu tipo de problema.

**Critérios de aceite:**
- Dado que acesso /servicos, quando a página carrega, então vejo lista de
  serviços com descrição de cada um
- Cada serviço deve ter texto suficiente para indexação semântica pelo Google
- Deve haver CTA (chamada para ação) para contato em cada serviço

---

## E2 · Blog com CMS

### H2.1 — Listagem do blog
> Como visitante, quero ver os artigos publicados organizados por categoria,
> para encontrar conteúdo relevante para minha situação.

**Critérios de aceite:**
- Dado que acesso /blog, quando a página carrega, então vejo lista de artigos
  com título, categoria, data e imagem de capa
- Dado que seleciono uma categoria, quando filtro, então vejo apenas artigos
  daquela categoria
- Dado que uso a barra de busca, quando digito um termo, então vejo artigos
  cujo título ou conteúdo contém o termo
- A listagem deve ser paginada (máximo 9 artigos por página)

### H2.2 — Leitura de artigo
> Como visitante, quero ler um artigo completo com formatação rica,
> para absorver o conteúdo com conforto.

**Critérios de aceite:**
- Dado que acesso um artigo, quando a página carrega, então vejo título,
  autor, data, categoria, imagem de capa e conteúdo formatado
- O conteúdo rich text deve renderizar: parágrafos · títulos H2/H3 · listas ·
  negrito/itálico · imagens com legenda · tabelas · embeds de YouTube
- Dado que estou no mobile, quando leio o artigo, então a tipografia e espaçamento
  são confortáveis para leitura (mínimo 16px, line-height ≥ 1.6)
- Cada artigo deve ter: meta title único · meta description · OG image · URL
  amigável (/blog/slug-do-artigo)

### H2.3 — Publicação de artigo (Vanessa)
> Como Vanessa, quero publicar um artigo novo pelo painel,
> para manter o blog atualizado sem precisar de ajuda técnica.

**Critérios de aceite:**
- Dado que acesso o painel Payload, quando crio um novo post, então vejo campos:
  título · slug (auto-gerado, editável) · categoria · imagem de capa ·
  conteúdo rich text · status (rascunho / publicado) · meta SEO
- Dado que salvo como rascunho, quando acesso o site público, então o artigo
  não aparece para visitantes
- Dado que publico o artigo, quando acesso /blog, então o artigo aparece na listagem
- O editor rich text deve ter botão de embed para YouTube e suporte a tabelas

### H2.4 — Gerenciamento de categorias (Vanessa)
> Como Vanessa, quero criar e editar categorias,
> para organizar os artigos de forma lógica.

**Critérios de aceite:**
- Dado que acesso o painel, quando crio uma categoria, então ela aparece
  disponível ao criar posts e no filtro do blog público
- Categorias têm: nome · slug · descrição opcional

---

## E3 · Formulário de Contato

### H3.1 — Envio de mensagem
> Como visitante, quero enviar uma mensagem para Vanessa pelo site,
> para iniciar uma conversa sobre meu caso sem precisar ligar.

**Critérios de aceite:**
- Dado que acesso /contato, quando preencho o formulário, então vejo campos:
  nome (obrigatório) · email (obrigatório, validado) · telefone (opcional) ·
  assunto (obrigatório) · mensagem (obrigatório, mínimo 20 caracteres)
- Dado que envio o formulário com dados válidos, quando o sistema processa,
  então Vanessa recebe email com os dados da mensagem
- Dado que envio o formulário com dados inválidos, quando valido, então
  vejo mensagens de erro claras em cada campo com problema
- Dado que o envio é bem-sucedido, quando concluo, então vejo mensagem de
  confirmação na tela (não redireciona para outra página)
- Proteção anti-spam: honeypot ou reCAPTCHA v3

### H3.2 — Visualização de mensagens (Vanessa)
> Como Vanessa, quero ver as mensagens recebidas pelo painel,
> para acompanhar os contatos sem depender só do email.

**Critérios de aceite:**
- Dado que acesso o painel Payload, quando vou em Mensagens, então vejo lista
  com: nome · email · assunto · data · status (lida/não lida)
- Dado que clico em uma mensagem, então vejo o conteúdo completo

---

## E4 · SEO e Performance

### H4.1 — SEO estrutural
> Como Vanessa, quero que meu site apareça bem no Google,
> para atrair clientes que buscam advocacia previdenciária.

**Critérios de aceite:**
- Todas as páginas têm meta title e meta description únicos e configuráveis
- Sitemap.xml gerado automaticamente em /sitemap.xml
- robots.txt configurado em /robots.txt
- Open Graph tags em todas as páginas (para compartilhamento em redes sociais)
- URLs amigáveis em todo o site (sem parâmetros ou IDs numéricos expostos)
- Schema.org markup de LegalService na home e página de serviços

### H4.2 — Performance de carregamento
> Como visitante, quero que o site carregue rápido,
> para não abandonar antes de ver o conteúdo.

**Critérios de aceite:**
- Lighthouse Performance Score ≥ 85 em mobile
- Todas as imagens servidas via next/image (lazy load + formato WebP automático)
- Fontes Petita e Montserrat com font-display: swap

---

## E5 · Infraestrutura e Deploy

### H5.1 — Deploy contínuo
> Como Marcos, quero que o deploy seja automático a cada push na main,
> para entregar atualizações sem processo manual.

**Critérios de aceite:**
- Pipeline CI/CD configurado via Vercel (integração com GitHub)
- Variáveis de ambiente configuradas no painel Vercel (nunca no repositório)
- Preview deployments automáticos para branches de feature

---

## Definição de pronto

Nenhuma entrega fecha sem responder sim às três camadas:

- **Belo** — bate com a identidade VVM aprovada (teal, Petita + Montserrat, logo correto)
- **Fluido** — funciona sem atrito; estados de erro, carregamento e vazio tratados
- **Seguro** — sem dados expostos, formulário com proteção anti-spam, sem credenciais no repo

---

## Backlog pós-MVP (não entra nos 7 dias)

### E2 · Blog
- Múltiplos redatores com níveis de acesso separados no painel
- Tags além de categorias
- Artigos relacionados ao fim de cada post
- Newsletter / captura de email

### E1 · Institucional
- Página de casos de sucesso / depoimentos
- Chat online ou widget WhatsApp
- Versão em outros idiomas

### E3 · Contato
- Agendamento online integrado (Calendly ou similar)
- WhatsApp direto como alternativa ao formulário

### E5 · Infraestrutura
- Analytics avançado (Google Analytics 4 ou Plausible)
- Monitoramento de uptime

---

## Itens fora do escopo (não voltam sem reavaliar)
- Sistema de comentários no blog
- Área de cliente logado
- Pagamento online
- Loja ou e-commerce de qualquer tipo
