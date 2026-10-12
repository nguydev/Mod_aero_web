"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Check,
  X,
  Eye,
  Trash2,
  Plus,
  Heart,
  Edit3,
  Pin,
} from "lucide-react";
import CreatePostModal, {
  type CreatePostData,
} from "@/components/dashboard/user/groups/create-post-modal";
import {
  mockGroupsData,
  type GroupData,
  type PendingRequest,
  type GroupMember,
  type GroupPost,
} from "../data";

interface GroupDetailsProps {
  id?: string;
}

export default function GroupDetails({ id }: GroupDetailsProps) {
  const initialGroup: GroupData =
    mockGroupsData.find((g) => g.id === id) || mockGroupsData[2];

  const [activeTab, setActiveTab] = useState<"members" | "posts">("members");
  const [group, setGroup] = useState<GroupData>(initialGroup);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Accept pending request
  const handleAcceptRequest = (req: PendingRequest) => {
    const newMember: GroupMember = {
      id: `mem-${Date.now()}`,
      name: req.name,
      avatar: req.avatar,
      vehicle: req.vehicle,
      joinedDate: "Today",
    };
    setGroup((prev) => ({
      ...prev,
      pendingRequests: prev.pendingRequests.filter((r) => r.id !== req.id),
      members: [newMember, ...prev.members],
      membersCount: prev.membersCount + 1,
    }));
  };

  // Reject pending request
  const handleRejectRequest = (reqId: string) => {
    setGroup((prev) => ({
      ...prev,
      pendingRequests: prev.pendingRequests.filter((r) => r.id !== reqId),
    }));
  };

  // Delete member
  const handleDeleteMember = (memId: string) => {
    setGroup((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== memId),
      membersCount: Math.max(0, prev.membersCount - 1),
    }));
  };

  // Delete post
  const handleDeletePost = (postId: string) => {
    setGroup((prev) => ({
      ...prev,
      posts: prev.posts.filter((p) => p.id !== postId),
      postsCount: Math.max(0, prev.postsCount - 1),
    }));
  };

  // Toggle Pin post
  const handleTogglePin = (postId: string) => {
    setGroup((prev) => ({
      ...prev,
      posts: prev.posts.map((p) =>
        p.id === postId ? { ...p, isPinned: !p.isPinned } : p
      ),
    }));
  };

  // Create new post
  const handleCreatePost = (data: CreatePostData) => {
    const newPost: GroupPost = {
      id: `post-${Date.now()}`,
      caption: data.hashtags
        ? `${data.caption} ${data.hashtags}`.trim()
        : data.caption,
      image:
        data.image ||
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
      likes: 0,
      views: 1,
      date: "Just now",
      isPinned: false,
    };

    setGroup((prev) => ({
      ...prev,
      posts: [newPost, ...prev.posts],
      postsCount: prev.postsCount + 1,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/groups"
          className="w-9 h-9 rounded-full border border-white/10 bg-[#141414] hover:bg-white/10 flex items-center justify-center text-white transition-colors shrink-0"
          aria-label="Back to Groups"
        >
          <ChevronLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {group.name}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {group.membersCount.toLocaleString()} members · {group.posts.length} Post
          </p>
        </div>
      </div>

      {/* Hero Cover Banner */}
      <div className="relative h-[180px] md:h-[220px] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-[#222222] p-6 md:p-8 flex flex-col justify-end">
        <Image
          src={group.coverImage}
          alt={group.name}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="relative z-10 space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {group.name}
          </h2>
          <p className="text-xs md:text-sm text-gray-300 font-normal">
            {group.description}
          </p>
        </div>
      </div>

      {/* Tabs & Create Post Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("members")}
            className={`px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeTab === "members"
              ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white shadow-md shadow-pink-500/25"
              : "bg-[#141414] border border-[#222222] text-gray-400 hover:text-white"
              }`}
          >
            Members
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("posts")}
            className={`px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${activeTab === "posts"
              ? "bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] text-white shadow-md shadow-pink-500/25"
              : "bg-[#141414] border border-[#222222] text-gray-400 hover:text-white"
              }`}
          >
            Posts
          </button>
        </div>

        {activeTab === "posts" && (
          <button
            type="button"
            onClick={() => setIsCreatePostModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white button-shadow transition-transform duration-200 w-max cursor-pointer"
          >
            <Plus size={16} />
            <span>Create Post</span>
          </button>
        )}
      </div>

      {/* Tab 1: Members View */}
      {activeTab === "members" && (
        <div className="space-y-6">
          {/* Pending Requests Section */}
          {group.pendingRequests.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Pending Requests</h3>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {group.pendingRequests.length} PENDING
                </span>
              </div>

              <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-4 md:p-5 space-y-3 divide-y divide-[#1E1E1E]">
                {group.pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 first:pt-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                        <Image
                          src={req.avatar}
                          alt={req.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-white leading-tight">
                          {req.name}
                        </span>
                        <span className="text-xs text-gray-500 leading-tight mt-0.5">
                          {req.vehicle} · Requested {req.requestedDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        type="button"
                        onClick={() => handleAcceptRequest(req)}
                        className="h-8 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Check size={14} />
                        <span>Accept</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRejectRequest(req.id)}
                        className="h-8 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <X size={14} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Members List Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Group Members</h3>
              <span className="text-xs text-gray-400">
                {group.members.length} Active Members
              </span>
            </div>

            <div className="rounded-2xl bg-[#121212] border border-[#1E1E1E] p-4 md:p-5 space-y-3 divide-y divide-[#1E1E1E]">
              {group.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between gap-3 pt-3 first:pt-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-white leading-tight">
                        {member.name}
                      </span>
                      <span className="text-xs text-gray-500 leading-tight mt-0.5">
                        {member.vehicle} · Joined {member.joinedDate}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/5 transition-colors cursor-pointer"
                    title="Remove Member"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Posts View */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {group.posts.map((post) => (
            <div
              key={post.id}
              className="rounded-2xl bg-[#121212] border border-[#1E1E1E] overflow-hidden flex flex-col justify-between group hover:border-[#333333] transition-all"
            >
              {/* Post Image & Pin Badge */}
              <div className="relative h-[200px] w-full bg-[#1A1A1A]">
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  unoptimized
                  className="object-cover"
                />
                {post.isPinned && (
                  <div className="absolute top-3 left-3 bg-[#FF2E86]/90 border border-[#FF2E86] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                    <Pin size={10} className="fill-current" />
                    <span>PINNED</span>
                  </div>
                )}
              </div>

              {/* Post Caption */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-300 font-normal leading-relaxed">
                  {post.caption}
                </p>

                {/* Likes, Views, Date */}
                <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart size={12} className="text-gray-400" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={12} className="text-gray-400" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                  <span>{post.date}</span>
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
                  onClick={() => handleTogglePin(post.id)}
                  className={`text-xs font-medium py-2 rounded-xl border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${post.isPinned
                    ? "bg-[#FF2E86]/20 text-[#FF2E86] border-[#FF2E86]/40"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-white/5"
                    }`}
                >
                  <Pin size={14} />
                  <span>{post.isPinned ? "Unpin" : "Pin"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDeletePost(post.id)}
                  className="bg-white/5 hover:bg-red-500/10 text-gray-300 hover:text-red-400 text-xs font-medium py-2 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reusable Create Post Modal */}
      <CreatePostModal
        open={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onPublish={handleCreatePost}
      />
    </div>
  );
}
