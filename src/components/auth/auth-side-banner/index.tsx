"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, CheckCircle } from "lucide-react";
import sideImage from "@/assets/auth/login-background.svg";
import logo from "@/assets/logo.svg";

export default function AuthSideBanner() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-full h-full min-h-screen p-8 xl:p-12 overflow-hidden bg-[#0A0A0C]">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <Image
          src={sideImage}
          alt="Velocity Automotive"
          fill
          priority
          unoptimized
          className="object-cover opacity-90 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/70" />
      </div>

      {/* Top Logo */}
      <div className="relative z-10 flex items-center justify-center pt-2">
        <Link href="/" className="inline-block transition-transform hover:scale-105">
          <Image
            src={logo}
            alt="Velocity"
            width={120}
            height={70}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Middle Content */}
      <div className="relative z-10 text-center space-y-8 my-auto py-8">
        <div className="space-y-3">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#FF2E86] block">
            EVENT CREATOR PLATFORM
          </span>

          <h1 className="text-3xl xl:text-4xl 2xl:text-[40px] font-extrabold text-white tracking-tight leading-[1.15]">
            The stage for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2E86] via-[#FF5A26] to-[#FF7A1A]">
              automotive legends.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#A0A0A5] max-w-md mx-auto leading-relaxed pt-1">
            Create, manage, and grow world-class car meets, track days, and automotive experiences — all in one place.
          </p>
        </div>

        {/* 3 Stats Row */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-2">
          <div className="space-y-0.5 text-center">
            <h3 className="text-xl xl:text-2xl font-extrabold text-white tracking-tight">
              12K+
            </h3>
            <p className="text-[11px] text-[#8E8E93] font-medium">Events Created</p>
          </div>

          <div className="space-y-0.5 text-center">
            <h3 className="text-xl xl:text-2xl font-extrabold text-white tracking-tight">
              840K+
            </h3>
            <p className="text-[11px] text-[#8E8E93] font-medium">Attendees</p>
          </div>

          <div className="space-y-0.5 text-center">
            <h3 className="text-xl xl:text-2xl font-extrabold text-white tracking-tight">
              98%
            </h3>
            <p className="text-[11px] text-[#8E8E93] font-medium">Creator Satisfaction</p>
          </div>
        </div>

        {/* Security & Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[11px] font-semibold text-[#CCCCCC] flex items-center gap-1.5 shadow-sm">
            <ShieldCheck size={13} className="text-[#FF2E86]" />
            <span>Verified Platform</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[11px] font-semibold text-[#CCCCCC] flex items-center gap-1.5 shadow-sm">
            <CheckCircle size={13} className="text-[#FF2E86]" />
            <span>Identity Protected</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[11px] font-semibold text-[#CCCCCC] flex items-center gap-1.5 shadow-sm">
            <Lock size={13} className="text-[#FF2E86]" />
            <span>Secure & Private</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="relative z-10 text-center pb-2">
        <p className="text-[11px] text-[#636369] font-medium tracking-wide">
          © 2025 Velocity Platform · All rights reserved
        </p>
      </div>
    </div>
  );
}
