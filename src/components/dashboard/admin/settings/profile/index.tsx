"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, FileText, ArrowRight, Check, X, Eye, EyeOff } from "lucide-react";
import { Modal, ConfigProvider, theme } from "antd";
import bannerImage from "@/assets/dashboard/settings.svg";

export default function AdminProfileSettings() {
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@velocity.com",
    phone: "+880 1634425785/6",
  });

  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
  );
  const [saved, setSaved] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Password Modal Form States
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("Please fill in all password fields.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }

    setPasswordError("");
    setPasswordSaved(true);
    setTimeout(() => {
      setPasswordSaved(false);
      setIsPasswordModalOpen(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">

      <div className="relative w-full rounded-2xl overflow-hidden">
        <Image
          src={bannerImage}
          alt="Velocity Settings Banner"
          priority
          className="w-full h-20 lg:h-[192px] lg:object-cover block select-none rounded-2x pointer-events-none "
        />
      </div>

      {/* Grid Container Overlapping onto Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start sm:mt-4 lg:-mt-14 relative z-10">
        {/* Left Card: Profile Form (Overlaps bottom-left of Banner) */}
        <div className="lg:col-span-7 xl:col-span-7 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-[#141416] border border-[#26262B] shadow-2xl">
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            {/* User Avatar & Name Header */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border border-white/10 bg-[#222226] flex-shrink-0 shadow-inner">
                <Image
                  src={avatar}
                  alt="Admin User Avatar"
                  width={72}
                  height={72}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-0.5">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {formData.name}
                </h2>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-[#FF2E86] hover:text-[#FF7A1A] transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Change Photo</span>
                  <ArrowRight size={13} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 pt-1">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8E8E93] block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#222226] border border-[#2E2E34] focus:border-[#FF2E86] rounded-xl text-sm font-medium text-white placeholder-[#5A5A60] outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8E8E93] block">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#222226] border border-[#2E2E34] focus:border-[#FF2E86] rounded-xl text-sm font-medium text-white placeholder-[#5A5A60] outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8E8E93] block">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#222226] border border-[#2E2E34] focus:border-[#FF2E86] rounded-xl text-sm font-medium text-white placeholder-[#5A5A60] outline-none transition-colors"
                />
              </div>
            </div>

            {/* Update Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="py-3 px-8 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 transition-all cursor-pointer text-center shadow-none"
              >
                Update
              </button>
              {saved && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 animate-fade-in">
                  <Check size={13} />
                  Profile Updated Successfully
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Right Card: Account Actions (Aligned below the Banner) */}
        <div className="lg:col-span-5 xl:col-span-5 rounded-2xl md:rounded-3xl p-6 md:p-8 bg-[#141416] border border-[#26262B] space-y-4 mt-0 lg:mt-14 shadow-xl">
          <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
            Account Actions
          </h3>

          <div className="space-y-3 pt-1">
            {/* Change Password Button */}
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#222226] hover:bg-[#2A2A30] border border-[#2E2E34] flex items-center gap-3 transition-colors cursor-pointer text-left group"
            >
              <Lock
                size={16}
                className="text-[#FF2E86] flex-shrink-0 transition-transform"
              />
              <span className="text-xs font-semibold text-[#E0E0E0] group-hover:text-white transition-colors">
                Change Password
              </span>
            </button>

            {/* Terms & Conditions Link */}
            <Link
              href="/admin/settings/terms"
              className="w-full py-3.5 px-5 rounded-2xl bg-[#222226] hover:bg-[#2A2A30] border border-[#2E2E34] flex items-center gap-3 transition-colors cursor-pointer text-left group block"
            >
              <FileText
                size={16}
                className="text-[#FF2E86] flex-shrink-0 transition-transform"
              />
              <span className="text-xs font-semibold text-[#E0E0E0] group-hover:text-white transition-colors">
                Terms & Conditions
              </span>
            </Link>

            {/* Privacy Policy Link */}
            <Link
              href="/admin/settings/privacy"
              className="w-full py-3.5 px-5 rounded-2xl bg-[#222226] hover:bg-[#2A2A30] border border-[#2E2E34] flex items-center gap-3 transition-colors cursor-pointer text-left group block"
            >
              <FileText
                size={16}
                className="text-[#FF2E86] flex-shrink-0 transition-transform"
              />
              <span className="text-xs font-semibold text-[#E0E0E0] group-hover:text-white transition-colors">
                Privacy Policy
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorBgElevated: "#18181A",
            colorBorderSecondary: "#2A2A30",
            boxShadow: "none",
            boxShadowSecondary: "none",
            boxShadowTertiary: "none",
          },
        }}
      >
        <Modal
          open={isPasswordModalOpen}
          onCancel={() => setIsPasswordModalOpen(false)}
          footer={null}
          centered
          width={480}
          className="[&_.ant-modal-content]:!shadow-none"
          closeIcon={
            <div className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors">
              <X size={15} />
            </div>
          }
        >
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#FF2E86] uppercase tracking-wider">
                SECURITY
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Change Password
              </h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {passwordError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-400">
                  {passwordError}
                </div>
              )}

              {passwordSaved && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Check size={14} /> Password changed successfully!
                </div>
              )}

              {/* Current Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8E8E93]">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    placeholder="Enter current password"
                    className="w-full px-4 py-2.5 bg-[#222226] border border-[#2E2E34] focus:border-[#FF2E86] rounded-xl text-sm text-white placeholder-[#5A5A60] outline-none transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        current: !showPassword.current,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword.current ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8E8E93]">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                    className="w-full px-4 py-2.5 bg-[#222226] border border-[#2E2E34] focus:border-[#FF2E86] rounded-xl text-sm text-white placeholder-[#5A5A60] outline-none transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        new: !showPassword.new,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword.new ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#8E8E93]">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2.5 bg-[#222226] border border-[#2E2E34] focus:border-[#FF2E86] rounded-xl text-sm text-white placeholder-[#5A5A60] outline-none transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm: !showPassword.confirm,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword.confirm ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 py-3 px-5 rounded-xl text-xs font-bold text-white bg-[#222226] hover:bg-[#2C2C32] border border-white/5 transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 transition-all cursor-pointer text-center shadow-none"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
}
