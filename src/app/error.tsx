"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-natural flex items-center justify-center p-6">
      <div className="px-10 py-12 text-center w-full">
        <h1 className="text-7xl font-extrabold text-primary drop-shadow-sm">
          500
        </h1>

        <h2 className="text-2xl font-semibold mt-4 text-gray-300">Something went wrong</h2>
        <p className="text-gray-400 mt-2">
          We encountered an unexpected error. Please try again or return home.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 w-max mx-auto  ">
          <button
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium uppercase tracking-wide text-white shadow-sm transition hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
          >
            Try Again
          </button>

          <Link href="/">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-slate-400 transition hover:text-primary cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back Home
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}
