"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { mockEventApprovals, EventApprovalItem } from "../data";

export default function EventApprovalRequests() {
  const [events, setEvents] = useState<EventApprovalItem[]>(mockEventApprovals);

  const pendingCount = events.filter((e) => e.status === "Pending").length;

  const handleApprove = (id: string) => {
    setEvents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Approved" } : item
      )
    );
  };

  const handleReject = (id: string) => {
    setEvents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Rejected" } : item
      )
    );
  };

  return (
    <div className="rounded-2xl bg-[#141416] border border-[#26262B] p-5 md:p-6 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
            Event Approval Requests
          </h3>
          <p className="text-xs text-[#8E8E93] mt-0.5">
            Review and approve event submissions from organizers.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold text-[#FF2E86] bg-[#FF2E86]/10 border border-[#FF2E86]/30">
          {pendingCount} Pending
        </span>
      </div>

      {/* Events List */}
      <div className="divide-y divide-[#26262B]/80 pt-1">
        {events.map((event) => (
          <div
            key={event.id}
            className="py-3.5 first:pt-2 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-3"
          >
            {/* Event Info Left */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative w-14 h-10 md:w-16 md:h-11 rounded-lg overflow-hidden shrink-0 bg-[#202024] border border-white/5">
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 space-y-1">
                <h4 className="text-sm font-semibold text-white truncate">
                  {event.name}
                </h4>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#8E8E93]">
                  <span>{event.club}</span>
                  <span>·</span>
                  <span>{event.date}</span>
                  <span>·</span>
                  <span>{event.location}</span>
                  <span>·</span>
                  <span>{event.capacity}</span>
                  <span>·</span>
                  <span>{event.price}</span>
                  <span className="inline-block px-2 py-0.5 rounded bg-[#202024] text-[#A1A1AA] text-[11px] font-medium ml-1">
                    {event.tag}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions Right */}
            <div className="flex items-center gap-2.5 self-end md:self-center shrink-0">
              <span
                className={`text-xs font-medium mr-1.5 ${
                  event.status === "Approved"
                    ? "text-emerald-400"
                    : event.status === "Rejected"
                    ? "text-red-400"
                    : "text-amber-400"
                }`}
              >
                {event.status}
              </span>

              <button
                type="button"
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-[#202024] hover:bg-[#2B2B32] border border-white/5 transition-colors cursor-pointer"
              >
                View
              </button>

              <button
                type="button"
                onClick={() => handleApprove(event.id)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-md shadow-[#FF2E86]/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check size={13} strokeWidth={2.5} />
                <span>Approve</span>
              </button>

              <button
                type="button"
                onClick={() => handleReject(event.id)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#FF4D4F] bg-[#202024] hover:bg-[#FF4D4F]/10 hover:border-[#FF4D4F]/30 border border-white/5 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <X size={13} strokeWidth={2.5} />
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
