export interface AdminUserVehicle {
  id: string;
  model: string;
  year: number;
  type: string;
}

export interface AdminUserData {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  vehiclesCount: number;
  eventsCount: number;
  status: "Active" | "Suspended";
  location?: string;
  joinedDate?: string;
  drivesCount?: number;
  xp?: string;
  totalRefer?: number;
  vehicles?: AdminUserVehicle[];
}

export const mockAdminUsers: AdminUserData[] = [
  {
    id: "23433423",
    name: "Alex Morgan",
    email: "alex@email.com",
    initials: "AM",
    avatarBg: "bg-[#451528]",
    avatarColor: "text-[#FF2E86]",
    vehiclesCount: 3,
    eventsCount: 8,
    status: "Active",
    location: "California, USA",
    joinedDate: "January 18, 2026",
    drivesCount: 128,
    xp: "8,450",
    totalRefer: 12,
    vehicles: [
      {
        id: "v1",
        model: "BMW M4 Competition",
        year: 2024,
        type: "Performance Build",
      },
      {
        id: "v2",
        model: "Porsche 911 Carrera",
        year: 2023,
        type: "Stock",
      },
      {
        id: "v3",
        model: "Toyota GR Supra",
        year: 2022,
        type: "Modified",
      },
    ],
  },
  {
    id: "23433424",
    name: "Ryan Cooper",
    email: "ryan@email.com",
    initials: "RC",
    avatarBg: "bg-[#0E382B]",
    avatarColor: "text-[#10B981]",
    vehiclesCount: 1,
    eventsCount: 3,
    status: "Active",
    location: "Texas, USA",
    joinedDate: "February 04, 2026",
    drivesCount: 42,
    xp: "3,120",
    totalRefer: 4,
    vehicles: [
      {
        id: "v4",
        model: "Nissan GT-R Nismo",
        year: 2023,
        type: "Track Spec",
      },
    ],
  },
  {
    id: "23433425",
    name: "James Wilson",
    email: "james@email.com",
    initials: "JW",
    avatarBg: "bg-[#182B48]",
    avatarColor: "text-[#3B82F6]",
    vehiclesCount: 5,
    eventsCount: 12,
    status: "Suspended",
    location: "Florida, USA",
    joinedDate: "November 12, 2025",
    drivesCount: 210,
    xp: "14,800",
    totalRefer: 18,
    vehicles: [
      {
        id: "v5",
        model: "Chevrolet Corvette Z06",
        year: 2024,
        type: "Supercharged",
      },
    ],
  },
  {
    id: "23433426",
    name: "Sarah Chen",
    email: "sarah@email.com",
    initials: "SC",
    avatarBg: "bg-[#453216]",
    avatarColor: "text-[#F59E0B]",
    vehiclesCount: 2,
    eventsCount: 6,
    status: "Active",
    location: "Nevada, USA",
    joinedDate: "December 01, 2025",
    drivesCount: 89,
    xp: "5,640",
    totalRefer: 7,
    vehicles: [
      {
        id: "v6",
        model: "Audi R8 V10 Performance",
        year: 2023,
        type: "Aero Spec",
      },
    ],
  },
  {
    id: "23433427",
    name: "Marcus Reed",
    email: "marcus@email.com",
    initials: "MR",
    avatarBg: "bg-[#331C4A]",
    avatarColor: "text-[#A855F7]",
    vehiclesCount: 4,
    eventsCount: 19,
    status: "Active",
    location: "Washington, USA",
    joinedDate: "October 15, 2025",
    drivesCount: 315,
    xp: "22,400",
    totalRefer: 25,
    vehicles: [
      {
        id: "v7",
        model: "Ford Mustang Dark Horse",
        year: 2024,
        type: "Track Spec",
      },
    ],
  },
];
