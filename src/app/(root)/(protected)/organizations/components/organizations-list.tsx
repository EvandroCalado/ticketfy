import Link from 'next/link';

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
import { membershipsPath } from '@/utils/paths';

import { getOrganizationByUser } from '../actions/get-organization-by-user';
import { Members } from '../constants/members';
import { MembershipDeleteButton } from './membership-delete-button';
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
          <TableHead>Minha função</TableHead>
          <TableHead className='text-right'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map(org => {
          const isActive = org.membershipByUser.isActive;
          const isAdmin = org.membershipByUser.membershipRole === 'ADMIN';

          const switchButton = (
            <OrganizationSwitchButton
              organizationId={org.id}
              isActive={isActive}
              hasActive={hasActive}
            />
          );

          const detailButton = (
            <Button variant={'outline'} size='icon' asChild>
              <Link href={membershipsPath(org.id)}>
                <SquareArrowOutUpRightIcon />
              </Link>
            </Button>
          );

          const editButton = (
            <Button variant={'outline'} size='icon'>
              <SquarePenIcon />
            </Button>
          );

          const membershipDeleteButton = (
            <MembershipDeleteButton
              userId={org.membershipByUser.userId}
              organizationId={org.id}
            />
          );

          const organizationDeleteButton = (
            <OrganizationDeleteButton organizationId={org.id} />
          );

          const disabledButton = (
            <Button size='icon' disabled className='disabled:opacity-0' />
          );

          const buttons = (
            <>
              {switchButton}
              {isAdmin ? detailButton : disabledButton}
              {isAdmin ? editButton : disabledButton}
              {membershipDeleteButton}
              {isAdmin ? organizationDeleteButton : disabledButton}
            </>
          );

          return (
            <TableRow key={org.id}>
              <TableCell className='font-medium'>{org.id}</TableCell>
              <TableCell>{org.name}</TableCell>
              <TableCell>
                {formatDate(org.membershipByUser.joinedAt.toString())}
              </TableCell>
              <TableCell>{org._count.membership}</TableCell>
              <TableCell>
                {
                  Members[
                    org.membershipByUser.membershipRole as keyof typeof Members
                  ]
                }
              </TableCell>
              <TableCell className='space-x-2 text-right'>{buttons}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
