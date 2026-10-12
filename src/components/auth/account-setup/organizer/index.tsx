"use client";

import React, { useRef } from "react";
import { Building2, Upload, X, FileText, AlertCircle } from "lucide-react";
import { Form } from "antd";
import FormField from "@/components/form";
import { AccountSetupFormData } from "../types";

interface Step2Props {
  formData: AccountSetupFormData;
  setFormData: React.Dispatch<React.SetStateAction<AccountSetupFormData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const organizerTypes = [
  "Individual / Solo Organizer",
  "Car Club / Enthusiast Group",
  "Business / LLC / Corporation",
  "Non-Profit / Charity",
  "Racing Team",
  "Government / Municipality",
];

export default function OrganizerStep({
  formData,
  setFormData,
  errors,
  setErrors,
}: Step2Props) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          brandLogoFile: file.name,
          brandLogoPreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Organizer Information
        </h2>
        <p className="text-xs sm:text-sm text-[#8E8E93]">
          Tell us about the organization or entity that will be running events.
        </p>
      </div>

      <Form layout="vertical" className="space-y-6">
        {/* Organization Details Card */}
        <div className="rounded-2xl p-5 sm:p-7 bg-[#141416] border border-[#26262B] space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="text-[#FF2E86]">
                <Building2 size={18} />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Organization Details
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#FF2E86] bg-[#FF2E86]/10 px-2.5 py-0.5 rounded-full border border-[#FF2E86]/20 tracking-wider">
              REQUIRED
            </span>
          </div>

          {/* Organizer / Business Name */}
          <div className="space-y-1">
            <FormField
              name="organizerName"
              label="ORGANIZER / BUSINESS / CLUB NAME"
              required
              placeholder="e.g. SoCal Speed Society LLC"
              type="text"
              value={formData.organizerName}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  organizerName: e.target.value,
                }));
                if (errors.organizerName)
                  setErrors((prev) => ({ ...prev, organizerName: "" }));
              }}
              labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-2.5 ${
                errors.organizerName
                  ? "!border-rose-500/80"
                  : "!border-[#2E2E34]"
              }`}
            />
            {errors.organizerName && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                <AlertCircle size={11} /> {errors.organizerName}
              </p>
            )}
          </div>

          {/* Organizer Type Pills Grid */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-[#CCCCCC] uppercase tracking-wider block">
              ORGANIZER TYPE <span className="text-[#FF2E86]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {organizerTypes.map((type) => {
                const isSelected = formData.organizerType === type;
                return (
                  <div
                    key={type}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        organizerType: type,
                      }));
                      if (errors.organizerType)
                        setErrors((prev) => ({ ...prev, organizerType: "" }));
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? "border-[#FF2E86]/60 bg-[#1C1C20] shadow-sm"
                        : errors.organizerType
                        ? "border-rose-500/40 bg-[#18181B]/60 hover:bg-[#18181B]"
                        : "border-[#2E2E34] bg-[#18181B]/60 hover:bg-[#18181B] hover:border-[#3E3E46]"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                        isSelected
                          ? "border-[#FF2E86] bg-[#FF2E86]"
                          : "border-[#4A4A52] bg-[#141416]"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-white truncate">
                      {type}
                    </span>
                  </div>
                );
              })}
            </div>
            {errors.organizerType && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                <AlertCircle size={11} /> {errors.organizerType}
              </p>
            )}
          </div>

          {/* Website & Social Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <FormField
                name="website"
                label="BUSINESS/ORGANIZATION WEBSITE"
                required
                placeholder="https://example.com"
                type="text"
                value={formData.website}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    website: e.target.value,
                  }));
                  if (errors.website)
                    setErrors((prev) => ({ ...prev, website: "" }));
                }}
                labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-2.5 ${
                  errors.website ? "!border-rose-500/80" : "!border-[#2E2E34]"
                }`}
              />
              {errors.website && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                  <AlertCircle size={11} /> {errors.website}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <FormField
                name="socialProfile"
                label="SOCIAL MEDIA PROFILE"
                required
                placeholder="@velocitysocal"
                type="text"
                value={formData.socialProfile}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    socialProfile: e.target.value,
                  }));
                  if (errors.socialProfile)
                    setErrors((prev) => ({ ...prev, socialProfile: "" }));
                }}
                labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-2.5 ${
                  errors.socialProfile
                    ? "!border-rose-500/80"
                    : "!border-[#2E2E34]"
                }`}
              />
              {errors.socialProfile && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                  <AlertCircle size={11} /> {errors.socialProfile}
                </p>
              )}
            </div>
          </div>

          {/* Public Contact Email / Phone */}
          <div className="space-y-1">
            <FormField
              name="publicContact"
              label="PUBLIC CONTACT EMAIL / PHONE"
              required
              placeholder="public-contact@yourdomain.com"
              type="text"
              value={formData.publicContact}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  publicContact: e.target.value,
                }));
                if (errors.publicContact)
                  setErrors((prev) => ({ ...prev, publicContact: "" }));
              }}
              labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-2.5 ${
                errors.publicContact
                  ? "!border-rose-500/80"
                  : "!border-[#2E2E34]"
              }`}
            />
            {errors.publicContact && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                <AlertCircle size={11} /> {errors.publicContact}
              </p>
            )}
          </div>

          {/* History Description */}
          <div className="space-y-1">
            <FormField
              name="historyDescription"
              label="ORGANIZATION / EVENT HISTORY DESCRIPTION"
              required
              placeholder="Describe your organization and previous event experience — how many events have you organized, what kind, estimated attendance, notable events, etc."
              type="textarea"
              rows={4}
              value={formData.historyDescription}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  historyDescription: e.target.value,
                }));
                if (errors.historyDescription)
                  setErrors((prev) => ({ ...prev, historyDescription: "" }));
              }}
              labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-2xl focus:!border-[#FF2E86] !text-sm resize-none ${
                errors.historyDescription
                  ? "!border-rose-500/80"
                  : "!border-[#2E2E34]"
              }`}
            />
            {errors.historyDescription && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                <AlertCircle size={11} /> {errors.historyDescription}
              </p>
            )}
          </div>

          {/* Brand Logo Upload Box */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#CCCCCC] uppercase tracking-wider block">
              LOGO OR BRAND MARK (OPTIONAL)
            </label>
            {formData.brandLogoFile ? (
              <div className="p-3 rounded-2xl bg-[#1C1C20] border border-[#2E2E34] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {formData.brandLogoPreview ? (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                      <img
                        src={formData.brandLogoPreview}
                        alt="Brand Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-[#252529] text-[#FF2E86] flex items-center justify-center shrink-0">
                      <FileText size={18} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {formData.brandLogoFile}
                    </p>
                    <p className="text-[10px] text-emerald-400 font-medium">
                      Logo attached
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      brandLogoFile: null,
                      brandLogoPreview: null,
                    }))
                  }
                  className="p-1.5 rounded-lg text-[#8E8E93] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Remove logo"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => logoInputRef.current?.click()}
                className="py-5 px-3 rounded-xl border border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 border-[#2E2E34] hover:border-[#FF2E86]/60 bg-[#18181B]/40 hover:bg-[#18181B]/70"
              >
                <div className="w-8 h-8 rounded-lg bg-[#222226] text-[#8E8E93] flex items-center justify-center">
                  <Upload size={15} />
                </div>
                <p className="text-xs font-semibold text-white">Upload file</p>
                <p className="text-[10px] text-[#8E8E93]">
                  PNG or SVG · Max 5 MB
                </p>
              </div>
            )}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleLogoUpload(e.target.files?.[0])}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}
