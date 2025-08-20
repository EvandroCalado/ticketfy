import EmailVerifyCode from '@/components/email/email-verify-code';
import { resend } from '@/lib/resend';

export const sendEmailVerify = async (
  name: string,
  email: string,
  code: string,
) => {
  return await resend.emails.send({
    from: 'no-reply@evandrocalado.blog',
    to: email,
    subject: 'Verifique seu email',
    react: <EmailVerifyCode toName={name} code={code} />,
  });
};
