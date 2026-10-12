"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { mockRoutes, RouteItem } from "./data";

export default function ManageRoutes() {
  const [routes] = useState<RouteItem[]>(mockRoutes);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Manage Routes
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E93] font-normal">
            You can add routes here and User can view it in his routes section
          </p>
        </div>

        <Link
          href="/admin/manage-routes/view/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-md shadow-[#FF2E86]/20 transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={15} />
          <span>Create Route</span>
        </Link>
      </div>

      {/* Routes Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {routes.map((route, idx) => (
          <Link
            key={`${route.id}-${idx}`}
            href={`/admin/manage-routes/view/${route.id}`}
            className="rounded-2xl p-4 md:p-5 bg-[#141416] border border-[#26262B] hover:border-[#FF2E86]/40 transition-all duration-200 flex items-center gap-4 cursor-pointer group shadow-sm block"
          >
            {/* Route Thumbnail */}
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-[#222226] border border-white/5">
              <Image
                src={route.image}
                alt={route.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-300"
              />
            </div>

            {/* Route Content */}
            <div className="min-w-0 space-y-0.5">
              <h3 className="text-sm md:text-base font-bold text-white truncate">
                {route.name}
              </h3>
              <p className="text-xs font-semibold text-[#FF2E86]">
                {route.category}
              </p>
              <p className="text-xs text-[#8E8E93]">
                {route.distance} · {route.duration}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}