"use client";

import Link from "next/link";
import { Table, ConfigProvider, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ArrowRight } from "lucide-react";
import { mockOrganizerRequests, OrganizerRequestItem } from "../data";

export default function RecentOrganizerRequestsTable() {
  const columns: ColumnsType<OrganizerRequestItem> = [
    {
      title: "ORGANIZER",
      dataIndex: "name",
      key: "name",
      render: (_: string, record: OrganizerRequestItem) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${record.avatarBg} ${record.avatarColor} border border-white/5`}
          >
            {record.initials}
          </div>
          <span className="text-sm font-semibold text-white">
            {record.name}
          </span>
        </div>
      ),
    },
    {
      title: "ORGANIZATION",
      dataIndex: "organization",
      key: "organization",
      render: (org: string) => (
        <span className="text-sm text-[#D1D1D6] font-normal">{org}</span>
      ),
    },
    {
      title: "SUBMITTED",
      dataIndex: "submitted",
      key: "submitted",
      render: (submitted: string) => (
        <span className="text-sm text-[#8E8E93] font-normal">{submitted}</span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span className="text-sm font-medium text-amber-400">{status}</span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_: unknown, record: OrganizerRequestItem) => (
        <Link
          href={`/admin/organizer/view/${record.id || "org-1"}`}
          className="inline-flex items-center gap-1 text-sm font-medium !text-primary hover:!text-[#FF7A1A] transition-colors cursor-pointer"
        >
          <span>View Request</span>
          <ArrowRight size={14} />
        </Link>
      ),
    },
  ];

  return (
    <div className="rounded-2xl bg-[#141416] border border-[#26262B] p-5 md:p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
            Recent Organizer Requests
          </h3>
          <p className="text-xs text-[#8E8E93] mt-0.5">
            Review and manage the latest Event Creator applications.
          </p>
        </div>
        <Link
          href="/admin/organizer-management"
          className="text-xs font-semibold !text-primary hover:!text-[#FF7A1A] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Ant Design Table */}
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgContainer: "transparent",
            colorText: "#ffffff",
            colorTextHeading: "#8E8E93",
            colorBorderSecondary: "#26262B",
            fontSize: 13,
            padding: 14,
          },
          components: {
            Table: {
              headerBg: "transparent",
              headerColor: "#8E8E93",
              headerSplitColor: "transparent",
              rowHoverBg: "rgba(255, 255, 255, 0.02)",
            },
          },
        }}
      >
        <div>
          <Table
            columns={columns}
            dataSource={mockOrganizerRequests}
            pagination={false}
            rowClassName="border-b border-[#26262B]/80 last:border-b-0"
            size="middle"
            scroll={{ x: 650 }}
          />
        </div>
      </ConfigProvider>
    </div>
  );
}
