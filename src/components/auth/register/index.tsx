"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, ConfigProvider, theme } from "antd";
import { ArrowRight, AlertCircle } from "lucide-react";
import FormField from "@/components/form";
import AuthSideBanner from "../auth-side-banner";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      return;
    }

    if (formData.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push(`/auth/email-verification?email=${encodeURIComponent(formData.email)}`);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full bg-[#0D0D0F]">
      {/* Left Side Reusable Banner */}
      <AuthSideBanner />

      {/* Right Side Form Container */}
      <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-10 lg:px-14 xl:px-20 min-h-screen bg-[#0D0D0F]">
        <div className="w-full max-w-[440px] space-y-6">
          {/* Header Title */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Become an Event Creator
            </h1>
            <p className="text-xs sm:text-sm text-[#8E8E93]">
              Create your account to start the verification process
            </p>
          </div>

          {passwordError && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-400 font-medium animate-fadeIn">
              <AlertCircle size={15} className="shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

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
              className="space-y-3.5 [&_.ant-form-item]:!mb-3.5 [&_.ant-form-item-label]:!pb-1.5 [&_.ant-form-item-label_label]:!h-auto"
            >
              {/* Name FormField */}
              <FormField
                name="name"
                label="NAME"
                required
                placeholder="Enter your name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#141416] !border-[#26262B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3"
              />

              {/* Email FormField */}
              <FormField
                name="email"
                label="EMAIL"
                required
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#141416] !border-[#26262B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3"
              />

              {/* Reefer FormField */}
              <FormField
                name="referralCode"
                label="REEFER (Optional)"
                placeholder="Enter your referral reefer code"
                type="text"
                value={formData.referralCode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    referralCode: e.target.value,
                  }))
                }
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#141416] !border-[#26262B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3"
              />

              {/* Password FormField */}
              <FormField
                name="password"
                label="PASSWORD"
                required
                placeholder="Min. 8 characters"
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, password: e.target.value }));
                  if (passwordError) setPasswordError(null);
                }}
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#141416] !border-[#26262B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3"
              />

              {/* Confirm Password FormField */}
              <FormField
                name="confirmPassword"
                label="CONFIRM PASSWORD"
                required
                placeholder="Re enter password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }));
                  if (passwordError) setPasswordError(null);
                }}
                labelClassName="!text-xs !font-bold !text-[#CCCCCC] !uppercase !tracking-wider"
                inputClassName="!bg-[#141416] !border-[#26262B] !text-white placeholder:!text-[#5A5A60] !rounded-full focus:!border-[#FF2E86] !text-sm px-5 py-3"
              />

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/25 transition-all cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>
                    {loading ? "Processing..." : "Continue to Verification"}
                  </span>
                  {!loading && <ArrowRight size={15} />}
                </button>
              </div>
            </Form>
          </ConfigProvider>

          {/* Bottom Switch Link */}
          <div className="text-center pt-1">
            <p className="text-xs text-[#8E8E93]">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-bold text-[#FF2E86] hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
