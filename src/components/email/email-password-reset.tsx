import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

type EmailPasswordResetProps = {
  toName: string;
  url: string;
};

const EmailPasswordReset = ({ toName, url }: EmailPasswordResetProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className='m-8 text-center font-sans'>
          <Container>
            <Section>
              <Text>
                Olá {toName}, você solicitou a redefinição de senha. Por favor,
                clique no botão abaixo para redefinir sua senha.
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className='cursor-pointer rounded-md bg-[#6750a4] px-4 py-2 text-white'
              >
                Redefinir senha
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailPasswordReset.PreviewProps = {
  toName: 'John Doe',
  url: 'http://localhost:3000/reset-password/1234567890',
};

export default EmailPasswordReset;
