export type ActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  payload?: FormData;
};

export const ACTION_STATE: ActionState = {
  success: false,
  message: undefined,
  fieldErrors: undefined,
  payload: undefined,
};
