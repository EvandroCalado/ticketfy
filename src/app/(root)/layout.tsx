import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';

const TicketfyLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='flex min-h-screen flex-col pt-[76px]'>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default TicketfyLayout;
