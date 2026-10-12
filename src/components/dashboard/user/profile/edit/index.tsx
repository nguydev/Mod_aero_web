"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Modal, Form, ConfigProvider, theme } from "antd";
import { X, Upload, Camera } from "lucide-react";
import FormField from "@/components/form";

export interface UserProfileData {
  name: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  avatar: string;
}

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profileData: UserProfileData;
  onSave: (updatedData: Partial<UserProfileData>) => void;
}

export default function EditProfileModal({
  open,
  onClose,
  profileData,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<UserProfileData>(profileData);
  const [avatarPreview, setAvatarPreview] = useState(profileData.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setFormData(profileData);
      setAvatarPreview(profileData.avatar);
    }
  }, [open, profileData]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setFormData((prev) => ({ ...prev, avatar: url }));
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim()) return;

    onSave({
      ...formData,
      avatar: avatarPreview,
    });
    onClose();
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgElevated: "#141416",
          colorBorderSecondary: "#26262B",
          colorPrimary: "#FF2E86",
          borderRadius: 24,
        },
        components: {
          Modal: {
            boxShadow: "none",
            boxShadowSecondary: "none",
            boxShadowTertiary: "none",
          },
        },
      }}
    >
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        width={520}
        closeIcon={
          <X className="w-5 h-5 text-[#8E8E93] hover:text-white transition-colors" />
        }
        className="[&_.ant-modal-content]:!bg-[#141416] [&_.ant-modal-content]:!border [&_.ant-modal-content]:!border-[#26262B] [&_.ant-modal-content]:!rounded-3xl [&_.ant-modal-content]:!p-6 sm:[&_.ant-modal-content]:!p-8"
      >
        <div className="space-y-6">
          {/* Modal Header */}
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Edit Profile
            </h2>
            <p className="text-xs text-[#8E8E93]">
              Update your public organizer details and contact information.
            </p>
          </div>

          <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
            {/* Avatar Upload Preview */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#18181B] border border-[#2E2E34]">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0 bg-[#222226]">
                <Image
                  src={avatarPreview}
                  alt="Avatar preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">Profile Photo</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera size={13} />
                    <span>Change Photo</span>
                  </button>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
                tabIndex={-1}
              />
            </div>

            {/* Full Name FormField */}
            <FormField
              name="name"
              label="Full Name"
              required
              placeholder="e.g. John Ramirez"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm"
            />

            {/* Club Bio / Title FormField */}
            <FormField
              name="bio"
              label="Club / Title"
              placeholder="e.g. SoCal Speed Society — Event Organizer"
              type="text"
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm"
            />

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                name="email"
                label="Email"
                required
                placeholder="john@velocityevents.com"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm"
              />

              <FormField
                name="phone"
                label="Phone"
                placeholder="+1 (310) 555-0192"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm"
              />
            </div>

            {/* Website & Location Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                name="website"
                label="Website"
                placeholder="velocityevents.com"
                type="text"
                value={formData.website}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, website: e.target.value }))
                }
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm"
              />

              <FormField
                name="location"
                label="Location"
                placeholder="Los Angeles, CA"
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-5 rounded-full text-xs font-semibold text-[#CCCCCC] hover:text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/25 transition-all cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
