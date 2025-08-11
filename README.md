<div align="center">
  <h1 align="center">🎟️ Ticketfy</h1>
  <p align="center">Sistema moderno de gerenciamento de tickets construído com Next.js 15 e React 19</p>

  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
</div>

## 📋 Visão Geral

O Ticketfy é uma aplicação web moderna para gerenciamento de tickets, desenvolvida com as melhores práticas e tecnologias atuais do ecossistema React/Next.js. A aplicação oferece uma experiência de usuário fluida, interface responsiva e recursos avançados para gerenciamento de tickets.

## ✨ Principais Recursos

- ✅ **Autenticação Segura** - Sistema de autenticação robusto com proteção de rotas
- 🎨 **Interface Moderna** - Design limpo e responsivo com suporte a tema claro/escuro
- ⚡ **Performance Otimizada** - Utilização de Server Components e renderização híbrida do Next.js
- 🔒 **Validação de Dados** - Validação em tempo real com Zod
- 📱 **Responsivo** - Funciona perfeitamente em dispositivos móveis e desktop
- 🌈 **UI/UX Aprimorada** - Componentes acessíveis e intuitivos com Shadcn UI
- 🔄 **Estado Global** - Gerenciamento de estado com Zustand
- 🛠️ **Deploy Fácil** - Pronto para deploy na Vercel ou qualquer plataforma compatível

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - Next.js 15 com App Router
  - React 19 com Server Components
  - TypeScript
  - Tailwind CSS
  - Shadcn UI (componentes acessíveis)
  - Zustand (gerenciamento de estado)
  - Zod (formulários e validação)

- **Backend:**
  - Prisma (ORM)
  - PostgreSQL (banco de dados Supabase)
  - Oslo.js (autenticação)
  - Argon2 (hash de senhas)

- **Ferramentas:**
  - ESLint + Prettier (padronização de código)
  - Vitest (testes)
  - Prisma Studio (visualização do banco de dados)
  - Sonner (notificações)

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

## 📂 Estrutura do Projeto

```
src/
├── app/                    # Rotas da aplicação (App Router)
├── actions/                # Ações de uso global
│   ├── (auth)/             # Rotas de autenticação
│   ├── (protected)/        # Rotas protegidas
├── components/             # Componentes compartilhados
├── constants/              # Constantes globais
├── hooks/                  # Hooks globais
├── lib/                    # Utilitários e configurações
├── stores/                 # Stores globais
├── types/                  # Tipos globais
└── utils/                  # Utilitários globais
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
