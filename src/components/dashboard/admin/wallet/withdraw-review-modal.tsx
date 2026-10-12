"use client";

import React from "react";
import { Modal, ConfigProvider, theme } from "antd";
import { X } from "lucide-react";
import { WithdrawRequestItem } from "./data";

interface WithdrawReviewModalProps {
  request: WithdrawRequestItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function WithdrawReviewModal({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: WithdrawReviewModalProps) {
  if (!request) return null;

  const handleApprove = () => {
    onApprove(request.id);
    onClose();
  };

  const handleReject = () => {
    onReject(request.id);
    onClose();
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgElevated: "#18181A",
          colorBorderSecondary: "#2A2A30",
          boxShadow: "none",
          boxShadowSecondary: "none",
          boxShadowTertiary: "none",
        },
      }}
    >
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
        width={540}
        className="[&_.ant-modal-content]:!shadow-none"
        closeIcon={
          <div className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors">
            <X size={15} />
          </div>
        }
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#FF2E86] uppercase tracking-wider">
              WITHDRAW REQUEST
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {request.organizer}
            </h2>
          </div>

          {/* Key-Value Details */}
          <div className="divide-y divide-[#26262B]/80 text-sm">
            <div className="py-3 flex items-center justify-between first:pt-1">
              <span className="text-[#8E8E93]">Organizer</span>
              <span className="font-medium text-white">{request.organizer}</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Requested Amount</span>
              <span className="font-bold text-white text-base">
                {request.amount}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Available Balance</span>
              <span className="font-bold text-white text-base">
                {request.availableBalance}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Request Date</span>
              <span className="font-medium text-white">
                {request.requestDate}
              </span>
            </div>
            <div className="py-3 flex items-center justify-between last:pb-1">
              <span className="text-[#8E8E93]">Status</span>
              <span
                className={`font-semibold ${request.status === "Approved"
                  ? "text-[#10B981]"
                  : request.status === "Rejected"
                    ? "text-[#FF4D4F]"
                    : "text-[#F59E0B]"
                  }`}
              >
                {request.status}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleReject}
              className="flex-1 py-3.5 px-6 rounded-2xl text-xs font-bold text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-colors cursor-pointer text-center"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={handleApprove}
              className="flex-1 py-3.5 px-6 rounded-2xl text-xs font-bold text-white bg-[#22C55E] hover:bg-[#16A34A] transition-colors cursor-pointer text-center"
            >
              Approve
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
