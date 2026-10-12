"use client";

import { useState } from "react";
import { Table, ConfigProvider, theme } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
    walletStatsData,
    mockWithdrawRequests,
    WithdrawRequestItem,
} from "./data";
import WithdrawReviewModal from "./withdraw-review-modal";

export default function AdminWallet() {
    const [requests, setRequests] =
        useState<WithdrawRequestItem[]>(mockWithdrawRequests);
    const [selectedRequest, setSelectedRequest] =
        useState<WithdrawRequestItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenReview = (request: WithdrawRequestItem) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const handleApprove = (id: string) => {
        setRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
        );
    };

    const handleReject = (id: string) => {
        setRequests((prev) =>
            prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
        );
    };

    const columns: ColumnsType<WithdrawRequestItem> = [
        {
            title: "ORGANIZER",
            dataIndex: "organizer",
            key: "organizer",
            width: "30%",
            render: (_: string, record: WithdrawRequestItem) => (
                <div className="flex items-center gap-3">
                    <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${record.avatarBg} ${record.avatarColor} border border-white/5`}
                    >
                        {record.initials}
                    </div>
                    <span className="text-sm font-bold text-white whitespace-nowrap">
                        {record.organizer}
                    </span>
                </div>
            ),
        },
        {
            title: "AMOUNT",
            dataIndex: "amount",
            key: "amount",
            width: "20%",
            render: (amount: string) => (
                <span className="text-sm font-bold text-[#FF2E86]">{amount}</span>
            ),
        },
        {
            title: "REQUEST DATE",
            dataIndex: "requestDate",
            key: "requestDate",
            width: "22%",
            render: (date: string) => (
                <span className="text-sm text-[#8E8E93] font-normal">{date}</span>
            ),
        },
        {
            title: "STATUS",
            dataIndex: "status",
            key: "status",
            width: "16%",
            render: (status: "Pending" | "Approved" | "Rejected") => (
                <span
                    className={`text-xs font-semibold ${status === "Approved"
                        ? "text-[#10B981]"
                        : status === "Rejected"
                            ? "text-[#FF4D4F]"
                            : "text-[#F59E0B]"
                        }`}
                >
                    {status}
                </span>
            ),
        },
        {
            title: "ACTION",
            key: "action",
            width: "12%",
            render: (_: unknown, record: WithdrawRequestItem) => (
                <button
                    type="button"
                    onClick={() => handleOpenReview(record)}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-semibold !text-[#D1D1D6] hover:!text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-all text-center cursor-pointer"
                >
                    {record.status === "Pending" ? "Review" : "View"}
                </button>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                    Wallet
                </h1>
                <p className="text-xs md:text-sm text-[#8E8E93] font-normal">
                    Monitor platform finances and process organizer withdrawals.
                </p>
            </div>

            {/* 3 Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {walletStatsData.map((stat) => (
                    <div
                        key={stat.id}
                        className="relative overflow-hidden rounded-2xl p-5 md:p-6 bg-gradient-to-b from-[#2c0e1a]/85 via-[#180911]/95 to-[#12060c] border border-[#6b1834] hover:border-[#FF2E86]/60 transition-all duration-300 flex flex-col justify-between min-h-[140px] shadow-[0_4px_24px_rgba(0,0,0,0.5)] group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FF2E86]/[0.03] to-[#FF7A1A]/[0.05] pointer-events-none" />

                        <div className="relative z-10">
                            <p className="text-[11px] font-bold tracking-wider text-[#FF2E86] uppercase">
                                {stat.title}
                            </p>
                            <h3 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-2.5">
                                {stat.value}
                            </h3>
                        </div>

                        <div className="relative z-10 mt-3">
                            <p className="text-xs font-medium text-[#B83B5E]">
                                {stat.subtext}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Withdraw Requests Table Container */}
            <div className="rounded-2xl bg-[#141416] border border-[#222226] p-5 md:p-6 shadow-sm overflow-hidden">
                <div className="mb-4">
                    <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                        Withdraw Requests
                    </h3>
                    <p className="text-xs text-[#8E8E93] mt-0.5">
                        Review and process organizer withdrawal requests.
                    </p>
                </div>

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
                        dataSource={requests}
                        rowKey="id"
                        pagination={false}
                        rowClassName="border-b border-[#222226]/80 last:border-b-0"
                        size="middle"
                    />
                </ConfigProvider>
            </div>

            {/* Review Modal */}
            <WithdrawReviewModal
                request={selectedRequest}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </div>
    );
}