"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { mockEventReports, EventReportItem } from "./data";
import ReportReviewModal from "./report-review-modal";

export default function AdminEventReports() {
  const [reports, setReports] = useState<EventReportItem[]>(mockEventReports);
  const [selectedReport, setSelectedReport] = useState<EventReportItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReview = (report: EventReportItem) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleResolve = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Resolved" } : r))
    );
  };

  const handleDismiss = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Dismissed" } : r))
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Event Reports
        </h1>
        <p className="text-xs md:text-sm text-[#8E8E93] font-normal">
          Review reports submitted against events on Velocity.
        </p>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-2xl p-5 md:p-6 bg-[#141416] border border-[#26262B] hover:border-white/10 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
          >
            {/* Left Content */}
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm md:text-base font-bold text-white">
                  {report.eventName}
                </h3>
                <span
                  className={`text-xs font-semibold ${report.status === "Resolved"
                    ? "text-[#10B981]"
                    : report.status === "Dismissed"
                      ? "text-[#8E8E93]"
                      : "text-[#F59E0B]"
                    }`}
                >
                  {report.status}
                </span>
              </div>

              <p className="text-xs text-[#8E8E93]">
                Reported by {report.reportedBy} · {report.reportDate} ·
                Organizer: {report.organizer}
              </p>

              <p className="text-xs text-[#8E8E93] pt-0.5">
                {report.issueDescription}
              </p>
            </div>

            {/* Right Action Button */}
            <div className="self-end md:self-center shrink-0">
              <button
                type="button"
                onClick={() => handleOpenReview(report)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold !text-[#D1D1D6] hover:!text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-all text-center cursor-pointer"
              >
                <span>Review Report</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      <ReportReviewModal
        report={selectedReport}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onResolve={handleResolve}
        onDismiss={handleDismiss}
      />
    </div>
  );
}
