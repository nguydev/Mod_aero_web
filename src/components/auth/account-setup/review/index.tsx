"use client";

import React from "react";
import {
  CheckCircle2,
  Building2,
  Calendar,
  ShieldCheck,
  Shield,
  AlertCircle,
  Info,
  Check,
} from "lucide-react";
import { AccountSetupFormData } from "../types";

interface Step5Props {
  formData: AccountSetupFormData;
  setFormData: React.Dispatch<React.SetStateAction<AccountSetupFormData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function ReviewStep({
  formData,
  setFormData,
  errors,
  setErrors,
}: Step5Props) {
  const requiresInsurance = formData.eventTypes.some((t) =>
    [
      "Large Meet (500+)",
      "Autocross",
      "Track Day",
      "Racing Event",
      "Driving Competition",
      "Road Closure Event",
    ].includes(t)
  );

  const toggleCheck = (
    field:
      | "checkAccurate"
      | "checkTerms"
      | "checkReview"
      | "checkEmailNotification"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    if (errors.beforeSubmit) {
      setErrors((prev) => ({ ...prev, beforeSubmit: "" }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Review & Submit
        </h2>
        <p className="text-xs sm:text-sm text-[#8E8E93]">
          Review your application before submitting for admin review.
        </p>
      </div>

      {/* Card 1: Identity Verification */}
      <div className="rounded-2xl p-5 sm:p-6 bg-[#141416] border border-[#26262B] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-[#FF2E86]">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Identity Verification
            </h3>
          </div>
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
        </div>

        <ul className="space-y-2 text-xs sm:text-[13px] text-[#CCCCCC]">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>Government ID — Uploaded</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>
              Legal name — {formData.legalFirstName || "John"}{" "}
              {formData.legalLastName || "Ramirez"}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>Date of birth — {formData.dateOfBirth ? "Provided" : "Provided"}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>Selfie verification — Uploaded</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>Phone — Verified</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>Email — Verified</span>
          </li>
        </ul>
      </div>

      {/* Card 2: Organizer Information */}
      <div className="rounded-2xl p-5 sm:p-6 bg-[#141416] border border-[#26262B] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-[#FF2E86]">
              <Building2 size={18} />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Organizer Information
            </h3>
          </div>
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
        </div>

        <ul className="space-y-2 text-xs sm:text-[13px] text-[#CCCCCC]">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>
              Organization name — {formData.organizerName || "Provided"}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>Type — {formData.organizerType || "Individual / Solo Organizer"}</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>Website / Social profile — Provided</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>Event history description — Completed</span>
          </li>
        </ul>
      </div>

      {/* Card 3: Legal Authorization */}
      <div className="rounded-2xl p-5 sm:p-6 bg-[#141416] border border-[#26262B] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-[#FF2E86]">
              <Calendar size={18} />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Legal Authorization
            </h3>
          </div>
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
        </div>

        <ul className="space-y-2 text-xs sm:text-[13px] text-[#CCCCCC]">
          {formData.venueTypes.length > 0 ? (
            formData.venueTypes.map((venue) => (
              <li key={venue} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
                <span>{venue} documentation — Uploaded</span>
              </li>
            ))
          ) : (
            <>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
                <span>Race Track documentation — Uploaded</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
                <span>Business Venue documentation — Uploaded</span>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Card 4: Insurance */}
      <div className="rounded-2xl p-5 sm:p-6 bg-[#141416] border border-[#26262B] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-[#FF2E86]">
              <Shield size={18} />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Insurance
            </h3>
          </div>
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
        </div>

        <ul className="space-y-2 text-xs sm:text-[13px] text-[#CCCCCC]">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E86] shrink-0" />
            <span>
              {requiresInsurance && formData.coiFile
                ? "Certificate of Insurance (COI) — Uploaded"
                : "Not required for your event types"}
            </span>
          </li>
        </ul>
      </div>

      {/* Card 5: Before you submit */}
      <div
        className={`rounded-2xl p-5 sm:p-6 border transition-colors space-y-4 ${
          errors.beforeSubmit
            ? "bg-rose-500/5 border-rose-500/80"
            : "bg-[#180D13]/70 border-[#38101E]"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="text-[#FF2E86]">
            <Info size={18} />
          </div>
          <h3 className="text-sm font-bold text-white tracking-tight">
            Before you submit
          </h3>
        </div>

        <div className="space-y-3 pt-1">
          {/* Checkbox 1 */}
          <div
            onClick={() => toggleCheck("checkAccurate")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                formData.checkAccurate
                  ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                  : "border-[#4A4A52] bg-[#141416] group-hover:border-[#FF2E86]/60"
              }`}
            >
              {formData.checkAccurate && <Check size={11} strokeWidth={3} />}
            </div>
            <span className="text-xs sm:text-[13px] text-[#CCCCCC] group-hover:text-white transition-colors">
              All information I have provided is accurate and truthful
            </span>
          </div>

          {/* Checkbox 2 */}
          <div
            onClick={() => toggleCheck("checkTerms")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                formData.checkTerms
                  ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                  : "border-[#4A4A52] bg-[#141416] group-hover:border-[#FF2E86]/60"
              }`}
            >
              {formData.checkTerms && <Check size={11} strokeWidth={3} />}
            </div>
            <span className="text-xs sm:text-[13px] text-[#CCCCCC] group-hover:text-white transition-colors">
              I agree to the Velocity Terms of Service and Creator Agreement
            </span>
          </div>

          {/* Checkbox 3 */}
          <div
            onClick={() => toggleCheck("checkReview")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                formData.checkReview
                  ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                  : "border-[#4A4A52] bg-[#141416] group-hover:border-[#FF2E86]/60"
              }`}
            >
              {formData.checkReview && <Check size={11} strokeWidth={3} />}
            </div>
            <span className="text-xs sm:text-[13px] text-[#CCCCCC] group-hover:text-white transition-colors">
              I understand my account will be reviewed by the Velocity admin team
            </span>
          </div>

          {/* Checkbox 4 */}
          <div
            onClick={() => toggleCheck("checkEmailNotification")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${
                formData.checkEmailNotification
                  ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                  : "border-[#4A4A52] bg-[#141416] group-hover:border-[#FF2E86]/60"
              }`}
            >
              {formData.checkEmailNotification && (
                <Check size={11} strokeWidth={3} />
              )}
            </div>
            <span className="text-xs sm:text-[13px] text-[#CCCCCC] group-hover:text-white transition-colors">
              I will be notified by email once my application has been reviewed
            </span>
          </div>
        </div>

        {errors.beforeSubmit && (
          <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-1 font-medium">
            <AlertCircle size={12} /> {errors.beforeSubmit}
          </p>
        )}
      </div>
    </div>
  );
}
