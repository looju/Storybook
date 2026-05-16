"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { CloudMoon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="justify-between flex items-center shadow-md px-3">
      <div className="flex gap-3 items-center">
        <Image src={"/logoicon.svg"} height={40} width={40} alt="logo" />
        <h2 className="font-bold text-xl text-orange-500">STORYBOOK</h2>
      </div>
      <div className="flex gap-5 items-center">
        {theme == "light" ? (
          <CloudMoon onClick={() => setTheme("dark")} />
        ) : (
          <Sun onClick={() => setTheme("light")} className="text-yellow-300" />
        )}
        <Button className="bg-orange-500 text-white" variant={"outline"}>
          Dashboard
        </Button>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
