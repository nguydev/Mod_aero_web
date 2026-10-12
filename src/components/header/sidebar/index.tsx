"use client";

import { useState } from "react";
import {
  adminMenuData,
  userMenuData,
  user,
} from "../../../data";
import NavItem from "../nav-menu";
import Image from "next/image";
import logo from "@/src/assets/logo.svg";
import {
  LogOut,
} from "lucide-react";

export default function Sidebar({ navOpened, setNavOpened }: any) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const activeUser = user;

  const menuLinks =
    activeUser?.role === "admin"
      ? adminMenuData?.linkData
      : activeUser?.role === "user"
        ? userMenuData?.linkData : [];

  const closeAllSubmenus = (): void => {
    setOpenSubmenu(null);
  };

  const handleSubmenuToggle = (label: string): void => {
    setOpenSubmenu((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-white/50 z-20 lg:hidden transition-opacity ${navOpened ? "opacity-100 block" : "opacity-0 hidden"
          }`}
        onClick={() => setNavOpened(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-30 h-screen w-[288px] overflow-y-auto transition-transform duration-300 border-e border-e-[#1E1E1E] bg-natural
          ${navOpened ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0  
        `}
      >
        <div className="flex flex-col gap-5 pt-28 lg:pt-0">
          <div className="px-2 w-[170px] mx-auto hidden lg:block h-[120px]">
            <Image
              src={logo}
              alt="icon"
              width={170}
              height={120}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-between h-[calc(100vh-150px)]">
            <nav className="flex-1 min-h-0 overflow-y-auto pb-2 px-3">
              {menuLinks?.map((section, sIndex) => (
                <div key={sIndex} className="space-y-2">
                  {section?.menu
                    ?.filter(
                      (item) =>
                        item?.isShow !== false ||
                        (item?.isShow === false && activeUser?.isBusinessUser),
                    )
                    .map((item, index) => (
                      <NavItem
                        key={index}
                        href={item?.href || "#"}
                        icon={item?.icon}
                        label={item?.label}
                        submenu={item?.submenu}
                        openSubmenu={openSubmenu}
                        handleSubmenuToggle={handleSubmenuToggle}
                        setNavOpened={setNavOpened}
                        closeAllSubmenus={closeAllSubmenus}
                      />
                    ))}
                </div>
              ))}
            </nav>
            {/* Bottom  */}
            <div className="p-3 border-t border-[#1E1E1E] flex flex-col gap-2">
              <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-300 rounded-full transition-all hover:text-primary hover:bg-primary/10 cursor-pointer">
                <LogOut size={18} />
                <span>Logout</span>
              </button>

              <div className="flex items-center gap-3 px-2 py-1">
                <div className="relative w-10 h-10 rounded-full p-[1.5px] border-2 border-primary shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
                    alt="John Ramirez"
                    width={40}
                    height={40}
                    unoptimized
                    className="w-full h-full object-cover rounded-full"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-natural" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-white truncate leading-tight">
                    John Ramirez
                  </span>
                  <span className="text-xs text-gray-400 truncate leading-tight mt-0.5">
                    Verified Organizer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

