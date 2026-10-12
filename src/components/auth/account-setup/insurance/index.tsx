"use client";

import React, { useRef } from "react";
import { ShieldCheck, Upload, X, FileText, AlertTriangle, AlertCircle } from "lucide-react";
import { AccountSetupFormData } from "../types";

interface Step4Props {
  formData: AccountSetupFormData;
  setFormData: React.Dispatch<React.SetStateAction<AccountSetupFormData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const insuranceRules = [
  { type: "Cars & Coffee", requirement: "NOT REQUIRED", badgeStyle: "bg-white/5 text-[#8E8E93] border-white/10" },
  { type: "Scenic Drive / Cruise", requirement: "NOT REQUIRED", badgeStyle: "bg-white/5 text-[#8E8E93] border-white/10" },
  { type: "Car Show", requirement: "RECOMMENDED", badgeStyle: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { type: "Large Meet (500+)", requirement: "REQUIRED", badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { type: "Autocross", requirement: "REQUIRED", badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { type: "Track Day", requirement: "REQUIRED", badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { type: "Racing Event", requirement: "REQUIRED", badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { type: "Driving Competition", requirement: "REQUIRED", badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { type: "Road Closure Event", requirement: "REQUIRED", badgeStyle: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { type: "Parking Lot Event", requirement: "NOT REQUIRED", badgeStyle: "bg-white/5 text-[#8E8E93] border-white/10" },
];

export default function InsuranceStep({
  formData,
  setFormData,
  errors,
  setErrors,
}: Step4Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if any selected event type strictly requires insurance
  const requiresInsurance = formData.eventTypes.some((t) =>
    ["Large Meet (500+)", "Autocross", "Track Day", "Racing Event", "Driving Competition", "Road Closure Event"].includes(t)
  );

  const handleFileUpload = (file?: File) => {
    if (file) {
      setFormData((prev) => ({ ...prev, coiFile: file.name }));
      if (errors.coiFile) {
        setErrors((prev) => ({ ...prev, coiFile: "" }));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Insurance Documentation
        </h2>
        <p className="text-xs sm:text-sm text-[#8E8E93]">
          Based on your selected event types, here is your insurance requirement.
        </p>
      </div>

      {/* Status Card */}
      {!requiresInsurance ? (
        <div className="rounded-2xl p-5 bg-[#141416] border border-[#26262B] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#1C1C20] text-[#8E8E93] flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">No Insurance Required</h4>
            <p className="text-xs text-[#8E8E93]">
              Based on your selected event types, insurance documentation is not required at this time.
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`rounded-2xl p-5 border space-y-4 transition-colors ${
            errors.coiFile
              ? "bg-rose-500/5 border-rose-500/80"
              : "bg-amber-500/10 border-amber-500/30"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                errors.coiFile
                  ? "bg-rose-500/20 text-rose-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Certificate of Insurance (COI) Required <span className="text-[#FF2E86]">*</span>
              </h4>
              <p className="text-xs text-amber-200/90">
                You selected higher-risk motorsport or track event types. Please upload your valid COI.
              </p>
            </div>
          </div>

          {/* Upload COI Box */}
          {formData.coiFile ? (
            <div className="p-3.5 rounded-xl bg-[#141416] border border-[#2E2E34] flex items-center justify-between">
              <div className="flex items-center gap-2.5 truncate">
                <FileText size={16} className="text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-white truncate">
                  {formData.coiFile}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, coiFile: null }))}
                className="p-1 rounded-lg text-[#8E8E93] hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`py-5 px-3 rounded-xl border border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                errors.coiFile
                  ? "border-rose-500/80 bg-rose-500/10 hover:bg-rose-500/20"
                  : "border-amber-500/40 bg-[#141416]/50 hover:bg-[#141416]/80"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  errors.coiFile
                    ? "bg-rose-500/20 text-rose-400"
                    : "bg-[#222226] text-amber-400"
                }`}
              >
                <Upload size={15} />
              </div>
              <p className="text-xs font-semibold text-white">Upload COI Document</p>
              <p className="text-[10px] text-[#8E8E93]">PDF or JPG · Max 10 MB</p>
            </div>
          )}

          {errors.coiFile && (
            <p className="text-[11px] text-rose-400 flex items-center gap-1 font-medium">
              <AlertCircle size={12} /> {errors.coiFile}
            </p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/*"
            onChange={(e) => handleFileUpload(e.target.files?.[0])}
            style={{ display: "none" }}
          />
        </div>
      )}

      {/* Table / List Card: Insurance Requirements by Event Type */}
      <div className="rounded-2xl p-5 sm:p-7 bg-[#141416] border border-[#26262B] space-y-4">
        <h3 className="text-sm font-bold text-white tracking-tight">
          Insurance Requirements by Event Type
        </h3>

        <div className="divide-y divide-[#222226]">
          {insuranceRules.map((rule) => {
            const isSelected = formData.eventTypes.includes(rule.type);
            return (
              <div
                key={rule.type}
                className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-2.5">
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-[#FF2E86] shrink-0" />
                  )}
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isSelected ? "text-white font-semibold" : "text-[#8E8E93]"
                    }`}
                  >
                    {rule.type}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-md border tracking-wider uppercase ${rule.badgeStyle}`}
                >
                  {rule.requirement}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
