"use client";
import React, { useContext, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios, { AxiosResponse } from "axios";
import CustomLoading from "./_components/CustomLoading";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import {
  AudioResultType,
  fieldNameType,
  GenerateVideoScriptData,
  ImageResultType,
  TimestampData,
  UserFormData,
  VideoScriptData,
} from "@/types";
import { useVideoDataContext } from "@/app/_context/videoDataContext";
import { WordTimestamp } from "@speech-sdk/core/types";

const script = [
  {
    ContentText: "Hello world",
    ImagePrompt: "A busy market place, rainy weather",
  },
];
function CreateNew() {
  const [formData, setFormData] = useState<Partial<UserFormData>>({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState<VideoScriptData[]>([]);
  const [audioFileUrl, setAudioFileUrl] = useState("");
  const [captions, setCaptions] = useState<
    readonly WordTimestamp[] | undefined
  >([]);
  const [imageList, setImageList] = useState<string[]>();
  const { videoData, setVideoData } = useVideoDataContext();
  const onHandleInputChange = (
    fieldName: fieldNameType,
    fieldValue: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GetVideoScript = async () => {
    setLoading(true);
    if (!formData?.duration) {
      toast.info("You have to select a duration for the video");
      setLoading(false);
      return;
    }
    if (!formData?.style) {
      toast.info("You have to select a graphical style for the video");
      setLoading(false);
      return;
    }
    if (!formData?.topic) {
      toast.info("You have to give a topic for the video");
      setLoading(false);
      return;
    }

    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} story along with AI image prompt in ${formData.style} format for each scene and give me fesult in JSON format with imagePrompt and ContentText as field, no plain text.Maximum number of characters is 350 and add emotion tags like this:[happy],[sad],[angry]`;
    await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((res: AxiosResponse<GenerateVideoScriptData>) => {
        setVideoScript(res?.data?.result);
        setVideoData((prev) => ({
          ...prev,
          videoScript: res?.data?.result,
        }));
        generateAudioFile(res?.data?.result);
        generateImage(res?.data?.result);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e, "error");
        setLoading(false);
      });
    setLoading(false);
  };

  const generateAudioFile = async (videoResult: VideoScriptData[]) => {
    const id = uuidv4();
    let script = "";
    videoResult.forEach((item) => {
      script = script + item?.ContentText + " ";
    });
    await axios
      .post("/api/generate-audio", {
        id,
        text: script,
      })
      .then((res: AxiosResponse<AudioResultType>) => {
        setAudioFileUrl(res.data?.audioDownloadUrl);
        setCaptions(res?.data?.result?.timestamps);
        setVideoData((prev) => ({
          ...prev,
          audioUrl: res?.data?.audioDownloadUrl,
          captions: res?.data?.result?.timestamps,
        }));
      })
      .catch((e) => {
        console.log("error generating audio file:", e);
      });
  };

  const generateImage = async (videoResult: VideoScriptData[]) => {
    setLoading(true);
    let images: string[] = [];
    for (const item of videoResult) {
      await axios
        .post("/api/generate-image", {
          imagePrompt: item?.ImagePrompt,
        })
        .then((res: AxiosResponse<ImageResultType>) => {
          console.log("response:", res);
          images.push(res?.data?.result);
        })
        .catch((e) => {
          console.log("error generating images:", e);
          setLoading(false);
        });
    }
    setImageList(images);
    setVideoData((prev) => ({
      ...prev,
      imageFiles: images,
    }));
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-3xl text-orange-500 text-center">
        Create New
      </h2>
      <div className="mt-10 shadow-md p-10">
        {/* select topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* select style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* create button */}
        <Button className="mt-10 w-full bg-orange-500" onClick={GetVideoScript}>
          Create Short Video
        </Button>
        <Button
          className="mt-10 w-full bg-orange-500"
          onClick={() =>
            // generateAudioFile([
            //   {
            //     ContentText: "Test test",
            //     ImagePrompt: "Hello",
            //   },
            // ])
            generateImage(script)
          }
        >
          Create Short Audio
        </Button>
      </div>
      <CustomLoading loading={loading} />
    </div>
  );
}

export default CreateNew;
