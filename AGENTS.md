# AGENTS.md - Auth+ Client (Frontend)

> **Propósito:** Ponto de entrada técnico e guia de regras de interface/negócio para Agentes de IA atuando na aplicação cliente `auth-plus-client`.
>
> **Bounded Context:** Interface Web do Usuário (Frontend SPA), Gestão de Sessão do Cliente, Fluxos Interativos de Autenticação e MFA, Painel de Gestão de Usuários e Faturas.

---

## 1. Visão Geral e Stack Tecnológica

O `auth-plus-client` é o frontend web unificado que permite aos usuários interagirem com os serviços de autenticação, faturamento e segurança do ecossistema `auth-plus`.

- **Framework / Runtime:** SvelteKit com Vite e TypeScript
- **Estilização:** TailwindCSS e PostCSS
- **Gerenciamento de Estado:** Svelte Stores reativas (`src/stores/auth.ts`)
- **Testes:**
  - Unitários e Componentes: Vitest
  - Ponta a Ponta (E2E): Playwright
- **Porta:** Host `5003` $\rightarrow$ Container `3000`

---

## 2. Regras de Negócio e Fluxos de Interface

### 2.1. Fluxo de Login Adaptativo com Desafio MFA

A tela `/login` implementa uma máquina de estados visual que responde ao retorno do backend:

```
        ┌───────────────────┐
        │  /login (Formulário)
        └─────────┬─────────┘
                  │ Submete email e senha
                  ▼
        ┌───────────────────┐
        │ Resposta Backend  │
        └────┬─────────┬────┘
             │         │
    (Sem MFA)│         │(MFA Obrigatório)
             ▼         ▼
     ┌───────────┐ ┌──────────────────────┐
     │ Armazena  │ │ Exibe Seletor        │
     │ Token     │ │ de Estratégias (MFA) │
     └─────┬─────┘ └──────────┬───────────┘
           │                  │ Seleciona canal (Email/SMS)
           ▼                  ▼
     ┌───────────┐ ┌──────────────────────┐
     │ Redireciona│ │ Digitação do Código  │
     │ para '/'  │ │ OTP (/mfa/code)      │
     └───────────┘ └──────────┬───────────┘
                              │ Código validado
                              ▼
                   ┌──────────────────────┐
                   │ Emissão do Token     │
                   │ e Redirecionamento   │
                   └──────────────────────┘
```

1. **Login Direto:** Se a resposta contiver um `token`, o usuário é armazenado na store `credential`, o token é salvo na sessão e o navegador redireciona para a página principal (`/`).
2. **Desafio MFA (`MFAChoose`):** Se o retorno trouxer `{ hash, strategyList }`, a UI bloqueia a navegação, esconde o formulário básico e renderiza o componente de seleção de canal. Após escolha e validação do código OTP, a credencial é estabelecida.

### 2.2. Gestão de Sessão do Usuário (`stores/auth.ts`)

1. **Estado Reativo:** A store expõe métodos `login`, `logout`, `refresh`, `chooseStrategy` e `loginCode`.
2. **Injeção de Credenciais:** Requisições para rotas protegidas injetam automaticamente o cabeçalho `Authorization: Bearer <token>`.
3. **Logout:** O logout limpa o estado reativo local e chama o endpoint `/logout` para revogação de tokens no servidor.

### 2.3. Funcionalidades e Telas Principais

- **`/login`**: Ponto de entrada de credenciais e resolução de desafios MFA.
- **`/users`**: Gestão e listagem de usuários da organização, com modal para cadastro de novos acessos.
- **`/invoices`**: Visualização do histórico financeiro e faturas emitidas pelo backend de billing.
- **`/mfa`**: Configuração e ativação de novos fatores de autenticação (Email, Telefone, Authenticator App).

---

## 3. Instruções de Desenvolvimento e Testes

```bash
# Instalação de dependências
npm install

# Execução em modo desenvolvimento com Vite
npm run dev

# Build de produção
npm run build

# Execução dos testes unitários
npm run test

# Execução dos testes E2E com Playwright
npm run test:e2e

# Linting e checagem de tipos
npm run lint
npm run check
```

---

## 4. Diretrizes para Agentes de IA

1. **Comunicação com Backends:** Utilize as variáveis públicas de ambiente (`PUBLIC_AUTH_URL`, etc.) em vez de endereços estáticos hardcoded.
2. **Feedback Visual:** Todas as chamadas assíncronas (login, envio de código MFA, busca de faturas) devem tratar estados de carregamento (loading states) e erros amigáveis ao usuário.
3. **Respeito aos Testes E2E:** Ao alterar seletores ou fluxos na rota `/login`, execute `npm run test:e2e` para garantir que o fluxo de autenticação e fallback de MFA permaneçam íntegros.
