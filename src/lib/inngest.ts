import { EventSchemas, Inngest } from 'inngest';

import { RESET_PASSWORD_EVENT_NAME } from '@/app/(auth)/reset-password/[tokenId]/constants/reset-password-event-name';
import { ResetPasswordEventArgs } from '@/app/(auth)/reset-password/[tokenId]/events/reset-password';

type Events = {
  [RESET_PASSWORD_EVENT_NAME]: ResetPasswordEventArgs;
};

export const inngest = new Inngest({
  id: 'ticketfy',
  schemas: new EventSchemas().fromRecord<Events>(),
});
