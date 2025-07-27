'use client';

import { ComponentProps } from 'react';

import { useQueryState } from 'nuqs';

import { Input } from '@/components/ui/input';

import { searchParse } from '../search-params';

type TicketsSearchProps = ComponentProps<typeof Input>;

export const TicketsSearch = ({ ...props }: TicketsSearchProps) => {
  const [search, setSearch] = useQueryState('search', searchParse);

  return (
    <Input
      {...props}
      type='search'
      className='max-w-sm'
      defaultValue={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
};
