import { redirect } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { signInPath } from '@/utils/paths';

const ProtectedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = await getAuth();

  if (!user) redirect(signInPath());

  return <>{children}</>;
};

export default ProtectedLayout;
