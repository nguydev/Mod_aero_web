export interface AdminStatCardProps {
  title: string;
  value: string;
  subtext: string;
}

export default function AdminStatCard({
  title,
  value,
  subtext,
}: AdminStatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-5 md:p-6 bg-gradient-to-b from-[#2c0e1a]/85 via-[#180911]/95 to-[#12060c] border border-[#6b1834] hover:border-[#FF2E86]/60 transition-all duration-300 flex flex-col justify-between min-h-[145px] shadow-[0_4px_24px_rgba(0,0,0,0.5)] group">
      {/* Subtle top-light gradient sheen */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FF2E86]/[0.03] to-[#FF7A1A]/[0.05] pointer-events-none" />

      <div className="relative z-10">
        <p className="text-[11px] font-bold tracking-wider text-[#FF2E86] uppercase">
          {title}
        </p>
        <h3 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2.5">
          {value}
        </h3>
      </div>

      <div className="relative z-10 mt-3">
        <p className="text-xs font-medium text-[#B83B5E]">
          {subtext}
        </p>
      </div>
    </div>
  );
}
