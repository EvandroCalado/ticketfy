import Link from 'next/link';
import { Suspense } from 'react';

import { PageTitle } from '@/components/shared/page-title';
import { Spinner } from '@/components/shared/spinner';
import { Button } from '@/components/ui/button';
import { onboardingPath } from '@/utils/paths';

import { OrganizationsList } from '../../(protected)/organizations/components/organizations-list';

const SelectActiveOrganizationPage = () => {
  const breadcrumbs = [
    {
      title: 'Selecionar uma organização',
    },
  ];

  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col space-y-10'>
      <div className='flex items-center justify-between'>
        <PageTitle title='Selecionar Organizações' breadcrumbs={breadcrumbs} />
        <Button asChild>
          <Link href={onboardingPath()}>Criar organização</Link>
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
        <OrganizationsList />
      </Suspense>
    </main>
  );
};

export default SelectActiveOrganizationPage;
