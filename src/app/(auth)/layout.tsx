import { Logo } from '@/components/shared/logo';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className='relative flex min-h-screen flex-col'>
      <Logo className='absolute top-5 left-5' />
      {children}
    </main>
  );
};

export default AuthLayout;
