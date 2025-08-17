<div align="center">
  <h1 align="center">🎟️ Ticketfy</h1>
  <p align="center">Sistema moderno e completo de gerenciamento de tickets construído com Next.js 15 e React 19</p>

  [![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
  [![Prisma](https://img.shields.io/badge/Prisma_6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  ![Node.js Version](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=nodedotjs)
  ![PNPM Version](https://img.shields.io/badge/pnpm-10.14-F69220?style=flat-square&logo=pnpm)
</div>

## 📋 Visão Geral

O Ticketfy é uma aplicação web moderna para gerenciamento de tickets, desenvolvida com as melhores práticas e tecnologias atuais do ecossistema React/Next.js. A aplicação oferece uma experiência de usuário fluida, interface responsiva e recursos avançados para gerenciamento de tickets.

## ✨ Principais Recursos

- 🔐 **Autenticação Completa** - Sistema robusto com registro, login, verificação de email e recuperação de senha
- 🎫 **Gerenciamento de Tickets** - CRUD completo para tickets com status, prazos e bounties
- 💬 **Sistema de Comentários** - Discussão e colaboração em tickets
- 🎨 **Interface Moderna** - Design responsivo com tema claro/escuro usando Tailwind CSS v4
- ⚡ **Performance Otimizada** - Next.js 15 com Turbopack, Server Components e otimizações avançadas
- 🔒 **Segurança Avançada** - Criptografia Argon2, sessões seguras com Oslo.js
- 📱 **Totalmente Responsivo** - Interface adaptativa para mobile, tablet e desktop
- 🌈 **Componentes Acessíveis** - UI baseada em Radix UI com suporte completo a acessibilidade
- 🔄 **Estado Sincronizado** - Gerenciamento de estado com Zustand e sincronização de URL com Nuqs
- 📧 **Sistema de Email** - Templates React Email para notificações
- 🔍 **Busca Avançada** - Filtragem e busca inteligente de tickets
- 📈 **Analytics** - Insights de performance com Vercel Speed Insights
- 🧪 **Testes Completos** - Suite de testes com Vitest e Testing Library

## 🔠 Stack Tecnológica

### 🎭 Frontend
- **Next.js 15.4.5** - Framework React com App Router e Server Components
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Superset tipado do JavaScript
- **Tailwind CSS 4** - Framework CSS utility-first
- **Shadcn/UI + Radix UI** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones SVG otimizados
- **Next Themes** - Gerenciamento de temas claro/escuro

### 💾 Backend & Banco de Dados
- **Prisma 6.11.1** - ORM moderno para TypeScript
- **PostgreSQL** - Banco de dados relacional robusto
- **Oslo.js** - Biblioteca de autenticação segura
- **Argon2** - Algoritmo de hash para senhas
- **Resend** - Serviço de envio de emails transacionais

### 🔄 Estado & Navegação
- **Zustand 5** - Gerenciamento de estado global leve
- **Nuqs 2.4.3** - Sincronização de estado com URL
- **React Hook Form + Zod** - Formulários com validação tipada

### 🔧 Ferramentas de Desenvolvimento
- **Turbopack** - Bundler rápido do Next.js
- **Vitest 3.2.4** - Framework de testes unitários
- **Testing Library** - Utilitários para testes de componentes
- **ESLint 9 + Prettier** - Linting e formatação de código
- **Lefthook** - Git hooks para automação
- **Bundle Analyzer** - Análise de tamanho do bundle

### 📧 Email & Notificações
- **React Email 4.2.8** - Templates de email em React
- **Sonner** - Toasts e notificações elegantes
- **Inngest** - Processamento de jobs em background

### 📈 Performance & Analytics
- **Vercel Speed Insights** - Métricas de performance em tempo real
- **React Scan** - Depuração de renderizações desnecessárias

## 🚀 Começando

### Pré-requisitos

- Node.js 22+ e npm/yarn/pnpm
- PostgreSQL
- Git

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/EvandroCalado/ticketfy.git
   cd ticketfy
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn
   # ou
   pnpm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```

   Atualize o arquivo `.env` com suas configurações de banco de dados e autenticação.

4. **Execute as migrações do banco de dados** (Ainda em construção)
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

6. **Acesse a aplicação**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📂 Arquitetura do Projeto

```
ticketfy/
├── prisma/                    # Esquema e migrações do banco
│   ├── schema.prisma          # Definição das tabelas
│   └── generated/             # Cliente Prisma gerado
│
src/
├── app/                      # App Router (Next.js 15)
│   ├── (root)/                # Grupo de rotas públicas
│   │   ├── (protected)/       # Rotas autenticadas
│   │   │   └── tickets/       # CRUD de tickets
│   │   ├── about/             # Página sobre
│   │   └── price/             # Página de preços
│   │
│   ├── (auth)/                # Grupo de autenticação
│   │   ├── sign-in/           # Login
│   │   ├── sign-up/           # Registro
│   │   └── forgot-password/   # Recuperação de senha
│   │
│   └── api/                   # API Routes
│       └── inngest/           # Background jobs
│
├── components/               # Componentes reutilizáveis
│   ├── ui/                   # Componentes base (Shadcn)
│   ├── shared/               # Componentes compartilhados
│   └── email/                # Templates de email
│
├── actions/                  # Server Actions
├── hooks/                    # React Hooks customizados
├── stores/                   # Zustand stores
├── lib/                      # Utilitários e configs
├── types/                    # Definições de tipos TypeScript
├── utils/                    # Funções utilitárias
├── constants/                # Constantes da aplicação
└── icons/                    # Ícones customizados
```

## 📑 Modelo de Dados

O projeto utiliza um esquema relacional bem estruturado:

- **User** - Usuários do sistema com autenticação segura
- **Ticket** - Tickets com status, prazos e bounties
- **Comment** - Sistema de comentários para colaboração
- **Session** - Sessões de usuário para segurança
- **EmailVerificationToken** - Tokens para verificação de email
- **PasswordResetToken** - Tokens para recuperação de senha

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor com Turbopack
pnpm build            # Build de produção
pnpm start            # Inicia servidor de produção

# Qualidade de Código
pnpm lint             # ESLint com regras rígidas
pnpm typecheck        # Verificação de tipos TypeScript

# Testes
pnpm test             # Testes unitários com Vitest
pnpm test:ui          # Interface gráfica para testes
pnpm test:coverage    # Relatório de cobertura

# Banco de Dados
pnpm seed             # Popular banco com dados de teste
npx prisma studio     # Interface visual do Prisma

# Análises
pnpm analyze          # Bundle analyzer para otimizações

# Email Templates
pnpm email            # Preview dos templates de email
```

## 🧪 Testes (Ainda em construção)

Para executar os testes:

```bash
npm test
# ou
yarn test
# ou
pnpm test
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## ✉️ Contato

Evandro Calado - [@seu_twitter](https://twitter.com/seu_twitter) - seu-email@exemplo.com

Link do Projeto: [https://github.com/EvandroCalado/ticketfy](https://github.com/EvandroCalado/ticketfy)
