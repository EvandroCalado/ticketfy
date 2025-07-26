import { Footer } from '@/components/shared/footer';
import { Header } from '@/components/shared/header';

const TicketfyLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='relative flex min-h-screen flex-col pt-[96px]'>
      <Header />
      <div className='flex flex-1 flex-col'>{children}</div>
      <Footer />
    </main>
  );
};

export default TicketfyLayout;
