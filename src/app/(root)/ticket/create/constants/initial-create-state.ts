export type Status = 'idle' | 'success' | 'error';

export type InitialState = {
  status: Status;
  message: string | undefined;
  fieldErrors?: Record<string, string[]>;
  payload?: FormData;
};

export const INITIAL_STATE: InitialState = {
  status: 'idle',
  message: undefined,
  fieldErrors: undefined,
  payload: undefined,
};

// TODO: Mover essa constante para uma pasta global
