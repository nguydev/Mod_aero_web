"use client";

import { Modal, ConfigProvider, theme } from "antd";
import { X } from "lucide-react";
import { EventReportItem } from "./data";

interface ReportReviewModalProps {
  report: EventReportItem | null;
  isOpen: boolean;
  onClose: () => void;
  onResolve: (id: string) => void;
  onDismiss: (id: string) => void;
}

export default function ReportReviewModal({
  report,
  isOpen,
  onClose,
  onResolve,
  onDismiss,
}: ReportReviewModalProps) {
  if (!report) return null;

  const handleResolve = () => {
    onResolve(report.id);
    onClose();
  };

  const handleDismiss = () => {
    onDismiss(report.id);
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
        width={560}
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
              EVENT REPORT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {report.eventName}
            </h2>
          </div>

          {/* Key-Value Details */}
          <div className="divide-y divide-[#26262B]/80 text-sm">
            <div className="py-3 flex items-center justify-between first:pt-1">
              <span className="text-[#8E8E93]">Reported By</span>
              <span className="font-medium text-white">{report.reportedBy}</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Organizer</span>
              <span className="font-medium text-white">{report.organizer}</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Report Date</span>
              <span className="font-medium text-white">{report.reportDate}</span>
            </div>
            <div className="py-3 flex items-center justify-between">
              <span className="text-[#8E8E93]">Status</span>
              <span
                className={`font-semibold ${report.status === "Resolved"
                  ? "text-[#10B981]"
                  : report.status === "Dismissed"
                    ? "text-[#8E8E93]"
                    : "text-[#F59E0B]"
                  }`}
              >
                {report.status}
              </span>
            </div>
            <div className="py-3 space-y-1 last:pb-1">
              <span className="text-[#8E8E93] block">Report Details</span>
              <p className="text-white text-xs leading-relaxed bg-[#222226] p-3 rounded-xl border border-white/5">
                {report.fullReason || report.issueDescription}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleDismiss}
              className="flex-1 py-3 px-6 rounded-xl text-xs font-semibold text-white bg-[#222226] hover:bg-[#2C2C32] border border-white/5 transition-colors cursor-pointer text-center"
            >
              Dismiss Report
            </button>
            <button
              type="button"
              onClick={handleResolve}
              className="flex-1 py-3 px-6 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-[#FF2E86]/20 transition-all cursor-pointer text-center"
            >
              Resolve Issue
            </button>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
