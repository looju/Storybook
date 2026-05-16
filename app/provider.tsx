"use client";
import { db } from "@/configs/db";
import { users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";
import React, { ReactNode, useEffect } from "react";

function Provider({ children }: { children: ReactNode }) {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    user && isNewUser();
  }, [user]);

  const isNewUser = async () => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users?.email, user?.primaryEmailAddress?.emailAddress!));

    if (!result[0]) {
      await db.insert(users).values({
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.primaryEmailAddress?.emailAddress!,
        imageUrl: user?.imageUrl,
      });
    }
  };

  return <div>{children}</div>;
}

export default Provider;
