export type CreateTicketStatus = 'idle' | 'success' | 'error';

export type TicketState = {
  status: CreateTicketStatus;
  message: string | undefined;
  fieldErrors?: Record<string, string[]>;
  payload?: FormData;
};

export const CREATE_TICKET_STATE: TicketState = {
  status: 'idle',
  message: undefined,
  fieldErrors: undefined,
  payload: undefined,
};
