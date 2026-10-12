"use client";

import React from "react";
import { Calendar, Building, Check, Info, AlertCircle } from "lucide-react";
import { AccountSetupFormData } from "../types";

interface Step3Props {
  formData: AccountSetupFormData;
  setFormData: React.Dispatch<React.SetStateAction<AccountSetupFormData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const availableEventTypes = [
  "Cars & Coffee",
  "Scenic Drive / Cruise",
  "Car Show",
  "Large Meet (500+)",
  "Autocross",
  "Track Day",
  "Racing Event",
  "Driving Competition",
  "Road Closure Event",
  "Parking Lot Event",
];

const availableVenueTypes = [
  "Private Property",
  "Business Venue",
  "Public Road",
  "Race Track",
  "Parking Lot",
  "Charity / Fundraiser",
];

export default function LegalAuthStep({
  formData,
  setFormData,
  errors,
  setErrors,
}: Step3Props) {
  const toggleEventType = (type: string) => {
    setFormData((prev) => {
      const exists = prev.eventTypes.includes(type);
      const updated = exists
        ? prev.eventTypes.filter((t) => t !== type)
        : [...prev.eventTypes, type];
      return { ...prev, eventTypes: updated };
    });
    if (errors.eventTypes) {
      setErrors((prev) => ({ ...prev, eventTypes: "" }));
    }
  };

  const toggleVenueType = (venue: string) => {
    setFormData((prev) => {
      const exists = prev.venueTypes.includes(venue);
      const updated = exists
        ? prev.venueTypes.filter((v) => v !== venue)
        : [...prev.venueTypes, venue];
      return { ...prev, venueTypes: updated };
    });
    if (errors.venueTypes) {
      setErrors((prev) => ({ ...prev, venueTypes: "" }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Proof of Legal Authorization
        </h2>
        <p className="text-xs sm:text-sm text-[#8E8E93]">
          Select the event types you plan to host and the venue types you will use. We will tell you exactly what documentation is required.
        </p>
      </div>

      {/* Card 1: Event Types You Plan to Host */}
      <div
        className={`rounded-2xl p-5 sm:p-7 bg-[#141416] border transition-colors space-y-4 ${
          errors.eventTypes ? "border-rose-500/80 bg-rose-500/5" : "border-[#26262B]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-[#FF2E86]">
              <Calendar size={18} />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Event Types You Plan to Host <span className="text-[#FF2E86]">*</span>
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#FF2E86] bg-[#FF2E86]/10 px-2.5 py-0.5 rounded-full border border-[#FF2E86]/20 tracking-wider">
            REQUIRED
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {availableEventTypes.map((type) => {
            const isSelected = formData.eventTypes.includes(type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleEventType(type)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#1C1C20] text-white border border-[#FF2E86]/60 shadow-sm"
                    : "bg-[#18181B] text-[#8E8E93] hover:text-white border border-[#2E2E34] hover:border-[#3E3E46]"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {errors.eventTypes && (
          <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-1 font-medium">
            <AlertCircle size={12} /> {errors.eventTypes}
          </p>
        )}
      </div>

      {/* Card 2: Venue Types You Will Use */}
      <div
        className={`rounded-2xl p-5 sm:p-7 bg-[#141416] border transition-colors space-y-4 ${
          errors.venueTypes ? "border-rose-500/80 bg-rose-500/5" : "border-[#26262B]"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-[#FF2E86]">
              <Building size={18} />
            </div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Venue Types You Will Use <span className="text-[#FF2E86]">*</span>
            </h3>
          </div>
          <span className="text-[10px] font-bold text-[#FF2E86] bg-[#FF2E86]/10 px-2.5 py-0.5 rounded-full border border-[#FF2E86]/20 tracking-wider">
            SELECT ALL THAT APPLY
          </span>
        </div>

        <div className="space-y-2.5 pt-1">
          {availableVenueTypes.map((venue) => {
            const isSelected = formData.venueTypes.includes(venue);
            return (
              <div
                key={venue}
                onClick={() => toggleVenueType(venue)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                  isSelected
                    ? "border-[#FF2E86]/50 bg-[#1C1C20] shadow-sm"
                    : "border-[#2E2E34] bg-[#18181B]/60 hover:bg-[#18181B] hover:border-[#3E3E46]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                      : "border-[#4A4A52] bg-[#141416]"
                  }`}
                >
                  {isSelected && <Check size={13} strokeWidth={3} />}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {venue}
                </span>
              </div>
            );
          })}
        </div>

        {errors.venueTypes && (
          <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-1 font-medium">
            <AlertCircle size={12} /> {errors.venueTypes}
          </p>
        )}
      </div>

      {/* Info Notice Box */}
      <div className="p-4 rounded-2xl bg-[#141416]/70 border border-[#26262B] flex items-center gap-3">
        <Info size={18} className="text-[#8E8E93] shrink-0" />
        <p className="text-xs text-[#8E8E93]">
          Select event and venue types above to see required documentation.
        </p>
      </div>
    </div>
  );
}
