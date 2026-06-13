# Guia de Migração de Contas — Vanessa Vaz Marschallinger

**Para:** Marcos (dev responsável)
**Quando usar:** quando Vanessa criar suas próprias contas e for assumir a infraestrutura do site.

---

## O que está na conta do dev hoje

| Serviço | O que tem lá | Plano |
|---|---|---|
| Vercel | Projeto `projeto-vanessa`, deploy automático, Blob Store (fotos) | Hobby (gratuito) |
| Neon | Banco PostgreSQL (posts, categorias, mensagens, configurações) | Free tier |
| GitHub | Código-fonte do site | — |
| Payload CMS | Usuário admin (email/senha do dev) | — |
| Resend | Ainda não configurado | — |

---

## Parte 1 — Ela faz (orientar por email)

Vanessa precisa criar as seguintes contas antes de começar a migração.
Todas têm plano gratuito suficiente para o MVP.

### 1.1 Vercel
- Acessar **vercel.com** → "Sign Up" → entrar com email ou Google
- Plano: **Hobby** (gratuito)
- Pedir que envie o email cadastrado

### 1.2 Neon
- Acessar **neon.tech** → "Sign Up"
- Plano: **Free** (1 projeto, 10 GB)
- Criar um projeto chamado `vanessa-vaz` com banco `vanessa_db`
- Ir em "Connection Details" → copiar a **Connection String** e enviar para o dev

### 1.3 Resend
- Acessar **resend.com** → "Sign Up"
- Plano: **Free** (3.000 emails/mês — mais que suficiente)
- Pedir que envie o email cadastrado

### 1.4 Domínio
- Registrar o domínio desejado (ex: `vvmadvocacia.adv.br`)
  - Para `.adv.br`: **registro.br** (exige OAB ativa)
  - Para `.com.br` ou `.com`: qualquer registrador (Locaweb, HostGator, Namecheap)
- Pedir que envie: nome do domínio + acesso ao painel do registrador

---

## Parte 2 — Dev faz (requer acesso técnico)

Realizar na ordem abaixo. Cada etapa depende da anterior.

### 2.1 Exportar o banco de dados atual (Neon do dev)

No terminal, com a URL de conexão do banco atual:

```bash
pg_dump "postgresql://..." > backup-vanessa-$(date +%Y%m%d).sql
```

Guardar o arquivo gerado — é o backup completo (posts, mensagens, configurações, fotos linkadas).

### 2.2 Importar o banco no Neon dela

Com a Connection String que ela enviou:

```bash
psql "postgresql://..." < backup-vanessa-XXXXXXXX.sql
```

Verificar se importou:

```bash
psql "postgresql://..." -c "\dt"
```

Deve listar as tabelas: `posts`, `categories`, `contact_messages`, `media`, `site_settings`, etc.

### 2.3 Conectar o repo ao Vercel dela

1. Fazer login no Vercel com a conta dela (ela autoriza ou compartilha acesso temporário)
2. "Add New Project" → importar o repositório GitHub `vanessa-vaz-projeto`
   - Se o repo estiver na conta do dev: transferir para uma org ou fork na conta dela antes
3. Framework: **Next.js** (detectado automaticamente)
4. **Não fazer deploy ainda** — configurar as variáveis primeiro

### 2.4 Criar o Blob Store no Vercel dela

No projeto recém-criado:
- Aba **Storage** → "Create Database" → **Blob**
- Nome: `vanessa-blob`
- Isso gera automaticamente a variável `BLOB_READ_WRITE_TOKEN` no projeto

### 2.5 Configurar variáveis de ambiente

No painel do projeto Vercel dela → **Settings → Environment Variables**:

| Variável | Valor | Onde obter |
|---|---|---|
| `DATABASE_URI` | Connection String do Neon dela | Passo 2.2 |
| `PAYLOAD_SECRET` | Gerar: `openssl rand -base64 32` | Terminal |
| `NEXT_PUBLIC_SERVER_URL` | `https://dominio-dela.adv.br` | Domínio do passo 1.4 |
| `BLOB_READ_WRITE_TOKEN` | Gerado automaticamente no passo 2.4 | Painel Vercel |
| `RESEND_API_KEY` | Ver passo 2.7 abaixo | Conta Resend dela |
| `CONTACT_EMAIL_TO` | Email profissional de Vanessa | Ela informa |

