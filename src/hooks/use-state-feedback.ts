import { useEffect } from 'react';

import { CreateTicketState } from '@/app/(root)/ticket/create/constants/initial-create-state';

type State = {
  state: CreateTicketState;
};

type UseStateFeedbackOptions = {
  onSuccess?: ({ state }: State) => void;
  onError?: ({ state }: State) => void;
};

export const useStateFeedback = (
  state: CreateTicketState,
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
