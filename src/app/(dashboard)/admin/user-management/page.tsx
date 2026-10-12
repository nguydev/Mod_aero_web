import AdminUserManagement from "@/components/dashboard/admin/users";

export const metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage Velocity vehicle owners and accounts",
};

export default function UserManagementPage() {
  return <AdminUserManagement />;
}
