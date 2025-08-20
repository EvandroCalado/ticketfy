import { ResetPasswordForm } from '@/app/(auth)/components/reset-password-form';
import { FormContainer } from '@/components/shared/form-container';

type ResetPasswordPageParams = {
  params: Promise<{ tokenId: string }>;
};

const ResetPasswordPage = async ({ params }: ResetPasswordPageParams) => {
  const { tokenId } = await params;

  return (
    <main className='flex flex-1 items-center justify-center p-5'>
      <FormContainer
        title='Redefinir senha'
        description='Entre com o email para redefinir a senha'
        content={<ResetPasswordForm tokenId={tokenId} />}
      />
    </main>
  );
};

export default ResetPasswordPage;
