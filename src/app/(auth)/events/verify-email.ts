import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';

import { VERIFY_EMAIL_EVENT_NAME } from '../constants/verify-email-event-name';
import { generateEmailVerificationCode } from '../utils/generate-email-verification-code';
import { sendEmailVerify } from '../utils/send-email-verify';

export type VerifyEmailEventArgs = {
  data: {
    userId: string;
  };
};

export const verifyEmailEvent = inngest.createFunction(
  {
    id: 'verify-email',
  },
  {
    event: VERIFY_EMAIL_EVENT_NAME,
  },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const emailVerificationCode = await generateEmailVerificationCode(
      user.id,
      user.email,
    );

    const result = await sendEmailVerify(
      user.name,
      user.email,
      emailVerificationCode,
    );

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  },
);
