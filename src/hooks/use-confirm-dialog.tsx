import { cloneElement, useActionState, useState } from 'react';

import { Form } from '@/components/shared/form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  INITIAL_ACTION_STATE,
  InitialActionsState,
} from '@/constants/initial-create-state';

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  action: (
    prevState: InitialActionsState,
    formData: FormData,
  ) => Promise<InitialActionsState>;
  trigger: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
};

export const useConfirmDialog = ({
  title = 'Tem certeza?',
  description = 'Esta ação não pode ser desfeita.',
  action,
  trigger,
}: ConfirmDialogProps) => {
  const [state, dispatch, isPending] = useActionState(
    action,
    INITIAL_ACTION_STATE,
  );
  const [isOpen, setIsOpen] = useState(false);

  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen(prev => !prev),
  });

  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form state={state} action={dispatch}>
            <AlertDialogAction asChild>
              <Button type='submit' variant='destructive' disabled={isPending}>
                {isPending ? 'Excluindo...' : 'Confirmar'}
              </Button>
            </AlertDialogAction>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
};
