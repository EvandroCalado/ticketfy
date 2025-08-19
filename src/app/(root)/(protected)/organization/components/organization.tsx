import { Suspense } from 'react';

import { PageTitle } from '@/components/shared/page-title';
import { Spinner } from '@/components/shared/spinner';

import { OrganizationList } from './organization-list';

export const Organization = () => {
  const breadcrumbs = [
    {
      title: 'Organização',
    },
  ];

  return (
    <div className='flex flex-1 flex-col space-y-10'>
      <PageTitle title='Minha conta' breadcrumbs={breadcrumbs} />

      <Suspense
        fallback={
          <Spinner
            size='16'
            className='flex h-full flex-1 items-center justify-center'
          />
        }
      >
        <OrganizationList />
      </Suspense>
    </div>
  );
};
