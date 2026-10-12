import { ReactNode } from "react";

interface DashboardTitleProps {
  title: ReactNode | string;
  description?: ReactNode | string;
  className?: string;
  badge?: ReactNode;
  children?: ReactNode;
}

export default function DashboardTitle({
  title,
  description,
  className,
  badge,
  children,
}: DashboardTitleProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-3">
        <h1 className="m-0 text-2xl font-bold text-slate-900">{title}</h1>
        {badge}
        {children}
      </div>
      {description && (
        <p className="m-0 mt-1 text-sm text-slate-400">{description}</p>
      )}
    </div>
  );
}
