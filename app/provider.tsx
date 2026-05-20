"use client";
import { db } from "@/configs/db";
import { users } from "@/configs/schema";
import { supabaseBrowserClient } from "@/configs/supabse";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";
import React, { ReactNode, useEffect } from "react";

function Provider({ children }: { children: ReactNode }) {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    user && verifyUser();
  }, [user]);

  const verifyUser = async () => {
    const exists = await checkUserExists(user?.emailAddresses[0]?.emailAddress);
    if (!exists) {
      isNewUser();
    }
  };

  const checkUserExists = async (email: string | undefined) => {
    const { data, error } = await supabaseBrowserClient
      .from("Users")
      .select("email")
      .eq("email", email)
      .limit(1)
      .maybeSingle();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking user:", error);
      return false;
    }

    return !!data;
  };

  const isNewUser = async () => {
    const videoId = uuidv4();
    const { data, error } = await supabaseBrowserClient
      .from("Users")
      .insert([
        {
          _id: videoId,
          created_at: new Date().toISOString(),
          name: `${user?.fullName}--${user?.emailAddresses[0]?.emailAddress}`,
          image_url: `${user?.imageUrl}`,
          email: `${user?.emailAddresses[0]?.emailAddress}`,
          subscription: false,
          credits: 30,
        },
      ])
      .select();

    if (error) {
      console.log("Error:", error.message);
    } else {
      console.log("Stored data", data);
    }
  };

  return <div>{children}</div>;
}

export default Provider;
