"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, FileText, Calendar, Edit3, Trash2 } from "lucide-react";
import type { GroupData } from "../data";

interface GroupCardProps {
  group: GroupData;
  onDelete?: (id: string) => void;
}

export default function GroupCard({ group, onDelete }: GroupCardProps) {
  return (
    <div className="bg-[#121212] border border-[#1E1E1E] rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-300 group">
      {/* Thumbnail Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={group.image}
          alt={group.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-3">
        <h3 className="text-base font-bold text-white truncate">{group.name}</h3>

        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed min-h-[32px]">
          {group.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs pt-1">
          <div className="flex items-center gap-1.5 text-gray-400">
            <Users size={14} className="text-primary" />
            <span className="font-semibold text-gray-300">
              {group.membersCount.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400">
            <FileText size={14} className="text-primary" />
            <span className="font-semibold text-gray-300">
              {group.postsCount}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400">
            <Calendar size={14} className="text-primary" />
            <span className="font-semibold text-gray-300">
              {group.eventsCount} events
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 grid grid-cols-3 gap-2">
        <button
          type="button"
          className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium py-2 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Edit3 size={14} />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete?.(group.id)}
          className="bg-white/5 hover:bg-red-500/10 text-gray-300 hover:text-red-400 text-xs font-medium py-2 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>

        <Link
          href={`/dashboard/groups/${group.id}`}
          className="bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center transition-all shadow-md shadow-pink-500/20"
        >
          Open
        </Link>
      </div>
    </div>
  );
}
