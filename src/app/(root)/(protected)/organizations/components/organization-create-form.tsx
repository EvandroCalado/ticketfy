'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ACTION_STATE } from '@/constants/action-state';
import { organizationPath } from '@/utils/paths';

import { createOrganization } from '../actions/create-organization';

export const OrganizationCreateForm = () => {
  const [state, formAction, isPending] = useActionState(
    createOrganization,
    ACTION_STATE,
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(organizationPath());
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='relative'>
        <Label htmlFor='name' className='mb-1'>
          Nome
        </Label>
        <Input name='name' id='name' />

        {state.fieldErrors?.name && (
          <span className='absolute -bottom-4 left-0 text-xs font-semibold text-red-500'>
            {state.fieldErrors.name}
          </span>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isPending}>
        {isPending ? 'Criando...' : 'Criar'}
      </Button>
    </form>
  );
};
