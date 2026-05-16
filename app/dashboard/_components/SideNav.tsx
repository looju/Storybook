"use client";
import { CircleUser, FileVideo, Home, Rocket } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideNav() {
  const { theme } = useTheme();
  const MenuOption = [
    {
      id: 1,
      name: "Dashboard",
      route: "/dashboard",
      icon: Home,
      color: "#3FA9F5",
    },
    {
      id: 2,
      name: "Create New",
      route: "/dashboard/create-new",
      icon: FileVideo,
      color: "#F39C12",
    },
    {
      id: 3,
      name: "Upgrade",
      route: "/upgrade",
      icon: Rocket,
      color: "#2ECC71",
    },
    {
      id: 4,
      name: "Settings",
      route: "/settings",
      icon: CircleUser,
      color: "#9B59B6",
    },
  ];

  const path = usePathname();
  const darkMode = theme == "dark";

  return (
    <div className={`w-64 h-screen shadow-lg p-5 ${darkMode && "bg-black"}`}>
      <div className="gap-2 grid">
        {MenuOption?.map((Options, i) => (
          <Link href={Options?.route} key={i}>
            <div
              className={`flex items-center gap-3 p-3 hover:bg-orange-400 hover:text-white rounded-md cursor-pointer ${
                Options.route == path && "bg-orange-500 text-white"
              }`}
            >
              <Options.icon color={Options.color} />
              <h2>{Options?.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
