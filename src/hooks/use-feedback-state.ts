import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ActionState } from '@/constants/action-state';

type FeedbackStateOptions = {
  onSuccess?: (state: ActionState) => void;
  onError?: (state: ActionState) => void;
  onSuccessRedirect?: string;
};

export const useFeedbackState = (
  state: ActionState,
  options?: FeedbackStateOptions,
) => {
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      options?.onSuccess?.(state);
      if (options?.onSuccessRedirect) {
        router.push(options.onSuccessRedirect);
        router.refresh();
      }
    }

    if (!state.success && state.message) {
      options?.onError?.(state);
    }
  }, [state, options, router]);
};
