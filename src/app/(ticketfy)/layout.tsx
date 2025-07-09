import { Header } from '@/components/shared/header';

const TicketfyLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='flex min-h-screen flex-col'>
      <Header />
      {children}
    </main>
  );
};

export default TicketfyLayout;
