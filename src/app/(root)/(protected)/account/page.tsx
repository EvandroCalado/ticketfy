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
    <main className='space-y-10'>
      <PageTitle title='Minha conta' breadcrumbs={breadcrumbs} />

      <div className='mx-auto grid w-full max-w-3xl gap-8 md:grid-cols-2'>
        <AccountAvatars />
        <AccountInfo />
      </div>
    </main>
  );
};

export default AccountPage;
