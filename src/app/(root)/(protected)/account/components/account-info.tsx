import { Separator } from '@/components/ui/separator';
import { User } from '@/generated/prisma';

type AccountInfoProps = {
  user: User;
};

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <div className='animate-fade-from-top'>
      <h2 className='text-xl font-semibold'>Dados do usuário</h2>
      <Separator className='my-4' />

      <div className='space-y-2'>
        <h3 className='flex items-center gap-2'>
          <span>Usuário:</span>
          <span className='font-semibold capitalize'>{user.name}</span>
        </h3>
        <p className='flex items-center gap-2'>
          <span>Email:</span>
          <span className='font-semibold'>{user.email}</span>
        </p>
        <p className='flex items-center gap-2'>
          <span>Criado em:</span>
          <span className='font-semibold'>
            {user.createdAt.toLocaleString('pt-BR')}
          </span>
        </p>
      </div>
    </div>
  );
};
