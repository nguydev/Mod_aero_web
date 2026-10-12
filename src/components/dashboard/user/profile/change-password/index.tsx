"use client";

import React, { useState } from "react";
import { Modal, Form, ConfigProvider, theme } from "antd";
import { X, Lock, CheckCircle, AlertCircle } from "lucide-react";
import FormField from "@/components/form";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!currentPassword) {
      setError("Please enter your current password.");
      return;
    }
    if (!newPassword) {
      setError("Please enter your new password.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onSuccess?.();
        onClose();
      }, 1500);
    }, 800);
  };

  const handleModalClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    setIsSuccess(false);
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
        onCancel={handleModalClose}
        footer={null}
        centered
        width={460}
        closeIcon={
          <X className="w-5 h-5 text-[#8E8E93] hover:text-white transition-colors" />
        }
        className="[&_.ant-modal-content]:!bg-[#141416] [&_.ant-modal-content]:!border [&_.ant-modal-content]:!border-[#26262B] [&_.ant-modal-content]:!rounded-3xl [&_.ant-modal-content]:!p-6 sm:[&_.ant-modal-content]:!p-8"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF2E86]/10 border border-[#FF2E86]/20 flex items-center justify-center text-[#FF2E86] shrink-0">
              <Lock size={18} />
            </div>
            <div className="space-y-0.5">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Change Password
              </h2>
              <p className="text-xs text-[#8E8E93]">
                Ensure your account is using a secure password.
              </p>
            </div>
          </div>

          {/* Success Banner */}
          {isSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-400 font-semibold animate-fadeIn">
              <CheckCircle size={16} />
              <span>Password updated successfully!</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-400 font-semibold animate-fadeIn">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <Form layout="vertical" onFinish={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <FormField
              name="currentPassword"
              label="Current Password"
              required
              placeholder="Enter current password"
              type="password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                if (error) setError(null);
              }}
              labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm"
            />

            {/* New Password */}
            <FormField
              name="newPassword"
              label="New Password"
              required
              placeholder="Enter new password"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (error) setError(null);
              }}
              labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm"
            />

            {/* Confirm New Password */}
            <FormField
              name="confirmPassword"
              label="Confirm New Password"
              required
              placeholder="Re-enter new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError(null);
              }}
              labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
              inputClassName="!bg-[#18181B] !border-[#2E2E34] !text-white placeholder:!text-[#5A5A60] !rounded-xl focus:!border-[#FF2E86] !text-sm"
            />

            {/* Action Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleModalClose}
                className="py-2.5 px-5 rounded-full text-xs font-semibold text-[#CCCCCC] hover:text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || isSuccess}
                className="py-2.5 px-6 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}
