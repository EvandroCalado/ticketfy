import { ZodError, flattenError } from 'zod';

import { ActionState } from '@/constants/action-state';

export const formErrorHandler = (
  error: unknown,
  formData?: FormData,
): ActionState => {
  if (error instanceof ZodError) {
    return {
      success: false,
      message: undefined,
      fieldErrors: flattenError(error).fieldErrors,
      payload: formData,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
      fieldErrors: undefined,
      payload: formData,
    };
  }

  return {
    success: false,
    message: 'Algo deu errado',
    fieldErrors: undefined,
    payload: undefined,
  };
};
