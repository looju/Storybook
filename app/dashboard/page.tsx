"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-500">Dashboard</h2>
        <Link href={"/dashboard/create-new"}>
          <Button className="bg-orange-500">+ Create new</Button>
        </Link>
      </div>

      {/* Empty state */}
      {videoList.length == 0 && <EmptyState />}
    </div>
  );
}

export default Dashboard;
