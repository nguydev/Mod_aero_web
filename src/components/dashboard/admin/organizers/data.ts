export interface OrganizerGroupItem {
  id: string;
  name: string;
  membersCount: number;
}

export interface OrganizerEventItem {
  id: string;
  name: string;
  date: string;
  participantsCount: number;
}

export interface AdminOrganizerData {
  id: string;
  name: string;
  organization: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  eventsCount: number;
  groupsCount: number;
  status: "Verified" | "Suspense";
  type?: string;
  email?: string;
  phone?: string;
  website?: string;
  verification?: string;
  totalRefer?: number;
  participantsTotal?: string;
  earnings?: string;
  groups?: OrganizerGroupItem[];
  events?: OrganizerEventItem[];
}

export const mockAdminOrganizers: AdminOrganizerData[] = [
  {
    id: "org-1",
    name: "Alex Morgan",
    organization: "Apex Motors Club",
    initials: "AM",
    avatarBg: "bg-[#3E1424]",
    avatarColor: "text-[#FF2E86]",
    eventsCount: 12,
    groupsCount: 2,
    status: "Verified",
    type: "Racing Club",
    email: "alex@apexmotors.com",
    phone: "+1 310 555 0192",
    website: "apexmotorsclub.com",
    verification: "Verified",
    totalRefer: 12,
    participantsTotal: "1,284",
    earnings: "$18,450",
    groups: [
      {
        id: "g1",
        name: "Apex Motors Club Club",
        membersCount: 342,
      },
      {
        id: "g2",
        name: "Apex Motors Club Elite",
        membersCount: 89,
      },
    ],
    events: [
      {
        id: "e1",
        name: "Velocity Night Run",
        date: "August 15",
        participantsCount: 126,
      },
      {
        id: "e2",
        name: "Canyon Assault",
        date: "August 22",
        participantsCount: 84,
      },
    ],
  },
  {
    id: "org-2",
    name: "Daniel Carter",
    organization: "Drive Society",
    initials: "DC",
    avatarBg: "bg-[#3B2614]",
    avatarColor: "text-[#F59E0B]",
    eventsCount: 6,
    groupsCount: 1,
    status: "Suspense",
    type: "Track Enthusiasts",
    email: "daniel@drivesociety.com",
    phone: "+1 415 555 0184",
    website: "drivesociety.com",
    verification: "Suspense",
    totalRefer: 5,
    participantsTotal: "620",
    earnings: "$7,820",
    groups: [
      {
        id: "g3",
        name: "Drive Society Track Club",
        membersCount: 180,
      },
    ],
    events: [
      {
        id: "e3",
        name: "Laguna Seca Morning Session",
        date: "August 28",
        participantsCount: 48,
      },
    ],
  },
  {
    id: "org-3",
    name: "Mike Ross",
    organization: "Road Kings",
    initials: "MR",
    avatarBg: "bg-[#2B1640]",
    avatarColor: "text-[#A855F7]",
    eventsCount: 18,
    groupsCount: 3,
    status: "Verified",
    type: "Car Meet Community",
    email: "mike@roadkings.com",
    phone: "+1 213 555 0199",
    website: "roadkings.com",
    verification: "Verified",
    totalRefer: 20,
    participantsTotal: "2,450",
    earnings: "$32,100",
    groups: [
      {
        id: "g4",
        name: "Road Kings SoCal",
        membersCount: 512,
      },
      {
        id: "g5",
        name: "Road Kings VIP",
        membersCount: 120,
      },
    ],
    events: [
      {
        id: "e4",
        name: "SoCal Midnight Cruise",
        date: "September 02",
        participantsCount: 210,
      },
    ],
  },
  {
    id: "org-4",
    name: "Elena Voss",
    organization: "Track Day Co.",
    initials: "EV",
    avatarBg: "bg-[#0E2C2E]",
    avatarColor: "text-[#06B6D4]",
    eventsCount: 9,
    groupsCount: 2,
    status: "Verified",
    type: "Circuit Racing",
    email: "elena@trackdayco.com",
    phone: "+1 619 555 0142",
    website: "trackdayco.com",
    verification: "Verified",
    totalRefer: 8,
    participantsTotal: "980",
    earnings: "$14,350",
    groups: [
      {
        id: "g6",
        name: "Track Day Pro",
        membersCount: 240,
      },
    ],
    events: [
      {
        id: "e5",
        name: "Willow Springs Circuit Run",
        date: "September 10",
        participantsCount: 95,
      },
    ],
  },
];
