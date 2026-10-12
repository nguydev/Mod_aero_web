"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Table, ConfigProvider, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import { mockAdminUsers, AdminUserData } from "./data";

export default function AdminUserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Suspended">("All");

  const filteredUsers = useMemo(() => {
    return mockAdminUsers.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const columns: ColumnsType<AdminUserData> = [
    {
      title: "USER",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: AdminUserData) => (
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
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <span className="text-sm text-[#8E8E93] font-normal">{email}</span>
      ),
    },
    {
      title: "VEHICLES",
      dataIndex: "vehiclesCount",
      key: "vehiclesCount",
      render: (count: number) => (
        <span className="text-sm font-bold text-[#FF2E86]">{count}</span>
      ),
    },
    {
      title: "EVENTS",
      dataIndex: "eventsCount",
      key: "eventsCount",
      render: (count: number) => (
        <span className="text-sm font-bold text-[#FF2E86]">{count}</span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: "Active" | "Suspended") => (
        <span
          className={`text-xs font-semibold ${status === "Active" ? "text-[#10B981]" : "text-[#FF2E86]"
            }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: unknown, record: AdminUserData) => (
        <Link
          href={`/admin/user/view/${record.id}`}
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-semibold !text-[#D1D1D6] hover:!text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-all text-center"
        >
          View
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Users
        </h1>
        <p className="text-xs md:text-sm text-[#8E8E93] font-normal">
          Manage Velocity vehicle owners and their accounts.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-[#141416] border border-[#222226] rounded-xl px-5 py-3 text-xs text-white placeholder-[#5A5A60] focus:outline-none focus:border-[#FF2E86]/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {(["All", "Active", "Suspended"] as const).map((filter) => {
            const isActive = statusFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isActive
                  ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white shadow-md shadow-[#FF2E86]/20"
                  : "bg-[#141416] border border-[#222226] text-[#8E8E93] hover:text-white hover:border-white/20"
                  }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Users Table Container */}
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
            dataSource={filteredUsers}
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
