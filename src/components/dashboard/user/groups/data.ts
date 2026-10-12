export interface PendingRequest {
  id: string;
  name: string;
  avatar: string;
  vehicle: string;
  requestedDate: string;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  vehicle: string;
  joinedDate: string;
}

export interface GroupPost {
  id: string;
  caption: string;
  image: string;
  likes: number;
  views: number;
  date: string;
  isPinned?: boolean;
}

export interface GroupData {
  id: string;
  name: string;
  description: string;
  image: string;
  coverImage: string;
  membersCount: number;
  postsCount: number;
  eventsCount: number;
  pendingRequests: PendingRequest[];
  members: GroupMember[];
  posts: GroupPost[];
}

export const mockGroupsData: GroupData[] = [
  {
    id: "socal-speed-society",
    name: "SoCal Speed Society",
    description: "Premier automotive community for Southern California enthusiasts. Track days, car meets, and exclusive drives.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    membersCount: 1240,
    postsCount: 342,
    eventsCount: 8,
    pendingRequests: [
      {
        id: "req-1",
        name: "Aisha Thompson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
        vehicle: "Mercedes C63 AMG",
        requestedDate: "Aug 2, 2025",
      },
      {
        id: "req-2",
        name: "Ryan Nakamura",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
        vehicle: "Subaru WRX STI",
        requestedDate: "Aug 1, 2025",
      },
    ],
    members: [
      {
        id: "mem-1",
        name: "Marcus Chen",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
        vehicle: "BMW M3 Competition",
        joinedDate: "Jan 2024",
      },
      {
        id: "mem-2",
        name: "Sofia Rodriguez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
        vehicle: "Porsche 911 GT3",
        joinedDate: "Mar 2024",
      },
      {
        id: "mem-3",
        name: "James Whitfield",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
        vehicle: "Audi RS6 Avant",
        joinedDate: "Apr 2024",
      },
    ],
    posts: [
      {
        id: "post-1",
        caption: "Perfect evening at the canyon. The 911 never disappoints!",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop",
        likes: 234,
        views: 1820,
        date: "Aug 1, 2025",
        isPinned: true,
      },
      {
        id: "post-2",
        caption: "Track day warm-up lap. Conditions are absolutely perfect today.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
        likes: 187,
        views: 1240,
        date: "Jul 28, 2025",
      },
      {
        id: "post-3",
        caption: "M3 Competition in full glory. Built for moments like these.",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop",
        likes: 312,
        views: 2890,
        date: "Jul 22, 2025",
      },
    ],
  },
  {
    id: "la-exotic-owners-club",
    name: "LA Exotic Owners Club",
    description: "Exclusive community for exotic car owners in Los Angeles. Monthly drives and private events only.",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop",
    membersCount: 340,
    postsCount: 128,
    eventsCount: 4,
    pendingRequests: [
      {
        id: "req-3",
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
        vehicle: "McLaren 720S",
        requestedDate: "Aug 5, 2025",
      },
    ],
    members: [
      {
        id: "mem-4",
        name: "Alexander Wright",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
        vehicle: "Ferrari F8 Tributo",
        joinedDate: "Feb 2024",
      },
    ],
    posts: [
      {
        id: "post-4",
        caption: "Sunset drive along PCH with the club. Unmatched vibes.",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop",
        likes: 420,
        views: 3100,
        date: "Aug 3, 2025",
        isPinned: true,
      },
    ],
  },
  {
    id: "track-warriors",
    name: "Track Warriors",
    description: "Dedicated track day organizers and performance enthusiasts. Bi-weekly circuit sessions.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1600&auto=format&fit=crop",
    membersCount: 580,
    postsCount: 215,
    eventsCount: 12,
    pendingRequests: [
      {
        id: "req-1",
        name: "Aisha Thompson",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
        vehicle: "Mercedes C63 AMG",
        requestedDate: "Aug 2, 2025",
      },
      {
        id: "req-2",
        name: "Ryan Nakamura",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
        vehicle: "Subaru WRX STI",
        requestedDate: "Aug 1, 2025",
      },
    ],
    members: [
      {
        id: "mem-1",
        name: "Marcus Chen",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
        vehicle: "BMW M3 Competition",
        joinedDate: "Jan 2024",
      },
      {
        id: "mem-2",
        name: "Sofia Rodriguez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
        vehicle: "Porsche 911 GT3",
        joinedDate: "Mar 2024",
      },
    ],
    posts: [
      {
        id: "post-1",
        caption: "Perfect evening at the canyon. The 911 never disappoints!",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop",
        likes: 234,
        views: 1820,
        date: "Aug 1, 2025",
        isPinned: true,
      },
      {
        id: "post-2",
        caption: "Track day warm-up lap. Conditions are absolutely perfect today.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
        likes: 187,
        views: 1240,
        date: "Jul 28, 2025",
      },
      {
        id: "post-3",
        caption: "M3 Competition in full glory. Built for moments like these.",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop",
        likes: 312,
        views: 2890,
        date: "Jul 22, 2025",
      },
    ],
  },
];
