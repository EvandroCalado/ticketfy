import Link from 'next/link';

import { FormContainer } from '@/components/shared/form-container';

import { SignUpForm } from './components/sign-up-form';

const SignUpPage = () => {
  return (
    <main className='flex flex-1 items-center justify-center p-5'>
      <FormContainer
        title='Cadastro'
        description='Crie sua conta para começar'
        content={<SignUpForm />}
        footer={
          <span className='text-muted-foreground/40 text-center text-sm'>
            Já tem uma conta?{' '}
            <Link
              href='/sign-in'
              className='text-primary hover:underline hover:underline-offset-4'
            >
              Faça login
            </Link>
          </span>
        }
      />
    </main>
  );
};

export default SignUpPage;
