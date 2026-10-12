import AdminUserDetails from "@/components/dashboard/admin/users/user-details";

export const metadata = {
  title: "User Details | Admin Dashboard",
  description: "View user profile, vehicle assets and activity",
};

interface UserViewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserViewPage({ params }: UserViewPageProps) {
  const { id } = await params;
  return <AdminUserDetails userId={id} />;
}
