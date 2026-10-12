import AddRoute from "@/components/dashboard/admin/manage-route/add-route";

export const metadata = {
  title: "Route Details / Add Route | Admin Dashboard",
  description: "View and edit automotive routes for users",
};

interface RouteViewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RouteViewPage({ params }: RouteViewPageProps) {
  const { id } = await params;
  return <AddRoute routeId={id} />;
}
