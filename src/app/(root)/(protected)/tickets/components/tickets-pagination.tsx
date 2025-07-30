'use client';

import { useEffect, useRef } from 'react';

import { useQueryState, useQueryStates } from 'nuqs';

import { Pagination } from '@/components/shared/pagination';

import {
  paginationOptions,
  paginationParse,
  searchParse,
} from '../search-params';

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

  const [search] = useQueryState('search', searchParse);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) return;

    prevSearch.current = search;

    setPagination({
      ...pagination,
      page: '0',
    });
  }, [search, pagination, setPagination]);

  return (
    <Pagination
      pagination={pagination}
      setPagination={setPagination}
      metadata={metadata}
    />
  );
};
