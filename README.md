# 🎟️ Ticketfy

Sistema de gerenciamento de ingressos desenvolvido com as mais modernas tecnologias do ecossistema React/Next.js.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React para renderização híbrida e roteamento
- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Adiciona tipagem estática ao JavaScript
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **Prisma** - ORM para banco de dados
- **Zod** - Validação de dados em tempo de execução
- **Radix UI** - Componentes acessíveis e sem estilos
- **React Hook Form** - Gerenciamento de formulários
- **date-fns** - Manipulação de datas
- **Vitest** - Framework de testes

## ✨ Funcionalidades

- Criação e gerenciamento de ingressos
- Interface moderna e responsiva
- Validação de formulários robusta
- Tema escuro/claro
- Componentes acessíveis
- Testes automatizados

## 🛠️ Como Executar

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd ticketfy
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   Preencha as variáveis necessárias no arquivo `.env`

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

6. Acesse a aplicação em:
   ```
   http://localhost:3000
   ```

## 🧪 Testes

Para executar os testes:
```bash
npm test
```

Para verificar a cobertura de testes:
```bash
npm run test:coverage
```

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.

## 👥 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## 📬 Contato

Se tiver alguma dúvida ou sugestão, entre em contato através do [seu-email@exemplo.com](mailto:seu-email@exemplo.com) ou abra uma issue no repositório.
