import AdminOrganizerDetails from "@/components/dashboard/admin/organizers/organizer-details";

export const metadata = {
  title: "Organizer Details | Admin Dashboard",
  description: "View organizer profile, groups, events and financial earnings",
};

interface OrganizerViewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrganizerViewPage({
  params,
}: OrganizerViewPageProps) {
  const { id } = await params;
  return <AdminOrganizerDetails organizerId={id} />;
}
