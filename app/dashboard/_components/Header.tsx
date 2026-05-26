"use client";
import { useUserDetailContext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { CloudMoon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Header() {
  const { theme, setTheme } = useTheme();
  const [changeTheme, setChangeTheme] = useState<"dark" | "light">("light");
  const { userDetail } = useUserDetailContext();

  const handleTheme = (theme: "dark" | "light") => setTheme(theme);

  useEffect(() => {
    handleTheme(changeTheme);
  }, [changeTheme]);

  return (
    <div className="justify-between flex items-center shadow-md px-3">
      <div className="flex gap-3 items-center">
        <Image src={"/logoicon.svg"} height={40} width={40} alt="logo" />
        <h2 className="font-bold text-xl text-orange-500">STORYBOOK</h2>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <div className="flex flex-row items-center">
          <Image
            src={"/dollar.gif"}
            alt="loading-icon"
            width={30}
            height={30}
            unoptimized
          />
          <h2 className="text-orange-400 font-semibold">
            {userDetail?.credits}
          </h2>
        </div>
        {theme == "light" ? (
          <CloudMoon onClick={() => setChangeTheme("dark")} />
        ) : (
          <Sun
            onClick={() => setChangeTheme("light")}
            className="text-yellow-300"
          />
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
