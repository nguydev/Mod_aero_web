"use client";

import React, { useState } from "react";
import {
  FileText,
  Globe,
  Users,
  ArrowRight,
} from "lucide-react";
import { Form } from "antd";
import FormField from "@/components/form";
import BannerUpload from "./banner-upload";
import { EventFormData } from "./types";

interface BasicStepProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  onNext: () => void;
}

const frequencyOptions: ("Weekly" | "Monthly" | "Yearly" | "One Off")[] = [
  "Weekly",
  "Monthly",
  "Yearly",
  "One Off",
];

const categoryOptions = [
  "Car Meet",
  "Track Day",
  "Rally",
  "Cars & Coffee",
  "Convoy",
  "Auto Show",
  "Racing",
  "Cruise",
  "Drag Race",
  "Drift Event",
];

export default function BasicStep({
  formData,
  setFormData,
  onNext,
}: BasicStepProps) {
  const [bannerError, setBannerError] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(category);
      if (exists) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        };
      }
    });
  };

  const handleNextClick = () => {
    if (!formData.bannerImage) {
      setBannerError("Please upload an event banner to continue");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setBannerError(null);
    onNext();
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleNextClick}
      className="space-y-6 [&_.ant-form-item]:!mb-4 [&_.ant-form-item-label]:!pb-1.5 [&_.ant-form-item-label_label]:!h-auto"
    >
      {/* Banner Upload Section with Form Field Error */}
      <BannerUpload
        bannerImage={formData.bannerImage}
        error={bannerError}
        onBannerChange={(url) => {
          setFormData((prev) => ({ ...prev, bannerImage: url }));
          if (url) setBannerError(null);
        }}
      />

      {/* Basic Details Card */}
      <div className="rounded-2xl md:rounded-3xl p-6 sm:p-8 bg-[#141416] border border-[#26262B] space-y-6">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-[#26262B] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-[#38BDF8]">
              <FileText size={16} />
            </div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Basic Details
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#38BDF8] bg-[#38BDF8]/10 px-2.5 py-1 rounded-md border border-[#38BDF8]/20 tracking-wider">
            REQUIRED
          </span>
        </div>

        {/* Form Fields using FormField Component (Vertical Layout) */}
        <div className="space-y-4">
          {/* Event Name */}
          <FormField
            name="name"
            label="Event Name"
            required
            placeholder="e.g. Sunset Boulevard Car Meet"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
            inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
          />

          {/* Description */}
          <div className="space-y-1">
            <FormField
              name="description"
              label="Description"
              required
              placeholder="Tell people what this event is about. Be specific — good descriptions drive more registrations..."
              type="textarea"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm resize-none"
            />
            <p className="text-[11px] text-[#8E8E93] -mt-2.5">
              Describe what attendees can expect — activities, highlights, dress code, notes
            </p>
          </div>

          {/* Event Frequency */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Event Frequency</span>
              <span className="text-[#FF2E86]">*</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {frequencyOptions.map((freq) => {
                const isSelected = formData.frequency === freq;
                return (
                  <button
                    key={freq}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, frequency: freq }))
                    }
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${isSelected
                      ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white shadow-md shadow-pink-500/20"
                      : "bg-[#1C1C20] text-[#8E8E93] hover:text-white border border-[#2E2E34]"
                      }`}
                  >
                    {freq}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Category */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Event Category</span>
              <span className="text-[#FF2E86]">*</span>
            </label>
            <div className="flex flex-wrap gap-2.5">
              {categoryOptions.map((cat) => {
                const isSelected =
                  formData.category === cat ||
                  formData.categories?.includes(cat) ||
                  (!formData.category &&
                    (!formData.categories ||
                      formData.categories.length === 0) &&
                    cat === "Car Meet");
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        category: cat,
                        categories: [cat],
                      }))
                    }
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${isSelected
                      ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white shadow-md shadow-pink-500/20"
                      : "bg-[#1C1C20] text-[#8E8E93] hover:text-white border border-[#2E2E34]"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location / Venue */}
          <div className="space-y-1 pt-1">
            <FormField
              name="location"
              label="Location / Venue"
              required
              placeholder="e.g. Griffith Observatory, Los Angeles, CA 90027"
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, location: e.target.value }))
              }
              labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
            />
            <p className="text-[11px] text-[#8E8E93] -mt-2.5">
              Full venue address or city + state
            </p>
          </div>

          {/* Date & Time Row using FormField */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <FormField
              name="startDate"
              label="Start Date"
              required
              placeholder="Select date"
              type="date"
              labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
              onChange={(date, dateString) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: typeof dateString === "string" ? dateString : "",
                }))
              }
            />

            <FormField
              name="startTime"
              label="Start Time"
              required
              placeholder="Select start time"
              type="time"
              labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
              onChange={(time, timeString) =>
                setFormData((prev) => ({
                  ...prev,
                  startTime: typeof timeString === "string" ? timeString : "",
                }))
              }
            />

            <FormField
              name="endTime"
              label="End Time"
              required
              placeholder="Select end time"
              type="time"
              labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
              onChange={(time, timeString) =>
                setFormData((prev) => ({
                  ...prev,
                  endTime: typeof timeString === "string" ? timeString : "",
                }))
              }
            />
          </div>

          {/* Expected Attendance & Registration Cap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start pt-1">
            <div className="space-y-1">
              <FormField
                name="expectedAttendance"
                label="Expected Attendance"
                required
                placeholder="e.g. 250"
                type="number"
                value={formData.expectedAttendance}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expectedAttendance: e.target.value,
                  }))
                }
                labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
              />
              <p className="text-[11px] text-[#8E8E93] -mt-2.5">
                Your best estimate of total attendees
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="space-y-0.5">
                <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
                  <span>Registration Cap</span>
                </label>
                <p className="text-[11px] text-[#8E8E93]">
                  Limit max number of signups
                </p>
              </div>
              <div className="p-1.5 bg-[#1C1C20] rounded-xl border border-[#2E2E34] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isRegistrationCapped: false,
                    }))
                  }
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${!formData.isRegistrationCapped
                    ? "bg-[#2A2A30] text-white"
                    : "text-[#8E8E93] hover:text-white"
                    }`}
                >
                  ⚡ Unlimited
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isRegistrationCapped: true,
                    }))
                  }
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${formData.isRegistrationCapped
                    ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white shadow-sm"
                    : "text-[#8E8E93] hover:text-white"
                    }`}
                >
                  👥 Set limit
                </button>
              </div>
              {formData.isRegistrationCapped && (
                <div className="mt-2">
                  <FormField
                    name="maxRegistrations"
                    required
                    placeholder="Max registrations"
                    type="number"
                    value={formData.maxRegistrations}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        maxRegistrations: e.target.value,
                      }))
                    }
                    inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Entry Fee */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Entry Fee</span>
              <span className="text-[#FF2E86]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, entryFeeType: "free" }))
                }
                className={`py-3.5 px-5 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${formData.entryFeeType === "free"
                  ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white border-transparent shadow-md shadow-pink-500/20"
                  : "bg-[#1C1C20] text-[#8E8E93] hover:text-white border-[#2E2E34]"
                  }`}
              >
                <span>✓ Free Entry</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, entryFeeType: "paid" }))
                }
                className={`py-3.5 px-5 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${formData.entryFeeType === "paid"
                  ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white border-transparent shadow-md shadow-pink-500/20"
                  : "bg-[#1C1C20] text-[#8E8E93] hover:text-white border-[#2E2E34]"
                  }`}
              >
                <span>$ Charge a Fee</span>
              </button>
            </div>

            {formData.entryFeeType === "paid" && (
              <div className="pt-2">
                <FormField
                  name="ticketPrice"
                  label="Ticket Price ($ USD)"
                  required
                  type="number"
                  placeholder="25.00"
                  value={formData.ticketPrice}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ticketPrice: e.target.value,
                    }))
                  }
                  labelClassName="!text-xs !font-semibold !text-[#CCCCCC] !uppercase !tracking-wider"
                  inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
                />
              </div>
            )}
          </div>

          {/* Organizer Contact */}
          <div className="space-y-1.5 pt-1">
            <div className="space-y-0.5">
              <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
                <span>Organizer Contact</span>
                <span className="text-[#FF2E86]">*</span>
              </label>
              <p className="text-[11px] text-[#8E8E93]">
                Public-facing contact info attendees can reach for questions
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                name="organizerEmail"
                placeholder="contact@example.com"
                type="email"
                required
                value={formData.organizerEmail}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    organizerEmail: e.target.value,
                  }))
                }
                inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
              />
              <FormField
                name="organizerPhone"
                placeholder="+1 (310) 555-0000"
                type="tel"
                required
                value={formData.organizerPhone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    organizerPhone: e.target.value,
                  }))
                }
                inputClassName="!bg-[#1C1C20] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm"
              />
            </div>
          </div>

          {/* Who Can View & Join */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-semibold text-[#CCCCCC] flex items-center gap-1 uppercase tracking-wider">
              <span>Who Can View & Join</span>
              <span className="text-[#FF2E86]">*</span>
            </label>
            <div className="space-y-3">
              {/* Everyone */}
              <div
                onClick={() =>
                  setFormData((prev) => ({ ...prev, visibility: "everyone" }))
                }
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${formData.visibility === "everyone"
                  ? "bg-[#1C1C20] border-[#FF2E86]/50"
                  : "bg-[#1C1C20]/50 hover:bg-[#1C1C20] border-[#2E2E34]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#222226] flex items-center justify-center text-white">
                    <Globe size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Everyone</h4>
                    <p className="text-xs text-[#8E8E93]">
                      Anyone on Velocity can discover and register
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.visibility === "everyone"
                    ? "border-[#FF2E86] bg-[#FF2E86]"
                    : "border-[#4A4A52]"
                    }`}
                >
                  {formData.visibility === "everyone" && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>

              {/* Specific Group Only */}
              <div
                onClick={() =>
                  setFormData((prev) => ({ ...prev, visibility: "group" }))
                }
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${formData.visibility === "group"
                  ? "bg-[#1C1C20] border-[#FF2E86]/50"
                  : "bg-[#1C1C20]/50 hover:bg-[#1C1C20] border-[#2E2E34]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#222226] flex items-center justify-center text-white">
                    <Users size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Specific Group Only
                    </h4>
                    <p className="text-xs text-[#8E8E93]">
                      Restricted to members of a group
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.visibility === "group"
                    ? "border-[#FF2E86] bg-[#FF2E86]"
                    : "border-[#4A4A52]"
                    }`}
                >
                  {formData.visibility === "group" && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Button */}
      <div className="flex items-center justify-end pt-2">
        <button
          type="submit"
          className="py-3.5 px-8 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Next: Safety</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </Form>
  );
}
