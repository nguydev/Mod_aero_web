"use client";

import AdminStats from "./stats";
import EventApprovalRequests from "./event-approvals";
import RecentOrganizerRequestsTable from "./organizer-requests";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Greeting */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-[#8E8E93] tracking-wide">
          Tuesday, August 4, 2026
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Welcome back, Admin
        </h1>
        <p className="text-xs md:text-sm text-[#8E8E93] font-normal">
          Here&apos;s what&apos;s happening across Velocity today.
        </p>
      </div>

      <AdminStats />

      {/* Event Approval Requests */}
      <EventApprovalRequests />

      {/* Recent Organizer Requests Table */}
      <RecentOrganizerRequestsTable />
    </div>
  );
}