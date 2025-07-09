## Next.js Boilerplate

Este é um boilerplate moderno para projetos Next.js, configurado com as melhores práticas e ferramentas de desenvolvimento.

## Tecnologias Principais

- **Next.js 15.3.4**: Framework React para produção
- **React 19**: Biblioteca JavaScript para UI
- **TypeScript**: JavaScript com tipagem estática
- **TailwindCSS**: Framework CSS utilitário
- **Vite**: Build tool e servidor de desenvolvimento
- **Vitest**: Framework de testes rápido
- **ESLint**: Linter para JavaScript/TypeScript
- **Prettier**: Formatação de código
- **pnpm**: Gerenciador de pacotes

## Como Criar um Novo Projeto a partir deste Boilerplate

### 1. Clonar o Repositório
```bash
git clone https://github.com/evandro/nextjs-boilerplate.git nome-do-seu-projeto
```

### 2. Configurar o Projeto
```bash
cd nome-do-seu-projeto
pnpm install
```

### 3. Iniciar o Desenvolvimento
```bash
pnpm dev
```

## Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack
pnpm dev

# Build de produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Executar testes
pnpm test

# Executar testes com cobertura
pnpm test:coverage

# Verificar linting
pnpm lint

# Verificar tipos TypeScript
pnpm typecheck
```

## Estrutura do Projeto

```
src/
├── app/           # Páginas e layout do Next.js
```

## Recursos Incluídos

- Configuração completa do TypeScript
- Setup de testes com Vitest
- Linting e formatação de código
- Configuração do TailwindCSS
- Configuração do ESLint
- Setup de CI/CD com GitHub Actions
- Configuração do Lefthook para hooks Git

## Requisitos

- Node.js (versão LTS recomendada)
- pnpm (gerenciador de pacotes)

## Licença

MIT.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
