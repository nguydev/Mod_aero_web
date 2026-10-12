"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Search,
  Camera,
  Coffee,
  Utensils,
  MapPin,
} from "lucide-react";
import { mockRoutes, RouteItem } from "./data";

interface AddRouteProps {
  routeId?: string;
  onBack?: () => void;
  onSave?: (route: RouteItem) => void;
}

export default function AddRoute({
  routeId,
  onBack,
  onSave,
}: AddRouteProps) {
  const router = useRouter();

  // Find existing route if viewing an existing id
  const existingRoute = mockRoutes.find((r) => r.id === routeId);

  const [routeName, setRouteName] = useState(existingRoute?.name || "");
  const [category, setCategory] = useState<"Casual" | "Road Trip" | "Track session">(
    existingRoute?.category || "Casual"
  );
  const [estimatedTime, setEstimatedTime] = useState(
    existingRoute?.duration || ""
  );
  const [searchDestination, setSearchDestination] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoute: RouteItem = {
      id: routeId && routeId !== "new" ? routeId : `r-${Date.now()}`,
      name: routeName || "Dubai Marina Loop",
      category: category,
      distance: existingRoute?.distance || "42.3 km",
      duration: estimatedTime || "48 min",
      image:
        existingRoute?.image ||
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=300&auto=format&fit=crop",
    };

    if (onSave) {
      onSave(newRoute);
    }
    if (onBack) {
      onBack();
    } else {
      router.push("/admin/manage-routes");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8E8E93] hover:text-white transition-colors cursor-pointer mb-1"
            >
              <ChevronLeft size={14} />
              <span>Back to Routes</span>
            </button>
          ) : (
            <Link
              href="/admin/manage-routes"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8E8E93] hover:text-white transition-colors cursor-pointer mb-1"
            >
              <ChevronLeft size={14} />
              <span>Back to Routes</span>
            </Link>
          )}
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Add Route
          </h1>
        </div>

        <div>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl text-xs font-semibold border border-[#6B1834] bg-[#220D15] text-[#FF4D4F] hover:bg-[#FF4D4F]/10 hover:border-[#FF4D4F]/40 transition-colors cursor-pointer"
          >
            Suspend User
          </button>
        </div>
      </div>

      {/* Two Column Grid: Map View (Left) & Form View (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Interactive Map Graphic Section */}
        <div className="rounded-3xl bg-[#141416] border border-[#26262B] p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between min-h-[520px] shadow-sm">
          {/* Top Search Input overlay on map */}
          <div className="relative z-10 w-full mb-4">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8E8E93]"
              />
              <input
                type="text"
                value={searchDestination}
                onChange={(e) => setSearchDestination(e.target.value)}
                placeholder="Search destination, place or route..."
                className="w-full bg-[#1C1C20]/90 backdrop-blur-md border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-xs text-white placeholder-[#6E6E73] focus:outline-none focus:border-[#FF2E86]/50 transition-colors"
              />
            </div>
          </div>

          {/* Map Graphic Canvas / Roads */}
          <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-[#ECE8E1] p-6 select-none flex items-center justify-center my-2 min-h-[320px]">
            {/* Road Network SVG */}
            <svg
              className="absolute inset-0 w-full h-full object-cover"
              viewBox="0 0 600 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Land blocks */}
              <rect width="600" height="400" fill="#EAE6DE" />
              {/* Street grid patterns */}
              <path
                d="M-50 80 L650 180"
                stroke="#FFFFFF"
                strokeWidth="24"
                strokeLinecap="round"
              />
              <path
                d="M-50 200 L650 300"
                stroke="#FFFFFF"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path
                d="M120 -50 L40 450"
                stroke="#FFFFFF"
                strokeWidth="20"
              />
              <path
                d="M320 -50 L260 450"
                stroke="#FFFFFF"
                strokeWidth="24"
              />
              <path
                d="M480 -50 L440 450"
                stroke="#FFFFFF"
                strokeWidth="18"
              />
              <path
                d="M0 320 Q 300 240 600 360"
                stroke="#FFFFFF"
                strokeWidth="36"
              />

              {/* Highway main route with pink path highlight */}
              <path
                d="M60 320 Q 280 250 540 350"
                stroke="#FF2E86"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />
            </svg>

            {/* Map POI labels & markers */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none text-[11px] font-semibold text-zinc-700">
              <div className="flex justify-between items-start">
                <span className="bg-white/90 px-2 py-1 rounded shadow-sm text-[10px]">
                  Jalan Taman Borobudur
                </span>
                <span className="bg-white/90 px-2 py-1 rounded shadow-sm text-[10px] flex items-center gap-1">
                  <MapPin size={10} className="text-[#FF2E86]" />
                  Raggea
                </span>
              </div>

              <div className="flex justify-around items-center">
                <div className="bg-white px-2 py-1 rounded shadow-md text-[10px] flex items-center gap-1 text-amber-700 font-bold border border-amber-200">
                  <Utensils size={11} className="text-amber-600" />
                  Depot 69
                </div>
                <div className="bg-white px-2 py-1 rounded shadow-md text-[10px] flex items-center gap-1 text-emerald-800 font-bold border border-emerald-200">
                  <Coffee size={11} className="text-emerald-700" />
                  Starbucks
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="bg-white/90 px-2 py-1 rounded shadow-sm text-[10px] flex items-center gap-1">
                  <Coffee size={10} className="text-amber-800" />
                  Vens Coffee
                </span>
                <span className="bg-white/90 px-2 py-1 rounded shadow-sm text-[10px]">
                  Tempe Penyet Mbah Djayu
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Next Button */}
          <div className="pt-3">
            <button
              type="button"
              onClick={handleSave}
              className="w-full max-w-xs mx-auto block py-3.5 px-8 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-[#FF2E86]/25 transition-all text-center cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Column: Route Details Form Section */}
        <div className="rounded-3xl bg-[#141416] border border-[#26262B] p-6 sm:p-8 shadow-sm flex flex-col justify-between min-h-[520px]">
          <form onSubmit={handleSave} className="space-y-5">
            {/* Upload a photo dropzone */}
            <div className="w-full h-40 rounded-2xl bg-[#1C1C20] border border-dashed border-white/10 hover:border-white/20 flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-[#8E8E93] group-hover:text-white transition-colors">
                <Camera size={20} />
              </div>
              <span className="text-xs font-medium text-[#8E8E93] group-hover:text-white transition-colors">
                Upload a photo
              </span>
            </div>

            {/* Route Name Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                ROUTE NAME
              </label>
              <input
                type="text"
                value={routeName}
                onChange={(e) => setRouteName(e.target.value)}
                placeholder="Write a name for easy find"
                className="w-full bg-[#1C1C20] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#5A5A60] focus:outline-none focus:border-[#FF2E86]/50 transition-colors"
              />
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {(["Casual", "Road Trip", "Track session"] as const).map((cat) => {
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${isSelected
                      ? "bg-[#3E1424] text-[#FF2E86] border border-[#FF2E86]/50 shadow-sm"
                      : "bg-[#1C1C20] text-[#8E8E93] hover:text-white border border-white/5"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Estimated Time Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider block">
                ESTIMATED TIME
              </label>
              <input
                type="text"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="--:--"
                className="w-full bg-[#1C1C20] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-[#5A5A60] focus:outline-none focus:border-[#FF2E86]/50 transition-colors"
              />
            </div>

            {/* Save Route Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-[#FF2E86]/25 transition-all text-center cursor-pointer"
              >
                Save Route
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
