"use client";

import React, { ReactNode } from "react";
import { Modal } from "antd";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

export type ConfirmVariant = "success" | "danger" | "warning" | "primary";

interface ConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  description: ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  icon?: ReactNode;
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "success",
  icon,
  loading = false,
}: ConfirmModalProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return {
          iconBg: "bg-emerald-50 text-emerald-500 border-emerald-100",
          btnBg: "bg-emerald-500 hover:bg-emerald-600 text-white",
          defaultIcon: <CheckCircle2 className="w-6 h-6" />,
        };
      case "danger":
        return {
          iconBg: "bg-rose-50 text-rose-500 border-rose-100",
          btnBg: "bg-rose-600 hover:bg-rose-700 text-white",
          defaultIcon: <XCircle className="w-6 h-6" />,
        };
      case "warning":
        return {
          iconBg: "bg-amber-50 text-amber-500 border-amber-100",
          btnBg: "bg-amber-600 hover:bg-amber-700 text-white",
          defaultIcon: <AlertTriangle className="w-6 h-6" />,
        };
      case "primary":
      default:
        return {
          iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
          btnBg: "bg-[#0B1E6B] hover:bg-[#08154D] text-white",
          defaultIcon: <Info className="w-6 h-6" />,
        };
    }
  };

  const styleConfig = getVariantStyles();

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={420}
      className="[&_.ant-modal-content]:!p-0 [&_.ant-modal-content]:!overflow-hidden [&_.ant-modal-content]:!rounded-2xl"
      styles={{
        body: { padding: 0 },
      }}
    >
      <div className="p-6 text-center space-y-4">
        <div
          className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto ${styleConfig.iconBg}`}
        >
          {icon || styleConfig.defaultIcon}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 m-0">{title}</h3>
          <div className="text-xs text-slate-500 mt-2 leading-relaxed">
            {description}
          </div>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 font-semibold text-xs py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 ${styleConfig.btnBg}`}
          >
            {loading && (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
