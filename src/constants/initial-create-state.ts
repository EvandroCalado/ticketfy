export type Status = 'idle' | 'success' | 'error';

export type InitialActionsState = {
  status: Status;
  message: string | undefined;
  fieldErrors?: Record<string, string[]>;
  payload?: FormData;
};

export const INITIAL_ACTION_STATE: InitialActionsState = {
  status: 'idle',
  message: undefined,
  fieldErrors: undefined,
  payload: undefined,
};
