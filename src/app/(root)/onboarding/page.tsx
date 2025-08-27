import { FormContainer } from '@/components/shared/form-container';

import { OrganizationCreateForm } from '../(protected)/organizations/components/organization-create-form';

const OnboardingPage = () => {
  return (
    <main className='mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center'>
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

export default OnboardingPage;
