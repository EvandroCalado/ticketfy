import { PageTitle } from '@/components/shared/page-title';
import { Separator } from '@/components/ui/separator';

const AccountPage = () => {
  const breadcrumbs = [
    {
      title: 'Conta',
    },
  ];

  return (
    <main className='space-y-10'>
      <PageTitle title='Minha conta' breadcrumbs={breadcrumbs} />

      <div className='mx-auto grid w-full max-w-3xl gap-8 md:grid-cols-2'>
        <div>
          <h2>Avatares</h2>
          <Separator className='my-4' />
        </div>

        <div>
          <h2>Informações</h2>
          <Separator className='my-4' />
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
