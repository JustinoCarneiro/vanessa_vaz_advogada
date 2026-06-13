# BRIEFING — Fase 2b · Layout
## Projeto: Vanessa Vaz Marschallinger — Advocacia Previdenciária
### Para: Claude Design
### Gerado por: Onda-Dev · Discovery & Spec

---

## Contexto do projeto

Site institucional + blog com CMS para advogada especializada em advocacia
previdenciária (INSS, aposentadorias, benefícios por incapacidade, pensões).

**Cliente-alvo do site:** pessoa física em situação de vulnerabilidade com o
INSS — aposentadoria negada, benefício cortado, dificuldade com perícia médica.
Geralmente chega ao site via busca no Google, em estado de ansiedade e dúvida.
O site precisa transmitir **segurança imediata** antes de qualquer outra coisa.

**Referência de layout aprovada pela cliente:**
https://www.mikaeliscudeler.com.br/
O que ela destacou: "gostei desse modelo que as fotos mudam" — hero com carrossel
de fotos de alta qualidade que transicionam suavemente.

---

## Identidade visual (NÃO criar — extrair e aplicar)

A identidade VVM está fechada. Não propor novas cores, fontes ou símbolos.
Aplicar exatamente o que segue.

### Paleta oficial (Pantone → RGB)

| Nome | Pantone | RGB | HEX | Uso |
|---|---|---|---|---|
| Teal escuro | 175-14 C | 61, 92, 95 | `#3D5C5F` | Cor principal, fundos, headers |
| Teal médio | 132-10 C | 137, 176, 175 | `#89B0AF` | Secundária, bordas, ícones |
| Menta | 127-2 C | 189, 228, 218 | `#BDE4DA` | Backgrounds suaves, destaques leves |
| Preto | Black C | 0, 0, 0 | `#000000` | Texto principal, contraste |
| Branco | — | 255, 255, 255 | `#FFFFFF` | Backgrounds, texto sobre teal |
| Dourado | — | gradiente ouro | `#C9A84C → #E8D48B` | Logo dourado apenas — não usar como cor de UI |

> O dourado é exclusivo para o logo em versão dourada. Não usar em botões,
> fundos, títulos ou qualquer elemento de interface.

### Tipografia oficial

| Papel | Família | Uso |
|---|---|---|
| Display | **Petita** | Títulos, headings H1/H2, nome da advogada |
| Corpo / UI | **Montserrat** | Parágrafos, labels, botões, navegação, legendas |

Petita é fonte paga/personalizada — verificar disponibilidade como web font.
Se não disponível como web font, usar **Cormorant Garamond** como fallback
(mesma energia: serifada, elegante, refinada). Nunca usar Times New Roman ou
Georgia como fallback.

### Logo — variantes disponíveis e quando usar cada uma

| Variante | Quando usar |
|---|---|
| Horizontal dourado (símbolo + texto) | Header em fundo branco ou claro |
| Horizontal branco (símbolo + texto) | Header em fundo teal escuro ou preto |
| Horizontal teal (símbolo + texto) | Fundo menta ou cinza muito claro |
| Símbolo dourado (só o VM circular) | Favicon, ícone app, marca d'água sutil |
| Símbolo preto | Materiais impressos monocromáticos |
| Símbolo teal médio / menta | Fundos neutros, uso secundário |
| Marca d'água circular (nome completo em volta) | Rodapé, selos, certificados |

**Regra crítica:** nunca distorcer, recolorir ou recriar o logo.
Usar sempre os arquivos originais fornecidos.

### Personalidade visual (palavras da cliente)
Confiável · Moderno · Acolhedor · Elegante

Tradução visual:
- **Confiável** → espaços generosos, hierarquia clara, nada piscando ou gritando
- **Moderno** → layout limpo, assimetria controlada, fotografia de qualidade
- **Acolhedor** → menta e teal médio nos backgrounds secundários, não só o teal escuro
- **Elegante** → Petita com muito espaçamento, menos é mais, sem gradientes de UI

---

## Telas a gerar — ordem estratégica

Gerar nesta ordem. O fluxo crítico (como o cliente potencial navega) vem primeiro.

### 1. HOME — `/`
A tela mais importante. É onde o cliente potencial chega do Google.

**Seções obrigatórias (de cima para baixo):**
1. **NavBar** — logo horizontal + links (Sobre | Escritório | Serviços | Blog | Contato) + CTA "Fale Comigo" em destaque
2. **Hero com carrossel** — fotos de Vanessa em ambiente profissional, transição suave. Sobre as fotos: overlay escuro leve + headline em Petita + subtítulo em Montserrat + botão CTA. Altura: 100vh desktop, 70vh mobile.
3. **Quem é Vanessa** — foto profissional à direita, texto de apresentação à esquerda (ou invertido). Breve, direto.
4. **Áreas de atuação** — cards com ícone + título + 2 linhas de descrição. Grid 3 colunas desktop, 1 coluna mobile. Fundo menta.
5. **Chamada para contato** — seção com fundo teal escuro, texto em branco, botão de destaque "Agendar Consulta"
6. **Últimos posts do blog** — 3 cards dos posts mais recentes com imagem, categoria, título e link
7. **Footer** — logo branco, navegação, email de contato, redes sociais, OAB, copyright

### 2. BLOG — `/blog`
Segunda tela mais importante para SEO.

