import { EventSchemas, Inngest } from 'inngest';

import { RESET_PASSWORD_EVENT_NAME } from '@/app/(auth)/constants/reset-password-event-name';
import { VERIFY_EMAIL_EVENT_NAME } from '@/app/(auth)/constants/verify-email-event-name';
import { ResetPasswordEventArgs } from '@/app/(auth)/events/reset-password';
import { VerifyEmailEventArgs } from '@/app/(auth)/events/verify-email';

type Events = {
  [RESET_PASSWORD_EVENT_NAME]: ResetPasswordEventArgs;
  [VERIFY_EMAIL_EVENT_NAME]: VerifyEmailEventArgs;
};

export const inngest = new Inngest({
  id: 'ticketfy',
  eventKey: process.env.INNGEST_EVENT_KEY,
  schemas: new EventSchemas().fromRecord<Events>(),
});
