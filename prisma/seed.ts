import { toCent } from '@/utils/format-currency';

import { PrismaClient, TicketStatus } from './generated/prisma';

type TicketCreateInput = {
  id?: string;
  title: string;
  content: string;
  status?: TicketStatus;
  deadline: string;
  bounty: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

const prisma = new PrismaClient();

const Tickets: TicketCreateInput[] = [
  {
    title: 'Correção de Bug no Login',
    content:
      'Usuários estão relatando problemas ao tentar fazer login com Google. O botão não está respondendo após clicar.',
    status: 'OPEN' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(100),
  },
  {
    title: 'Novo Layout para Dashboard',
    content:
      'Implementar novo design do dashboard seguindo as especificações do Figma. Incluir novos widgets e melhorar a experiência de usuário.',
    status: 'IN_PROGRESS' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(150),
  },
  {
    title: 'Migração do Banco de Dados',
    content:
      'Planejar e executar migração do MySQL para PostgreSQL. Garantir que não haja perda de dados durante o processo.',
    status: 'DONE' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(300),
  },
  {
    title: 'Otimização de Performance',
    content:
      'Analisar e otimizar o carregamento da página inicial. Atualmente está demorando mais de 3 segundos para carregar em dispositivos móveis.',
    status: 'OPEN' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(450),
  },
  {
    title: 'Integração com API de Pagamento',
    content:
      'Implementar integração com a API do PagSeguro para processamento de pagamentos. Garantir segurança e confiabilidade das transações.',
    status: 'OPEN' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(600),
  },
  {
    title: 'Correção de Bug no Filtro',
    content:
      'O filtro de data não está funcionando corretamente. Quando selecionado, não filtra os registros conforme esperado.',
    status: 'OPEN' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(750),
  },
  {
    title: 'Nova Feature - Chat Online',
    content:
      'Desenvolver chat online para suporte ao cliente. Deve incluir sistema de notificações e histórico de conversas.',
    status: 'OPEN' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(1000),
  },
  {
    title: 'Atualização de Documentação',
    content:
      'Atualizar a documentação da API para incluir novos endpoints e melhorar a clareza das descrições.',
    status: 'OPEN' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(105),
  },
  {
    title: 'Correção de Bug no Upload',
    content:
      'Arquivos grandes estão causando timeout durante o upload. Implementar upload em chunks para resolver.',
    status: 'OPEN' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(225),
  },
  {
    title: 'Testes de Segurança',
    content:
      'Realizar auditoria de segurança completa no sistema. Identificar vulnerabilidades e implementar correções.',
    status: 'OPEN' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(465),
  },
  {
    title: 'Implementação de Cache',
    content:
      'Implementar sistema de cache para melhorar o desempenho das requisições frequentes. Usar Redis como provedor de cache.',
    status: 'OPEN' as const,
    deadline: new Date('2025-07-16').toISOString(),
    bounty: toCent(828),
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
