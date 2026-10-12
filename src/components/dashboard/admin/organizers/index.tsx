"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Table, ConfigProvider, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import { mockAdminOrganizers, AdminOrganizerData } from "./data";

export default function AdminOrganizerManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrganizers = useMemo(() => {
    return mockAdminOrganizers.filter((org) => {
      const q = searchQuery.toLowerCase();
      return (
        org.name.toLowerCase().includes(q) ||
        org.organization.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const columns: ColumnsType<AdminOrganizerData> = [
    {
      title: "ORGANIZER",
      dataIndex: "name",
      key: "name",
      width: "24%",
      render: (_: string, record: AdminOrganizerData) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${record.avatarBg} ${record.avatarColor} border border-white/5`}
          >
            {record.initials}
          </div>
          <span className="text-sm font-bold text-white whitespace-nowrap">
            {record.name}
          </span>
        </div>
      ),
    },
    {
      title: "ORGANIZATION",
      dataIndex: "organization",
      key: "organization",
      width: "26%",
      render: (org: string) => (
        <span className="text-sm text-[#8E8E93] font-normal">{org}</span>
      ),
    },
    {
      title: "EVENTS",
      dataIndex: "eventsCount",
      key: "eventsCount",
      width: "14%",
      render: (count: number) => (
        <span className="text-sm font-bold text-[#FF2E86]">{count}</span>
      ),
    },
    {
      title: "GROUPS",
      dataIndex: "groupsCount",
      key: "groupsCount",
      width: "14%",
      render: (count: number) => (
        <span className="text-sm font-bold text-[#FF2E86]">{count}</span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (status: "Verified" | "Suspense") => (
        <span
          className={`text-xs font-semibold ${status === "Verified" ? "text-[#10B981]" : "text-[#F59E0B]"
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      width: "10%",
      render: (_: unknown, record: AdminOrganizerData) => (
        <Link
          href={`/admin/organizer/view/${record.id}`}
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-semibold !text-[#D1D1D6] hover:!text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-all text-center"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Organizers
        </h1>
        <p className="text-xs md:text-sm text-[#8E8E93] font-normal">
          Manage event creators and their organizations.
        </p>
      </div>

      {/* Search Toolbar */}
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search organizers..."
          className="w-full bg-[#141416] border border-[#222226] rounded-xl px-5 py-3 text-xs text-white placeholder-[#5A5A60] focus:outline-none focus:border-[#FF2E86]/50 transition-colors"
        />
      </div>

      {/* Organizers Table Container */}
      <div className="rounded-2xl bg-[#141416] border border-[#222226] p-5 md:p-6 shadow-sm overflow-hidden">
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorBgContainer: "transparent",
              colorText: "#ffffff",
              colorTextHeading: "#6E6E73",
              colorBorderSecondary: "#222226",
              fontSize: 13,
              padding: 16,
            },
            components: {
              Table: {
                headerBg: "transparent",
                headerColor: "#6E6E73",
                headerSplitColor: "transparent",
                rowHoverBg: "rgba(255, 255, 255, 0.02)",
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={filteredOrganizers}
            rowKey="id"
            pagination={false}
            rowClassName="border-b border-[#222226]/80 last:border-b-0"
            size="middle"
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
