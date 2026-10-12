"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ArrowRight, Globe } from "lucide-react";
import { mockAdminOrganizers, AdminOrganizerData } from "./data";

interface AdminOrganizerDetailsProps {
  organizerId: string;
}

export default function AdminOrganizerDetails({
  organizerId,
}: AdminOrganizerDetailsProps) {
  const [organizer, setOrganizer] = useState<AdminOrganizerData>(() => {
    return (
      mockAdminOrganizers.find((o) => o.id === organizerId) ||
      mockAdminOrganizers[0]
    );
  });

  const toggleSuspend = () => {
    setOrganizer((prev) => ({
      ...prev,
      status: prev.status === "Verified" ? "Suspense" : "Verified",
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/organizer-management"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#8E8E93] hover:text-white transition-colors"
        >
          <ChevronLeft size={14} />
          <span>Back to Organizers</span>
        </Link>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 ${organizer.avatarBg} ${organizer.avatarColor} border border-white/10`}
          >
            {organizer.initials}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {organizer.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#8E8E93]">
              <span
                className={`font-semibold ${organizer.status === "Verified"
                  ? "text-[#10B981]"
                  : "text-[#F59E0B]"
                  }`}
              >
                {organizer.status}
              </span>
              <span>{organizer.organization}</span>
              <span className="flex items-center gap-1.5">
                <Globe size={13} className="text-[#06B6D4]" />
                <span>{organizer.website || "apexmotorsclub.com"}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleSuspend}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${organizer.status === "Verified"
              ? "border-[#6B1834] bg-[#220D15] text-[#FF4D4F] hover:bg-[#FF4D4F]/10 hover:border-[#FF4D4F]/40"
              : "border-emerald-500/40 bg-emerald-950/30 text-[#10B981] hover:bg-emerald-500/20"
              }`}
          >
            {organizer.status === "Verified"
              ? "Suspend Organizer"
              : "Verify Organizer"}
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-white/10 bg-[#1C1C20] text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Delete Organizer
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Events */}
        <div className="rounded-2xl p-5 bg-[#141416] border border-[#26262B] flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-medium text-[#8E8E93]">Events</p>
          <p className="text-3xl font-bold text-white tracking-tight mt-1">
            {organizer.eventsCount}
          </p>
        </div>

        {/* Groups */}
        <div className="rounded-2xl p-5 bg-[#141416] border border-[#26262B] flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-medium text-[#8E8E93]">Groups</p>
          <p className="text-3xl font-bold text-white tracking-tight mt-1">
            {organizer.groupsCount}
          </p>
        </div>

        {/* Participants */}
        <div className="rounded-2xl p-5 bg-[#141416] border border-[#26262B] flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-medium text-[#8E8E93]">Participants</p>
          <p className="text-3xl font-bold text-white tracking-tight mt-1">
            {organizer.participantsTotal || "1,284"}
          </p>
        </div>

        {/* Earnings - Gradient Card */}
        <div className="rounded-2xl p-5 bg-gradient-to-b from-[#2c0e1a]/85 via-[#180911]/95 to-[#12060c] border border-[#6b1834] flex flex-col justify-between min-h-[110px] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <p className="text-[11px] font-bold tracking-wider text-[#FF2E86] uppercase">
            Earnings
          </p>
          <p className="text-3xl font-extrabold text-[#FF2E86] tracking-tight mt-1">
            {organizer.earnings || "$18,450"}
          </p>
        </div>
      </div>

      {/* Two Column Grid: Organizer Information + (Groups & Events) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Organizer Information */}
        <div className="rounded-2xl bg-[#141416] border border-[#26262B] p-5 md:p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white">Organizer Information</h3>

          <div className="divide-y divide-[#26262B]/80 text-sm">
            <div className="py-3 flex items-center justify-between first:pt-1">
              <span className="text-[#8E8E93]">Full Name</span>
              <span className="font-medium text-white">{organizer.name}</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Organization</span>
              <span className="font-medium text-white">
                {organizer.organization}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Type</span>
              <span className="font-medium text-white">
                {organizer.type || "Racing Club"}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Email</span>
              <span className="font-medium text-white">
                {organizer.email || "alex@apexmotors.com"}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Phone</span>
              <span className="font-medium text-white">
                {organizer.phone || "+1 310 555 0192"}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Website</span>
              <span className="font-medium text-white">
                {organizer.website || "apexmotorsclub.com"}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Verification</span>
              <span className="font-medium text-[#10B981]">
                {organizer.verification || "Verified"}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between last:pb-1">
              <span className="text-[#8E8E93]">Total Reefer</span>
              <span className="font-medium text-white">
                {organizer.totalRefer || 12}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Stack of Groups & Events */}
        <div className="space-y-6">
          {/* Groups Card */}
          <div className="rounded-2xl bg-[#141416] border border-[#26262B] p-5 md:p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-white mb-4">Groups</h3>

            <div className="space-y-3">
              {(organizer.groups || []).map((group) => (
                <div
                  key={group.id}
                  className="bg-[#1C1C20] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {group.name}
                    </h4>
                    <p className="text-xs text-[#8E8E93] mt-0.5">
                      {group.membersCount} Members
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    <span>View Group</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Events Card */}
          <div className="rounded-2xl bg-[#141416] border border-[#26262B] p-5 md:p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-white mb-4">Events</h3>

            <div className="space-y-3">
              {(organizer.events || []).map((event) => (
                <div
                  key={event.id}
                  className="bg-[#1C1C20] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {event.name}
                    </h4>
                    <p className="text-xs text-[#8E8E93] mt-0.5">
                      {event.date} · {event.participantsCount} Participants
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    <span>View Event</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
