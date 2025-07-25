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
    <div className='flex flex-1'>
      <div className='relative flex items-center justify-center md:p-5'>
        <Sidebar user={user} />
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  );
};

export default ProtectedLayout;
