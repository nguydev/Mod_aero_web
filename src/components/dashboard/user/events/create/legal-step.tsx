"use client";

import React, { useRef, useState } from "react";
import {
  BookOpen,
  Upload,
  AlertTriangle,
  Check,
  CheckCircle,
  ArrowLeft,
  X,
  File,
  AlertCircle,
} from "lucide-react";
import { Form } from "antd";
import FormField from "@/components/form";
import { EventFormData } from "./types";

interface LegalStepProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  onSubmit: () => void;
  onBack: () => void;
  isPublishing?: boolean;
}

export default function LegalStep({
  formData,
  setFormData,
  onSubmit,
  onBack,
  isPublishing = false,
}: LegalStepProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{
    requiresPermits?: string;
    venueAgreementFile?: string;
    hasInsurance?: string;
    requiresWaiver?: string;
  }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        venueAgreementFile: file.name,
      }));
      setErrors((prev) => ({ ...prev, venueAgreementFile: undefined }));
    }
  };

  const handleFormSubmit = () => {
    const newErrors: {
      requiresPermits?: string;
      venueAgreementFile?: string;
      hasInsurance?: string;
      requiresWaiver?: string;
    } = {};

    if (!formData.requiresPermits) {
      newErrors.requiresPermits = "Please confirm required permits";
    }
    if (!formData.venueAgreementFile) {
      newErrors.venueAgreementFile = "Please upload venue agreement or owner authorization document";
    }
    if (!formData.hasInsurance) {
      newErrors.hasInsurance = "Please confirm event insurance coverage";
    }
    if (!formData.requiresWaiver) {
      newErrors.requiresWaiver = "Please confirm liability waiver requirement";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit();
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleFormSubmit}
      className="space-y-6 [&_.ant-form-item]:!mb-4 [&_.ant-form-item-label]:!pb-1.5 [&_.ant-form-item-label_label]:!h-auto"
    >
      {/* Legal Documentation Card */}
      <div className="rounded-2xl md:rounded-3xl p-6 sm:p-8 bg-[#141416] border border-[#26262B] space-y-6">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[#26262B] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[#10B981]">
              <BookOpen size={16} />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Legal Documentation
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-md border border-[#10B981]/20 tracking-wider">
            REQUIRED
          </span>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Required Permits Checkbox */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Required Permits</span>
              <span className="text-[#FF2E86]">*</span>
            </label>
            <div>
              <div
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    requiresPermits: !prev.requiresPermits,
                  }));
                  setErrors((prev) => ({ ...prev, requiresPermits: undefined }));
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  errors.requiresPermits
                    ? "border-rose-500/80 bg-rose-500/5 hover:border-rose-400"
                    : formData.requiresPermits
                    ? "bg-[#1C1C20] border-[#FF2E86]/50 shadow-sm"
                    : "bg-[#1C1C20]/60 hover:bg-[#1C1C20] border-[#2E2E34]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    formData.requiresPermits
                      ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                      : errors.requiresPermits
                      ? "border-rose-500 bg-rose-500/10"
                      : "border-[#4A4A52] bg-[#141416]"
                  }`}
                >
                  {formData.requiresPermits && <Check size={13} strokeWidth={3} />}
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  This event requires permits (city, public road, park, noise, event permit, etc.)
                </span>
              </div>
              {errors.requiresPermits && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 px-1 font-medium">
                  <AlertCircle size={13} className="flex-shrink-0" />
                  <span>{errors.requiresPermits}</span>
                </div>
              )}
            </div>
          </div>

          {/* Venue Approval / Authorization Section */}
          <div className="space-y-4 pt-1">
            <div className="space-y-0.5">
              <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
                <span>Venue Approval / Authorization</span>
                <span className="text-[#FF2E86]">*</span>
              </label>
              <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                Required when the event is held on private or managed property — includes private lots, business venues, race tracks, public parks, or any location not owned by the organizer.
              </p>
            </div>

            {/* Venue Notes Textarea using FormField */}
            <div className="space-y-1">
              <FormField
                name="venueAuthorizationNotes"
                label="Venue / Property Authorization Notes"
                required
                placeholder="e.g. Written authorization from Petersen Automotive Museum property management (signed Mar 15, 2025). Event organizer has venue rental contract through Venue Events Group. Full property access granted for event grounds from 4:00 PM–11:00 PM on event date..."
                type="textarea"
                rows={4}
                value={formData.venueAuthorizationNotes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    venueAuthorizationNotes: e.target.value,
                  }))
                }
                labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm resize-none"
              />
              <p className="text-[11px] text-[#8E8E93] -mt-2.5">
                Summarize the nature of your authorization — ownership, rental, written permission, etc.
              </p>
            </div>

            {/* Venue Agreement Upload Box */}
            <div className="space-y-1.5 pt-1">
              <div className="space-y-0.5">
                <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
                  <span>Venue Agreement or Owner Authorization</span>
                  <span className="text-[#FF2E86]">*</span>
                </label>
                <p className="text-[11px] text-[#8E8E93]">
                  Property-owner permission letter, venue rental contract, or lease excerpt
                </p>
              </div>

              {formData.venueAgreementFile ? (
                <div className="p-4 rounded-xl bg-[#1C1C20] border border-[#2E2E34] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <File size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {formData.venueAgreementFile}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-semibold">
                        Ready for review
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        venueAgreementFile: null,
                      }))
                    }
                    className="p-1.5 rounded-lg text-[#8E8E93] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full py-8 px-4 rounded-2xl border border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 ${
                      errors.venueAgreementFile
                        ? "border-rose-500/80 bg-rose-500/5 hover:border-rose-400"
                        : "border-[#333338] hover:border-[#FF2E86]/50 bg-[#1C1C20]/40 hover:bg-[#1C1C20]/70"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors ${
                        errors.venueAgreementFile
                          ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                          : "bg-[#222226] border-white/5 text-[#8E8E93]"
                      }`}
                    >
                      <Upload size={18} />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-semibold text-white">
                        Click to upload
                      </p>
                      <p className="text-[11px] text-[#8E8E93]">
                        PDF, JPG, PNG · Max 10 MB
                      </p>
                    </div>
                  </div>

                  {errors.venueAgreementFile && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 px-1 font-medium animate-fadeIn">
                      <AlertCircle size={14} className="flex-shrink-0" />
                      <span>{errors.venueAgreementFile}</span>
                    </div>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                tabIndex={-1}
              />
            </div>
          </div>

          {/* Insurance Documentation */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Insurance Documentation</span>
              <span className="text-[#FF2E86]">*</span>
            </label>

            <div>
              <div
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    hasInsurance: !prev.hasInsurance,
                  }));
                  setErrors((prev) => ({ ...prev, hasInsurance: undefined }));
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  errors.hasInsurance
                    ? "border-rose-500/80 bg-rose-500/5 hover:border-rose-400"
                    : formData.hasInsurance
                    ? "bg-[#1C1C20] border-[#FF2E86]/50 shadow-sm"
                    : "bg-[#1C1C20]/60 hover:bg-[#1C1C20] border-[#2E2E34]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    formData.hasInsurance
                      ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                      : errors.hasInsurance
                      ? "border-rose-500 bg-rose-500/10"
                      : "border-[#4A4A52] bg-[#141416]"
                  }`}
                >
                  {formData.hasInsurance && <Check size={13} strokeWidth={3} />}
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  I have event insurance coverage for this event
                </span>
              </div>
              {errors.hasInsurance && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 px-1 font-medium">
                  <AlertCircle size={13} className="flex-shrink-0" />
                  <span>{errors.hasInsurance}</span>
                </div>
              )}
            </div>

            {/* Amber Warning Notice Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle
                size={18}
                className="text-amber-400 flex-shrink-0 mt-0.5"
              />
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Insurance is required for Track Days, Racing Events, Autocross, Driving Competitions, Large Meets (500+), and events with road closures. You must upload a valid COI before publishing those event types.
              </p>
            </div>
          </div>

          {/* Waivers / Releases of Liability */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Waivers / Releases of Liability</span>
              <span className="text-[#FF2E86]">*</span>
            </label>
            <div>
              <div
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    requiresWaiver: !prev.requiresWaiver,
                  }));
                  setErrors((prev) => ({ ...prev, requiresWaiver: undefined }));
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  errors.requiresWaiver
                    ? "border-rose-500/80 bg-rose-500/5 hover:border-rose-400"
                    : formData.requiresWaiver
                    ? "bg-[#1C1C20] border-[#FF2E86]/50 shadow-sm"
                    : "bg-[#1C1C20]/60 hover:bg-[#1C1C20] border-[#2E2E34]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    formData.requiresWaiver
                      ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                      : errors.requiresWaiver
                      ? "border-rose-500 bg-rose-500/10"
                      : "border-[#4A4A52] bg-[#141416]"
                  }`}
                >
                  {formData.requiresWaiver && <Check size={13} strokeWidth={3} />}
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  Attendees will be required to sign a waiver or release of liability
                </span>
              </div>
              {errors.requiresWaiver && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 px-1 font-medium">
                  <AlertCircle size={13} className="flex-shrink-0" />
                  <span>{errors.requiresWaiver}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="py-3 px-6 rounded-full text-xs font-semibold text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/10 transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isPublishing}
          className="py-3.5 px-8 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/25 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <CheckCircle size={15} />
          <span>{isPublishing ? "Publishing..." : "Publish Event"}</span>
        </button>
      </div>
    </Form>
  );
}
