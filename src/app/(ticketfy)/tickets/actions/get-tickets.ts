import { Ticket } from '../types/ticket';

export const initialTickets: Ticket[] = [
  {
    id: '1',
    title: 'Correção de Bug no Login',
    content:
      'Usuários estão relatando problemas ao tentar fazer login com Google. O botão não está respondendo após clicar.',
    status: 'OPEN' as const,
  },
  {
    id: '2',
    title: 'Novo Layout para Dashboard',
    content:
      'Implementar novo design do dashboard seguindo as especificações do Figma. Incluir novos widgets e melhorar a experiência de usuário.',
    status: 'IN_PROGRESS' as const,
  },
  {
    id: '3',
    title: 'Migração do Banco de Dados',
    content:
      'Planejar e executar migração do MySQL para PostgreSQL. Garantir que não haja perda de dados durante o processo.',
    status: 'DONE' as const,
  },
  {
    id: '4',
    title: 'Otimização de Performance',
    content:
      'Analisar e otimizar o carregamento da página inicial. Atualmente está demorando mais de 3 segundos para carregar em dispositivos móveis.',
    status: 'IN_PROGRESS' as const,
  },
  {
    id: '5',
    title: 'Integração com API de Pagamento',
    content:
      'Implementar integração com a API do PagSeguro para processamento de pagamentos. Garantir segurança e confiabilidade das transações.',
    status: 'OPEN' as const,
  },
  {
    id: '6',
    title: 'Correção de Bug no Filtro',
    content:
      'O filtro de data não está funcionando corretamente. Quando selecionado, não filtra os registros conforme esperado.',
    status: 'IN_PROGRESS' as const,
  },
  // {
  //   id: '7',
  //   title: 'Nova Feature - Chat Online',
  //   content:
  //     'Desenvolver chat online para suporte ao cliente. Deve incluir sistema de notificações e histórico de conversas.',
  //   status: 'OPEN' as const,
  // },
  // {
  //   id: '8',
  //   title: 'Atualização de Documentação',
  //   content:
  //     'Atualizar a documentação da API para incluir novos endpoints e melhorar a clareza das descrições.',
  //   status: 'DONE' as const,
  // },
  // {
  //   id: '9',
  //   title: 'Correção de Bug no Upload',
  //   content:
  //     'Arquivos grandes estão causando timeout durante o upload. Implementar upload em chunks para resolver.',
  //   status: 'IN_PROGRESS' as const,
  // },
  // {
  //   id: '10',
  //   title: 'Testes de Segurança',
  //   content:
  //     'Realizar auditoria de segurança completa no sistema. Identificar vulnerabilidades e implementar correções.',
  //   status: 'OPEN' as const,
  // },
  // {
  //   id: '11',
  //   title: 'Implementação de Cache',
  //   content:
  //     'Implementar sistema de cache para melhorar o desempenho das requisições frequentes. Usar Redis como provedor de cache.',
  //   status: 'IN_PROGRESS' as const,
  // },
];

export const getTickets = async (): Promise<Ticket[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return new Promise(resolve => resolve(initialTickets));
};
