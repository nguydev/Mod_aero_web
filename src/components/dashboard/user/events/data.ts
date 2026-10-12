export interface EventData {
  id: string;
  name: string;
  location: string;
  date: string;
  time: string;
  price: string;
  priceNum: number;
  category: string;
  registered: number;
  capacity: number;
  revenue: string;
  status: "UPCOMING" | "LIVE NOW" | "COMPLETED";
  banner: string;
  description: string;
  visibility: string;
  rating: string;
  recentRegistrations: {
    name: string;
    email: string;
    avatar: string;
  }[];
}

export const mockEventsData: EventData[] = [
  {
    id: "1",
    name: "Sunset Boulevard Car Meet",
    location: "Los Angeles, CA",
    date: "Aug 15, 2025",
    time: "6:00 PM",
    price: "$25",
    priceNum: 25,
    category: "Car Meet",
    registered: 142,
    capacity: 200,
    revenue: "$3,550",
    status: "UPCOMING",
    banner: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    description: "Join us for an unforgettable evening cruise down Sunset Boulevard. Cars of all makes and models welcome. Light refreshments provided. Come early for the best spots.",
    visibility: "Everyone",
    rating: "4.9 / 5.0",
    recentRegistrations: [
      {
        name: "Marcus Chen",
        email: "abc@gmail.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
      },
      {
        name: "Sofia Rodriguez",
        email: "abc@gmail.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      },
      {
        name: "James Whitfield",
        email: "abc@gmail.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "2",
    name: "Sunset Boulevard Car Meet",
    location: "Los Angeles, CA",
    date: "Aug 15, 2025",
    time: "6:00 PM",
    price: "$25",
    priceNum: 25,
    category: "Car Meet",
    registered: 142,
    capacity: 200,
    revenue: "$3,550",
    status: "UPCOMING",
    banner: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    description: "Join us for an unforgettable evening cruise down Sunset Boulevard. Cars of all makes and models welcome. Light refreshments provided. Come early for the best spots.",
    visibility: "Everyone",
    rating: "4.9 / 5.0",
    recentRegistrations: [
      {
        name: "Marcus Chen",
        email: "abc@gmail.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
      },
      {
        name: "Sofia Rodriguez",
        email: "abc@gmail.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      },
      {
        name: "James Whitfield",
        email: "abc@gmail.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "3",
    name: "Sunset Boulevard Car Meet",
    location: "Los Angeles, CA",
    date: "Aug 15, 2025",
    time: "6:00 PM",
    price: "$25",
    priceNum: 25,
    category: "Car Meet",
    registered: 142,
    capacity: 200,
    revenue: "$3,550",
    status: "UPCOMING",
    banner: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    description: "Join us for an unforgettable evening cruise down Sunset Boulevard. Cars of all makes and models welcome. Light refreshments provided. Come early for the best spots.",
    visibility: "Everyone",
    rating: "4.9 / 5.0",
    recentRegistrations: [
      {
        name: "Marcus Chen",
        email: "abc@gmail.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
      },
      {
        name: "Sofia Rodriguez",
        email: "abc@gmail.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      },
      {
        name: "James Whitfield",
        email: "abc@gmail.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      },
    ],
  },
];
