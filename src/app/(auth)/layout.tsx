import { Logo } from '@/components/shared/logo';

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='relative flex min-h-screen flex-col'>
      <Logo className='absolute top-5 left-5' />
      {children}
    </main>
  );
};

export default AuthLayout;
