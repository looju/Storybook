import { VideoDataFetchType } from "@/types";
import { Thumbnail } from "@remotion/player";
import React, { useState } from "react";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

export const DisplayVideoList = ({
  videos,
}: {
  videos: Partial<VideoDataFetchType>[] | null;
}) => {
  const [videoId, setVideoId] = useState("");
  const [openPlayer, setOpenPlayer] = useState<number | boolean>(0);

  return (
    <div className="mt-10 gird grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {videos?.map((x, i) => {
        return (
          <div
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setOpenPlayer(Date.now());
              setVideoId(x?._id!);
            }}
          >
            <Thumbnail
              component={RemotionVideo}
              compositionWidth={250}
              compositionHeight={350}
              frameToDisplay={30}
              durationInFrames={120}
              fps={30}
              className="rounded-md"
              inputProps={{
                script: x?.script,
                audio_file_url: x?.audio_file_url,
                _id: x?._id,
                created_by: x?.created_by,
                image_list: x?.image_list,
                captions: x?.captions,
              }}
            />
            <PlayerDialog playVideo={openPlayer} videoId={videoId} />
          </div>
        );
      })}
    </div>
  );
};
