import { notFound } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import { PageTitle } from '@/components/shared/page-title';

import { AccountAvatars } from './account-avatars';
import { AccountInfo } from './account-info';

export const Account = async () => {
  const { user } = await getAuth();

  if (!user) notFound();

  const breadcrumbs = [
    {
      title: 'Conta',
    },
  ];

  return (
    <div className='animate-fade-from-top'>
      <PageTitle title='Minha conta' breadcrumbs={breadcrumbs} />

      <div className='grid gap-8 md:grid-cols-2'>
        <AccountAvatars />
        <AccountInfo user={user} />
      </div>
    </div>
  );
};
