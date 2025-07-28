'use client';

import { useQueryStates } from 'nuqs';

import { Pagination } from '@/components/shared/pagination';

import { paginationOptions, paginationParse } from '../search-params';

type TicketsPaginationProps = {
  metadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const TicketsPagination = ({ metadata }: TicketsPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParse,
    paginationOptions,
  );

  return (
    <Pagination
      pagination={pagination}
      setPagination={setPagination}
      metadata={metadata}
    />
  );
};
