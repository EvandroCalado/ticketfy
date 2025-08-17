import {
  Body,
  Container,
  Head,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

type EmailVerifyCodeProps = {
  toName: string;
  code: string;
};

const EmailVerifyCode = ({ toName, code }: EmailVerifyCodeProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className='m-8 text-center font-sans'>
          <Container>
            <Section className='flex w-full items-center justify-center'>
              <Text>Olá {toName}, Abaixo está seu código de verificação:</Text>
            </Section>
            <Section className='flex w-full items-center justify-center'>
              <Text className='w-fit rounded-md bg-[#6750a4] px-4 py-2 text-center text-lg font-semibold text-white'>
                {code}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailVerifyCode.PreviewProps = {
  toName: 'John Doe',
  code: '123456',
} as EmailVerifyCodeProps;

export default EmailVerifyCode;
