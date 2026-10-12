import GroupDetails from "@/components/dashboard/user/groups/details";

interface GroupDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GroupDetailsPage({ params }: GroupDetailsPageProps) {
  const { id } = await params;
  return <GroupDetails id={id} />;
}
