"use client";
import React, { useEffect, useState } from "react";
import { Rubik, Libre_Baskerville } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserAvatar, UserButton, useUser } from "@clerk/nextjs";
import { CloudMoon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const rubikFont = Rubik({ subsets: ["latin"] });
const LibreFont = Libre_Baskerville({ subsets: ["latin"] });
function Navbar() {
  const router = useRouter();
  const user = useUser();
  const { theme, setTheme } = useTheme();
  const [changeTheme, setChangeTheme] = useState<"dark" | "light">("light");
  const HeaderNavItems = [
    {
      name: "Inspiration",
      id: 1,
      route: "/",
    },
    {
      name: "About",
      id: 2,
      route: "/",
    },
    {
      name: "How it works",
      id: 3,
      route: "/",
    },
    {
      name: "Log In",
      id: 4,
      route: "/sign-in",
    },
    {
      name: "Get Started",
      id: 5,
      route: "/sign-up",
    },
  ];

  const handleTheme = (theme: "dark" | "light") => setTheme(theme);

  useEffect(() => {
    handleTheme(changeTheme);
  }, [changeTheme]);

  return (
    <div className="flex flex-row px-14 py-10 justify-between w-full items-center shadow-xl shadow-orange-500/30 h-[10%]">
      <div className="flex flex-row gap-7">
        <h1 className={`${rubikFont.className} font-semibold text-orange-700`}>
          STORYBOOK
        </h1>
        {HeaderNavItems?.splice(0, 3).map((item, i) => (
          <div className="flex flex-row hover:cursor-pointer" key={item?.id}>
            <h1 className={`${LibreFont.className}`}>{item?.name}</h1>
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-7">
        {user?.isSignedIn == false ? (
          HeaderNavItems?.splice(0, 4).map((item, i) => (
            <div
              className="flex flex-row hover:cursor-pointer items-center justify-center"
              key={item?.id}
            >
              {i == 0 ? (
                <h1
                  className={`${LibreFont.className}`}
                  onClick={() => router.push(item?.route)}
                >
                  {item?.name}
                </h1>
              ) : (
                <Button
                  className="hover:cursor-pointer rounded-2xl"
                  onClick={() => router.push(item?.route)}
                >
                  <h1 className="text-[10px]">
                    {item?.name?.toLocaleUpperCase()}
                  </h1>
                </Button>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-row items-center gap-3">
            <UserButton />
            <Button
              className="rounded-md text-sm hover:cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              <h1 className="text-[10px]">DASHBOARD</h1>
            </Button>

            {theme == "light" ? (
              <CloudMoon
                onClick={() => setChangeTheme("dark")}
                className="hover:cursor-pointer"
              />
            ) : (
              <Sun
                onClick={() => setChangeTheme("light")}
                className="hover:cursor-pointer"
                color="yellow"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
