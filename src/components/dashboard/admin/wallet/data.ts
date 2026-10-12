export interface WithdrawRequestItem {
  id: string;
  organizer: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  amount: string;
  availableBalance: string;
  requestDate: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface WalletStatItem {
  id: string;
  title: string;
  value: string;
  subtext: string;
}

export const walletStatsData: WalletStatItem[] = [
  {
    id: "total-amount",
    title: "TOTAL AMOUNT",
    value: "$245,820",
    subtext: "Platform total",
  },
  {
    id: "withdrawable-amount",
    title: "WITHDRAWABLE AMOUNT",
    value: "$38,450",
    subtext: "Available to organizers",
  },
  {
    id: "total-profit",
    title: "TOTAL PROFIT",
    value: "$128,450",
    subtext: "+12.8% this month",
  },
];

export const mockWithdrawRequests: WithdrawRequestItem[] = [
  {
    id: "w1",
    organizer: "Apex Motors Club",
    initials: "AM",
    avatarBg: "bg-[#3E1424]",
    avatarColor: "text-[#FF2E86]",
    amount: "$1,200",
    availableBalance: "$4,820",
    requestDate: "Aug 04",
    status: "Pending",
  },
  {
    id: "w2",
    organizer: "Drive Society",
    initials: "DC",
    avatarBg: "bg-[#3B2614]",
    avatarColor: "text-[#F59E0B]",
    amount: "$850",
    availableBalance: "$3,150",
    requestDate: "Aug 03",
    status: "Pending",
  },
  {
    id: "w3",
    organizer: "Road Kings",
    initials: "MR",
    avatarBg: "bg-[#2B1640]",
    avatarColor: "text-[#A855F7]",
    amount: "$2,400",
    availableBalance: "$8,900",
    requestDate: "Aug 01",
    status: "Approved",
  },
  {
    id: "w4",
    organizer: "Track Day Co.",
    initials: "EV",
    avatarBg: "bg-[#0E2C2E]",
    avatarColor: "text-[#06B6D4]",
    amount: "$1,800",
    availableBalance: "$5,400",
    requestDate: "Jul 29",
    status: "Approved",
  },
];