**Elementos obrigatórios:**
- Header de página com título "Blog" em Petita + subtítulo descritivo
- Barra de busca proeminente
- Filtro de categorias (pills/tags clicáveis)
- Grid de cards de artigo: imagem de capa + categoria + título + excerpt + data + "Ler mais"
- Grid: 3 colunas desktop, 2 tablet, 1 mobile
- Paginação no rodapé da listagem

### 3. ARTIGO DO BLOG — `/blog/[slug]`
Onde o visitante passa mais tempo — leitura confortável é crítica.

**Elementos obrigatórios:**
- Breadcrumb: Home > Blog > [Categoria] > [Título]
- Imagem de capa full-width com título sobreposto (ou abaixo, mas consistente)
- Metadados: categoria (pill colorida) + data + tempo de leitura estimado
- Conteúdo: largura máxima 680px centralizada, fonte corpo 17px, line-height 1.75
- Suporte visual para: H2/H3 com hierarquia clara, tabelas com bordas, imagens com legenda, blockquotes com estilo
- CTA ao final do artigo: "Precisa de ajuda com seu caso? Entre em contato."
- Navegação entre posts: anterior / próximo

### 4. SERVIÇOS — `/servicos`
Onde a decisão de contratar acontece.

**Elementos obrigatórios:**
- Hero da página: título + subtítulo + fundo teal escuro
- Cards de serviço expandidos: ícone + nome do serviço + descrição detalhada + CTA individual "Saiba mais" ou "Fale sobre este caso"
- Seção de diferencial / por que escolher Vanessa
- CTA final para contato

### 5. CONTATO — `/contato`
Onde a conversão acontece.

**Elementos obrigatórios:**
- Formulário: nome + email + telefone (opcional) + assunto + mensagem
- Botão de envio claro: "Enviar Mensagem"
- Estado de sucesso inline (não redirecionar)
- Estado de erro por campo (validação visível)
- Informações de contato ao lado do formulário: email + localização (cidade/estado)

### 6. SOBRE MIM — `/sobre`
Construção de autoridade e confiança pessoal.

**Elementos obrigatórios:**
- Foto profissional de destaque
- Bio completa com formação e trajetória
- Linha do tempo ou lista de conquistas/formações
- Citação ou filosofia de trabalho em destaque (blockquote estilizado)

### 7. SOBRE O ESCRITÓRIO — `/escritorio`
Construção de confiança institucional.

**Elementos obrigatórios:**
- Missão e valores
- Diferenciais do escritório
- Foto do ambiente de trabalho (se disponível)
- CTA para contato

---

## Princípios não-negociáveis de layout

1. **Mobile-first obrigatório.** Toda tela deve ser desenhada pensando em mobile primeiro. O visitante que chega do Google geralmente está no celular.

2. **Acessibilidade AA.** Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande. Nunca usar teal médio (`#89B0AF`) como texto sobre branco — não passa no contraste.

3. **Estados sempre tratados.** Para cada componente interativo, mostrar: estado padrão + hover + foco (outline visível) + disabled quando aplicável. Para o formulário: campo vazio + preenchido + erro + sucesso.

4. **Carrossel com dados fictícios realistas.** Usar placeholders de fotos profissionais de advogada (não fotos genéricas de escritório vazio). Sugerir: `https://unsplash.com` com query "lawyer professional portrait". Mínimo 3 slides.

5. **Nunca usar o dourado em UI.** O gradiente dourado é identidade do logo, não cor de interface. Botões, links e destaques usam teal escuro ou teal médio.

6. **Hierarquia tipográfica rígida:**
   - H1: Petita, ~48-56px desktop / 32px mobile
   - H2: Petita, ~32-40px desktop / 24px mobile
   - H3: Montserrat SemiBold, ~20-24px
   - Corpo: Montserrat Regular, 16-17px
   - Labels/UI: Montserrat Medium, 14px
   - Legenda: Montserrat Regular, 13px, cor teal médio

7. **Espaçamento generoso.** Seções com padding vertical mínimo de 80px desktop / 48px mobile. Não comprimir conteúdo.

---

## O que NÃO fazer

- ❌ Não criar nova identidade visual — a marca está fechada
- ❌ Não usar o dourado em elementos de UI (só no logo)
- ❌ Não usar fontes diferentes de Petita + Montserrat (exceto fallback aprovado)
- ❌ Não usar teal médio como cor de texto sobre fundo branco (falha de contraste)
- ❌ Não fazer layout "escritório de advocacia genérico" — o teal e a tipografia já diferenciam, honrar isso
- ❌ Não adicionar animações complexas ou partículas — elegância é contenção
- ❌ Não colocar ícones de balança da justiça ou outros clichês jurídicos — a identidade já comunica autoridade

---

## Definição de pronto por tela

Uma tela está pronta quando:
- [ ] Versão desktop (1280px) e mobile (375px) desenhadas
- [ ] Todos os estados interativos visíveis (hover, foco, erro, sucesso)
- [ ] Identidade VVM aplicada corretamente (paleta, tipografia, logo na variante certa)
- [ ] Contraste AA verificado nos textos principais
- [ ] Conteúdo fictício plausível (não "Lorem ipsum" em títulos visíveis)
- [ ] Nenhum elemento genérico de template que não pertença à identidade VVM
