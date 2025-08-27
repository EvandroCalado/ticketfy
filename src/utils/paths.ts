export const homePath = () => '/';

export const ticketsPath = () => '/tickets';
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) => `/tickets/edit/${ticketId}`;
export const ticketCreatePath = () => '/tickets/create';

export const signUpPath = () => '/sign-up';
export const signInPath = () => '/sign-in';
export const forgotPasswordPath = () => '/forgot-password';
export const resetPasswordPath = () => '/reset-password';
export const verifyEmailPath = () => '/verify-email';

export const organizationPath = () => '/organizations';
export const organizationCreatePath = () => '/organizations/create';

export const onboardingPath = () => '/onboarding';

export const selectActiveOrganizationPath = () =>
  '/onboarding/select-active-organization';

export const accountPath = () => '/account';
