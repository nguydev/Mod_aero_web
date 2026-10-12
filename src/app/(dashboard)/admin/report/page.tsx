import AdminEventReports from "@/components/dashboard/admin/report";

export const metadata = {
  title: "Event Reports | Admin Dashboard",
  description: "Review reports submitted against events on Velocity",
};

export default function ReportPage() {
  return <AdminEventReports />;
}
