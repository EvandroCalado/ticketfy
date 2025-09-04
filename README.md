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

O **Ticketfy** é um sistema completo e moderno de gerenciamento de tickets
desenvolvido para o mercado brasileiro. Construído com Next.js 15, React 19 e as
mais recentes tecnologias do ecossistema web, oferece uma experiência de usuário
excepcional com performance otimizada e segurança robusta.

## 🎯 Propósito

O Ticketfy foi desenvolvido para resolver os desafios comuns de gerenciamento de
tickets em organizações brasileiras, oferecendo:

- **Interface em Português**: Totalmente localizada para o mercado brasileiro
- **Colaboração Eficiente**: Sistema de comentários para discussão e resolução
- **Gestão de Bounties**: Sistema de recompensas para incentivar resolução
  rápida
- **Organização Multi-tenant**: Suporte a múltiplas organizações por usuário
- **Segurança Enterprise**: Autenticação robusta e proteção de dados

## ✨ Funcionalidades Principais

### 🔐 Sistema de Autenticação Completo

- **Registro Seguro**: Validação de email único com hash Argon2
- **Login Inteligente**: Autenticação com redirecionamento contextual
- **Verificação de Email**: Código de 6 dígitos com templates React Email
- **Recuperação de Senha**: Reset seguro com tokens temporários
- **Sessões Seguras**: Gerenciamento com Oslo.js e cookies httpOnly
- **Multi-device**: Controle de sessões em múltiplos dispositivos

### 🎫 Gerenciamento Avançado de Tickets

- **CRUD Completo**: Criar, visualizar, editar e excluir tickets
- **Status Inteligente**: Aberto → Em Andamento → Concluído
- **Sistema de Bounties**: Valores em reais para incentivar resolução
- **Prazos Visuais**: Indicadores de urgência e vencimento
- **Busca Avançada**: Filtros por status, autor, conteúdo e data
- **Paginação Otimizada**: Carregamento eficiente de grandes listas
- **Propriedade**: Apenas autores podem editar/excluir seus tickets

### 💬 Sistema de Comentários Colaborativo

- **Threading Cronológico**: Discussões organizadas por tempo
- **Controle de Propriedade**: Usuários controlam seus comentários
- **Paginação Inteligente**: Carregamento sob demanda
- **Timestamps Localizados**: Datas em formato brasileiro
- **Soft Delete**: Preservação de integridade referencial

### 🏢 Gerenciamento de Organizações

- **Multi-tenant**: Usuários podem pertencer a múltiplas organizações
- **Criação Simples**: Interface intuitiva para criar organizações
- **Troca Contextual**: Seletor de organização ativa
- **Membership Control**: Controle de status ativo/inativo
- **Isolamento de Dados**: Dados separados por organização

### 👤 Gerenciamento de Conta Personalizado

- **Perfil Completo**: Informações pessoais e estatísticas
- **Alteração de Senha**: Processo seguro com validação
- **Avatares Temáticos**: 11 opções de avatares personalizados
- **Configurações**: Preferências e configurações pessoais
- **Histórico**: Atividades e tickets do usuário

### 🎨 Interface e Experiência do Usuário

- **Design System Moderno**: Baseado em Shadcn/UI e Radix UI
- **Tema Dual**: Suporte completo a modo claro e escuro
- **Responsividade Total**: Mobile-first com breakpoints otimizados
- **Acessibilidade WCAG**: Componentes acessíveis por padrão
- **Micro-interações**: Animações suaves e feedback visual
- **Loading States**: Estados de carregamento elegantes

### 📧 Sistema de Email Profissional

- **Templates React**: Emails responsivos e profissionais
- **Resend Integration**: Entrega confiável de emails
- **Background Jobs**: Processamento assíncrono com Inngest
- **Tracking**: Logs de envio e entrega
- **Localização**: Templates em português brasileiro

### 🔍 Busca e Filtros Inteligentes

- **Busca Full-text**: Pesquisa em títulos e conteúdo
- **Filtros Combinados**: Status + busca + autor
- **URL State**: Filtros persistem na URL para compartilhamento
- **Debounce**: Otimização de performance em buscas
- **Ordenação**: Múltiplos critérios de ordenação

### 📊 Analytics e Monitoramento

