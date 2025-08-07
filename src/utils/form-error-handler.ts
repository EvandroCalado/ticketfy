export const formErrorHandler = (error: unknown) => {
  // if (error instanceof ZodError) {
  //   return {
  //     success: false,
  //     message: 'Algo deu errado',
  //   };
  // }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: false,
    message: 'Algo deu errado',
  };
};
