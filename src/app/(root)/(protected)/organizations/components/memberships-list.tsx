import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BanIcon, CheckIcon } from '@/icons';
import { formatDate } from '@/utils/format-date';

import { getMemberships } from '../actions/get-memberships';
import { Members } from '../constants/members';
import { MembershipDeleteButton } from './membership-delete-button';

type MembershipsListProps = {
  organizationId: string;
};

export const MembershipsList = async ({
  organizationId,
}: MembershipsListProps) => {
  const memberships = await getMemberships(organizationId);

  return (
    <Table>
      <TableCaption>Lista de membros.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Entrou em</TableHead>
          <TableHead>Função</TableHead>
          <TableHead>Email verificado</TableHead>
          <TableHead className='text-right'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {memberships.map(membership => (
          <TableRow key={membership.userId}>
            <TableCell className='font-medium capitalize'>
              {membership.user.name}
            </TableCell>
            <TableCell>{membership.user.email}</TableCell>
            <TableCell>{formatDate(membership.joinedAt.toString())}</TableCell>
            <TableCell>
              {Members[membership.membershipRole as keyof typeof Members]}
            </TableCell>
            <TableCell className='flex items-center gap-2'>
              <div className='flex items-center justify-end'>
                {membership.user.emailVerified ? <CheckIcon /> : <BanIcon />}
              </div>
            </TableCell>
            <TableCell className='text-right'>
              <MembershipDeleteButton
                userId={membership.userId}
                organizationId={organizationId}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
