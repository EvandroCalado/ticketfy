'use client';

import { useQueryStates } from 'nuqs';

import { Pagination } from '@/components/shared/pagination';

import { paginationOptions, paginationParse } from '../search-params';

export const TicketsPagination = () => {
  const [pagination, setPagination] = useQueryStates(
    paginationParse,
    paginationOptions,
  );

  return <Pagination pagination={pagination} setPagination={setPagination} />;
};
