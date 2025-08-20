import { serve } from 'inngest/next';

import { resetPasswordEvent } from '@/app/(auth)/events/reset-password';
import { verifyEmailEvent } from '@/app/(auth)/events/verify-email';
import { inngest } from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [resetPasswordEvent, verifyEmailEvent],
});
