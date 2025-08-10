import { useQueryStates } from 'nuqs';

import { Pagination } from '@/components/shared/pagination';

import {
  commentsPaginationParse,
  paginationOptions,
} from '../../search-params';

type CommentsPaginationProps = {
  metadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const CommentsPagination = ({ metadata }: CommentsPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    commentsPaginationParse,
    paginationOptions,
  );

  if (metadata.count <= 2) return null;

  return (
    <Pagination
      pagination={pagination}
      setPagination={setPagination}
      metadata={metadata}
    />
  );
};
