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
          <TableHead className='text-right'>Email verificado</TableHead>
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
            <TableCell className='text-right'>
              <div className='flex items-center justify-end'>
                {membership.user.emailVerified ? <CheckIcon /> : <BanIcon />}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
