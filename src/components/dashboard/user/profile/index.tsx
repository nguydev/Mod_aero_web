"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Edit3,
  Lock,
  FileText,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import EditProfileModal, { UserProfileData } from "./edit";
import ChangePasswordModal from "./change-password";
import DeleteAccountModal from "./delete";

export default function Profile() {
  const [copied, setCopied] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [profileData, setProfileData] = useState<UserProfileData>({
    name: "John Ramirez",
    bio: "SoCal Speed Society — Event Organizer",
    email: "john@velocityevents.com",
    phone: "+1 (310) 555-0192",
    website: "velocityevents.com",
    location: "Los Angeles, CA",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("456798");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = (updated: Partial<UserProfileData>) => {
    setProfileData((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Hero Cover Banner & Avatar */}
      <div className="relative">
        <div className="relative h-48 md:h-64 w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#222222]">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"
            alt="Profile Cover"
            fill
            priority
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Overlapping Avatar */}
        <div className="relative -mt-10 md:-mt-12 ml-6 z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-[#1E1E1E] bg-[#121212] shadow-2xl">
          <Image
            src={profileData.avatar}
            alt={profileData.name}
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>

      {/* Main Grid Layout (Left 8 cols, Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* User Information Card */}
          <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-6 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  {profileData.name}
                </h2>
                <span className="bg-primary/20 text-primary border border-primary/40 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck size={11} />
                  <span>VERIFIED</span>
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {profileData.bio}
              </p>
            </div>

            <div className="border-t border-[#1E1E1E] pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-400">
              {profileData.website && (
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-primary shrink-0" />
                  <span>{profileData.website}</span>
                </div>
              )}
              {profileData.email && (
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-primary shrink-0" />
                  <span>{profileData.email}</span>
                </div>
              )}
              {profileData.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-primary shrink-0" />
                  <span>{profileData.phone}</span>
                </div>
              )}
              {profileData.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span>{profileData.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Referral Card */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block pl-1">
              REEFER
            </span>
            <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 space-y-3.5 divide-y divide-[#1E1E1E]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-xs text-gray-300">
                  <Mail size={15} className="text-gray-500" />
                  <span>Referral Code</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-xs font-mono font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy Referral Code"
                >
                  <span>456798</span>
                  {copied ? (
                    <Check size={13} className="text-emerald-400" />
                  ) : (
                    <Copy size={13} className="text-gray-500" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between pt-3.5">
                <span className="text-xs text-gray-300">Total Reefer</span>
                <span className="text-xs font-mono font-semibold text-gray-300">
                  09
                </span>
              </div>
            </div>
          </div>

          {/* 3 Stats Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 text-center space-y-1">
              <div className="text-2xl md:text-3xl font-extrabold text-white">
                48
              </div>
              <p className="text-xs text-gray-400">Events Created</p>
            </div>

            <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 text-center space-y-1">
              <div className="text-2xl md:text-3xl font-extrabold text-white">
                4,891
              </div>
              <p className="text-xs text-gray-400">Total Participants</p>
            </div>

            <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 text-center space-y-1">
              <div className="text-2xl md:text-3xl font-extrabold text-white">
                2,340
              </div>
              <p className="text-xs text-gray-400">Members</p>
            </div>
          </div>
        </div>

        {/* Right Column: Account Actions */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-5 space-y-3">
            <h3 className="text-sm font-bold text-white mb-3">Account Actions</h3>

            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="w-full bg-[#181818] hover:bg-[#222222] border border-[#222222] text-gray-300 hover:text-white rounded-xl p-3.5 flex items-center gap-3 text-xs font-medium transition-colors cursor-pointer"
            >
              <Edit3 size={15} className="text-primary shrink-0" />
              <span>Edit Profile</span>
            </button>

            <button
              type="button"
              onClick={() => setIsChangePasswordModalOpen(true)}
              className="w-full bg-[#181818] hover:bg-[#222222] border border-[#222222] text-gray-300 hover:text-white rounded-xl p-3.5 flex items-center gap-3 text-xs font-medium transition-colors cursor-pointer"
            >
              <Lock size={15} className="text-primary shrink-0" />
              <span>Change Password</span>
            </button>

            <Link
              href="/dashboard/terms-and-condition"
              className="w-full bg-[#181818] hover:bg-[#222222] border border-[#222222] text-gray-300 hover:text-white rounded-xl p-3.5 flex items-center gap-3 text-xs font-medium transition-colors cursor-pointer"
            >
              <FileText size={15} className="text-primary shrink-0" />
              <span>Terms & Conditions</span>
            </Link>

            <Link
              href="/dashboard/privacy-policy"
              className="w-full bg-[#181818] hover:bg-[#222222] border border-[#222222] text-gray-300 hover:text-white rounded-xl p-3.5 flex items-center gap-3 text-xs font-medium transition-colors cursor-pointer"
            >
              <FileText size={15} className="text-primary shrink-0" />
              <span>Privacy Policy</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full bg-[#1a0f12] hover:bg-[#241217] border border-red-500/20 text-red-400 hover:text-red-300 rounded-xl p-3.5 flex items-center gap-3 text-xs font-medium transition-colors cursor-pointer"
            >
              <Trash2 size={15} className="text-red-400 shrink-0" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profileData={profileData}
        onSave={handleSaveProfile}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        open={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />

      {/* Delete Account Confirmation Modal */}
      <DeleteAccountModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}