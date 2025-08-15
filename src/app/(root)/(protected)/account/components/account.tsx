import { notFound } from 'next/navigation';

import { getAuth } from '@/actions/get-auth';
import {
  LazyTabs as Tabs,
  LazyTabsContent as TabsContent,
  LazyTabsList as TabsList,
  LazyTabsTrigger as TabsTrigger,
} from '@/components/shared/lazy-tabs';
import { PageTitle } from '@/components/shared/page-title';

import { AccountAvatars } from './account-avatars';
import { AccountInfo } from './account-info';
import { AccountPassword } from './account-password';

export const Account = async () => {
  const { user } = await getAuth();

  if (!user) notFound();

  const breadcrumbs = [
    {
      title: 'Conta',
    },
  ];

  return (
    <div className='animate-fade-from-top flex flex-1 flex-col space-y-10'>
      <PageTitle title='Minha conta' breadcrumbs={breadcrumbs} />

      <Tabs defaultValue='avatars' className='flex flex-1 flex-col'>
        <TabsList>
          <TabsTrigger value='avatars'>Avatares</TabsTrigger>
          <TabsTrigger value='info'>Informações</TabsTrigger>
          <TabsTrigger value='password'>Senha</TabsTrigger>
        </TabsList>
        <TabsContent value='avatars' className='flex flex-1 flex-col pt-5'>
          <AccountAvatars />
        </TabsContent>
        <TabsContent value='info' className='flex flex-1 flex-col pt-5'>
          <AccountInfo user={user} />
        </TabsContent>
        <TabsContent value='password' className='flex flex-1 flex-col pt-5'>
          <AccountPassword />
        </TabsContent>
      </Tabs>
    </div>
  );
};
