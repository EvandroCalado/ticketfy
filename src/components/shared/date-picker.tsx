'use client';

import { useState } from 'react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type DatePickerProps = {
  id: string;
  name: string;
  defaultValue?: string | undefined;
};

export const DatePicker = ({ id, name, defaultValue }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined,
  );

  const formatStringDate = date ? (
    format(date, 'dd-MM-yyyy')
  ) : (
    <span>Selecione uma data</span>
  );

  return (
    <Popover>
      <PopoverTrigger id={id} asChild>
        <Button
          variant='outline'
          data-empty={!date}
          className='data-[empty=true]:text-muted-foreground/40 w-full justify-start text-left font-normal'
        >
          <CalendarIcon />
          {formatStringDate}
          <input type='hidden' name={name} value={date?.toISOString() || ''} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
};
