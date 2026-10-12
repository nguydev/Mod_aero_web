"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Clock, DollarSign, Car, Eye, Edit3, Trash2 } from "lucide-react";
import { EventData } from "../data";


interface EventCardProps {
    event: EventData;
    onDelete?: (id: string) => void;
}

export default function EventCard({ event, onDelete }: EventCardProps) {
    const percentage = Math.round((event.registered / event.capacity) * 100);

    return (
        <div className="bg-[#121212] border border-[#1E1E1E] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-300 group">
            {/* Thumbnail Banner */}
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={event.banner}
                    alt={event.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                {/* Top badges */}
                <div className="absolute top-3 left-3">
                    <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        {event.status}
                    </span>
                </div>

                <div className="absolute top-3 right-3">
                    <span className="bg-primary/20 text-primary border border-primary/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                        {event.price}
                    </span>
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-3">
                <h3 className="text-sm font-bold text-white truncate">{event.name}</h3>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-400">
                    <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-gray-500" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-gray-500" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={12} className="text-gray-500" />
                        <span>{event.time}</span>
                    </div>
                </div>

                {/* Registered / Percentage */}
                <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-gray-400">
                        {event.registered}/{event.capacity} registered
                    </span>
                    <span className="font-bold text-primary">{percentage}%</span>
                </div>

                {/* Revenue & Category */}
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 font-bold text-primary">
                        <DollarSign size={13} />
                        <span>{event.revenue}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                        <Car size={13} className="text-gray-500" />
                        <span>{event.category}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-4 pb-4 grid grid-cols-3 gap-2">
                <Link
                    href={`/dashboard/events/view/${event.id}`}
                    className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium py-2 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 transition-colors"
                >
                    <Eye size={14} />
                    <span>View</span>
                </Link>

                <button
                    type="button"
                    className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium py-2 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                    <Edit3 size={14} />
                    <span>Edit</span>
                </button>

                <button
                    type="button"
                    onClick={() => onDelete?.(event.id)}
                    className="bg-white/5 hover:bg-red-500/10 text-gray-300 hover:text-red-400 text-xs font-medium py-2 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                    <Trash2 size={14} />
                    <span>Del</span>
                </button>
            </div>
        </div>
    );
}
