"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";
import { supabaseBrowserClient } from "@/configs/supabse";
import { useUser } from "@clerk/nextjs";
import { VideoDataFetchType } from "@/types";
import { DisplayVideoList } from "./_components/VideoList";

function Dashboard() {
  const [videoList, setVideoList] = useState<
    Partial<VideoDataFetchType>[] | null
  >([]);
  const user = useUser();

  const getAllVideosFromDb = async () => {
    const { data, error } = await supabaseBrowserClient
      .from("VideoData")
      .select("*")
      .eq("user_id", user?.user?.id);
    if (error) console.error(error, "error getting videos from db");
    setVideoList(data);
  };

  useEffect(() => {
    user && getAllVideosFromDb();
  }, [user]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-500">Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button className="bg-orange-500">+ Create new</Button>
        </Link>
      </div>

      {/* Empty state */}
      {videoList?.length == 0 ? (
        <EmptyState />
      ) : (
        <DisplayVideoList videos={videoList} />
      )}
    </div>
  );
}

export default Dashboard;
