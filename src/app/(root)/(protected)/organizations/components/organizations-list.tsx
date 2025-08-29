import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SquareArrowOutUpRightIcon, SquarePenIcon } from '@/icons';
import { formatDate } from '@/utils/format-date';

import { getOrganizationByUser } from '../actions/get-organization-by-user';
import { OrganizationDeleteButton } from './organization-delete-button';
import { OrganizationSwitchButton } from './organization-switch-button';

export const OrganizationsList = async () => {
  const organizations = await getOrganizationByUser();

  const hasActive = organizations.some(org => org.membershipByUser.isActive);

  return (
    <Table>
      <TableCaption>Lista de organizações.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Entrou em</TableHead>
          <TableHead>Membros</TableHead>
          <TableHead className='text-right'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map(org => (
          <TableRow key={org.id}>
            <TableCell className='font-medium'>{org.id}</TableCell>
            <TableCell>{org.name}</TableCell>
            <TableCell>
              {formatDate(org.membershipByUser.joinedAt.toString())}
            </TableCell>
            <TableCell>{org._count.membership}</TableCell>
            <TableCell className='space-x-2 text-right'>
              <OrganizationSwitchButton
                organizationId={org.id}
                isActive={org.membershipByUser.isActive}
                hasActive={hasActive}
              />

              <Button variant={'outline'} size='icon'>
                <SquareArrowOutUpRightIcon />
              </Button>

              <Button variant={'outline'} size='icon'>
                <SquarePenIcon />
              </Button>

              <OrganizationDeleteButton organizationId={org.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
