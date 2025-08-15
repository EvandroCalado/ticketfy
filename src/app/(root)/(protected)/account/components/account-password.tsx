import { FormContainer } from '@/components/shared/form-container';
import { Separator } from '@/components/ui/separator';

import { ChangePasswordForm } from './change-password-form';

export const AccountPassword = () => {
  return (
    <div className='animate-fade-from-top flex flex-1 flex-col'>
      <h2 className='text-xl font-semibold'>Redefina a sua senha</h2>
      <Separator className='my-4' />

      <div className='flex flex-1 items-center justify-center'>
        <FormContainer
          title='Redefinir senha'
          description='Entre com a senha atual para criar uma nova'
          content={<ChangePasswordForm />}
        />
      </div>
    </div>
  );
};
