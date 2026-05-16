import { Button } from "@/components/ui/button";
import { Clapperboard, MonitorPlay } from "lucide-react";
import Link from "next/link";
import React from "react";

function EmptyState() {
  return (
    <div className="p-5 flex items-center flex-col mt-10 border-2 border-dashed rounded-sm gap-4">
      <h2>You do not have any short video created</h2>
      <Link href={"/dashboard/create-new"}>
        <Button
          className=" text-orange-500 border-orange-500"
          variant={"outline"}
        >
          Create short video
          <MonitorPlay />
        </Button>
      </Link>
    </div>
  );
}

export default EmptyState;
