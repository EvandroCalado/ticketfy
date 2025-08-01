import { PageTitle } from '@/components/shared/page-title';

import { AccountAvatars } from './components/account-avatars';
import { AccountInfo } from './components/account-info';

const AccountPage = () => {
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
        <AccountInfo />
      </div>
    </main>
  );
};

export default AccountPage;
