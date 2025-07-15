export type CreateTicketStatus = 'idle' | 'success' | 'error';

export type CreateTicketState = {
  status: CreateTicketStatus;
  message: string | undefined;
  fieldErrors?: Record<string, string[]>;
  payload?: FormData;
};

export const CREATE_TICKET_STATE: CreateTicketState = {
  status: 'idle',
  message: undefined,
  fieldErrors: undefined,
  payload: undefined,
};
