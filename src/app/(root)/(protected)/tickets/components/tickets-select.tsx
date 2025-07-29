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
      aria-label='Ordenar'
    >
      <SelectTrigger className='w-[120px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
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
