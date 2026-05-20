"use client";
import { supabaseBrowserClient } from "@/configs/supabse";
import { UserDetailAppContextType, UserDetailContextType } from "@/types";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const UserDetailContext = createContext<UserDetailAppContextType | undefined>(
  undefined,
);

export function UserDetailProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userDetail, setUserDetail] = useState<Partial<UserDetailContextType>>(
    {},
  );

  const user = useUser();
  const getUserDetail = async () => {
    const { data, error } = await supabaseBrowserClient
      .from("Users")
      .select("*")
      .eq("email", user?.user?.emailAddresses[0]?.emailAddress)
      .limit(1)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking user:", error);
      return false;
    }
    setUserDetail(data);
  };

  useEffect(() => {
    user && getUserDetail();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export function useUserDetailContext() {
  const context = useContext(UserDetailContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
