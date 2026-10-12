export interface ChallengeItem {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  status: "Active" | "Draft" | "Completed";
  description: string;
  xp: number;
  endDate: string;
  participantsCount?: string;
  completionRate?: string;
}

export interface AchievementItem {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  status: "Active" | "Unlocked";
  description: string;
  xp: number;
  unlockedCount: string;
}

export const mockChallenges: ChallengeItem[] = [
  {
    id: "c1",
    name: "Weekend Warrior",
    badge: "CRUISER",
    badgeColor: "text-[#14B8A6]",
    badgeBg: "bg-[#102B28]",
    status: "Active",
    description: "Drive 100 verified miles this weekend.",
    xp: 500,
    endDate: "August 9",
    participantsCount: "2,482",
    completionRate: "34%",
  },
  {
    id: "c2",
    name: "Track Rat",
    badge: "RACER",
    badgeColor: "text-[#FF2E86]",
    badgeBg: "bg-[#3E1428]",
    status: "Active",
    description: "Complete 20 verified laps on any track.",
    xp: 750,
    endDate: "August 15",
    participantsCount: "1,204",
    completionRate: "32%",
  },
  {
    id: "c3",
    name: "Garage Builder",
    badge: "ENGINEER",
    badgeColor: "text-[#F59E0B]",
    badgeBg: "bg-[#3B2810]",
    status: "Draft",
    description: "Add 3 vehicle modifications to your garage.",
    xp: 300,
    endDate: "August 31",
  },
  {
    id: "c4",
    name: "Night Stalker",
    badge: "RACER",
    badgeColor: "text-[#FF2E86]",
    badgeBg: "bg-[#3E1428]",
    status: "Active",
    description: "Complete 5 verified drives after 10 PM.",
    xp: 600,
    endDate: "August 12",
    participantsCount: "890",
    completionRate: "46%",
  },
];

export const mockAchievements: AchievementItem[] = [
  {
    id: "a1",
    name: "First Meet Attendee",
    badge: "CRUISER",
    badgeColor: "text-[#14B8A6]",
    badgeBg: "bg-[#102B28]",
    status: "Active",
    description: "Attend your first official Velocity automotive meet.",
    xp: 250,
    unlockedCount: "4,120 users",
  },
  {
    id: "a2",
    name: "Apex Predator",
    badge: "RACER",
    badgeColor: "text-[#FF2E86]",
    badgeBg: "bg-[#3E1428]",
    status: "Active",
    description: "Set a top-10 leaderboard lap time in your car class.",
    xp: 1000,
    unlockedCount: "142 users",
  },
  {
    id: "a3",
    name: "Master Mechanic",
    badge: "ENGINEER",
    badgeColor: "text-[#F59E0B]",
    badgeBg: "bg-[#3B2810]",
    status: "Active",
    description: "Document 10 verified build mods on your vehicle profile.",
    xp: 500,
    unlockedCount: "830 users",
  },
];
