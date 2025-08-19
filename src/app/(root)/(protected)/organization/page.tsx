import { Metadata } from 'next';

import { Organization } from './components/organization';

export const metadata: Metadata = {
  title: 'Organização',
};

const OrganizationPage = async () => {
  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col'>
      <Organization />
    </main>
  );
};

export default OrganizationPage;
