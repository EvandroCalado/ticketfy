import { useRouter } from 'next/navigation';
import { cloneElement, useActionState, useEffect, useState } from 'react';

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
import { ticketsPath } from '@/utils/paths';

type ConfirmDialogProps = {
  title?: string;
  description?: string;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  trigger: React.ReactElement<{ onClick?: React.MouseEventHandler }>;
};

export const useConfirmDialog = ({
  title = 'Tem certeza?',
  description = 'Esta ação não pode ser desfeita.',
  action,
  trigger,
}: ConfirmDialogProps) => {
  const [state, formAction, isPending] = useActionState(action, ACTION_STATE);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push(ticketsPath());
    }

    if (!state.success && state.message) {
      toast.error(state.message);
      router.refresh();
    }
  }, [router, state.message, state.success]);

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
