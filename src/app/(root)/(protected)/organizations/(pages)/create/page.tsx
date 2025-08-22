import { FormContainer } from '@/components/shared/form-container';

import { OrganizationCreateForm } from '../../components/organization-create-form';

const CreateOrganizationPage = () => {
  return (
    <main className='max-w-5x mx-auto flex w-full flex-1 flex-col items-center justify-center'>
      <FormContainer
        title='Criar Organização'
        description='Crie uma organização para começar'
        content={
          <div className='flex flex-col gap-2'>
            <OrganizationCreateForm />
          </div>
        }
      />
    </main>
  );
};

export default CreateOrganizationPage;
