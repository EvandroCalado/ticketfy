import { Separator } from '@/components/ui/separator';
import { User } from '@/generated/prisma';

type AccountInfoProps = {
  user: User;
};

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div>
      <h2 className='text-xl font-semibold'>Informações</h2>
      <Separator className='my-4' />

      <div className='space-y-2'>
        <h4 className='flex items-center gap-2'>
          <span>Usuário:</span>
          <span className='font-semibold capitalize'>{user.name}</span>
        </h4>
        <h4 className='flex items-center gap-2'>
          <span>Email:</span>
          <span className='font-semibold'>{user.email}</span>
        </h4>
        <h4 className='flex items-center gap-2'>
          <span>Criado em:</span>
          <span className='font-semibold'>
            {user.createdAt.toLocaleString('pt-BR')}
          </span>
        </h4>
      </div>
    </div>
  );
};
