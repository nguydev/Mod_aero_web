"use client";

import { Suspense } from "react";
import EmailVerification from "@/components/auth/email-verification";

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0D0F]" />}>
      <EmailVerification />
    </Suspense>
  );
}
