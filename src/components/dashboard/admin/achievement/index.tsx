"use client";

import React, { useState } from "react";
import { Tabs, ConfigProvider, theme } from "antd";
import { Plus } from "lucide-react";
import {
  mockChallenges,
  mockAchievements,
  ChallengeItem,
  AchievementItem,
} from "./data";
import CreateChallengeModal from "./create-challenge-modal";

export default function AdminChallengesAndAchievements() {
  const [challenges, setChallenges] = useState<ChallengeItem[]>(mockChallenges);
  const [achievements] = useState<AchievementItem[]>(mockAchievements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("challenges");

  const handleCreateChallenge = (newChallenge: ChallengeItem) => {
    setChallenges((prev) => [newChallenge, ...prev]);
  };

  const handleToggleStatus = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
            ...c,
            status: c.status === "Active" ? "Draft" : "Active",
          }
          : c
      )
    );
  };

  const tabItems = [
    {
      key: "challenges",
      label: "Challenges",
      children: (
        <div className="rounded-2xl bg-[#141416] border border-[#26262B] p-5 md:p-6 shadow-sm divide-y divide-[#26262B]/80">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="py-4 first:pt-1 last:pb-1 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Info */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-sm md:text-base font-bold text-white">
                    {challenge.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${challenge.badgeBg} ${challenge.badgeColor}`}
                  >
                    {challenge.badge}
                  </span>
                  <span
                    className={`text-xs font-semibold ${challenge.status === "Active"
                      ? "text-[#10B981]"
                      : "text-[#8E8E93]"
                      }`}
                  >
                    {challenge.status}
                  </span>
                </div>

                <p className="text-xs text-[#8E8E93]">
                  {challenge.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs text-[#8E8E93] pt-0.5">
                  <span className="font-bold text-[#FF2E86]">
                    {challenge.xp} XP
                  </span>
                  <span>·</span>
                  <span>Ends: {challenge.endDate}</span>
                  {challenge.participantsCount && (
                    <>
                      <span>·</span>
                      <span>
                        {challenge.participantsCount} participants ·{" "}
                        {challenge.completionRate} completion
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold !text-[#D1D1D6] hover:!text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-all text-center cursor-pointer"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold !text-[#D1D1D6] hover:!text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-all text-center cursor-pointer"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleStatus(challenge.id)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-[#8E8E93] hover:text-[#FF4D4F] bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-all text-center cursor-pointer"
                >
                  {challenge.status === "Active" ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "achievements",
      label: "Achievements",
      children: (
        <div className="rounded-2xl bg-[#141416] border border-[#26262B] p-5 md:p-6 shadow-sm divide-y divide-[#26262B]/80">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="py-4 first:pt-1 last:pb-1 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Info */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-sm md:text-base font-bold text-white">
                    {achievement.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${achievement.badgeBg} ${achievement.badgeColor}`}
                  >
                    {achievement.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#10B981]">
                    {achievement.status}
                  </span>
                </div>

                <p className="text-xs text-[#8E8E93]">
                  {achievement.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs text-[#8E8E93] pt-0.5">
                  <span className="font-bold text-[#FF2E86]">
                    {achievement.xp} XP
                  </span>
                  <span>·</span>
                  <span>Unlocked by {achievement.unlockedCount}</span>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold !text-[#D1D1D6] hover:!text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-all text-center cursor-pointer"
                >
                  View
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold !text-[#D1D1D6] hover:!text-white bg-[#1C1C20] hover:bg-[#28282E] border border-white/5 transition-all text-center cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Challenges & Achievements
          </h1>
          <p className="text-xs md:text-sm text-[#8E8E93] font-normal max-w-2xl">
            Create and manage the challenges, achievements, XP and progression system available to Velocity users.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#FF2E86] to-[#FF7A1A] hover:opacity-95 shadow-md shadow-[#FF2E86]/20 transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus size={15} />
          <span>Create Challenge</span>
        </button>
      </div>

      {/* 2 KPI Stat Cards */}
      <div className="flex flex-wrap items-center gap-4 md:gap-5">
        <div className="rounded-2xl p-5 bg-[#141416] border border-[#26262B] w-full sm:w-64 md:w-72 min-h-[105px] flex flex-col justify-between">
          <p className="text-xs font-medium text-[#8E8E93]">Active Challenges</p>
          <p className="text-3xl font-extrabold text-white tracking-tight mt-1">
            {challenges.filter((c) => c.status === "Active").length}
          </p>
        </div>

        <div className="rounded-2xl p-5 bg-[#141416] border border-[#26262B] w-full sm:w-64 md:w-72 min-h-[105px] flex flex-col justify-between">
          <p className="text-xs font-medium text-[#8E8E93]">Total Achievements</p>
          <p className="text-3xl font-extrabold text-white tracking-tight mt-1">
            48
          </p>
        </div>
      </div>

      {/* Ant Design Tabs for Challenges & Achievements */}
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#FF2E86",
            colorText: "#8E8E93",
            fontSize: 14,
          },
          components: {
            Tabs: {
              inkBarColor: "#FF2E86",
              itemActiveColor: "#FF2E86",
              itemSelectedColor: "#FF2E86",
              itemHoverColor: "#FF7A1A",
              itemColor: "#8E8E93",
              horizontalItemPadding: "10px 16px",
            },
          },
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="admin-achievement-tabs"
        />
      </ConfigProvider>

      {/* Create Challenge Modal */}
      <CreateChallengeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateChallenge}
      />
    </div>
  );
}