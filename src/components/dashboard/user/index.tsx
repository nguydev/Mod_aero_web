"use client";

import Image from "next/image";
import Link from "next/link";
import coverImage from "@/assets/dashboard/banner.svg";
import {
    CalendarDays,
    CheckCircle2,
    Users,
    UserCheck,
    DollarSign,
    Bell,
    Plus,
    Eye,
} from "lucide-react";
import StatsCard from "./stats";
import EventsTable from "./event-table";
import CalendarWidget from "./calender";

export default function UserDashboard() {
    const stats = [
        {
            title: "Upcoming Events",
            value: "12",
            icon: CalendarDays,
        },
        {
            title: "Completed Events",
            value: "48",
            icon: CheckCircle2,
        },
        {
            title: "Total Participants",
            value: "4,891",
            icon: Users,
        },
        {
            title: "Followers",
            value: "3,420",
            icon: UserCheck,
        },
        {
            title: "Total Earnings",
            value: "$24,680",
            icon: DollarSign,
            iconBg: "bg-primary",
            iconColor: "text-white",
            isFeatured: true,
            badge: (
                <div className="relative w-8 h-8 rounded-full border-2 border-emerald-500 overflow-hidden shadow-lg shadow-emerald-500/20">
                    <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
                        alt="Organizer"
                        width={32}
                        height={32}
                        unoptimized
                        className="w-full h-full object-cover"
                    />
                </div>
            ),
        },
        {
            title: "Pending Requests",
            value: "2",
            icon: Bell,
        },
    ];

    return (
        <div className="space-y-6">
            {/* Hero Banner / Control Center */}
            <div className="relative rounded-3xl overflow-hidden border border-[#222222] min-h-[220px] md:min-h-[260px] flex items-center p-6 md:p-10 bg-[#0E0E0E]">
                {/* Background Image with Dark Gradient Overlays */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={coverImage}
                        alt="Dashboard Banner"
                        fill
                        priority
                        className="object-cover object-right opacity-40 md:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/90 to-transparent" />
                </div>

                {/* Banner Content */}
                <div className="relative z-10 max-w-xl space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                            Control Center
                        </span>
                        <span className="w-6 h-[1.5px] bg-primary rounded-full" />
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                            Welcome back, John.
                        </h1>
                        <p className="text-sm text-gray-400 font-normal">
                            Ready to organize your next automotive experience?
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Link
                            href="/dashboard/events/create"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white button-shadow transition-transform duration-200"
                        >
                            <Plus size={16} />
                            <span>Create Event</span>
                        </Link>

                        <Link
                            href="/dashboard/events"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors backdrop-blur-sm"
                        >
                            <Eye size={16} />
                            <span>View Events</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>

            {/* Two-Column Section: Upcoming Events Table + Calendar Widget */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                    <EventsTable />
                </div>
                <div className="lg:col-span-4">
                    <CalendarWidget />
                </div>
            </div>
        </div>
    );
}