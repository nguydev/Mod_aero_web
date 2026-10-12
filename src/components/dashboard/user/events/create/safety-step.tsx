"use client";

import React, { useState } from "react";
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import { Form } from "antd";
import FormField from "@/components/form";
import { EventFormData } from "./types";

interface SafetyStepProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  onNext: () => void;
  onBack: () => void;
}

export default function SafetyStep({
  formData,
  setFormData,
  onNext,
  onBack,
}: SafetyStepProps) {
  const [errors, setErrors] = useState<{
    includesRoadRoute?: string;
    hasMedicalPlan?: string;
    hasPoliceControl?: string;
  }>({});

  const handleSubmit = () => {
    const newErrors: {
      includesRoadRoute?: string;
      hasMedicalPlan?: string;
      hasPoliceControl?: string;
    } = {};

    if (!formData.includesRoadRoute) {
      newErrors.includesRoadRoute = "Please confirm road/route information";
    }
    if (!formData.hasMedicalPlan) {
      newErrors.hasMedicalPlan = "Please confirm medical/first-aid plan";
    }
    if (!formData.hasPoliceControl) {
      newErrors.hasPoliceControl = "Please confirm police/traffic control";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-6 [&_.ant-form-item]:!mb-4 [&_.ant-form-item-label]:!pb-1.5 [&_.ant-form-item-label_label]:!h-auto"
    >
      {/* Safety Information Card */}
      <div className="rounded-2xl md:rounded-3xl p-6 sm:p-8 bg-[#141416] border border-[#26262B] space-y-6">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[#26262B] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-[#F59E0B]">
              <Shield size={16} />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Safety Information
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-md border border-[#F59E0B]/20 tracking-wider">
            REQUIRED
          </span>
        </div>

        {/* Form Fields using FormField Component (Vertical Layout) */}
        <div className="space-y-4">
          {/* Event Rules & Code of Conduct */}
          <div className="space-y-1">
            <FormField
              name="rulesCodeOfConduct"
              label="Event Rules & Code of Conduct"
              required
              placeholder="e.g. Street-legal vehicles only. No burnouts, tire smoking, or aggressive driving on venue property. Maximum speed 15 mph on venue grounds. All attendees must follow organizer and venue staff instructions at all times..."
              type="textarea"
              rows={4}
              value={formData.rulesCodeOfConduct}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  rulesCodeOfConduct: e.target.value,
                }))
              }
              labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm resize-none"
            />
            <p className="text-[11px] text-[#8E8E93] -mt-2.5">
              Vehicle requirements, speed limits, parking rules, noise restrictions, attendee behavior expectations
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-2 pt-1">
            <div className="space-y-0.5">
              <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
                <span>Emergency Contact</span>
                <span className="text-[#FF2E86]">*</span>
              </label>
              <p className="text-[11px] text-[#8E8E93]">
                Person on-site during the event who can be reached in an emergency — not the same as organizer contact
              </p>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  name="emergencyContactName"
                  placeholder="Full name"
                  type="text"
                  required
                  value={formData.emergencyContactName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emergencyContactName: e.target.value,
                    }))
                  }
                  inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
                />
                <FormField
                  name="emergencyContactPhone"
                  placeholder="+1 (310) 555-0000"
                  type="tel"
                  required
                  value={formData.emergencyContactPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      emergencyContactPhone: e.target.value,
                    }))
                  }
                  inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
                />
              </div>
              <FormField
                name="emergencyContactRole"
                placeholder="Role (e.g. Safety Marshal, Event Director)"
                type="text"
                required
                value={formData.emergencyContactRole}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    emergencyContactRole: e.target.value,
                  }))
                }
                inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
              />
            </div>
          </div>

          {/* Emergency Action Plan */}
          <div className="space-y-1 pt-1">
            <FormField
              name="emergencyActionPlan"
              label="Emergency Action Plan"
              required
              placeholder="e.g. In case of accident: immediately stop all vehicle movement and call 911. Contact on-site first aider at the registration tent. Evacuation route is via the north exit on Maple Ave. Nearest hospital: Cedars-Sinai Medical Center (0.8 miles). Do not move injured persons unless there is immediate danger..."
              type="textarea"
              rows={4}
              value={formData.emergencyActionPlan}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  emergencyActionPlan: e.target.value,
                }))
              }
              labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm resize-none"
            />
            <p className="text-[11px] text-[#8E8E93] -mt-2.5">
              What happens in case of accident, medical incident, fire, or evacuation — must include clear procedures
            </p>
          </div>

          {/* Road / Route Information Checkbox */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Road / Route Information</span>
              <span className="text-[#FF2E86]">*</span>
            </label>
            <div>
              <div
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    includesRoadRoute: !prev.includesRoadRoute,
                  }));
                  setErrors((prev) => ({ ...prev, includesRoadRoute: undefined }));
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  errors.includesRoadRoute
                    ? "border-rose-500/80 bg-rose-500/5 hover:border-rose-400"
                    : formData.includesRoadRoute
                    ? "bg-[#1C1C20] border-[#FF2E86]/50 shadow-sm"
                    : "bg-[#1C1C20]/60 hover:bg-[#1C1C20] border-[#2E2E34]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    formData.includesRoadRoute
                      ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                      : errors.includesRoadRoute
                      ? "border-rose-500 bg-rose-500/10"
                      : "border-[#4A4A52] bg-[#141416]"
                  }`}
                >
                  {formData.includesRoadRoute && <Check size={13} strokeWidth={3} />}
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  This event includes a road route, convoy, cruise, or scenic drive
                </span>
              </div>
              {errors.includesRoadRoute && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 px-1 font-medium">
                  <AlertCircle size={13} className="flex-shrink-0" />
                  <span>{errors.includesRoadRoute}</span>
                </div>
              )}
            </div>
          </div>

          {/* Medical / First-Aid Plan Checkbox */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Medical / First-Aid Plan</span>
              <span className="text-[#FF2E86]">*</span>
            </label>
            <div>
              <div
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    hasMedicalPlan: !prev.hasMedicalPlan,
                  }));
                  setErrors((prev) => ({ ...prev, hasMedicalPlan: undefined }));
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  errors.hasMedicalPlan
                    ? "border-rose-500/80 bg-rose-500/5 hover:border-rose-400"
                    : formData.hasMedicalPlan
                    ? "bg-[#1C1C20] border-[#FF2E86]/50 shadow-sm"
                    : "bg-[#1C1C20]/60 hover:bg-[#1C1C20] border-[#2E2E34]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    formData.hasMedicalPlan
                      ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                      : errors.hasMedicalPlan
                      ? "border-rose-500 bg-rose-500/10"
                      : "border-[#4A4A52] bg-[#141416]"
                  }`}
                >
                  {formData.hasMedicalPlan && <Check size={13} strokeWidth={3} />}
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  Expected attendance is 100+ — provide a medical and first-aid plan
                </span>
              </div>
              {errors.hasMedicalPlan && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 px-1 font-medium">
                  <AlertCircle size={13} className="flex-shrink-0" />
                  <span>{errors.hasMedicalPlan}</span>
                </div>
              )}
            </div>
          </div>

          {/* Police / Traffic Control Checkbox */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Police / Traffic Control</span>
              <span className="text-[#FF2E86]">*</span>
            </label>
            <div>
              <div
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    hasPoliceControl: !prev.hasPoliceControl,
                  }));
                  setErrors((prev) => ({ ...prev, hasPoliceControl: undefined }));
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  errors.hasPoliceControl
                    ? "border-rose-500/80 bg-rose-500/5 hover:border-rose-400"
                    : formData.hasPoliceControl
                    ? "bg-[#1C1C20] border-[#FF2E86]/50 shadow-sm"
                    : "bg-[#1C1C20]/60 hover:bg-[#1C1C20] border-[#2E2E34]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    formData.hasPoliceControl
                      ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                      : errors.hasPoliceControl
                      ? "border-rose-500 bg-rose-500/10"
                      : "border-[#4A4A52] bg-[#141416]"
                  }`}
                >
                  {formData.hasPoliceControl && <Check size={13} strokeWidth={3} />}
                </div>
                <span className="text-xs sm:text-sm font-medium text-white">
                  Police or traffic control officers are involved or required for this event
                </span>
              </div>
              {errors.hasPoliceControl && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 px-1 font-medium">
                  <AlertCircle size={13} className="flex-shrink-0" />
                  <span>{errors.hasPoliceControl}</span>
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
          className="py-3.5 px-8 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Next: Legal</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </Form>
  );
}
