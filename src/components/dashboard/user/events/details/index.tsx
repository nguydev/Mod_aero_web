"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Edit3,
  Trash2,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Car,
  Star,
  DollarSign,
  TrendingUp,
  Radio,
} from "lucide-react";
import { mockEventsData, type EventData } from "../data";

interface EventDetailsProps {
  id?: string;
}

export default function EventDetails({ id }: EventDetailsProps) {
  const event: EventData =
    mockEventsData.find((e) => e.id === id) || mockEventsData[0];

  return (
    <div className="space-y-6">
      {/* Top Header with Back Navigation and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/events"
            className="w-9 h-9 rounded-full border border-white/10 bg-[#141414] hover:bg-white/10 flex items-center justify-center text-white transition-colors shrink-0"
            aria-label="Back to Events"
          >
            <ChevronLeft size={18} />
          </Link>
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
              EVENT DETAILS
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {event.name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <Edit3 size={14} />
            <span>Edit</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[220px] md:h-[300px] lg:h-[340px] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#222222]">
        <Image
          src={event.banner}
          alt={event.name}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Bottom Badges */}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex flex-wrap items-center gap-2.5">
          <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full backdrop-blur-md">
            {event.status}
          </span>
          <span className="bg-black/60 border border-white/15 text-white text-xs font-medium uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md">
            <Car size={13} />
            <span>{event.category}</span>
          </span>
          <span className="bg-primary/20 border border-primary/40 text-primary text-xs font-bold px-3.5 py-1 rounded-full backdrop-blur-md">
            {event.price}
          </span>
        </div>
      </div>

      {/* Content Grid Layout (Left 8 cols, Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* 4 Quick Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-4 flex flex-col justify-between">
              <MapPin size={16} className="text-primary mb-2" />
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  LOCATION
                </span>
                <span className="text-xs md:text-sm font-semibold text-white truncate block mt-0.5">
                  {event.location}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-4 flex flex-col justify-between">
              <Calendar size={16} className="text-primary mb-2" />
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  DATE
                </span>
                <span className="text-xs md:text-sm font-semibold text-white truncate block mt-0.5">
                  {event.date}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-4 flex flex-col justify-between">
              <Clock size={16} className="text-primary mb-2" />
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  TIME
                </span>
                <span className="text-xs md:text-sm font-semibold text-white truncate block mt-0.5">
                  {event.time}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-4 flex flex-col justify-between">
              <Globe size={16} className="text-primary mb-2" />
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                  VISIBILITY
                </span>
                <span className="text-xs md:text-sm font-semibold text-white truncate block mt-0.5">
                  {event.visibility}
                </span>
              </div>
            </div>
          </div>

          {/* About This Event */}
          <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 md:p-6 space-y-3">
            <h3 className="text-sm font-bold text-white">About This Event</h3>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Recent Registrations Card */}
          <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 font-medium block">
                  {event.registered}/{event.capacity} registered
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Recent Registrations
                </h3>
              </div>
              <button
                type="button"
                className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full hover:bg-blue-600/30 transition-colors cursor-pointer"
              >
                VIEW ALL
              </button>
            </div>

            <div className="space-y-3 pt-2">
              {event.recentRegistrations.map((user, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-2 border-b border-[#1E1E1E] last:border-none"
                >
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-white truncate leading-tight">
                      {user.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate leading-tight mt-0.5">
                      {user.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Revenue Card */}
          <div className="rounded-2xl bg-[#160d11] border border-primary/20 p-5 md:p-6 space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Revenue</h3>
              <span className="text-xs text-gray-400 font-medium block">
                Total Earnings
              </span>
              <div className="text-3xl font-extrabold text-white tracking-tight pt-1">
                {event.revenue}
              </div>
            </div>

            <div className="space-y-1 border-t border-white/5 pt-4">
              <span className="text-xs text-gray-400 font-medium block">
                Ticket Price
              </span>
              <span className="text-sm font-bold text-white block">
                {event.price} per person
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 pt-1">
              <TrendingUp size={14} />
              <span>On track for {event.revenue}</span>
            </div>
          </div>

          {/* Event Info Card */}
          <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 md:p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Event Info</h3>

            <div className="space-y-4 pt-1">
              {/* Category */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                  <Car size={15} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    CATEGORY
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                  <Star size={15} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    RATING
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {event.rating}
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                  <DollarSign size={15} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    PRICING
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {event.price} ticket
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                  <Radio size={15} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    STATUS
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {event.status === "UPCOMING" ? "Upcoming" : event.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
