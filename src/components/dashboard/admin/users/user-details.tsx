"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ArrowRight, MapPin } from "lucide-react";
import { mockAdminUsers, AdminUserData } from "./data";

interface AdminUserDetailsProps {
  userId: string;
}

export default function AdminUserDetails({ userId }: AdminUserDetailsProps) {
  // Find user by id or default to first user (Alex Morgan)
  const [user, setUser] = useState<AdminUserData>(() => {
    return mockAdminUsers.find((u) => u.id === userId) || mockAdminUsers[0];
  });

  const toggleSuspend = () => {
    setUser((prev) => ({
      ...prev,
      status: prev.status === "Active" ? "Suspended" : "Active",
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/user-management"
          className="inline-flex items-center gap-1 text-xs font-medium text-[#8E8E93] hover:text-white transition-colors"
        >
          <ChevronLeft size={14} />
          <span>Back to Users</span>
        </Link>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${user.avatarBg} ${user.avatarColor} border border-white/10`}
          >
            {user.initials}
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {user.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#8E8E93]">
              <span
                className={`font-semibold ${user.status === "Active" ? "text-emerald-400" : "text-[#FF4D4F]"
                  }`}
              >
                {user.status}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-[#8E8E93]" />
                {user.location || "California, USA"}
              </span>
              <span>Joined {user.joinedDate || "January 18, 2026"}</span>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={toggleSuspend}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${user.status === "Active"
              ? "border-[#6B1834] bg-[#220D15] text-[#FF4D4F] hover:bg-[#FF4D4F]/10 hover:border-[#FF4D4F]/40"
              : "border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-500/20"
              }`}
          >
            {user.status === "Active" ? "Suspend User" : "Activate User"}
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Vehicles */}
        <div className="rounded-2xl p-5 bg-[#141416] border border-[#26262B] flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-medium text-[#8E8E93]">Vehicles</p>
          <p className="text-3xl font-bold text-white tracking-tight mt-1">
            {user.vehiclesCount}
          </p>
        </div>

        {/* Drives */}
        <div className="rounded-2xl p-5 bg-[#141416] border border-[#26262B] flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-medium text-[#8E8E93]">Drives</p>
          <p className="text-3xl font-bold text-white tracking-tight mt-1">
            {user.drivesCount || 128}
          </p>
        </div>

        {/* Events Joined */}
        <div className="rounded-2xl p-5 bg-[#141416] border border-[#26262B] flex flex-col justify-between min-h-[110px]">
          <p className="text-xs font-medium text-[#8E8E93]">Events Joined</p>
          <p className="text-3xl font-bold text-white tracking-tight mt-1">
            {user.eventsCount}
          </p>
        </div>

        {/* XP - Gradient Card */}
        <div className="rounded-2xl p-5 bg-gradient-to-b from-[#2c0e1a]/85 via-[#180911]/95 to-[#12060c] border border-[#6b1834] flex flex-col justify-between min-h-[110px] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
          <p className="text-[11px] font-bold tracking-wider text-[#FF2E86] uppercase">
            XP
          </p>
          <p className="text-3xl font-extrabold text-[#FF2E86] tracking-tight mt-1">
            {user.xp || "8,450"}
          </p>
        </div>
      </div>

      {/* Two Column Grid: Personal Information + Vehicles List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="rounded-2xl bg-[#141416] border border-[#26262B] p-5 md:p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white">Personal Information</h3>

          <div className="divide-y divide-[#26262B]/80 text-sm">
            <div className="py-3 flex items-center justify-between first:pt-1">
              <span className="text-[#8E8E93]">Name</span>
              <span className="font-medium text-white">{user.name}</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Email</span>
              <span className="font-medium text-white">{user.email}</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Location</span>
              <span className="font-medium text-white">
                {user.location || "California, USA"}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Joined</span>
              <span className="font-medium text-white">
                {user.joinedDate || "January 18, 2026"}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between last:pb-1">
              <span className="text-[#8E8E93]">Total Reefer</span>
              <span className="font-medium text-white">
                {user.totalRefer || 12}
              </span>
            </div>
          </div>
        </div>

        {/* Vehicles */}
        <div className="rounded-2xl bg-[#141416] border border-[#26262B] p-5 md:p-6 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-white mb-4">
            Vehicles ({user.vehicles?.length || user.vehiclesCount})
          </h3>

          <div className="space-y-3">
            {(user.vehicles || []).map((vehicle) => (
              <div
                key={vehicle.id}
                className="bg-[#1C1C20] border border-white/5 rounded-xl p-4 flex items-center justify-between hover:border-white/10 transition-colors"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {vehicle.model}
                  </h4>
                  <p className="text-xs text-[#8E8E93] mt-0.5">
                    {vehicle.year} · {vehicle.type}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>View Vehicle</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
