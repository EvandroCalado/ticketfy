import { ZodError, flattenError } from 'zod';

import { InitialActionsState } from '@/constants/initial-create-state';

export const formErrorHandler = (
  error: unknown,
  formData: FormData,
): InitialActionsState => {
  if (error instanceof ZodError) {
    return {
      status: 'error',
      message: undefined,
      fieldErrors: flattenError(error).fieldErrors,
      payload: formData,
    };
  }

  if (error instanceof Error) {
    return {
      status: 'error',
      message: error.message,
      fieldErrors: undefined,
      payload: formData,
    };
  }

  return {
    status: 'error',
    message: 'Algo deu errado',
    fieldErrors: undefined,
    payload: formData,
  };
};
