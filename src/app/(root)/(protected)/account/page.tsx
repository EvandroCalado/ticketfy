import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { PageTitle } from '@/components/shared/page-title';

import { AccountAvatars } from './components/account-avatars';
import { AccountInfo } from './components/account-info';

export const metadata: Metadata = {
  title: 'Minha conta',
};

const AccountPage = async () => {
  const { user } = await getAuth();

  if (!user) notFound();

  const breadcrumbs = [
    {
      title: 'Conta',
    },
  ];

  return (
    <main className='mx-auto w-full max-w-5xl space-y-10'>
      <PageTitle title='Minha conta' breadcrumbs={breadcrumbs} />

      <div className='grid gap-8 md:grid-cols-2'>
        <AccountAvatars />
        <AccountInfo user={user} />
      </div>
    </main>
  );
};

export default AccountPage;