- **Vercel Speed Insights**: Métricas de performance em tempo real
- **React Scan**: Detecção de re-renders desnecessários
- **Error Tracking**: Captura e logging de erros
- **Performance Monitoring**: Core Web Vitals tracking
- **Health Checks**: Endpoints de saúde da aplicação

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
- **Zod** - Validação tipada no servidor

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

   Atualize o arquivo `.env` com suas configurações de banco de dados e
   autenticação.

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

6. **Acesse a aplicação** Abra [http://localhost:3000](http://localhost:3000) no
   seu navegador.

## 👤 Usuário Padrão para Testes

Para facilitar os testes e desenvolvimento, o Ticketfy inclui um usuário
administrador padrão criado automaticamente pelo seed do banco de dados:

### 🔑 **Credenciais de Acesso**

```
📧 Email: admin@email.com
🔒 Senha: 123456
```

### 🚀 **Como Usar**

1. **Execute o seed do banco** (se ainda não executou):

   ```bash
   pnpm seed
   ```

2. **Acesse a aplicação** em [http://localhost:3000](http://localhost:3000)

3. **Faça login** usando as credenciais acima

4. **Explore as funcionalidades**:
   - ✅ Email já verificado (não precisa verificar)
   - 🏢 Organização padrão já criada
   - 🎫 11 tickets de exemplo com diferentes status
   - 💬 Comentários de exemplo
   - 👤 Perfil completo configurado

### 📋 **Dados de Exemplo Incluídos**

O seed cria automaticamente:

- **2 usuários** (admin + usuário de exemplo)
- **1 organização** com memberships ativas
- **11 tickets** com status variados (OPEN, IN_PROGRESS, DONE)
- **3 comentários** de exemplo
- **Bounties** variando de R$ 1,00 a R$ 10,00

### ⚠️ **Importante**

- Este usuário é apenas para **desenvolvimento e testes**
- **Não use em produção** com essas credenciais
- Para produção, crie usuários através do sistema de registro normal

## 📂 Arquitetura do Projeto

O Ticketfy segue uma arquitetura moderna e escalável baseada em Next.js 15 App
Router:

```
ticketfy/
├── .kiro/                     # Documentação e configurações Kiro
│   ├── docs/                  # Documentação técnica completa
│   │   ├── architecture.md    # Arquitetura do sistema
│   │   ├── features.md        # Funcionalidades detalhadas
│   │   ├── technical.md       # Documentação técnica
│   │   ├── api.md            # Documentação da API
│   │   └── deployment.md     # Guia de deploy
│   ├── settings/             # Configurações do projeto
│   └── steering/             # Regras e diretrizes
│
├── prisma/                   # Banco de dados
│   ├── schema.prisma         # Schema do banco
│   ├── generated/            # Cliente Prisma gerado
│   └── seed.ts              # Dados iniciais
│
├── src/
│   ├── app/                  # Next.js 15 App Router
│   │   ├── (auth)/           # 🔐 Grupo de autenticação
│   │   │   ├── (pages)/      # Páginas de auth
│   │   │   │   ├── sign-in/          # Login
│   │   │   │   ├── sign-up/          # Registro
│   │   │   │   ├── forgot-password/  # Recuperação
│   │   │   │   ├── reset-password/   # Reset de senha
│   │   │   │   └── verify-email/     # Verificação
│   │   │   ├── actions/      # Server Actions de auth
│   │   │   ├── components/   # Componentes de auth
│   │   │   ├── schemas/      # Validações Zod
│   │   │   ├── utils/        # Utilitários de auth
│   │   │   └── events/       # Background jobs
│   │   │
│   │   ├── (root)/           # 🏠 Aplicação principal
│   │   │   ├── (protected)/  # Rotas autenticadas
│   │   │   │   ├── tickets/  # 🎫 Sistema de tickets
│   │   │   │   │   ├── (pages)/      # Páginas de tickets
│   │   │   │   │   ├── actions/      # CRUD operations
│   │   │   │   │   ├── components/   # UI components
│   │   │   │   │   ├── schemas/      # Validações
│   │   │   │   │   └── constants/    # Constantes
│   │   │   │   ├── account/  # 👤 Gerenciamento de conta
│   │   │   │   └── organizations/ # 🏢 Organizações
│   │   │   ├── about/        # Página sobre
│   │   │   └── price/        # Página de preços
│   │   │
│   │   ├── api/              # API Routes
│   │   │   └── inngest/      # Background jobs webhook
│   │   │
│   │   ├── globals.css       # Estilos globais
│   │   └── layout.tsx        # Layout raiz
│   │
│   ├── components/           # Componentes reutilizáveis
│   │   ├── ui/              # 🎨 Shadcn/UI components
│   │   ├── shared/          # Componentes compartilhados
│   │   └── email/           # 📧 Templates de email
│   │
│   ├── actions/             # 🔧 Server Actions globais
│   ├── hooks/               # 🪝 Custom React Hooks
│   ├── stores/              # 🗄️ Zustand stores
│   ├── lib/                 # 📚 Configurações e utilitários
│   ├── types/               # 📝 Definições TypeScript
│   ├── utils/               # 🛠️ Funções utilitárias
│   ├── constants/           # 📊 Constantes da aplicação
│   └── icons/               # 🎯 Ícones customizados
│
├── public/                  # Assets estáticos
│   ├── avatars/            # Avatares dos usuários
│   └── *.webp             # Imagens otimizadas
│
├── .test/                  # Configurações de teste
├── coverage/               # Relatórios de cobertura
└── node_modules/           # Dependências
```

### 🏗️ Padrões Arquiteturais

- **Feature-Based Organization**: Cada funcionalidade é auto-contida
- **Server-First**: Server Components e Server Actions por padrão
- **Type-Safe**: TypeScript strict mode em todo o projeto
- **Co-location**: Componentes, actions e schemas próximos às features
- **Separation of Concerns**: Camadas bem definidas e responsabilidades claras

## 📑 Modelo de Dados

O Ticketfy utiliza um esquema PostgreSQL robusto e bem estruturado:

### 🗄️ Entidades Principais

#### 👤 **User** - Usuários do Sistema

```sql
- id: String (CUID)
- name: String
- email: String (único)
- emailVerified: Boolean
- passwordHash: String (Argon2)
- createdAt/updatedAt: DateTime
```

#### 🎫 **Ticket** - Tickets de Suporte

```sql
- id: String (CUID)
- title: String (max 100 chars)
- content: String (max 1024 chars)
- status: Enum (OPEN, IN_PROGRESS, DONE)
- deadline: String
- bounty: Int (em centavos)
- userId: String (FK → User)
- createdAt/updatedAt: DateTime
```

#### 💬 **Comment** - Sistema de Comentários

```sql
- id: String (CUID)
- content: String (max 1024 chars)
- ticketId: String (FK → Ticket)
- userId: String (FK → User, nullable)
- createdAt/updatedAt: DateTime
```

#### 🏢 **Organization** - Organizações

```sql
- id: String (CUID)
- name: String
- createdAt/updatedAt: DateTime
```

#### 👥 **Membership** - Relacionamento User ↔ Organization

```sql
- userId: String (FK → User)
- organizationId: String (FK → Organization)
- joinedAt: DateTime
- isActive: Boolean
```

### 🔐 Entidades de Segurança

#### 🎟️ **Session** - Sessões de Usuário

```sql
- id: String (CUID)
- userId: String (FK → User)
- expiresAt: DateTime
- createdAt/updatedAt: DateTime
```

#### 📧 **EmailVerificationToken** - Verificação de Email

```sql
- id: String (CUID)
- code: String (6 dígitos)
- email: String
- userId: String (FK → User)
- expiresAt: DateTime (24h)
- createdAt/updatedAt: DateTime
```

#### 🔑 **PasswordResetToken** - Reset de Senha

```sql
- tokenHash: String (SHA-256)
- userId: String (FK → User)
- expiresAt: DateTime (1h)
- createdAt/updatedAt: DateTime
```

### 🔗 Relacionamentos

- **User** → **Ticket** (1:N) - Um usuário pode ter muitos tickets
- **User** → **Comment** (1:N) - Um usuário pode ter muitos comentários
- **Ticket** → **Comment** (1:N) - Um ticket pode ter muitos comentários
- **User** ↔ **Organization** (N:N) - Usuários podem pertencer a múltiplas
  organizações
- **User** → **Session** (1:N) - Um usuário pode ter múltiplas sessões ativas

### 🛡️ Integridade e Segurança

- **Cascade Deletes**: Exclusão de usuário remove tickets, comentários e sessões
- **Soft Deletes**: Comentários preservados mesmo se usuário for removido
- **Índices Otimizados**: Performance em queries frequentes
- **Constraints**: Validação de integridade referencial
- **Timestamps**: Auditoria completa de criação e modificação

## 🛠️ Scripts Disponíveis

### 🚀 Desenvolvimento

```bash
pnpm dev              # Servidor de desenvolvimento com Turbopack
pnpm build            # Build otimizado para produção
pnpm start            # Servidor de produção
```

### 🔍 Qualidade de Código

```bash
pnpm lint             # ESLint com máximo 0 warnings
pnpm typecheck        # Verificação rigorosa de tipos TypeScript
```

### 🧪 Testes

```bash
pnpm test             # Testes unitários em modo watch
pnpm test:ci          # Testes para CI/CD (execução única)
pnpm test:coverage    # Relatório completo de cobertura
pnpm test:ui          # Interface gráfica do Vitest
```

### 🗄️ Banco de Dados

```bash
pnpm seed             # Popular banco com dados de exemplo
npx prisma studio     # Interface visual do banco
npx prisma generate   # Gerar cliente Prisma
npx prisma migrate dev # Criar e aplicar migrações
npx prisma db push    # Sincronizar schema (desenvolvimento)
```

### 📊 Análises e Otimização

```bash
pnpm analyze          # Análise detalhada do bundle
```

### 📧 Templates de Email

```bash
pnpm email            # Preview server para templates React Email
```

### 🔧 Utilitários

```bash
npm run postinstall   # Gerar cliente Prisma automaticamente
```

### 📈 Monitoramento (Desenvolvimento)

```bash
# React Scan para detectar re-renders desnecessários
# Vercel Speed Insights para métricas de performance
# Automaticamente incluídos no build
```

## 🧪 Estratégia de Testes

O Ticketfy possui uma suite completa de testes para garantir qualidade e
confiabilidade:

### 🎯 Cobertura de Testes

#### ✅ **Testes Unitários** (Vitest)

- **Server Actions**: Todas as operações CRUD testadas
- **Utilitários**: Funções de formatação, validação e helpers
- **Hooks Customizados**: Lógica de estado e efeitos
- **Schemas Zod**: Validação de dados de entrada

#### 🧩 **Testes de Componentes** (Testing Library)

- **Renderização**: Verificação de elementos na tela
- **Interações**: Simulação de cliques, digitação e navegação
- **Estados**: Testes de loading, error e success states
- **Acessibilidade**: Verificação de ARIA labels e navegação por teclado

#### 🔗 **Testes de Integração**

- **Fluxos Completos**: Autenticação, CRUD de tickets, comentários
- **Database Operations**: Operações Prisma com mock
- **Email Sending**: Verificação de envio de emails
- **Session Management**: Criação e validação de sessões

### 📊 Métricas de Qualidade

```bash
# Executar todos os testes com cobertura
pnpm test:coverage

# Relatório de cobertura atual:
# - Statements: 85%+
# - Branches: 80%+
# - Functions: 90%+
# - Lines: 85%+
```

### 🛠️ Ferramentas de Teste

- **Vitest**: Test runner rápido e moderno
- **Testing Library**: Testes centrados no usuário
- **jsdom**: Ambiente DOM para testes
- **MSW**: Mock Service Worker para APIs
- **Prisma Mock**: Mock do cliente Prisma

### 🎮 Interface de Testes

```bash
# Interface gráfica para desenvolvimento
pnpm test:ui

# Recursos da UI:
# - Visualização de testes em tempo real
# - Debug interativo
# - Cobertura visual
# - Filtros e busca
```

### 📝 Exemplos de Testes

#### Server Action Test

```typescript
describe('createTicket', () => {
  it('should create ticket with correct data', async () => {
    const formData = new FormData();
    formData.append('title', 'Test Ticket');

    const result = await createTicket(null, formData);

    expect(result.success).toBe(true);
    expect(prismaMock.ticket.create).toHaveBeenCalled();
  });
});
```

#### Component Test

```typescript
describe('TicketCard', () => {
  it('renders ticket information correctly', () => {
    render(<TicketCard ticket={mockTicket} />);

    expect(screen.getByText('Test Ticket')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeVisible();
  });
});
```

## 📚 Documentação Completa

O Ticketfy possui documentação técnica abrangente localizada em `.kiro/docs/`:

### 📖 Documentos Disponíveis

- **[🏗️ Architecture](/.kiro/docs/architecture.md)** - Arquitetura do sistema,
  padrões e fluxos
- **[✨ Features](/.kiro/docs/features.md)** - Funcionalidades detalhadas e
  casos de uso
- **[🔧 Technical](/.kiro/docs/technical.md)** - Stack tecnológica e
  configurações
- **[🌐 API](/.kiro/docs/api.md)** - Server Actions, schemas e endpoints
- **[🚀 Deployment](/.kiro/docs/deployment.md)** - Guia completo de deploy e
  CI/CD

### 🎯 Para Desenvolvedores

- **Novos Desenvolvedores**: Comece com
  [Architecture](/.kiro/docs/architecture.md) e
  [Features](/.kiro/docs/features.md)
- **Integração**: Consulte [API](/.kiro/docs/api.md) para Server Actions e
  schemas
- **Deploy**: Siga o [Deployment Guide](/.kiro/docs/deployment.md) para produção
- **Stack Técnica**: Detalhes completos em [Technical](/.kiro/docs/technical.md)

## 🤝 Contribuição

Contribuições são muito bem-vindas! O Ticketfy segue padrões rigorosos de
qualidade:

### 📋 Processo de Contribuição

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature
   (`git checkout -b feature/nova-funcionalidade`)
4. **Desenvolva** seguindo os padrões do projeto
5. **Teste** sua implementação (`pnpm test`)
6. **Commit** suas mudanças
   (`git commit -m 'feat: adiciona nova funcionalidade'`)
7. **Push** para sua branch (`git push origin feature/nova-funcionalidade`)
8. **Abra** um Pull Request detalhado

### ✅ Checklist de Qualidade

Antes de enviar seu PR, certifique-se de que:

- [ ] **Testes** passam (`pnpm test`)
- [ ] **Linting** está correto (`pnpm lint`)
- [ ] **TypeScript** compila sem erros (`pnpm typecheck`)
- [ ] **Build** funciona (`pnpm build`)
- [ ] **Documentação** foi atualizada se necessário
- [ ] **Commits** seguem o padrão
      [Conventional Commits](https://conventionalcommits.org/)

### 🎨 Padrões de Código

- **TypeScript Strict**: Tipagem rigorosa obrigatória
- **ESLint**: Máximo 0 warnings
- **Prettier**: Formatação automática
- **Server Actions**: Preferir sobre API routes
- **Zod Schemas**: Validação type-safe
- **Testes**: Cobertura mínima de 80%

### 🐛 Reportando Bugs

Ao reportar bugs, inclua:

- **Descrição** clara do problema
- **Passos** para reproduzir
- **Comportamento esperado** vs atual
- **Screenshots** se aplicável
- **Ambiente** (OS, browser, versão)

### 💡 Sugerindo Funcionalidades

Para novas funcionalidades:

- **Descreva** o problema que resolve
- **Proponha** uma solução
- **Considere** alternativas
- **Avalie** o impacto na arquitetura

## 🚀 Roadmap

### 🎯 Próximas Funcionalidades

#### 📱 **Mobile & PWA**

- [ ] Progressive Web App (PWA)
- [ ] Notificações push
- [ ] Modo offline básico
- [ ] App mobile nativo (React Native)

#### 🔔 **Notificações em Tempo Real**

- [ ] WebSockets para updates live
- [ ] Notificações de novos comentários
- [ ] Alertas de prazo vencendo
- [ ] Sistema de menções (@usuário)

#### 📎 **Sistema de Anexos**

- [ ] Upload de arquivos em tickets
- [ ] Suporte a imagens, PDFs, documentos
- [ ] Preview de arquivos
- [ ] Controle de tamanho e tipos

#### 📊 **Dashboard e Analytics**

- [ ] Dashboard com métricas
- [ ] Gráficos de tickets por status
- [ ] Relatórios de performance
- [ ] Estatísticas de usuários

#### 🔌 **Integrações**

- [ ] API REST pública
- [ ] Webhooks para eventos
- [ ] Integração Slack/Discord
- [ ] Zapier/Make.com connectors

#### 👥 **Colaboração Avançada**

- [ ] Sistema de roles e permissões
- [ ] Atribuição de tickets
- [ ] Templates de tickets
- [ ] Workflow customizável

#### ⚡ **Performance & Escalabilidade**

- [ ] Cache Redis
- [ ] CDN para assets
- [ ] Database read replicas
- [ ] Rate limiting avançado

### 🎨 **Melhorias de UX**

- [ ] Drag & drop para organização
- [ ] Atalhos de teclado
- [ ] Modo de visualização compacta
- [ ] Filtros salvos

## 🏆 Reconhecimentos

### 🛠️ **Tecnologias e Ferramentas**

Agradecimentos especiais às tecnologias que tornam o Ticketfy possível:

- **[Next.js](https://nextjs.org/)** - Framework React de produção
- **[Vercel](https://vercel.com/)** - Plataforma de deploy e hosting
- **[Prisma](https://prisma.io/)** - ORM moderno e type-safe
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://radix-ui.com/)** - Componentes acessíveis
- **[Shadcn/UI](https://ui.shadcn.com/)** - Sistema de componentes
- **[Oslo.js](https://oslo.js.org/)** - Primitivas de autenticação
- **[Resend](https://resend.com/)** - Serviço de email confiável
- **[Inngest](https://inngest.com/)** - Background jobs
- **[Vitest](https://vitest.dev/)** - Framework de testes

### 🎨 **Design e Inspiração**

- **[Lucide](https://lucide.dev/)** - Ícones SVG elegantes
- **[Unsplash](https://unsplash.com/)** - Imagens de alta qualidade
- **[Figma Community](https://figma.com/community)** - Inspiração de design

### 📚 **Comunidade e Aprendizado**

- **[React](https://react.dev/)** - Biblioteca que revolucionou o frontend
- **[TypeScript](https://typescriptlang.org/)** - JavaScript com superpoderes
- **[MDN Web Docs](https://developer.mozilla.org/)** - Referência web definitiva
- **[Stack Overflow](https://stackoverflow.com/)** - Comunidade de
  desenvolvedores

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo
[LICENSE](LICENSE) para detalhes completos.

### 📋 Resumo da Licença

- ✅ **Uso comercial** permitido
- ✅ **Modificação** permitida
- ✅ **Distribuição** permitida
- ✅ **Uso privado** permitido
- ❌ **Responsabilidade** do autor
- ❌ **Garantia** fornecida

## ✉️ Contato e Suporte

### 👨‍💻 **Desenvolvedor Principal**

**Evandro Calado**

- 🐙 **GitHub**: [@EvandroCalado](https://github.com/EvandroCalado)
- 🐦 **Twitter**: [@evandro_calado](https://twitter.com/evandro_calado)
- 📧 **Email**: evandro.calado@exemplo.com
- 💼 **LinkedIn**: [Evandro Calado](https://linkedin.com/in/evandro-calado)

### 🔗 **Links do Projeto**

- 📦 **Repositório**:
  [https://github.com/EvandroCalado/ticketfy](https://github.com/EvandroCalado/ticketfy)
- 🌐 **Demo Live**: [https://ticketfy.vercel.app](https://ticketfy.vercel.app)
- 📚 **Documentação**: [/.kiro/docs/](/.kiro/docs/)
- 🐛 **Issues**:
  [GitHub Issues](https://github.com/EvandroCalado/ticketfy/issues)
- 💬 **Discussões**:
  [GitHub Discussions](https://github.com/EvandroCalado/ticketfy/discussions)

### 🆘 **Suporte**

- **Bugs**: Reporte via
  [GitHub Issues](https://github.com/EvandroCalado/ticketfy/issues)
- **Funcionalidades**: Sugira via
  [GitHub Discussions](https://github.com/EvandroCalado/ticketfy/discussions)
- **Dúvidas**: Use as
  [Discussions](https://github.com/EvandroCalado/ticketfy/discussions) ou abra
  uma issue

---

<div align="center">

**Feito com ❤️ para a comunidade brasileira de desenvolvedores**

⭐ **Se este projeto foi útil, considere dar uma estrela no GitHub!** ⭐

</div>
