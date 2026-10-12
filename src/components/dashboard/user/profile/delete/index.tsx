"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, ConfigProvider, theme } from "antd";
import { Trash2, AlertTriangle, X } from "lucide-react";

interface DeleteAccountModalProps {
    open: boolean;
    onClose: () => void;
}

export default function DeleteAccountModal({
    open,
    onClose,
}: DeleteAccountModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onClose();
            router.push("/auth/login");
        }, 1200);
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorBgElevated: "#141416",
                    colorBorderSecondary: "#26262B",
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
                width={440}
                closeIcon={
                    <X className="w-5 h-5 text-[#8E8E93] hover:text-white transition-colors" />
                }
                className="[&_.ant-modal-content]:!bg-[#141416] [&_.ant-modal-content]:!border [&_.ant-modal-content]:!border-[#26262B] [&_.ant-modal-content]:!rounded-3xl [&_.ant-modal-content]:!p-6"
            >
                <div className="p-2 text-center space-y-4">
                    {/* Danger Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 mx-auto flex items-center justify-center">
                        <Trash2 size={26} strokeWidth={2.2} />
                    </div>

                    <div className="space-y-1.5">
                        <h3 className="text-xl font-bold text-white tracking-tight">
                            Delete Account
                        </h3>
                        <p className="text-xs text-[#8E8E93] leading-relaxed">
                            Are you sure you want to permanently delete your account? This action is irreversible and all your created events, club memberships, and profile data will be permanently removed.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 py-3 rounded-full text-xs font-semibold text-[#CCCCCC] hover:text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/10 transition-colors cursor-pointer disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex-1 py-3 rounded-full text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-all cursor-pointer shadow-lg shadow-rose-600/20 disabled:opacity-50 inline-flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Deleting...</span>
                                </>
                            ) : (
                                <span>Delete Account</span>
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    );
}
