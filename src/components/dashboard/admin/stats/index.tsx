import AdminStatCard from "./stat-card";
import { adminStatsData } from "../data";

export { AdminStatCard };

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {adminStatsData.map((stat) => (
        <AdminStatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          subtext={stat.subtext}
        />
      ))}
    </div>
  );
}
