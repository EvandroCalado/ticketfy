import { inngest } from '@/lib/inngest';
import { prisma } from '@/lib/prisma';
import { sendEmailResetPassword } from '@/utils/send-email-reset-password';

import { RESET_PASSWORD_EVENT_NAME } from '../constants/reset-password-event-name';
import { generatePasswordResetLink } from '../utils/generate-password-reset-link';

export type ResetPasswordEventArgs = {
  data: {
    userId: string;
  };
};

export const resetPasswordEvent = inngest.createFunction(
  { id: 'reset-password' },
  { event: RESET_PASSWORD_EVENT_NAME },
  async ({ event }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const passwordResetLink = await generatePasswordResetLink(userId);

    const result = await sendEmailResetPassword(
      user.name,
      user.email,
      passwordResetLink,
    );

    if (result.error) {
      throw new Error(`${result.error.name}: ${result.error.message}`);
    }

    return { event, body: result };
  },
);
