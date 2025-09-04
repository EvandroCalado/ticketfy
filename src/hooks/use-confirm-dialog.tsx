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

/**
 * Propriedades do hook useConfirmDialog
 */
type ConfirmDialogProps = {
  /** Título do dialog de confirmação */
  title?: string;
  /** Descrição/mensagem do dialog de confirmação */
  description?: string;
  /** Server action que será executada após confirmação */
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  /**
   * Elemento trigger ou função que retorna o trigger.
   * Se for função, recebe o estado isPending como parâmetro
   */
  trigger:
    | React.ReactElement<{ onClick?: React.MouseEventHandler }>
    | ((
        isPending: boolean,
      ) => React.ReactElement<{ onClick?: React.MouseEventHandler }>);
  /** URL para redirecionamento após sucesso da ação */
  onSuccessRedirect?: string;
};

/**
 * Hook customizado para criar dialogs de confirmação com server actions
 *
 * @description
 * Este hook facilita a criação de dialogs de confirmação que executam server actions.
 * Ele gerencia automaticamente o estado do dialog, execução da ação, feedback visual
 * com toasts e redirecionamento após sucesso.
 *
 * @example
 * ```tsx
 * const [dialogTrigger, dialog] = useConfirmDialog({
 *   title: 'Excluir item',
 *   description: 'Tem certeza que deseja excluir este item?',
 *   action: deleteItemAction,
 *   trigger: <Button variant="destructive">Excluir</Button>,
 *   onSuccessRedirect: '/items'
 * });
 *
 * return (
 *   <>
 *     {dialogTrigger}
 *     {dialog}
 *   </>
 * );
 * ```
 *
 * @example
 * ```tsx
 * // Usando trigger como função para acessar isPending
 * const [dialogTrigger, dialog] = useConfirmDialog({
 *   action: deleteAction,
 *   trigger: (isPending) => (
 *     <Button disabled={isPending}>
 *       {isPending ? 'Excluindo...' : 'Excluir'}
 *     </Button>
 *   )
 * });
 * ```
 *
 * @param props - Configurações do dialog de confirmação
 * @returns Tuple contendo [dialogTrigger, dialog] - o elemento trigger e o componente dialog
 */
export const useConfirmDialog = ({
  title = 'Tem certeza?',
  description = 'Esta ação não pode ser desfeita.',
  action,
  trigger,
  onSuccessRedirect,
}: ConfirmDialogProps): [
  dialogTrigger: React.ReactElement,
  dialog: React.ReactElement,
] => {
  // Gerencia o estado da server action (pending, success, error)
  const [state, formAction, isPending] = useActionState(action, ACTION_STATE);

  // Controla se o dialog está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  // Gerencia feedback visual (toasts) e redirecionamento após ações
  useFeedbackState(state, {
    onSuccess: () => {
      toast.success(state.message);
    },
    onError: () => {
      toast.error(state.message);
    },
    onSuccessRedirect,
  });

  // Clona o elemento trigger adicionando o handler onClick para abrir o dialog
  const dialogTrigger = cloneElement(
    typeof trigger === 'function' ? trigger(isPending) : trigger,
    {
      onClick: () => setIsOpen(prev => !prev),
    },
  );

  // Componente do dialog de confirmação com formulário para executar a server action
  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='w-28'>Cancel</AlertDialogCancel>
          <form action={formAction}>
            <AlertDialogAction asChild>
              <Button
                type='submit'
                variant='destructive'
                className='w-28'
                disabled={isPending}
              >
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
