import { FormContainer } from '@/components/shared/form-container';

import { SignInForm } from './components/sign-in-form';

const SignUpPage = () => {
  return (
    <main className='flex flex-1 items-center justify-center p-5'>
      <FormContainer
        title='Cadastro'
        description='Crie sua conta para começar'
        link='/sign-in'
        LinkText='Já tem uma conta? Faça login'
      >
        <SignInForm />
      </FormContainer>
    </main>
  );
};

export default SignUpPage;
