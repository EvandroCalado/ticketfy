import Link from 'next/link';

import { FormContainer } from '@/components/shared/form-container';

import { SignInForm } from './components/sign-in-form';

const SignInPage = () => {
  return (
    <main className='flex flex-1 items-center justify-center p-5'>
      <FormContainer
        title='Entrar'
        description='Faça login para começar'
        content={<SignInForm />}
        footer={
          <span className='text-muted-foreground/40 text-center text-sm'>
            Não tem uma conta?{' '}
            <Link
              href='/sign-up'
              className='text-primary hover:underline hover:underline-offset-4'
            >
              Cadastre-se
            </Link>
          </span>
        }
      />
    </main>
  );
};

export default SignInPage;
