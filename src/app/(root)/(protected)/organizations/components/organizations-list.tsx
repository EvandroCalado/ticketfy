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
import {
  ArrowRightLeftIcon,
  SquareArrowOutUpRightIcon,
  SquarePenIcon,
  TrashIcon,
} from '@/icons';
import { formatDate } from '@/utils/format-date';

import { getOrganizationByUser } from '../actions/get-organization-by-user';

export const OrganizationsList = async () => {
  const organizations = await getOrganizationByUser();

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
              <Button variant={'outline'} size='icon'>
                <ArrowRightLeftIcon />
              </Button>

              <Button variant={'outline'} size='icon'>
                <SquareArrowOutUpRightIcon />
              </Button>

              <Button variant={'outline'} size='icon'>
                <SquarePenIcon />
              </Button>

              <Button variant='destructive' size='icon'>
                <TrashIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
