'use client';

import { Button } from '@/components/ui/button';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { Loader2Icon, TrashIcon } from '@/icons';
import { membershipsPath } from '@/utils/paths';

import { deleteMembership } from '../actions/delete-membership';

type MembershipDeleteButtonProps = {
  userId: string;
  organizationId: string;
};

export const MembershipDeleteButton = ({
  userId,
  organizationId,
}: MembershipDeleteButtonProps) => {
  const [dialogTrigger, dialog] = useConfirmDialog({
    action: deleteMembership.bind(null, userId, organizationId),
    trigger: isPending => (
      <Button variant='destructive' size='icon'>
        {isPending ? <Loader2Icon className='animate-spin' /> : <TrashIcon />}
      </Button>
    ),
    onSuccessRedirect: membershipsPath(organizationId),
  });

  return (
    <>
      {dialogTrigger}
      {dialog}
    </>
  );
};
