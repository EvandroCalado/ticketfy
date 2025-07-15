'use client';

import { useFormStatus } from 'react-dom';

import { Loader2Icon, SaveAllIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      className='mt-4 w-full'
      aria-label='Salvar ticket'
      title='Salvar ticket'
      disabled={pending}
    >
      {pending ? <Loader2Icon className='animate-spin' /> : <SaveAllIcon />}
      {pending ? 'Enviando...' : 'Enviar'}
    </Button>
  );
};
