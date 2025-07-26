import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { Sidebar } from '@/components/shared/sidebar';
import { signInPath } from '@/utils/paths';

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  return (
    <>
      <Sidebar user={user} />
      {children}
    </>
  );
};

export default ProtectedLayout;
