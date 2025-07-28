import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export const AccountInfo = () => {
  return (
    <div>
      <h2 className='text-xl font-semibold'>Informações</h2>
      <Separator className='my-4' />

      <form className='space-y-4'>
        <div>
          <Label htmlFor='username' className='mb-1'>
            Usuário
          </Label>
          <Input id='username' name='username' />
        </div>

        <div>
          <Label htmlFor='email' className='mb-1'>
            Email
          </Label>
          <Input id='email' name='email' type='email' disabled />
        </div>

        <div>
          <Label htmlFor='password' className='mb-1'>
            Senha
          </Label>
          <Input id='password' name='password' type='password' />
        </div>

        <Button type='submit' className='mt-4'>
          Salvar
        </Button>
      </form>
    </div>
  );
};
