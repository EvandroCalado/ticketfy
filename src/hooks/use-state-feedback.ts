import { useEffect } from 'react';

import { ActionState } from '@/constants/action-state';

type State = {
  state: ActionState;
};

type UseStateFeedbackOptions = {
  onSuccess?: ({ state }: State) => void;
  onError?: ({ state }: State) => void;
};

export const useStateFeedback = (
  state: ActionState,
  options?: UseStateFeedbackOptions,
) => {
  useEffect(() => {
    if (state.status === 'success') {
      options?.onSuccess?.({ state });
    }

    if (state.status === 'error' && state.message) {
      options?.onError?.({ state });
    }
  }, [state, options]);
};
