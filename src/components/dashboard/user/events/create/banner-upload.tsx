"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Upload, X, AlertCircle } from "lucide-react";

interface BannerUploadProps {
  bannerImage: string | null;
  onBannerChange: (imageUrl: string | null) => void;
  error?: string | null;
}

export default function BannerUpload({
  bannerImage,
  onBannerChange,
  error,
}: BannerUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onBannerChange(url);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onBannerChange(url);
    }
  };

  return (
    <div className="w-full space-y-1.5">
      {bannerImage ? (
        <div className="relative w-full h-[220px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden border border-[#2E2E34] group">
          <Image
            src={bannerImage}
            alt="Uploaded Event Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur transition-colors cursor-pointer"
            >
              Change Banner
            </button>
            <button
              type="button"
              onClick={() => onBannerChange(null)}
              className="p-2 rounded-xl text-white bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer"
              title="Remove Banner"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full py-12 px-6 rounded-2xl border border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 group ${
              error
                ? "border-rose-500/80 bg-rose-500/5 hover:border-rose-400"
                : "border-[#2E2E34] hover:border-[#FF2E86]/60 bg-[#141416]/50 hover:bg-[#141416]/80"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                error
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                  : "bg-[#1C1C20] border-[#2E2E34] text-[#8E8E93] group-hover:text-[#FF2E86] group-hover:scale-105"
              }`}
            >
              <Upload size={20} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white tracking-tight">
                Upload event banner <span className="text-[#FF2E86]">*</span>
              </p>
              <p className="text-xs text-[#8E8E93]">
                JPG, PNG or WebP · Recommended 1200×630px
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-2 px-1 font-medium animate-fadeIn">
              <AlertCircle size={14} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input with inline style to guarantee zero visual leakage */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        style={{ display: "none" }}
        tabIndex={-1}
      />
    </div>
  );
}
