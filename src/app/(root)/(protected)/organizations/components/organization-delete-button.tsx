'use client';

import { Button } from '@/components/ui/button';
import { useConfirmDialog } from '@/hooks/use-confirm-dialog';
import { TrashIcon } from '@/icons';
import { organizationPath } from '@/utils/paths';

import { deleteOrganization } from '../actions/delete-organization';

type OrganizationDeleteButtonProps = {
  organizationId: string;
};

export const OrganizationDeleteButton = ({
  organizationId,
}: OrganizationDeleteButtonProps) => {
  const [dialogTrigger, dialog] = useConfirmDialog({
    action: deleteOrganization.bind(null, organizationId),
    trigger: (
      <Button variant='destructive' size='icon'>
        <TrashIcon />
      </Button>
    ),
    onSuccessRedirect: organizationPath(),
  });

  return (
    <>
      {dialogTrigger}
      {dialog}
    </>
  );
};
