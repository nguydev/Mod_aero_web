import aiMotive from "@/src/assets/ai-automotive.svg";
import discover from "@/src/assets/discover-scenic.svg";
import community from "@/src/assets/community-feed.svg";
import achievements from "@/src/assets/achievements.svg";
import { Cpu, Activity, Users, Trophy } from "lucide-react";

export interface FeatureItem {
  id: string;
  tag: string;
  icon: any;
  title: string;
  description: string;
  image: any;
  imageAlt: string;
  overlayLabel: string;
  imageLeft?: boolean;
}

export const featuresData: FeatureItem[] = [
  {
    id: "10001",
    tag: "INTELLIGENCE",
    icon: Cpu,
    title: "AI Automotive Assistant",
    description:
      "Get personalized recommendations, predictive maintenance alerts, and route optimization powered by machine learning. Your car knows what it needs before you do.",
    image: aiMotive,
    imageAlt: "AI Automotive Assistant",
    overlayLabel: "AI Automotive Assistant",
    imageLeft: false,
  },
  {
    id: "10002",
    tag: "NAVIGATION",
    icon: Activity,
    title: "Discover Scenic Routes",
    description:
      "Find the most breathtaking roads near you. Community-curated routes with elevation profiles, difficulty ratings, and real-time traffic updates.",
    image: discover,
    imageAlt: "Discover Scenic Routes",
    overlayLabel: "Discover Scenic Routes",
    imageLeft: true,
  },
  {
    id: "10003",
    tag: "SOCIAL",
    icon: Users,
    title: "Community Feed",
    description:
      "Share your builds, post drive highlights, comment on epic moments. Connect with 100,000+ automotive enthusiasts who live for the drive.",
    image: community,
    imageAlt: "Community Feed",
    overlayLabel: "Community Feed",
    imageLeft: false,
  },
  {
    id: "10004",
    tag: "PROGRESSION",
    icon: Trophy,
    title: "Achievements & XP",
    description:
      "Earn badges for milestones, rack up XP on drives, unlock exclusive content. Rise through driver tiers from Rookie to Legend.",
    image: achievements,
    imageAlt: "Achievements & XP",
    overlayLabel: "Achievements & XP",
    imageLeft: true,
  },
];