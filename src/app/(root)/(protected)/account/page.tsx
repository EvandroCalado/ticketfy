import { Metadata } from 'next';
import { Suspense } from 'react';

import { Spinner } from '@/components/shared/spinner';

import { Account } from './components/account';

export const metadata: Metadata = {
  title: 'Minha conta',
};

const AccountPage = () => {
  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col space-y-10'>
      <Suspense
        fallback={
          <Spinner
            size='16'
            className='flex h-full flex-1 items-center justify-center'
          />
        }
      >
        <Account />
      </Suspense>
    </main>
  );
};

export default AccountPage;
