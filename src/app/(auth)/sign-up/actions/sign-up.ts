'use server';

import { InitialState } from '@/app/(root)/ticket/create/constants/initial-create-state';
import { formErrorHandler } from '@/utils/form-error-handler';

import { signUpSchema } from '../schemas/sign-up';

export const signUp = async (
  prevState: unknown,
  formData: FormData,
): Promise<InitialState> => {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData),
    );

    console.log(username, email, password);

    // TODO: Implementar cadastro no banco de dados
  } catch (error) {
    return formErrorHandler(error, formData);
  }

  return {
    status: 'success',
    message: 'Usuário criado com sucesso',
    fieldErrors: undefined,
    payload: undefined,
  };
};
