import { useEffect } from 'react';

import { InitialActionsState } from '@/constants/initial-create-state';

type State = {
  state: InitialActionsState;
};

type UseStateFeedbackOptions = {
  onSuccess?: ({ state }: State) => void;
  onError?: ({ state }: State) => void;
};

export const useStateFeedback = (
  state: InitialActionsState,
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
