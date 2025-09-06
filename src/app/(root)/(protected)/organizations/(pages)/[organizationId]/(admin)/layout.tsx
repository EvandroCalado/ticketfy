import { getAdminOrRedirect } from '../../../actions/get-admin-or-redirect';

type OrganizationIdLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ organizationId: string }>;
};

const OrganizationIdLayout = async ({
  children,
  params,
}: OrganizationIdLayoutProps) => {
  const { organizationId } = await params;

  await getAdminOrRedirect(organizationId);

  return <>{children}</>;
};

export default OrganizationIdLayout;
