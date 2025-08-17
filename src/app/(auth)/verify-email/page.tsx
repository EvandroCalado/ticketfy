import { FormContainer } from '@/components/shared/form-container';

import { VerifyEmailForm } from './components/verify-email-form';
import { VerifyEmailResendForm } from './components/verify-email-resend-form';

const VerifyEmail = () => {
  return (
    <main className='flex flex-1 items-center justify-center p-5'>
      <FormContainer
        title='Verificar email'
        description='Verifique o email para ativar a sua conta'
        content={
          <div>
            <VerifyEmailForm />
            <VerifyEmailResendForm />
          </div>
        }
      />
    </main>
  );
};

export default VerifyEmail;
