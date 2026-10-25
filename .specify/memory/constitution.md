<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.1.0
- List of modified principles:
  - I. Reactive State & Store-Driven Architecture → I. Reactive State & Store-Driven Session Lifecycle (materially expanded with exact store methods, token injection, and logout revocation)
  - II. Security, Environment Isolation & Token Hygiene → II. Adaptive Login & State Machine Integrity (promoted adaptive MFA state machine to core principle with explicit transition rules)
  - Added / Refocused Principle III: Environment Isolation & Backend Decoupling (strict env vars, port mappings)
  - IV. Resilient User Experience & State Transparency → IV. Mandatory Visual Feedback & Resilient Async Operations (explicit async rules for login, MFA dispatch, invoice fetch)
  - V. Strict Type Safety & Clean Code Standards → V. Non-Negotiable Test Discipline & Quality Gates (dual-layer Vitest + Playwright E2E enforcement)
- Added sections:
  - Bounded Context & Functional Scope (defining /login, /users, /invoices, /mfa)
  - Containerization & Port Standards (Host 5003 → Container 3000)
- Removed sections: None
- Follow-up TODOs: None (all project parameters grounded in AGENTS.md)
-->

# Auth+ Client Constitution

> **Bounded Context**: Web User Interface (Frontend SPA), Client Session Lifecycle, Adaptive Authentication & MFA Workflows, User Management, and Invoices.

## Core Principles

### I. Reactive State & Store-Driven Session Lifecycle

Session state, user credentials, and active challenges MUST be managed centrally through reactive Svelte stores (`src/stores/auth.ts`). UI components MUST consume stores reactively and MUST NOT directly mutate session state or duplicate auth persistence logic.

- **Store Contract**: The `auth` store MUST expose and govern `login`, `logout`, `refresh`, `chooseStrategy`, and `loginCode`.
- **Direct Login**: When the backend returns a direct `token`, credentials MUST be populated in the `credential` store, saved to session storage, and redirected to `/`.
- **Credential Injection**: Authenticated requests to protected backend routes MUST automatically inject the `Authorization: Bearer <token>` header.
- **Revocation on Logout**: Logout MUST clear local reactive state and call the server-side `/logout` endpoint to guarantee remote token revocation.

### II. Adaptive Login & State Machine Integrity

The `/login` route operates as a strict visual state machine responding to backend challenge responses:

- **Direct Auth**: If no MFA is required, credentials issue a direct session token.
- **MFA Challenge**: When receiving `{ hash, strategyList }`, the UI MUST block navigation, hide the primary credentials form, and render the `MFAChoose` strategy selector (Email, SMS, Authenticator App).
- **OTP Verification**: After strategy dispatch, the UI MUST transition to OTP code entry (`/mfa/code`), completing session establishment upon code validation.
- **Regression Invariance**: Any modification to form controls, selectors, or transitions in `/login` MUST be validated against Playwright E2E tests (`npm run test:e2e`).

### III. Environment Isolation & Backend Decoupling

The application acts as a decoupled frontend consuming Auth+ backend microservices.

- **Dynamic Configuration**: All backend API endpoints MUST be sourced from public environment variables (`PUBLIC_AUTH_URL`, `PUBLIC_BILLING_URL`, etc.). Hardcoded URLs and hostnames are strictly prohibited.
- **Containerization & Networking**: Development and container runtimes MUST respect designated port mappings (Host `5003` $\rightarrow$ Container `3000`).

### IV. Mandatory Visual Feedback & Resilient Async Operations

User experience must remain transparent and resilient across all asynchronous operations (login submission, MFA strategy dispatch, OTP code validation, user creation, and invoice retrieval):

- **Loading States**: Every async action MUST display deterministic visual indicators (spinners, disabled submission controls) while in-flight.
- **Error Transparency**: Network and business errors MUST be caught, parsed, and displayed with actionable, user-friendly feedback. Silent failures, unhandled promise rejections, and unresponsive UI states are strictly prohibited.

### V. Non-Negotiable Test Discipline & Quality Gates

System reliability is governed by a dual-layer testing strategy:

- **Unit & Component Tests**: Vitest (`npm run test:unit`) for stores, component rendering, and utility functions.
- **End-to-End Tests**: Playwright (`npm run test:e2e`) verifying complete user journeys across `/login`, MFA challenge handling, user management, and invoices.
- **Pre-Merge Quality Gate**: Every commit and pull request MUST pass:
  1. Formatting and lint check: `npm run lint` / `npm run lint:check`
  2. Type validation: `npm run check` (or `npm run build:check`)
  3. Complete test suite: `npm test` (`test:unit` and `test:e2e`)
  4. Production build: `npm run build`

## Security & Architectural Constraints

- **Technology Stack**: SvelteKit with Svelte 5, Vite, TypeScript, TailwindCSS, and PostCSS.
- **Core Route Architecture**:
  - `/login`: Entry point for credential validation and adaptive MFA challenges.
  - `/users`: Organization member management, status controls, and user registration modal.
  - `/invoices`: Billing history and financial invoice visualization.
  - `/mfa`: Multi-factor authentication management and factor enrollment (Email, SMS, Authenticator App).
- **Token Hygiene & Secrets**: Raw credentials, OTP tokens, and secrets MUST NOT be written to client console logs, dumped into unencrypted persistent stores, or exposed to third-party scripts.

## Development Workflow & Quality Gates

- **AI Agent Directive**: AI coding agents MUST consult `AGENTS.md` and this Constitution prior to refactoring authentication or session logic.
- **Selector Integrity**: Do not change HTML data attributes or test-id selectors in `/login` or MFA components without simultaneously updating the corresponding Playwright tests in `e2e/`.
- **Review Standard**: Pull requests violating reactive store boundaries, introducing hardcoded service URLs, or failing E2E suites MUST be rejected.

## Governance

This Constitution supersedes all informal team conventions and ad-hoc practices. All contributors, reviewers, and automated agents are bound by these rules.

- **Amendment Policy**: Amendments require formal documentation, team review, and justification in the Sync Impact Report.
- **Versioning Policy**: Semantic versioning applies:
  - **MAJOR**: Breaking changes to architecture, governance policy, or principle removals.
  - **MINOR**: Addition of new principles, expanded constraints, or updated quality gates.
  - **PATCH**: Wording improvements, clarifications, and non-normative fixes.
- **Compliance Review**: All Spec Kit workflows (`/speckit-plan`, `/speckit-tasks`, `/speckit-implement`) MUST verify conformance against this Constitution.

**Version**: 1.1.0 | **Ratified**: 2026-10-18 | **Last Amended**: 2026-10-18
