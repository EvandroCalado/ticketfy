import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '../ui/button';

type Pagination = {
  page: string;
  size: string;
};

type PaginationProps = {
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
  metadata: {
    count: number;
    hasNextPage: boolean;
  };
};

export const Pagination = ({
  pagination,
  setPagination,
  metadata,
}: PaginationProps) => {
  const startOffset = Number(pagination.page) * Number(pagination.size) + 1;
  const endOffset = startOffset - 1 + Number(pagination.size);
  const currentOffSet = Math.min(endOffset, metadata.count);

  const label = `${startOffset} - ${currentOffSet} de ${metadata.count}`;

  const handleNextPage = () => {
    setPagination({
      ...pagination,
      page: String(Number(pagination.page) + 1),
    });
  };

  const handlePreviousPage = () => {
    setPagination({
      ...pagination,
      page: String(Number(pagination.page) - 1),
    });
  };

  const nextButton = (
    <Button
      aria-label='Próxima página'
      title='Próxima página'
      size='icon'
      variant='outline'
      disabled={!metadata.hasNextPage}
      onClick={handleNextPage}
    >
      <ChevronRightIcon />
    </Button>
  );

  const prevButton = (
    <Button
      aria-label='Página anterior'
      title='Página anterior'
      size='icon'
      variant='outline'
      disabled={Number(pagination.page) < 1}
      onClick={handlePreviousPage}
    >
      <ChevronLeftIcon />
    </Button>
  );

  return (
    <div className='ml-auto flex items-center gap-2'>
      {prevButton}

      <p className='text-muted-foreground w-24 text-center'>{label}</p>

      {nextButton}
    </div>
  );
};
