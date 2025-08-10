import { cloneElement, useActionState, useState } from 'react';

import { toast } from 'sonner';

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
import { ACTION_STATE, ActionState } from '@/constants/action-state';

import { useFeedbackState } from './use-feedback-state';

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
  onSuccessRedirect?: string;
};

export const useConfirmDialog = ({
  title = 'Tem certeza?',
  description = 'Esta ação não pode ser desfeita.',
  action,
  trigger,
  onSuccessRedirect,
}: ConfirmDialogProps) => {
  const [state, formAction, isPending] = useActionState(action, ACTION_STATE);
  const [isOpen, setIsOpen] = useState(false);

  useFeedbackState(state, {
    onSuccess: () => {
      toast.success(state.message);
    },
    onError: () => {
      toast.error(state.message);
    },
    onSuccessRedirect,
  });

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
          <form action={formAction}>
            <AlertDialogAction asChild>
              <Button type='submit' variant='destructive' disabled={isPending}>
                {isPending ? 'Excluindo...' : 'Confirmar'}
              </Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [dialogTrigger, dialog] as const;
};
