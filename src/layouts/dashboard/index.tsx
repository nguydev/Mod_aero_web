"use client";
import { ReactNode, useState } from "react";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Sidebar from "@/components/header/sidebar";

const inter = Inter({ subsets: ["latin"] });

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [navOpened, setNavOpened] = useState<boolean>(false);
  return (
    <div className={`${inter.className} flex min-h-screen h-full`}>
      {/* side bar  */}
      <Sidebar navOpened={navOpened} setNavOpened={setNavOpened} />

      {/* top and children content  */}
      <div
        className={`flex flex-col flex-1 min-w-0 lg:ml-[288px] transition-all duration-300`}
      >
        <Header navOpened={navOpened} setNavOpened={setNavOpened} />
        {/* min-h-[calc(100vh-48px)]  */}
        <main className="overflow-y-auto overflow-x-hidden w-full min-h-[calc(100vh-178px)] h-full bg-natural font-primary p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
