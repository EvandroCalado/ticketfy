import { requireAuth } from '@/actions/require-auth';
import { Sidebar } from '@/components/shared/sidebar';

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = await requireAuth();

  return (
    <>
      <Sidebar user={user} />
      {children}
    </>
  );
};

export default ProtectedLayout;
