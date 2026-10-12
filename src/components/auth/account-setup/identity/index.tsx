"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  FileText,
  CheckCircle2,
  CreditCard,
  UserCheck,
  AlertCircle,
  Eye,
} from "lucide-react";
import { Form, Modal } from "antd";
import FormField from "@/components/form";
import { AccountSetupFormData } from "../types";

interface Step1Props {
  formData: AccountSetupFormData;
  setFormData: React.Dispatch<React.SetStateAction<AccountSetupFormData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export default function IdentityStep({
  formData,
  setFormData,
  errors,
  setErrors,
}: Step1Props) {
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const selfieInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const handleFileUpload = (
    field: "frontIdFile" | "backIdFile" | "selfieFile",
    previewField: "frontIdPreview" | "backIdPreview" | "selfiePreview",
    file?: File
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [field]: file.name,
          [previewField]: reader.result as string,
        }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (
    field: "frontIdFile" | "backIdFile" | "selfieFile",
    previewField: "frontIdPreview" | "backIdPreview" | "selfiePreview"
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: null,
      [previewField]: null,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Identity Verification
        </h2>
        <p className="text-xs sm:text-sm text-[#8E8E93]">
          We need to verify your identity to ensure platform safety for all members.
        </p>
      </div>

      <Form layout="vertical" className="space-y-6">
        {/* Card 1: Government-Issued Photo ID */}
        <div className="rounded-2xl p-5 sm:p-7 bg-[#141416] border border-[#26262B] space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="text-[#FF2E86]">
                <CreditCard size={18} />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Government-Issued Photo ID
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#FF2E86] bg-[#FF2E86]/10 px-2.5 py-0.5 rounded-full border border-[#FF2E86]/20 tracking-wider">
              REQUIRED
            </span>
          </div>

          {/* Front & Back Upload Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Front of ID */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#CCCCCC] uppercase tracking-wider block">
                FRONT OF ID <span className="text-[#FF2E86]">*</span>
              </label>
              {formData.frontIdFile ? (
                <div className="p-3 rounded-2xl bg-[#1C1C20] border border-[#2E2E34] flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    {formData.frontIdPreview ? (
                      <div
                        onClick={() =>
                          setPreviewImage({
                            url: formData.frontIdPreview!,
                            title: "Front of ID Preview",
                          })
                        }
                        className="relative w-14 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 cursor-pointer group/img"
                      >
                        <img
                          src={formData.frontIdPreview}
                          alt="Front of ID"
                          className="w-full h-full object-cover transition-transform group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye size={14} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-[#252529] text-[#FF2E86] flex items-center justify-center shrink-0">
                        <FileText size={18} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {formData.frontIdFile}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-medium">
                        Uploaded & Verified
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {formData.frontIdPreview && (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImage({
                            url: formData.frontIdPreview!,
                            title: "Front of ID Preview",
                          })
                        }
                        className="p-1.5 rounded-lg text-[#8E8E93] hover:text-white hover:bg-white/10 transition-colors"
                        title="View image"
                      >
                        <Eye size={14} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFile("frontIdFile", "frontIdPreview")
                      }
                      className="p-1.5 rounded-lg text-[#8E8E93] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => frontInputRef.current?.click()}
                  className={`py-5 px-3 rounded-2xl border border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                    errors.frontIdFile
                      ? "border-rose-500/80 bg-rose-500/5"
                      : "border-[#2E2E34] hover:border-[#FF2E86]/60 bg-[#18181B]/40 hover:bg-[#18181B]/70"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#222226] text-[#8E8E93] flex items-center justify-center">
                    <Upload size={15} />
                  </div>
                  <p className="text-xs font-semibold text-white">Upload file</p>
                  <p className="text-[10px] text-[#8E8E93]">
                    Driver&apos;s license, passport, or state ID
                  </p>
                </div>
              )}
              <input
                ref={frontInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  handleFileUpload(
                    "frontIdFile",
                    "frontIdPreview",
                    e.target.files?.[0]
                  )
                }
                style={{ display: "none" }}
              />
              {errors.frontIdFile && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                  <AlertCircle size={11} /> {errors.frontIdFile}
                </p>
              )}
            </div>

            {/* Back of ID */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#CCCCCC] uppercase tracking-wider block">
                BACK OF ID <span className="text-[#FF2E86]">*</span>
              </label>
              {formData.backIdFile ? (
                <div className="p-3 rounded-2xl bg-[#1C1C20] border border-[#2E2E34] flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    {formData.backIdPreview ? (
                      <div
                        onClick={() =>
                          setPreviewImage({
                            url: formData.backIdPreview!,
                            title: "Back of ID Preview",
                          })
                        }
                        className="relative w-14 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 cursor-pointer group/img"
                      >
                        <img
                          src={formData.backIdPreview}
                          alt="Back of ID"
                          className="w-full h-full object-cover transition-transform group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye size={14} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-[#252529] text-[#FF2E86] flex items-center justify-center shrink-0">
                        <FileText size={18} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {formData.backIdFile}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-medium">
                        Uploaded & Verified
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {formData.backIdPreview && (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImage({
                            url: formData.backIdPreview!,
                            title: "Back of ID Preview",
                          })
                        }
                        className="p-1.5 rounded-lg text-[#8E8E93] hover:text-white hover:bg-white/10 transition-colors"
                        title="View image"
                      >
                        <Eye size={14} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFile("backIdFile", "backIdPreview")
                      }
                      className="p-1.5 rounded-lg text-[#8E8E93] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => backInputRef.current?.click()}
                  className={`py-5 px-3 rounded-2xl border border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1 ${
                    errors.backIdFile
                      ? "border-rose-500/80 bg-rose-500/5"
                      : "border-[#2E2E34] hover:border-[#FF2E86]/60 bg-[#18181B]/40 hover:bg-[#18181B]/70"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#222226] text-[#8E8E93] flex items-center justify-center">
                    <Upload size={15} />
                  </div>
                  <p className="text-xs font-semibold text-white">Upload file</p>
                  <p className="text-[10px] text-[#8E8E93]">
                    Clear, unobstructed scan
                  </p>
                </div>
              )}
              <input
                ref={backInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) =>
                  handleFileUpload(
                    "backIdFile",
                    "backIdPreview",
                    e.target.files?.[0]
                  )
                }
                style={{ display: "none" }}
              />
              {errors.backIdFile && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                  <AlertCircle size={11} /> {errors.backIdFile}
                </p>
              )}
            </div>
          </div>

          {/* Legal Names Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <FormField
                name="legalFirstName"
                label="LEGAL FIRST NAME"
                required
                placeholder="John"
                type="text"
                value={formData.legalFirstName}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    legalFirstName: e.target.value,
                  }));
                  if (errors.legalFirstName)
                    setErrors((prev) => ({ ...prev, legalFirstName: "" }));
                }}
                labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-2.5 ${
                  errors.legalFirstName
                    ? "!border-rose-500/80"
                    : "!border-[#2E2E34]"
                }`}
              />
              {errors.legalFirstName && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                  <AlertCircle size={11} /> {errors.legalFirstName}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <FormField
                name="legalLastName"
                label="LEGAL LAST NAME"
                required
                placeholder="Ramirez"
                type="text"
                value={formData.legalLastName}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    legalLastName: e.target.value,
                  }));
                  if (errors.legalLastName)
                    setErrors((prev) => ({ ...prev, legalLastName: "" }));
                }}
                labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-2.5 ${
                  errors.legalLastName
                    ? "!border-rose-500/80"
                    : "!border-[#2E2E34]"
                }`}
              />
              {errors.legalLastName && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                  <AlertCircle size={11} /> {errors.legalLastName}
                </p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <FormField
              name="dateOfBirth"
              label="DATE OF BIRTH"
              required
              type="date"
              labelClassName="!text-[11px] !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName={`!bg-[#18181B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-2.5 ${
                errors.dateOfBirth
                  ? "!border-rose-500/80"
                  : "!border-[#2E2E34]"
              }`}
              onChange={(date, dateString) => {
                setFormData((prev) => ({
                  ...prev,
                  dateOfBirth:
                    typeof dateString === "string" ? dateString : "",
                }));
                if (errors.dateOfBirth)
                  setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
              }}
            />
            {errors.dateOfBirth && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                <AlertCircle size={11} /> {errors.dateOfBirth}
              </p>
            )}
          </div>
        </div>

        {/* Card 2: Selfie Verification */}
        <div className="rounded-2xl p-5 sm:p-7 bg-[#141416] border border-[#26262B] space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="text-[#FF2E86]">
                <UserCheck size={18} />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Selfie Verification
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#FF2E86] bg-[#FF2E86]/10 px-2.5 py-0.5 rounded-full border border-[#FF2E86]/20 tracking-wider">
              REQUIRED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Selfie Upload Box */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#CCCCCC] uppercase tracking-wider block">
                SELFIE WITH ID <span className="text-[#FF2E86]">*</span>
              </label>
              {formData.selfieFile ? (
                <div className="p-3.5 rounded-2xl bg-[#1C1C20] border border-[#2E2E34] flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 min-w-0">
                    {formData.selfiePreview ? (
                      <div
                        onClick={() =>
                          setPreviewImage({
                            url: formData.selfiePreview!,
                            title: "Selfie with ID Preview",
                          })
                        }
                        className="relative w-14 h-14 rounded-2xl overflow-hidden bg-black/40 border border-white/10 shrink-0 cursor-pointer group/img"
                      >
                        <img
                          src={formData.selfiePreview}
                          alt="Selfie"
                          className="w-full h-full object-cover transition-transform group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <Eye size={14} className="text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-[#252529] text-[#FF2E86] flex items-center justify-center shrink-0">
                        <FileText size={18} />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {formData.selfieFile}
                      </p>
                      <p className="text-[10px] text-emerald-400 font-medium">
                        Selfie attached
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {formData.selfiePreview && (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImage({
                            url: formData.selfiePreview!,
                            title: "Selfie with ID Preview",
                          })
                        }
                        className="p-1.5 rounded-lg text-[#8E8E93] hover:text-white hover:bg-white/10 transition-colors"
                        title="View image"
                      >
                        <Eye size={14} />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFile("selfieFile", "selfiePreview")
                      }
                      className="p-1.5 rounded-lg text-[#8E8E93] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove file"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => selfieInputRef.current?.click()}
                  className={`py-8 px-3 rounded-2xl border border-dashed text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-1.5 ${
                    errors.selfieFile
                      ? "border-rose-500/80 bg-rose-500/5"
                      : "border-[#2E2E34] hover:border-[#FF2E86]/60 bg-[#18181B]/40 hover:bg-[#18181B]/70"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#222226] text-[#8E8E93] flex items-center justify-center">
                    <Upload size={15} />
                  </div>
                  <p className="text-xs font-semibold text-white">Upload file</p>
                  <p className="text-[10px] text-[#8E8E93]">
                    Hold your ID next to your face - Good lighting
                  </p>
                </div>
              )}
              <input
                ref={selfieInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileUpload(
                    "selfieFile",
                    "selfiePreview",
                    e.target.files?.[0]
                  )
                }
                style={{ display: "none" }}
              />
              {errors.selfieFile && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 px-1 font-medium">
                  <AlertCircle size={11} /> {errors.selfieFile}
                </p>
              )}
            </div>

            {/* Guidelines Checklist */}
            <div className="p-4 rounded-xl bg-[#18181B] border border-[#2E2E34] space-y-2.5">
              <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
                GUIDELINES
              </p>
              <ul className="space-y-2 text-xs text-[#CCCCCC]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#FF2E86] shrink-0" />
                  <span>Face clearly visible and unobstructed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#FF2E86] shrink-0" />
                  <span>ID held next to your face</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#FF2E86] shrink-0" />
                  <span>Good, even lighting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#FF2E86] shrink-0" />
                  <span>No sunglasses or hats</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Form>

      {/* Image Preview Modal */}
      <Modal
        open={Boolean(previewImage)}
        onCancel={() => setPreviewImage(null)}
        footer={null}
        centered
        width={540}
        className="[&_.ant-modal-content]:!bg-[#141416] [&_.ant-modal-content]:!border [&_.ant-modal-content]:!border-[#26262B] [&_.ant-modal-content]:!rounded-3xl [&_.ant-modal-content]:!p-6"
      >
        {previewImage && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#26262B]">
              <h3 className="text-sm font-bold text-white tracking-tight">
                {previewImage.title}
              </h3>
            </div>
            <div className="w-full h-80 rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
              <img
                src={previewImage.url}
                alt="Document Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
