import AdminOrganizerManagement from "@/components/dashboard/admin/organizers";

export const metadata = {
  title: "Organizer Management | Admin Dashboard",
  description: "Manage event creators and their organizations",
};

export default function OrganizerManagementPage() {
  return <AdminOrganizerManagement />;
}
