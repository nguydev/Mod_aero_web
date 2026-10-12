export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "1",
    question: "What is Velocity?",
    answer:
      "Velocity is an all-in-one automotive platform connecting vehicle owners, automotive communities, event creators, and administrators. Manage your garage, track drives, discover routes, join communities, and participate in events.",
  },
  {
    id: "2",
    question: "How do I become an Event Creator?",
    answer:
      "You can apply for the Event Creator Program directly from your dashboard or profile settings. Once verified, you gain access to event creation, ticket management, participant tracking, and analytics.",
  },
  {
    id: "3",
    question: "Is the app free to use?",
    answer:
      "Yes, Velocity is free to download and use for vehicle management, route discovery, and community features. Advanced event creator tools and premium analytics are available under creator plans.",
  },
  {
    id: "4",
    question: "How do Convoys work?",
    answer:
      "Convoys allow drivers to create or join group drives with real-time GPS tracking on a shared map, waypoint navigation, and live communication.",
  },
  {
    id: "5",
    question: "Can I manage multiple vehicles?",
    answer:
      "Absolutely! Your Smart Garage allows you to add and track unlimited vehicles, maintenance logs, modification builds, and custom specs.",
  },
];
