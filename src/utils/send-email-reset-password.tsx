import EmailPasswordReset from '@/components/email/email-password-reset';
import { resend } from '@/lib/resend';

export const sendEmailResetPassword = async (
  name: string,
  email: string,
  resetPasswordLink: string,
) => {
  return await resend.emails.send({
    from: 'no-reply@evandrocalado.blog',
    to: email,
    subject: 'Redefinição de senha',
    react: <EmailPasswordReset toName={name} url={resetPasswordLink} />,
  });
};
