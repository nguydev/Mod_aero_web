import EventDetails from "@/components/dashboard/user/events/details";

interface EventViewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventViewPage({ params }: EventViewPageProps) {
  const { id } = await params;
  return <EventDetails id={id} />;
}
