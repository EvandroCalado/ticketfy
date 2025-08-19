import { formatDate } from '@/utils/format-date';

import { getOrganizationByUser } from '../actions/get-organization-by-user';

export const OrganizationList = async () => {
  const organizations = await getOrganizationByUser();

  return (
    <div>
      {organizations.map(organization => (
        <div key={organization.id}>
          <div>Nome: {organization.name}</div>
          <div>
            Juntou-se em:{' '}
            {formatDate(organization.membershipByUser.joinedAt.toString())}
          </div>
          <div>Membros: {organization._count.membership}</div>
        </div>
      ))}
    </div>
  );
};
