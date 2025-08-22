import Link from 'next/link';
import { Suspense } from 'react';

import { PageTitle } from '@/components/shared/page-title';
import { Spinner } from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { organizationCreatePath } from '@/utils/paths';

import { OrganizationList } from './organization-list';

export const Organizations = () => {
  const breadcrumbs = [
    {
      title: 'Organização',
    },
  ];

  return (
    <div className='flex flex-1 flex-col space-y-10'>
      <div className='flex items-center justify-between'>
        <PageTitle title='Minha conta' breadcrumbs={breadcrumbs} />
        <Button asChild>
          <Link href={organizationCreatePath()}>Criar organização</Link>
        </Button>
      </div>

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
