import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RemotionVideo from "./RemotionVideo";
import { Player } from "@remotion/player";
import { useEffect, useState } from "react";
import { supabaseBrowserClient } from "@/configs/supabse";
import { VideoDataFetchType, VideoScriptData } from "@/types";
import { useRouter } from "next/navigation";
import { fa } from "zod/v4/locales";

export default function PlayerDialog({
  playVideo,
  setPlayVideo,
  videoId,
}: {
  playVideo: boolean;
  videoId: string;
  setPlayVideo: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [videoData, setVideoData] = useState<VideoDataFetchType | null>(null);
  const [durationInFrames, setDurationInFrames] = useState<number>(30);
  const router = useRouter();

  useEffect(() => {
    videoId && getVideoById(videoId);
  }, [playVideo, videoId]);

  async function getVideoById(id: string) {
    const { data, error } = await supabaseBrowserClient
      .from("VideoData")
      .select("*")
      .eq("_id", id)
      .maybeSingle();
    if (error) console.error(error);
    setVideoData(data);
  }

  return (
    <Dialog open={playVideo}>
      <DialogOverlay className="bg-black/85" />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black my-3">
            Now Playing...
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Player
            component={RemotionVideo}
            durationInFrames={Number(durationInFrames?.toFixed(0))}
            compositionWidth={450}
            compositionHeight={450}
            fps={30}
            inputProps={{
              script: videoData?.script,
              audio_file_url: videoData?.audio_file_url,
              _id: videoData?._id,
              created_by: videoData?.created_by,
              image_list: videoData?.image_list,
              captions: videoData?.captions,
              setDurationInFrames: setDurationInFrames,
            }}
            controls={true}
          />
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild className="flex w-full">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setPlayVideo(false);
                router.replace("/dashboard");
              }}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
