'use client';

import { ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';

import { Loader2Icon } from 'lucide-react';

import { Button } from '../ui/button';

type SubmitButtonProps = ComponentProps<typeof Button>;

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' {...props} disabled={pending}>
      {pending && <Loader2Icon className='animate-spin' />}
      {children}
    </Button>
  );
};