### 2.6 Fazer o deploy

No painel Vercel → "Deploy". Aguardar build completar (± 3 min).

Verificar:
- Acessar a URL temporária do Vercel (ex: `vanessa-vaz-projeto.vercel.app`)
- Testar `/admin` → deve pedir login
- Testar `/blog` e páginas institucionais

### 2.7 Configurar Resend (envio de email do formulário)

1. Entrar na conta Resend dela
2. "API Keys" → "Create API Key" → copiar a chave (`re_...`)
3. Atualizar `RESEND_API_KEY` nas env vars do Vercel (passo 2.5)
4. "Domains" → "Add Domain" → digitar o domínio dela
5. O Resend mostra registros DNS para adicionar (tipo TXT/MX) — adicionar no painel do registrador
6. Aguardar verificação (geralmente < 30 min)

### 2.8 Configurar o domínio no Vercel

No projeto Vercel dela → **Settings → Domains**:
1. Adicionar o domínio (ex: `vvmadvocacia.adv.br`)
2. O Vercel mostra os registros DNS necessários (tipo A ou CNAME)
3. Adicionar esses registros no painel do registrador do domínio
4. Aguardar propagação (geralmente < 1h, máximo 48h)
5. SSL é gerado automaticamente pelo Vercel

### 2.9 Restaurar as fotos do site

As fotos do CMS (sobre Vanessa + escritório) estão no Blob do dev e precisam ser recarregadas no Blob dela:

```bash
SEED_BASE_URL=https://dominio-dela.adv.br npm run upload-fotos:prod
```

> As URLs antigas do Blob do dev continuam funcionando enquanto o projeto do dev existir.
> Após rodar este script, as fotos passam a vir do Blob dela.

### 2.10 Criar o usuário admin dela no CMS

1. Acessar `https://dominio-dela.adv.br/admin`
2. Criar novo usuário com o email e senha dela
3. Fazer logout e testar login com as novas credenciais
4. Deletar o usuário com o email do dev

### 2.11 Teste final

Verificar cada item antes de encerrar:

- [ ] Home carrega com fotos e serviços
- [ ] Página `/sobre`, `/escritorio`, `/servicos`, `/contato` funcionando
- [ ] Blog lista artigos, filtro de categoria funciona
- [ ] Formulário de contato envia email para Vanessa
- [ ] Painel `/admin` acessível apenas com login dela
- [ ] Upload de nova foto pelo painel funciona
- [ ] HTTPS ativo no domínio final

---

## Parte 3 — Encerrar infraestrutura do dev

**Só depois de confirmar que tudo funciona na conta dela:**

1. **Vercel (dev):** deletar o projeto `projeto-vanessa` — isso apaga também o Blob Store
2. **Neon (dev):** deletar o projeto com o banco antigo
3. **Payload CMS:** usuário do dev já removido no passo 2.10

> ⚠️ Não deletar o repo GitHub — ele continua sendo a fonte do código.
> Manter acesso ao repo para suporte futuro se necessário.

---

## Contato de suporte pós-migração

Se algo não funcionar após a migração, verificar nesta ordem:

1. **Logs do Vercel:** painel do projeto → aba "Deployments" → clicar no último deploy → "Build Logs"
2. **Banco:** acessar o Neon dela e verificar se as tabelas têm dados
3. **Variáveis de ambiente:** conferir se todas as variáveis do passo 2.5 estão salvas e sem espaços extras
4. **DNS:** usar `dig dominio-dela.adv.br` ou `nslookup` para verificar se o domínio aponta para o Vercel

---

*Documento gerado em 2026-06-13. Atualizar se a stack ou os serviços mudarem antes da migração.*
