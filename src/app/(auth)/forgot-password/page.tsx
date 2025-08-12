import { FormContainer } from '@/components/shared/form-container';

import { ForgotPasswordForm } from './components/forgot-password-form';

const ForgotPasswordPage = () => {
  return (
    <main className='flex flex-1 items-center justify-center p-5'>
      <FormContainer
        title='Recuperar senha'
        description='Entre com o email para recuperar a senha'
        content={<ForgotPasswordForm />}
      />
    </main>
  );
};

export default ForgotPasswordPage;
