import { Metadata } from 'next';

import { Organizations } from './components/organizations';

export const metadata: Metadata = {
  title: 'Organização',
};

const OrganizationsPage = async () => {
  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col'>
      <Organizations />
    </main>
  );
};

export default OrganizationsPage;
