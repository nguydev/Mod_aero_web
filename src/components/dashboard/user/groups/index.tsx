"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import GroupCard from "./card";
import { mockGroupsData, type GroupData } from "./data";

export default function Groups() {
  const [groups, setGroups] = useState<GroupData[]>(mockGroupsData);

  const handleDelete = (id: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Groups
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Manage your automotive communities
          </p>
        </div>

        <Link
          href="/dashboard/groups/create"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white button-shadow transition-transform duration-200 w-max"
        >
          <Plus size={16} />
          <span>Create Group</span>
        </Link>
      </div>

      {/* Groups Grid */}
      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#1E1E1E] bg-[#121212] p-12 text-center text-gray-400">
          No groups found.
        </div>
      )}
    </div>
  );
}
