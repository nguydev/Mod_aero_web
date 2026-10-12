import React from "react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
}: StatsCardProps) {
    return (
        <div className="relative">
            <div
                className={`rounded-2xl p-4 flex flex-col justify-between h-[124px] [transition:0.3s] group hover:bg-[#181114] hover:border-primary/30 bg-[#121212] border border-[#1E1E1E]`}
            >
                <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-gray-400">{title}</span>
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-white shrink-0 group-hover:bg-primary group-hover:text-white [transition:0.3s]`}
                    >
                        <Icon size={16} />
                    </div>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">
                    {value}
                </div>
            </div>
        </div>
    );
}
