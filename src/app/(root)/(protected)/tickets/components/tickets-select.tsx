'use client';

import { useQueryState } from 'nuqs';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { sortParse } from '../search-params';

export type TicketsSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type TicketsSelectProps = {
  options: TicketsSelectOption[];
};

export const TicketsSelect = ({ options }: TicketsSelectProps) => {
  const [sort, setSort] = useQueryState('sort', sortParse);

  return (
    <Select
      onValueChange={value => setSort(value)}
      defaultValue={sort}
      aria-label='Ordenar tickets'
    >
      <SelectTrigger
        className='w-[120px]'
        title='Ordenar tickets'
        aria-label='Ordenar tickets'
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        title='Ordenar tickets'
        aria-label='Ordenar tickets'
        className='w-[120px]'
      >
        {options.map(option => (
          <SelectItem
            key={option.sortValue}
            value={option.sortValue}
            title={option.label}
            aria-label={option.label}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
