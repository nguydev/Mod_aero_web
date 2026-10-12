"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, ConfigProvider, theme } from "antd";
import { ArrowRight, CheckCircle, Mail, RotateCw } from "lucide-react";
import AuthSideBanner from "../auth-side-banner";

export default function EmailVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@gmail.com";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend Countdown Timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle pasting a 6-digit code
      const pastedDigits = value.replace(/\D/g, "").slice(0, 6).split("");
      if (pastedDigits.length > 0) {
        const newOtp = [...otp];
        pastedDigits.forEach((digit, i) => {
          if (index + i < 6) newOtp[index + i] = digit;
        });
        setOtp(newOtp);
        const nextIndex = Math.min(index + pastedDigits.length, 5);
        inputRefs.current[nextIndex]?.focus();
      }
      return;
    }

    const digit = value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(59);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsVerified(true);
      setTimeout(() => {
        router.push("/auth/account-setup");
      }, 1200);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full bg-[#0D0D0F]">
      {/* Left Side Reusable Banner */}
      <AuthSideBanner />

      {/* Right Side Form Container */}
      <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-10 lg:px-14 xl:px-20 min-h-screen bg-[#0D0D0F]">
        <div className="w-full max-w-[440px] space-y-7">
          {/* Header Title */}
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#FF2E86]/10 border border-[#FF2E86]/20 text-[#FF2E86] flex items-center justify-center mb-3">
              <Mail size={22} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Verify your email
            </h1>
            <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
              We sent a 6-digit verification code to{" "}
              <span className="font-semibold text-white">{email}</span>. Enter the code below to complete your registration.
            </p>
          </div>

          {/* Success Banner */}
          {isVerified && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-400 font-semibold animate-fadeIn">
              <CheckCircle size={18} className="shrink-0" />
              <span>Email verified successfully! Redirecting to sign in...</span>
            </div>
          )}

          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
              token: {
                colorBgContainer: "#141416",
                colorBorder: "#26262B",
                colorPrimary: "#FF2E86",
                borderRadius: 16,
              },
            }}
          >
            <Form layout="vertical" onFinish={handleSubmit} className="space-y-6">
              {/* 6-Digit OTP Inputs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#CCCCCC] uppercase tracking-wider block">
                  VERIFICATION CODE <span className="text-[#FF2E86]">*</span>
                </label>

                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border text-center text-xl sm:text-2xl font-extrabold text-white bg-[#141416] transition-all outline-none ${digit
                        ? "border-[#FF2E86] shadow-sm shadow-pink-500/20"
                        : "border-[#26262B] hover:border-[#3E3E46] focus:border-[#FF2E86]"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Resend Code Section */}
              <div className="flex items-center justify-between text-xs text-[#8E8E93] pt-1">
                <span>Didn&apos;t receive the code?</span>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-bold text-[#FF2E86] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw size={12} />
                    <span>Resend Code</span>
                  </button>
                ) : (
                  <span className="font-medium text-[#71717A]">
                    Resend in <span className="text-white font-bold">{countdown}s</span>
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || otp.join("").length !== 6 || isVerified}
                  className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-lg shadow-pink-500/25 transition-all cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{loading ? "Verifying..." : "Verify & Continue"}</span>
                  {!loading && <ArrowRight size={15} />}
                </button>
              </div>
            </Form>
          </ConfigProvider>

          {/* Bottom Switch Link */}
          <div className="text-center pt-1">
            <p className="text-xs text-[#8E8E93]">
              Need to change your email?{" "}
              <Link
                href="/auth/register"
                className="font-bold text-[#FF2E86] hover:underline ml-1"
              >
                Back to Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
