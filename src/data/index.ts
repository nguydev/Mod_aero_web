import {
  LayoutGrid,
  Users,
  Home,
  Trophy,
  CreditCard,
  FileText,
  Settings,
  CalendarDays,
  Wallet,
  User,
  Route,
  Shield,
  Info,
} from "lucide-react";
export interface SubmenuItem {
  label: string;
  href: string;
  icon?: React.ElementType;
}

export interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
  submenu?: SubmenuItem[];
  isShow?: boolean;
}

export interface MenuGroup {
  menu: MenuItem[];
}

export interface MenuData {
  linkData: MenuGroup[];
}

export interface UserData {
  name: string;
  email: string;
  role: "admin" | "user";
  isBusinessUser?: boolean;
}

export const user: UserData = {
  name: "Sushil Hemrom",
  email: "admin@orbitconnect.com",
  role: "user",
  isBusinessUser: true,
};

// for admin
export const adminMenuData: MenuData = {
  linkData: [
    {
      menu: [
        {
          label: "Dashboard",
          href: "/admin/dashboard",
          icon: LayoutGrid,
        },
        {
          label: "User Management",
          href: "/admin/user-management",
          icon: Users,
        },
        {
          label: "Organizer Management",
          href: "/admin/organizer-management",
          icon: Home,
        },
        {
          label: "Achievement",
          href: "/admin/achievement",
          icon: Trophy,
        },
        {
          label: "Manage Routes",
          href: "/admin/manage-routes",
          icon: Route,
        },
        {
          label: "Wallet",
          href: "/admin/wallet",
          icon: CreditCard,
        },
        {
          label: "Report",
          href: "/admin/report",
          icon: FileText,
        },
        {
          label: "Settings",
          href: "/admin/settings",
          icon: Settings,
          submenu: [
            {
              label: "View Profile",
              href: "/admin/settings/profile",
              icon: User,
            },
            {
              label: "Terms and Condition",
              href: "/admin/settings/terms",
              icon: FileText,
            },
            {
              label: "Privacy Policy",
              href: "/admin/settings/privacy",
              icon: Shield,
            },
            {
              label: "About Us",
              href: "/admin/settings/about",
              icon: Info,
            },
          ],
        },
      ],
    },
  ],
};

// for user
export const userMenuData: MenuData = {
  linkData: [
    {
      menu: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: LayoutGrid,
        },
        {
          label: "Events",
          href: "/dashboard/events",
          icon: CalendarDays,
        },
        {
          label: "Groups",
          href: "/dashboard/groups",
          icon: Users,
        },
        {
          label: "Wallet",
          href: "/dashboard/wallet",
          icon: Wallet,
        },
        {
          label: "Profile",
          href: "/dashboard/profile",
          icon: User,
        },
      ],
    },
  ],
};

// home page menubar
export const navItems: MenuItem[] = [
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Orbit Export",
    href: "/orbit-export",
  },
  {
    label: "Orbit Import",
    href: "/orbit-import",
  },
  {
    label: "Business Connect",
    submenu: [
      {
        label: "Connect to Partners",
        href: "/business-connect/partners",
      },
      {
        label: "KIMVUKA",
        href: "/business-connect/kimvuka",
      },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];
