import { useEffect } from 'react';

import { TicketState } from '@/app/(root)/ticket/create/constants/initial-create-state';

type State = {
  state: TicketState;
};

type UseStateFeedbackOptions = {
  onSuccess?: ({ state }: State) => void;
  onError?: ({ state }: State) => void;
};

export const useStateFeedback = (
  state: TicketState,
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
