"use client";

import { Modal } from "antd";
import { X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

type ModalSize = "sm" | "md" | "lg" | "xl";

// Responsive max-widths per size. Modal stays at width="90%" on small
// screens and is capped by these values on larger screens.
const sizeMaxWidth: Record<ModalSize, number> = {
  sm: 420,
  md: 560,
  lg: 720,
  xl: 960,
};

interface CustomModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: ModalSize;
  className?: string;
  onClose?: () => void;
}

export default function CustomModal({
  open,
  setOpen,
  title,
  description,
  children,
  size = "md",
  className = "",
  onClose,
}: CustomModalProps) {
  const [isClient, setIsClient] = useState(false);

  // antd Modal portals to document.body — render only on the client.
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={handleClose}
      width="90%"
      style={{ maxWidth: sizeMaxWidth[size] }}
      title={
        title || description ? (
          <div className="pr-6">
            {title && (
              <h2 className="m-0 text-lg font-bold text-slate-900">{title}</h2>
            )}
            {description && (
              <p className="m-0 mt-1 text-sm font-normal text-slate-500">
                {description}
              </p>
            )}
          </div>
        ) : null
      }
      closeIcon={
        <X className="h-5 w-5 rounded-full border border-slate-300 p-0.5 text-slate-500 transition-colors hover:border-rose-400 hover:text-rose-500" />
      }
    >
      <div
        className={`max-h-[75vh] overflow-y-auto ${title || description ? "mt-2" : ""} ${className}`}
      >
        {children}
      </div>
    </Modal>
  );
}
