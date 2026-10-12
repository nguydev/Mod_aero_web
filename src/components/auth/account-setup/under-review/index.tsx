"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Hourglass,
    Check,
    Clock,
    Mail,
    Copy,
    CheckCheck,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import { AccountSetupFormData } from "../types";


interface ApplicationUnderReviewProps {
    formData: AccountSetupFormData;
}

export default function ApplicationUnderReview({
    formData,
}: ApplicationUnderReviewProps) {
    const [copied, setCopied] = useState(false);
    const applicationId = "#VEL-2025-4821";

    const handleCopy = () => {
        navigator.clipboard.writeText(applicationId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen w-full bg-[#0A0A0C] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8">
            {/* Top Logo */}
            <div className="flex items-center justify-center pt-2 sm:pt-4">
                <Link href="/" className="inline-block transition-transform hover:scale-105">
                    <Image
                        src={logo}
                        alt="Velocity"
                        width={110}
                        height={50}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </Link>
            </div>

            {/* Main Review Card */}
            <div className="w-full max-w-lg mx-auto my-auto py-6">
                <div className="rounded-3xl p-6 sm:p-8 bg-[#141416] border border-[#26262B] space-y-6 shadow-2xl">
                    {/* Top Glowing Hourglass Icon */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-[#38101E] border border-[#FF2E86]/40 flex items-center justify-center text-[#FF2E86] shadow-lg shadow-pink-500/20">
                                <Hourglass size={28} className="animate-pulse" />
                            </div>
                            <div className="absolute -inset-1 rounded-full bg-[#FF2E86]/20 blur-md -z-10" />
                        </div>
                    </div>

                    {/* Heading and Description */}
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            Application Under Review
                        </h1>
                        <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed max-w-md mx-auto">
                            Thank you,{" "}
                            <span className="font-bold text-white">
                                {formData.legalFirstName || "John"}{" "}
                                {formData.legalLastName || "Ramirez"}
                            </span>
                            . Your creator application has been submitted and is currently being reviewed by the Velocity admin team.
                        </p>
                    </div>

                    {/* Application ID Tag */}
                    <div className="flex justify-center">
                        <div
                            onClick={handleCopy}
                            className="px-3.5 py-1.5 rounded-full bg-[#1C1C20] border border-[#2E2E34] hover:border-[#3E3E46] text-xs font-mono text-[#CCCCCC] flex items-center gap-2 cursor-pointer transition-colors"
                        >
                            <span className="text-[#8E8E93]">#</span>
                            <span>Application {applicationId}</span>
                            {copied ? (
                                <CheckCheck size={13} className="text-emerald-400" />
                            ) : (
                                <Copy size={13} className="text-[#8E8E93]" />
                            )}
                        </div>
                    </div>

                    {/* Timeline Status */}
                    <div className="space-y-4 pt-2">
                        {/* Step 1: Application Submitted */}
                        <div className="flex items-start gap-3.5">
                            <div className="w-6 h-6 rounded-full bg-[#FF2E86] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-pink-500/30">
                                <Check size={13} strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-bold text-white">
                                    Application Submitted
                                </p>
                                <p className="text-[11px] text-[#8E8E93]">
                                    Your application has been received.
                                </p>
                            </div>
                        </div>

                        {/* Step 2: Identity Review */}
                        <div className="flex items-start gap-3.5">
                            <div className="w-6 h-6 rounded-full bg-[#FF2E86] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-pink-500/30">
                                <Check size={13} strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-bold text-white">
                                    Identity Review
                                </p>
                                <p className="text-[11px] text-[#8E8E93]">
                                    Our team is verifying your ID and selfie.
                                </p>
                            </div>
                        </div>

                        {/* Step 3: Documentation Check (Active In-Progress) */}
                        <div className="flex items-start gap-3.5">
                            <div className="w-6 h-6 rounded-full bg-[#38101E] border border-[#FF2E86] text-[#FF2E86] flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-[#FF2E86] animate-ping" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-bold text-[#FF2E86]">
                                    Documentation Check
                                </p>
                                <p className="text-[11px] text-[#CCCCCC]">
                                    Legal authorization and insurance documents under review.
                                </p>
                            </div>
                        </div>

                        {/* Step 4: Final Approval */}
                        <div className="flex items-start gap-3.5 opacity-40">
                            <div className="w-6 h-6 rounded-full bg-[#1E1E22] border border-[#2E2E34] text-[#8E8E93] flex items-center justify-center shrink-0 mt-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#8E8E93]" />
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm font-bold text-[#8E8E93]">
                                    Final Approval
                                </p>
                                <p className="text-[11px] text-[#8E8E93]">
                                    Admin team final sign-off on your creator account.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Review Time & Notification Boxes */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="p-4 rounded-2xl bg-[#18181B] border border-[#26262B] text-center space-y-1">
                            <Clock size={16} className="text-[#FF2E86] mx-auto" />
                            <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
                                TYPICAL REVIEW TIME
                            </p>
                            <p className="text-xs sm:text-sm font-extrabold text-white">
                                24–72 hours
                            </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#18181B] border border-[#26262B] text-center space-y-1">
                            <Mail size={16} className="text-[#FF2E86] mx-auto" />
                            <p className="text-[10px] font-bold text-[#8E8E93] uppercase tracking-wider">
                                NOTIFICATION
                            </p>
                            <p className="text-xs sm:text-sm font-extrabold text-white">
                                via email
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Support Button */}
                <div className="pt-4">
                    <Link
                        href="/contact"
                        className="w-full py-3.5 rounded-full text-xs font-bold text-white bg-[#141416] hover:bg-[#1C1C20] border border-[#2E2E34] hover:border-[#3E3E46] transition-all cursor-pointer flex items-center justify-center"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>

            {/* Bottom Footer Note */}
            <footer className="text-center pb-2 pt-4">
                <p className="text-[11px] text-[#636369]">
                    © 2026 Velocity Platform ·{" "}
                    <Link href="/privacy" className="hover:text-[#8E8E93] underline">
                        Privacy Policy
                    </Link>{" "}
                    ·{" "}
                    <Link href="/terms" className="hover:text-[#8E8E93] underline">
                        Terms
                    </Link>
                </p>
            </footer>
        </div>
    );
}
