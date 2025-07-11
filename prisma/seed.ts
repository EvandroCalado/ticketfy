import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

const Tickets = [
  {
    title: 'Correção de Bug no Login',
    content:
      'Usuários estão relatando problemas ao tentar fazer login com Google. O botão não está respondendo após clicar.',
  },
  {
    title: 'Novo Layout para Dashboard',
    content:
      'Implementar novo design do dashboard seguindo as especificações do Figma. Incluir novos widgets e melhorar a experiência de usuário.',
  },
  {
    title: 'Migração do Banco de Dados',
    content:
      'Planejar e executar migração do MySQL para PostgreSQL. Garantir que não haja perda de dados durante o processo.',
  },
  {
    title: 'Otimização de Performance',
    content:
      'Analisar e otimizar o carregamento da página inicial. Atualmente está demorando mais de 3 segundos para carregar em dispositivos móveis.',
  },
  {
    title: 'Integração com API de Pagamento',
    content:
      'Implementar integração com a API do PagSeguro para processamento de pagamentos. Garantir segurança e confiabilidade das transações.',
  },
  {
    title: 'Correção de Bug no Filtro',
    content:
      'O filtro de data não está funcionando corretamente. Quando selecionado, não filtra os registros conforme esperado.',
  },
  {
    title: 'Nova Feature - Chat Online',
    content:
      'Desenvolver chat online para suporte ao cliente. Deve incluir sistema de notificações e histórico de conversas.',
  },
  {
    title: 'Atualização de Documentação',
    content:
      'Atualizar a documentação da API para incluir novos endpoints e melhorar a clareza das descrições.',
  },
  {
    title: 'Correção de Bug no Upload',
    content:
      'Arquivos grandes estão causando timeout durante o upload. Implementar upload em chunks para resolver.',
  },
  {
    title: 'Testes de Segurança',
    content:
      'Realizar auditoria de segurança completa no sistema. Identificar vulnerabilidades e implementar correções.',
  },
  {
    title: 'Implementação de Cache',
    content:
      'Implementar sistema de cache para melhorar o desempenho das requisições frequentes. Usar Redis como provedor de cache.',
  },
];

async function main() {
  await prisma.ticket.deleteMany();
  console.log('Deleted all tickets');

  await prisma.ticket.createMany({ data: Tickets });
  console.log('Created initial tickets');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
