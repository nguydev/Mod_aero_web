export interface AdminStatItem {
  id: string;
  title: string;
  value: string;
  subtext: string;
  isPositive?: boolean;
}

export interface EventApprovalItem {
  id: string;
  name: string;
  club: string;
  date: string;
  location: string;
  capacity: string;
  price: string;
  tag: string;
  image: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface OrganizerRequestItem {
  key: string;
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  avatarBg: string;
  organization: string;
  submitted: string;
  status: "Pending" | "Approved" | "Rejected";
}

export const adminStatsData: AdminStatItem[] = [
  {
    id: "total-users",
    title: "TOTAL USERS",
    value: "24,582",
    subtext: "+8.4% this month",
  },
  {
    id: "total-organizers",
    title: "TOTAL ORGANIZERS",
    value: "348",
    subtext: "12 pending requests",
  },
  {
    id: "total-profit",
    title: "TOTAL PROFIT",
    value: "$128,450",
    subtext: "+12.8% this month",
  },
  {
    id: "active-events",
    title: "ACTIVE EVENTS",
    value: "126",
    subtext: "18 happening this week",
  },
];

export const mockEventApprovals: EventApprovalItem[] = [
  {
    id: "1",
    name: "Sunset Boulevard Car Meet",
    club: "Apex Motors Club",
    date: "Aug 10, 2026",
    location: "Los Angeles, CA",
    capacity: "140 cap",
    price: "$25",
    tag: "Car Meet",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=300&auto=format&fit=crop",
    status: "Pending",
  },
  {
    id: "2",
    name: "Laguna Seca Track Day",
    club: "Drive Society",
    date: "Aug 15, 2026",
    location: "Monterey, CA",
    capacity: "60 cap",
    price: "$350",
    tag: "Track Day",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=300&auto=format&fit=crop",
    status: "Pending",
  },
  {
    id: "3",
    name: "SoCal Coffee & Cars",
    club: "Road Kings",
    date: "Aug 5, 2026",
    location: "Irvine, CA",
    capacity: "204 cap",
    price: "Free",
    tag: "Car Meet",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=300&auto=format&fit=crop",
    status: "Pending",
  },
  {
    id: "4",
    name: "Canyon Run \u2014 PCH",
    club: "Track Day Co.",
    date: "Aug 18, 2026",
    location: "Malibu, CA",
    capacity: "45 cap",
    price: "$50",
    tag: "Drive Tour",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=300&auto=format&fit=crop",
    status: "Pending",
  },
];

export const mockOrganizerRequests: OrganizerRequestItem[] = [
  {
    key: "1",
    id: "1",
    name: "Alex Morgan",
    initials: "AM",
    avatarBg: "bg-[#451528]",
    avatarColor: "text-[#FF2E86]",
    organization: "Apex Motors Club",
    submitted: "Today",
    status: "Pending",
  },
  {
    key: "2",
    id: "2",
    name: "Daniel Carter",
    initials: "DC",
    avatarBg: "bg-[#3D2614]",
    avatarColor: "text-[#FF7A1A]",
    organization: "Drive Society",
    submitted: "Yesterday",
    status: "Pending",
  },
  {
    key: "3",
    id: "3",
    name: "Michael Lee",
    initials: "ML",
    avatarBg: "bg-[#28183B]",
    avatarColor: "text-[#A855F7]",
    organization: "Road Kings",
    submitted: "Aug 02",
    status: "Pending",
  },
];
