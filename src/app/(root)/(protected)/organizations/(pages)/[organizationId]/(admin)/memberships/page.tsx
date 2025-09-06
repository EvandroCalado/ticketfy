import { Suspense } from 'react';

import { PageTitle } from '@/components/shared/page-title';
import { Spinner } from '@/components/shared/spinner';

import { MembershipsList } from '../../../../components/memberships-list';

type OrganizationMembershipsPageParams = {
  params: Promise<{
    organizationId: string;
  }>;
};

const OrganizationMembershipsPage = async ({
  params,
}: OrganizationMembershipsPageParams) => {
  const { organizationId } = await params;

  const breadcrumbs = [
    {
      title: 'Organização',
      href: '/organizations',
    },
    {
      title: 'Membros',
    },
  ];

  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col space-y-10'>
      <PageTitle title='Membros da Organização' breadcrumbs={breadcrumbs} />

      <Suspense
        fallback={
          <Spinner
            size='16'
            className='flex h-full flex-1 items-center justify-center'
          />
        }
      >
        <MembershipsList organizationId={organizationId} />
      </Suspense>
    </main>
  );
};

export default OrganizationMembershipsPage;
