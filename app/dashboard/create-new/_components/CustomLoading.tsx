import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
function CustomLoading({ loading }: { loading: boolean }) {
  return (
    <AlertDialog open={loading}>
      {/* --- HIDDEN TITLE FOR ACCESSIBILITY --- */}
      <VisuallyHidden>
        <AlertDialogTitle>Loading</AlertDialogTitle>
      </VisuallyHidden>
      <AlertDialogContent className="bg-white">
        <div className="gap-2 bg-white my-14 flex flex-col items-center">
          <Image
            src={"/writing.gif"}
            alt="loading-icon"
            width={40}
            height={40}
          />
          <h2>Generating your video... Do not refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
