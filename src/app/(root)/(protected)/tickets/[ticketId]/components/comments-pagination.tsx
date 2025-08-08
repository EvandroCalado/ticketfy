import { useQueryStates } from 'nuqs';

import { Pagination } from '@/components/shared/pagination';

import { paginationOptions, paginationParse } from '../../search-params';

type CommentsPaginationProps = {
  metadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const CommentsPagination = ({ metadata }: CommentsPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParse,
    paginationOptions,
  );

  if (metadata.count <= 6) return null;

  return (
    <Pagination
      pagination={pagination}
      setPagination={setPagination}
      metadata={metadata}
    />
  );
};
