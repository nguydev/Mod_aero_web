"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdMenu } from "react-icons/io";
import {
  Bell,
  ChevronDown,
  Users,
  Wallet,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { Dropdown } from "antd";

export default function Header({ navOpened, setNavOpened }: any) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="sticky inset-y-0 left-0 z-30 w-full border-b border-b-[#1E1E1E] h-20 bg-natural">
      <header className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left side / Mobile Menu Toggle */}
        <div
          onClick={() => setNavOpened(!navOpened)}
          className="lg:hidden flex items-center justify-center cursor-pointer"
        >
          <IoMdMenu className="w-10 h-10 rounded-full bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white text-center p-2" />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Notification Bell */}
          <button
            type="button"
            className="relative p-2 text-white/80 hover:text-white transition-colors cursor-pointer focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </button>

          {/* Vertical Divider */}
          <div className="h-7 w-[1px] bg-white/10" />

          {/* User Profile with Ant Design Dropdown */}
          <Dropdown
            open={dropdownOpen}
            onOpenChange={setDropdownOpen}
            trigger={["click"]}
            placement="bottomRight"
            popupRender={() => (
              <div className="w-60 rounded-xl border border-white/10 bg-[#141414] p-2 text-white">
                {/* User Info Header */}
                <div className="px-3 py-2.5 border-b border-white/10">
                  <p className="text-sm font-semibold !text-white">John Ramirez</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    john.ramirez@example.com
                  </p>
                </div>

                {/* Navigation Links */}
                <div className="py-1.5 space-y-0.5">
                  <Link
                    href="/dashboard/group"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm !text-white rounded-lg transition-all hover:bg-white/5 hover:!text-primary group"
                  >
                    <Users size={16} className="text-white group-hover:text-primary transition-colors" />
                    <span className="font-medium !text-white group-hover:!text-primary transition-colors">Group</span>
                  </Link>

                  <Link
                    href="/dashboard/wallet"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm !text-white rounded-lg transition-all hover:bg-white/5 hover:!text-primary group"
                  >
                    <Wallet size={16} className="text-white group-hover:text-primary transition-colors" />
                    <span className="font-medium !text-white group-hover:!text-primary transition-colors">Wallet</span>
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm !text-white rounded-lg transition-all hover:bg-white/5 hover:!text-primary group"
                  >
                    <UserIcon size={16} className="text-white group-hover:text-primary transition-colors" />
                    <span className="font-medium !text-white group-hover:!text-primary transition-colors">Profile</span>
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-1" />

                {/* Logout */}
                <Link
                  href="/auth/login"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-sm !text-red-500 rounded-lg transition-all hover:bg-red-500/10 hover:!text-red-400 group"
                >
                  <LogOut size={16} className="text-red-500 group-hover:text-red-400 transition-colors" />
                  <span className="font-medium !text-red-500 group-hover:!text-red-400">Logout</span>
                </Link>
              </div>
            )}
          >
            <div className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative w-10 h-10 rounded-full p-[1.5px] border border-primary overflow-hidden shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
                  alt="John Ramirez"
                  width={40}
                  height={40}
                  unoptimized
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-white leading-tight group-hover:text-primary transition-colors">
                  John Ramirez
                </span>
                <span className="text-xs text-gray-400 font-normal">
                  Organizer
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-white" : ""
                  }`}
              />
            </div>
          </Dropdown>
        </div>
      </header>
    </div>
  );
}
