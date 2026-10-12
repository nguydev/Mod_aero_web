"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { mockEventsData, type EventData } from "./data";
import EventCard from "./card";

export default function Events() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");
    const [events, setEvents] = useState<EventData[]>(mockEventsData);

    const filteredEvents = events.filter((e) => {
        if (activeTab === "upcoming") {
            return e.status === "UPCOMING" || e.status === "LIVE NOW";
        }
        return e.status === "COMPLETED";
    });

    const handleDelete = (id: string) => {
        setEvents((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                        Events
                    </h1>
                    <p className="text-sm text-gray-400 mt-0.5">
                        Manage all your automotive events
                    </p>
                </div>

                <Link
                    href="/dashboard/events/create"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white button-shadow transition-transform duration-200 w-max"
                >
                    <Plus size={16} />
                    <span>Create Event</span>
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => setActiveTab("upcoming")}
                    className={`px-6 py-2 rounded-full text-xs border font-semibold transition-all cursor-pointer ${activeTab === "upcoming"
                        ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white shadow-md shadow-pink-500/25"
                        : "bg-[#141414] border border-[#222222] text-gray-400 hover:text-white"
                        }`}
                >
                    Upcoming Events
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("completed")}
                    className={`px-6 py-2 rounded-full border text-xs font-semibold transition-all cursor-pointer ${activeTab === "completed"
                        ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white shadow-md shadow-pink-500/25"
                        : "bg-[#141414] border border-[#222222] text-gray-400 hover:text-white"
                        }`}
                >
                    Completed Events
                </button>
            </div>

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event, index) => (
                        <EventCard
                            key={`${event.id}-${index}`}
                            event={event}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-[#1E1E1E] bg-[#121212] p-12 text-center text-gray-400">
                    No {activeTab} events found.
                </div>
            )}
        </div>
    );
}