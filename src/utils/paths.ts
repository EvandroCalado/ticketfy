export const homePath = () => '/';

export const ticketsPath = () => '/tickets';
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) => `/tickets/edit/${ticketId}`;
export const ticketCreatePath = () => '/tickets/create';

export const signUpPath = () => '/sign-up';
export const signInPath = () => '/sign-in';
export const forgotPasswordPath = () => '/forgot-password';
