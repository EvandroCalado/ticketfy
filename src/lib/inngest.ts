import { EventSchemas, Inngest } from 'inngest';

import { RESET_PASSWORD_EVENT_NAME } from '@/app/(auth)/reset-password/[tokenId]/constants/reset-password-event-name';
import { ResetPasswordEventArgs } from '@/app/(auth)/reset-password/[tokenId]/events/reset-password';
import { VERIFY_EMAIL_EVENT_NAME } from '@/app/(auth)/sign-up/constants/verify-email-event-name';
import { VerifyEmailEventArgs } from '@/app/(auth)/sign-up/events/verify-email';

type Events = {
  [RESET_PASSWORD_EVENT_NAME]: ResetPasswordEventArgs;
  [VERIFY_EMAIL_EVENT_NAME]: VerifyEmailEventArgs;
};

export const inngest = new Inngest({
  id: 'ticketfy',
  schemas: new EventSchemas().fromRecord<Events>(),
});
