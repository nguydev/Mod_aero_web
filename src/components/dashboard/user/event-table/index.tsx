"use client";

import Image from "next/image";
import Link from "next/link";
import { Table, ConfigProvider, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MapPin, Eye, SquarePen } from "lucide-react";

export interface EventItem {
    key: string;
    banner: string;
    name: string;
    location: string;
    date: string;
    registered: number;
    revenue: string;
    status: "UPCOMING" | "LIVE NOW";
}

const mockEvents: EventItem[] = [
    {
        key: "1",
        banner: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=200&auto=format&fit=crop",
        name: "Sunset Boulevard Car Meet",
        location: "Los Angeles, CA",
        date: "Aug 15, 2025",
        registered: 142,
        revenue: "$3,550",
        status: "UPCOMING",
    },
    {
        key: "2",
        banner: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=200&auto=format&fit=crop",
        name: "Laguna Seca Track Day",
        location: "Monterey, CA",
        date: "Aug 22, 2025",
        registered: 48,
        revenue: "$8,640",
        status: "UPCOMING",
    },
    {
        key: "3",
        banner: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=200&auto=format&fit=crop",
        name: "SoCal Cars & Coffee",
        location: "Irvine, CA",
        date: "Aug 3, 2025",
        registered: 320,
        revenue: "$0",
        status: "LIVE NOW",
    },
];

export default function EventsTable() {
    const columns: ColumnsType<EventItem> = [
        {
            title: "BANNER",
            dataIndex: "banner",
            key: "banner",
            width: 80,
            render: (banner: string, record: EventItem) => (
                <div className="relative w-12 h-8 rounded-lg overflow-hidden border border-white/10 shrink-0">
                    <Image
                        src={banner}
                        alt={record.name}
                        fill
                        unoptimized
                        className="object-cover"
                    />
                </div>
            ),
        },
        {
            title: "EVENT",
            dataIndex: "name",
            key: "name",
            render: (name: string, record: EventItem) => (
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white truncate max-w-[160px] md:max-w-none">
                        {name}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <MapPin size={11} className="text-gray-400 shrink-0" />
                        <span>{record.location}</span>
                    </div>
                </div>
            ),
        },
        {
            title: "DATE",
            dataIndex: "date",
            key: "date",
            render: (date: string) => (
                <span className="text-xs font-medium text-gray-300 whitespace-nowrap">
                    {date}
                </span>
            ),
        },
        {
            title: "REGISTERED",
            dataIndex: "registered",
            key: "registered",
            render: (reg: number) => (
                <span className="text-sm font-bold text-white">{reg}</span>
            ),
        },
        {
            title: "REVENUE",
            dataIndex: "revenue",
            key: "revenue",
            render: (rev: string) => (
                <span className="text-sm font-bold text-white">{rev}</span>
            ),
        },
        {
            title: "STATUS",
            dataIndex: "status",
            key: "status",
            render: (status: "UPCOMING" | "LIVE NOW") => {
                const isUpcoming = status === "UPCOMING";
                return (
                    <span
                        className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${isUpcoming
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            }`}
                    >
                        {status}
                    </span>
                );
            },
        },
        {
            title: "ACTIONS",
            key: "actions",
            render: (_: unknown, record: EventItem) => (
                <div className="flex items-center gap-3 text-gray-400">
                    <Link
                        href={`/dashboard/events/${record.key}`}
                        className="hover:text-white transition-colors"
                        aria-label="View Event"
                    >
                        <Eye size={15} />
                    </Link>
                    <button
                        type="button"
                        className="hover:text-white transition-colors cursor-pointer"
                        aria-label="Edit Event"
                    >
                        <SquarePen size={15} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Upcoming Events</h3>
                <Link
                    href="/dashboard/events"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                    View all &gt;
                </Link>
            </div>

            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: {
                        colorBgContainer: "transparent",
                        colorText: "#ffffff",
                        colorTextHeading: "#6b7280",
                        colorBorderSecondary: "#1E1E1E",
                        fontSize: 12,
                        padding: 12,
                    },
                    components: {
                        Table: {
                            headerBg: "transparent",
                            headerColor: "#6B7280",
                            headerSplitColor: "transparent",
                            rowHoverBg: "rgba(255, 255, 255, 0.03)",
                        },
                    },
                }}
            >
                <div>
                    <Table
                        columns={columns}
                        dataSource={mockEvents}
                        pagination={false}
                        rowClassName="border-b border-[#1E1E1E]"
                        size="middle"
                        scroll={{ x: "max-content" }}
                    />
                </div>
            </ConfigProvider>
        </div>
    );
}
