import { serve } from 'inngest/next';

import { resetPasswordEvent } from '@/app/(auth)/reset-password/[tokenId]/events/reset-password';
import { inngest } from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [resetPasswordEvent],
});
