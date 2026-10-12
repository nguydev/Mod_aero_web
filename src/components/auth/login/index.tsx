"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, ConfigProvider, theme } from "antd";
import { ArrowRight, Check } from "lucide-react";
import FormField from "@/components/form";
import AuthSideBanner from "../auth-side-banner";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "john@velocityevents.com",
        password: "",
        rememberMe: false,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!formData.email.trim() || !formData.password.trim()) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full bg-[#0D0D0F]">
            {/* Left Side Reusable Banner */}
            <AuthSideBanner />

            {/* Right Side Form Container */}
            <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-10 lg:px-14 xl:px-20 min-h-screen bg-[#0D0D0F]">
                <div className="w-full max-w-[420px] space-y-7">
                    {/* Header Title */}
                    <div className="space-y-1.5">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-xs sm:text-sm text-[#8E8E93]">
                            Sign in to your Velocity account
                        </p>
                    </div>

                    <ConfigProvider
                        theme={{
                            algorithm: theme.darkAlgorithm,
                            token: {
                                colorBgContainer: "#141416",
                                colorBorder: "#26262B",
                                colorText: "#FFFFFF",
                                colorTextPlaceholder: "#5A5A60",
                                colorPrimary: "#FF2E86",
                                borderRadius: 9999,
                            },
                        }}
                    >
                        <Form
                            layout="vertical"
                            onFinish={handleSubmit}
                            className="space-y-4 [&_.ant-form-item]:!mb-4 [&_.ant-form-item-label]:!pb-1.5 [&_.ant-form-item-label_label]:!h-auto"
                        >
                            {/* Email FormField */}
                            <FormField
                                name="email"
                                label="EMAIL"
                                required
                                placeholder="john@velocityevents.com"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                                }
                                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                                inputClassName="!bg-[#141416] !border-[#26262B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3"
                            />

                            {/* Password FormField */}
                            <FormField
                                name="password"
                                label="PASSWORD"
                                required
                                placeholder="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                                }
                                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                                inputClassName="!bg-[#141416] !border-[#26262B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3"
                            />

                            {/* Remember Me & Forgot Password Row */}
                            <div className="flex items-center justify-between pt-1">
                                <label
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            rememberMe: !prev.rememberMe,
                                        }))
                                    }
                                    className="flex items-center gap-2 cursor-pointer select-none"
                                >
                                    <div
                                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.rememberMe
                                            ? "bg-[#FF2E86] border-[#FF2E86] text-white"
                                            : "border-[#4A4A52] bg-[#141416]"
                                            }`}
                                    >
                                        {formData.rememberMe && <Check size={11} strokeWidth={3} />}
                                    </div>
                                    <span className="text-xs font-medium text-[#CCCCCC]">
                                        Remember me
                                    </span>
                                </label>

                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs font-semibold !text-[#FF2E86] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Action Button */}
                            <div className="pt-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/25 transition-all cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    <span>{loading ? "Signing in..." : "Sign In"}</span>
                                    {!loading && <ArrowRight size={15} />}
                                </button>
                            </div>
                        </Form>
                    </ConfigProvider>

                    {/* Bottom Switch Link */}
                    <div className="text-center pt-2">
                        <p className="text-xs text-[#8E8E93]">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/auth/register"
                                className="font-bold text-[#FF2E86] hover:underline ml-1"
                            >
                                Apply to become a creator
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}