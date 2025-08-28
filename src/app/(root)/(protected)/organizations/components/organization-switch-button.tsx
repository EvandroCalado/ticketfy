'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { ACTION_STATE } from '@/constants/action-state';
import { ArrowRightLeftIcon, Loader2Icon } from '@/icons';
import { organizationPath } from '@/utils/paths';

import { switchOrganization } from '../actions/switch-organization';

type OrganizationSwitchButtonProps = {
  organizationId: string;
  isActive?: boolean;
  hasActive?: boolean;
};

export const OrganizationSwitchButton = ({
  organizationId,
  isActive,
  hasActive,
}: OrganizationSwitchButtonProps) => {
  const [state, formAction, isPending] = useActionState(
    switchOrganization.bind(null, organizationId),
    ACTION_STATE,
  );

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.refresh();

      if (!hasActive) {
        router.push(organizationPath());
        router.refresh();
      }
    }

    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router, hasActive]);

  return (
    <form className='inline-block' action={formAction}>
      <Button
        type='submit'
        variant={!hasActive ? 'secondary' : isActive ? 'default' : 'outline'}
        disabled={isPending}
        className='w-24'
      >
        {isPending ? (
          <Loader2Icon className='animate-spin' />
        ) : (
          <ArrowRightLeftIcon />
        )}
        {!hasActive ? 'Ativar' : isActive ? 'Ativa' : 'Mudar'}
      </Button>
    </form>
  );
};
