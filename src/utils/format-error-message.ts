export const formatErrorMessage = (fielError?: string[]) => {
  return fielError?.join(', ');
};
