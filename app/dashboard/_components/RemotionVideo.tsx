import { VideoDataFetchType } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import {
  AbsoluteFill,
  Html5Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

function RemotionVideo({
  captions,
  image_list,
  audio_file_url,
  setDurationInFrames,
}: Partial<VideoDataFetchType> & {
  setDurationInFrames?: Dispatch<SetStateAction<number>>;
}) {
  const { fps } = useVideoConfig();
  const currentFrame = useCurrentFrame();

  const getDurationFrames = () => {
    if (captions) {
      const fpsRate = (captions[captions?.length - 1]?.end / 1000) * fps;
      setDurationInFrames && setDurationInFrames(fpsRate);
      return fpsRate;
    } else return 0;
  };

  const getCurrentCaption = () => {
    const currentTime = (currentFrame / 30) * 1000; //convert frame number to millisecs
    const currentCaption = captions?.find(
      (word) => currentTime >= word?.start && currentTime <= word?.end,
    );
    return currentCaption?.text ?? "";
  };

  return (
    <AbsoluteFill className="bg-black">
      {image_list?.map((img, index) => {
        const startTime = (index * getDurationFrames()) / image_list?.length;
        const duration = getDurationFrames();
        const scale = (i: number) =>
          interpolate(
            currentFrame,
            [startTime, startTime + duration / 2, startTime + duration],
            index % 2 === 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
        return (
          <>
            <Sequence
              key={index}
              from={startTime}
              durationInFrames={getDurationFrames()}
            >
              <AbsoluteFill
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Img
                  src={img}
                  className="object-cover h-full w-full"
                  style={{
                    transform: `scale(${scale(index)})`,
                  }}
                />
                <AbsoluteFill
                  style={{
                    color: "white",
                    justifyContent: "center",
                    top: undefined,
                    bottom: 50,
                    height: 150,
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <h2 className="text-lg">{getCurrentCaption()}</h2>
                </AbsoluteFill>
              </AbsoluteFill>
            </Sequence>
          </>
        );
      })}
      <Html5Audio src={audio_file_url} />
    </AbsoluteFill>
  );
}

export default RemotionVideo;
