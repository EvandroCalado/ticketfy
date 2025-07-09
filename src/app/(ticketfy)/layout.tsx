import { Header } from '@/components/shared/header';

const TicketfyLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default TicketfyLayout;
