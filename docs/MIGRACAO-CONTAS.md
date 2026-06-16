# Migração de Contas — Vanessa Vaz Marschallinger

**Status:** ✅ Concluída em 2026-06-16

A infraestrutura está inteiramente na conta da cliente. Veja o README.md para o estado atual.

---

## O que foi migrado

| Recurso | De | Para |
|---|---|---|
| Vercel (deploy) | Conta do dev (`marcosjustinos-projects`) | Conta da Vanessa (`vanessa-vaz-advogada`) |
| Neon (banco PostgreSQL) | Conta do dev | Conta da Vanessa (`ep-broad-thunder-ais0lkb2`) |
| Vercel Blob (uploads) | Conta do dev (`store_Z9wIgAc9n5eH...`) | Conta da Vanessa (`store_TogqL7TC60PxomF4`) |
| Domínio `vanessavazadv.com.br` | Projeto do dev no Vercel | Projeto da Vanessa no Vercel |

O repositório GitHub permanece em `JustinoCarneiro/vanessa_vaz_advogada` (conta do dev). Push na `main` deploya automaticamente no Vercel da cliente.

---

## Como a migração foi feita (para referência futura)

### Banco de dados

O `pg_dump` não estava disponível na máquina de desenvolvimento. A migração foi feita via script Node.js (`scripts/migrate-db.mjs`) usando o pacote `pg` já instalado no projeto:

1. Conectou nos dois bancos simultaneamente
2. Criou enums, tabelas (sem constraints), copiou dados, adicionou PKs/FKs/unique constraints
3. Sincronizou sequences

**Problema encontrado:** a primeira migração criou colunas `varchar(255)` onde deveriam ser `text` (colunas sem `character_maximum_length`). Isso causou erro no INSERT da tabela `users` (hash de senha > 255 chars). Solução: `ALTER COLUMN ... TYPE text` nas colunas afetadas + re-insert.

**Problema seguinte:** o Payload tentou rodar uma migration de correção de schema (`ALTER COLUMN "id" SET DATA TYPE serial`) que é SQL inválido no PostgreSQL. Solução definitiva:
1. Dropar todas as tabelas do banco de destino
2. Iniciar o servidor (`npm run dev`) — o Payload cria o schema correto via `push: true`
3. Re-importar apenas os dados (script `scripts/import-data.mjs`)

### Vercel Blob

33 arquivos migrados via script Node.js (`scripts/migrate-blob.mjs`) usando `@vercel/blob`:
- `list()` no store antigo
- `fetch()` de cada arquivo
- `put()` no store novo com `addRandomSuffix: false` (preserva pathnames)

### Domínio

1. Removido do projeto do dev via CLI: `vercel domains remove vanessavazadv.com.br`
2. Adicionado no projeto da Vanessa via dashboard Vercel
3. DNS já apontava para Vercel — sem necessidade de alterar registros

---

## Contas da cliente

| Serviço | Email | Observação |
|---|---|---|
| Vercel | vazvanessamarschallinger@gmail.com | Plano Hobby (gratuito) |
| Neon | vazvanessamarschallinger@gmail.com | Free tier (0.5 GB) |
| Gmail SMTP | vazvanessamarschallinger@gmail.com | App password configurada para o formulário de contato |

---

## Encerramento da infraestrutura do dev

Após confirmação que tudo funciona na conta da cliente, encerrar:

- [ ] Vercel (dev): deletar projeto `projeto-vanessa` (apaga também o Blob Store antigo)
- [ ] Neon (dev): deletar o projeto com o banco antigo (`ep-ancient-mode-at4w7fpa`)
- [ ] Confirmar que as URLs de mídia antigas não são mais referenciadas em nenhum lugar
